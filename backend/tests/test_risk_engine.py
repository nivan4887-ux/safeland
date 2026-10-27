from app.risk_engine import calculate_risk
from app.schemas import RiskRequest


def test_severe_scenario_returns_severe_risk() -> None:
    result = calculate_risk(RiskRequest(
        rainfall24h=350,
        slopeAngle=58,
        soilSaturation=100,
        seismicDisturbance=24,
        deforestationIndex=58,
    ))
    assert result.riskScore >= 80
    assert result.hazardLevel == "SEVERE"
    assert result.roadBlockageProbability >= 70


def test_low_scenario_stays_bounded() -> None:
    result = calculate_risk(RiskRequest(
        rainfall24h=0,
        slopeAngle=0,
        soilSaturation=0,
        seismicDisturbance=0,
        deforestationIndex=0,
    ))
    assert result.riskScore == 0
    assert result.hazardLevel == "LOW"
