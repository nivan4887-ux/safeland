from fastapi import APIRouter

from ..risk_engine import calculate_risk
from ..schemas import RiskRequest, RiskResponse

router = APIRouter(prefix="/risk", tags=["Risk engine"])


@router.post("/predict", response_model=RiskResponse)
async def predict_risk(payload: RiskRequest) -> RiskResponse:
    return calculate_risk(payload)
