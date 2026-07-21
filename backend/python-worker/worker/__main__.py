import asyncio
import signal
from loguru import logger
from worker.config import settings
from worker.consumer import NotificationConsumer, AiConsumer, MailConsumer


async def main():
    logger.info(f"Starting Python Worker - environment: {settings.environment}")

    notification = NotificationConsumer()
    ai = AiConsumer()
    mail = MailConsumer()

    await asyncio.gather(
        notification.start(),
        ai.start(),
        mail.start(),
    )

    shutdown_event = asyncio.Event()

    def _shutdown():
        logger.info("Shutdown signal received")
        shutdown_event.set()

    loop = asyncio.get_event_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, _shutdown)
        except NotImplementedError:
            pass

    await shutdown_event.wait()

    await asyncio.gather(
        notification.stop(),
        ai.stop(),
        mail.stop(),
    )
    logger.info("Worker shut down gracefully")


if __name__ == "__main__":
    asyncio.run(main())
