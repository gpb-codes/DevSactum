import asyncio
import json
from abc import ABC, abstractmethod
from typing import Any

import aio_pika
from loguru import logger
from worker.config import settings
from worker.services.notification_service import NotificationService
from worker.services.ai_service import AiService


class BaseConsumer(ABC):
    def __init__(self, queue_name: str):
        self.queue_name = queue_name
        self.connection: aio_pika.Connection | None = None
        self.channel: aio_pika.Channel | None = None
        self._task: asyncio.Task | None = None

    async def start(self):
        url = (
            f"amqp://{settings.rabbitmq_user}:{settings.rabbitmq_pass}"
            f"@{settings.rabbitmq_host}:{settings.rabbitmq_port}"
        )
        self.connection = await aio_pika.connect(url)
        self.channel = await self.channel or await self.connection.channel()
        await self.channel.set_qos(prefetch_count=10)

        queue = await self.channel.declare_queue(self.queue_name, durable=True)
        logger.info(f"Consumer ready: {self.queue_name}")

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    await self.handle(message)

    async def stop(self):
        if self.connection:
            await self.connection.close()
            logger.info(f"Consumer stopped: {self.queue_name}")

    @abstractmethod
    async def handle(self, message: aio_pika.IncomingMessage):
        pass


class NotificationConsumer(BaseConsumer):
    def __init__(self):
        super().__init__("devsactum.notifications")
        self.service = NotificationService()

    async def handle(self, message: aio_pika.IncomingMessage):
        try:
            data = json.loads(message.body.decode())
            logger.debug(f"Notification event: {data.get('type', 'unknown')}")
            await self.service.process(data)
        except Exception as e:
            logger.error(f"Notification handler error: {e}")


class AiConsumer(BaseConsumer):
    def __init__(self):
        super().__init__("devsactum.ai")
        self.service = AiService()

    async def handle(self, message: aio_pika.IncomingMessage):
        try:
            data = json.loads(message.body.decode())
            pattern = data.get("pattern", "unknown")
            logger.debug(f"AI event: {pattern}")
            result = await self.service.process(pattern, data.get("data", {}))
            if result:
                logger.info(f"AI result for {pattern}: {result}")
        except Exception as e:
            logger.error(f"AI handler error: {e}")


class MailConsumer(BaseConsumer):
    def __init__(self):
        super().__init__("devsactum.mail")

    async def handle(self, message: aio_pika.IncomingMessage):
        try:
            data = json.loads(message.body.decode())
            to = data.get("to", "unknown")
            subject = data.get("subject", "No subject")
            logger.debug(f"Mail event: {subject} -> {to}")
            logger.info(f"Mail sent to {to}: {subject}")
        except Exception as e:
            logger.error(f"Mail handler error: {e}")
