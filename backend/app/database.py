from typing import Any

from pymongo import ASCENDING, GEOSPHERE, AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase

from .config import get_settings

client: AsyncMongoClient[dict[str, Any]] | None = None
database: AsyncDatabase[dict[str, Any]] | None = None


async def connect_database() -> bool:
    global client, database
    settings = get_settings()
    try:
        client = AsyncMongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=2500)
        await client.admin.command("ping")
        database = client[settings.mongodb_database]
        await database.hazard_zones.create_index([("location", GEOSPHERE)])
        await database.hazard_zones.create_index([("state", ASCENDING), ("riskScore", -1)])
        await database.community_reports.create_index([("location", GEOSPHERE)])
        await database.community_reports.create_index([("createdAt", -1)])
        await database.alert_dispatches.create_index([("timestamp", -1)])
        return True
    except Exception:
        database = None
        if client:
            await client.close()
        client = None
        return False


async def close_database() -> None:
    global client, database
    if client:
        await client.close()
    client = None
    database = None


def get_database() -> AsyncDatabase[dict[str, Any]] | None:
    return database
