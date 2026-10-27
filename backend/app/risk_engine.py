from datetime import datetime, timezone

from .schemas import FactorContribution, RiskRequest, RiskResponse


def calculate_risk(payload: RiskRequest) -> RiskResponse:
    rainfall_factor = min(payload.rainfall24h / 350, 1) * 100
    terrain_factor = min(payload.slopeAngle / 65, 1) * 100
    soil_factor = min(payload.soilSaturation * 0.82 + payload.seismicDisturbance * 0.18, 100)

    contributions = FactorContribution(
        rainfall=round(rainfall_factor * 0.40, 2),
        terrain=round(terrain_factor * 0.25, 2),
        soil=round(soil_factor * 0.20, 2),
        landUse=round(payload.deforestationIndex * 0.15, 2),
    )
    score = round(sum(contributions.model_dump().values()))
    blockage = min(98, round(score * 0.88 + payload.seismicDisturbance * 0.12))

    if score >= 80:
        level, window = "SEVERE", "2–6 hours"
    elif score >= 60:
        level, window = "HIGH", "6–12 hours"
    elif score >= 40:
        level, window = "MODERATE", "12–24 hours"
    else:
        level, window = "LOW", "No imminent failure"

    return RiskResponse(
        riskScore=score,
        hazardLevel=level,
        roadBlockageProbability=blockage,
        estimatedFailureWindow=window,
        contributions=contributions,
        generatedAt=datetime.now(timezone.utc),
    )
