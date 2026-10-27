import json
from typing import Any

from redis.asyncio import Redis

from .config import get_settings

redis_client: Redis | None = None


async def connect_cache() -> bool:
    global redis_client
    try:
        redis_client = Redis.from_url(get_settings().redis_url, decode_responses=True, socket_connect_timeout=2)
        await redis_client.ping()
        return True
    except Exception:
        if redis_client:
            await redis_client.aclose()
        redis_client = None
        return False


async def close_cache() -> None:
    global redis_client
    if redis_client:
        await redis_client.aclose()
    redis_client = None


async def cache_get(key: str) -> Any | None:
    if not redis_client:
        return None
    try:
        value = await redis_client.get(key)
        return json.loads(value) if value else None
    except Exception:
        return None


async def cache_set(key: str, value: Any, ttl: int = 30) -> None:
    if redis_client:
        try:
            await redis_client.set(key, json.dumps(value, default=str), ex=ttl)
        except Exception:
            pass


async def cache_delete(pattern: str) -> None:
    if not redis_client:
        return
    try:
        keys = [key async for key in redis_client.scan_iter(match=pattern)]
        if keys:
            await redis_client.delete(*keys)
    except Exception:
        pass
