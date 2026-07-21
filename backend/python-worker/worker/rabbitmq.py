import asyncio
import json
from typing import Callable, Awaitable

import aio_pika
from loguru import logger
from worker.config import settings


HandlerType = Callable[[dict], Awaitable[None]]


class RabbitMQConsumer:
    def __init__(self):
        self.connection: aio_pika.Connection | None = None
        self.channel: aio_pika.Channel | None = None
        self._handlers: dict[str, HandlerType] = {}

    async def connect(self):
        url = (
            f"amqp://{settings.rabbitmq_user}:{settings.rabbitmq_pass}"
            f"@{settings.rabbitmq_host}:{settings.rabbitmq_port}"
        )
        self.connection = await aio_pika.connect(url)
        self.channel = await self.connection.channel()
        await self.channel.set_qos(prefetch_count=10)

        await self._setup_queues()
        logger.info("Connected to RabbitMQ")

    async def _setup_queues(self):
        queues = ["devsactum.notifications", "devsactum.ai", "devsactum.mail"]
        for name in queues:
            queue = await self.channel.declare_queue(name, durable=True)
            async with queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        await self._process_message(name, message)

    async def _process_message(self, queue_name: str, message: aio_pika.IncomingMessage):
        try:
            data = json.loads(message.body.decode())
            logger.debug(f"Received message on {queue_name}: {data}")
            handler = self._handlers.get(queue_name)
            if handler:
                await handler(data)
        except Exception as e:
            logger.error(f"Error processing message: {e}")

    def register_handler(self, queue: str, handler: HandlerType):
        self._handlers[queue] = handler

    async def close(self):
        if self.connection:
            await self.connection.close()
            logger.info("RabbitMQ connection closed")
