import asyncio
import signal
from loguru import logger
from worker.config import settings
from worker.rabbitmq import RabbitMQConsumer


async def main():
    logger.info(f"Starting Python Worker in {settings.environment} mode")

    consumer = RabbitMQConsumer()
    await consumer.connect()

    shutdown_event = asyncio.Event()

    def _shutdown():
        shutdown_event.set()

    loop = asyncio.get_event_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, _shutdown)
        except NotImplementedError:
            pass

    logger.info("Worker ready. Waiting for messages...")
    await shutdown_event.wait()

    await consumer.close()
    logger.info("Worker shut down gracefully")


if __name__ == "__main__":
    asyncio.run(main())
