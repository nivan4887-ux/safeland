from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, Query, status

from ..cache import cache_delete
from ..database import get_database
from ..schemas import CommunityReport, CommunityReportCreate
from ..security import require_api_key

router = APIRouter(prefix="/reports", tags=["Community reports"])
memory_reports: list[dict] = []


@router.post("", response_model=CommunityReport, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_api_key)])
async def create_report(payload: CommunityReportCreate) -> dict:
    report = {
        "id": f"SFL-{uuid4().hex[:10].upper()}",
        **payload.model_dump(),
        "verified": False,
        "createdAt": datetime.now(timezone.utc),
    }
    database = get_database()
    if database is not None:
        await database.community_reports.insert_one(report.copy())
    else:
        memory_reports.insert(0, report)
    await cache_delete("safeland:reports:*")
    return report


@router.get("", response_model=list[CommunityReport])
async def list_reports(verified: bool | None = None, limit: int = Query(default=100, ge=1, le=500)) -> list[dict]:
    database = get_database()
    if database is not None:
        query = {} if verified is None else {"verified": verified}
        return await database.community_reports.find(query, {"_id": 0}).sort("createdAt", -1).limit(limit).to_list(length=limit)
    return [report for report in memory_reports if verified is None or report["verified"] == verified][:limit]
