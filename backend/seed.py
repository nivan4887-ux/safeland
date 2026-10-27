import asyncio

from app.config import get_settings
from app.database import close_database, connect_database, get_database
from app.seed_data import HAZARD_ZONES


async def seed() -> None:
    if not await connect_database():
        raise RuntimeError("MongoDB is unavailable. Check MONGODB_URI and retry.")
    database = get_database()
    assert database is not None
    await database.hazard_zones.delete_many({})
    await database.hazard_zones.insert_many([record.copy() for record in HAZARD_ZONES])
    print(f"Seeded {len(HAZARD_ZONES)} SafeLand hazard zones into {get_settings().mongodb_database}.")
    await close_database()


if __name__ == "__main__":
    asyncio.run(seed())
