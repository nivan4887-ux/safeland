from fastapi import APIRouter, Query

from ..cache import cache_get, cache_set
from ..database import get_database
from ..schemas import HazardZone
from ..seed_data import HAZARD_ZONES

router = APIRouter(prefix="/hazards", tags=["Hazards"])


@router.get("", response_model=list[HazardZone])
async def list_hazards(
    state: str | None = None,
    hazard_type: str | None = Query(default=None, alias="type"),
    min_risk: float = Query(default=0, ge=0, le=100),
) -> list[dict]:
    cache_key = f"safeland:hazards:{state or '*'}:{hazard_type or '*'}:{min_risk}"
    if cached := await cache_get(cache_key):
        return cached

    database = get_database()
    if database is not None:
        query: dict = {"riskScore": {"$gte": min_risk}}
        if state:
            query["state"] = {"$regex": f"^{state}$", "$options": "i"}
        if hazard_type:
            query["hazardType"] = hazard_type
        records = await database.hazard_zones.find(query, {"_id": 0}).sort("riskScore", -1).to_list(length=500)
    else:
        records = [
            item for item in HAZARD_ZONES
            if item["riskScore"] >= min_risk
            and (not state or item["state"].casefold() == state.casefold())
            and (not hazard_type or item["hazardType"] == hazard_type)
        ]

    await cache_set(cache_key, records)
    return records


@router.get("/nearby", response_model=list[HazardZone])
async def nearby_hazards(longitude: float, latitude: float, radius_km: float = Query(default=50, gt=0, le=500)) -> list[dict]:
    database = get_database()
    if database is not None:
        query = {"location": {"$near": {"$geometry": {"type": "Point", "coordinates": [longitude, latitude]}, "$maxDistance": radius_km * 1000}}}
        return await database.hazard_zones.find(query, {"_id": 0}).limit(100).to_list(length=100)

    def distance_score(item: dict) -> float:
        lng, lat = item["location"]["coordinates"]
        return (lng - longitude) ** 2 + (lat - latitude) ** 2

    approximate_degrees = radius_km / 111
    return [item for item in sorted(HAZARD_ZONES, key=distance_score) if distance_score(item) ** 0.5 <= approximate_degrees]
