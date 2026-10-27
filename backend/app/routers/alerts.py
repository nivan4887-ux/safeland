from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, Query, status

from ..database import get_database
from ..schemas import AlertCreate, AlertDispatch
from ..security import require_api_key

router = APIRouter(prefix="/alerts", tags=["Alert dispatch"])
memory_alerts: list[dict] = []


@router.post("", response_model=AlertDispatch, status_code=status.HTTP_202_ACCEPTED, dependencies=[Depends(require_api_key)])
async def dispatch_alert(payload: AlertCreate) -> dict:
    alert = {
        "id": f"ALT-{uuid4().hex[:10].upper()}",
        **payload.model_dump(),
        "timestamp": datetime.now(timezone.utc),
        "deliveryStatus": "QUEUED",
    }
    database = get_database()
    if database is not None:
        await database.alert_dispatches.insert_one(alert.copy())
    else:
        memory_alerts.insert(0, alert)
    return alert


@router.get("", response_model=list[AlertDispatch])
async def list_alerts(limit: int = Query(default=100, ge=1, le=500)) -> list[dict]:
    database = get_database()
    if database is not None:
        return await database.alert_dispatches.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit).to_list(length=limit)
    return memory_alerts[:limit]
