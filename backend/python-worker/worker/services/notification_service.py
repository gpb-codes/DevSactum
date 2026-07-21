import asyncpg
from loguru import logger
from worker.config import settings


class NotificationService:
    def __init__(self):
        self.pool: asyncpg.Pool | None = None

    async def _get_pool(self) -> asyncpg.Pool:
        if self.pool is None:
            self.pool = await asyncpg.create_pool(
                host=settings.postgres_host,
                port=settings.postgres_port,
                database=settings.postgres_db,
                user=settings.postgres_user,
                password=settings.postgres_pass,
                min_size=1,
                max_size=5,
            )
        return self.pool

    async def process(self, data: dict) -> None:
        event_type = data.get("type", "unknown")
        recipient_id = data.get("recipient_id") or data.get("userId")
        actor_id = data.get("actor_id") or data.get("actorId")
        content = data.get("content", "")

        if not recipient_id:
            logger.warning(f"Notification missing recipient: {event_type}")
            return

        pool = await self._get_pool()
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO notifications (user_id, actor_id, type, content)
                VALUES ($1, $2, $3, $4)
                """,
                recipient_id, actor_id or "system", event_type, content,
            )

        logger.info(f"Notification saved: {event_type} -> user:{recipient_id}")

    async def close(self):
        if self.pool:
            await self.pool.close()
