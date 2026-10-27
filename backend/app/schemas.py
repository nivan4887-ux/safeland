from datetime import datetime, timezone
from typing import Annotated, Literal

from pydantic import BaseModel, Field, field_validator

Longitude = Annotated[float, Field(ge=85, le=100)]
Latitude = Annotated[float, Field(ge=20, le=31)]
Percentage = Annotated[float, Field(ge=0, le=100)]


class GeoPoint(BaseModel):
    type: Literal["Point"] = "Point"
    coordinates: tuple[Longitude, Latitude]


class HazardZone(BaseModel):
    id: str
    name: str
    state: str
    location: GeoPoint
    hazardType: Literal["landslide", "flash_flood", "slope_failure"]
    riskScore: Percentage
    rainfall24h: Annotated[float, Field(ge=0, le=1000)]
    slopeAngle: Annotated[float, Field(ge=0, le=90)]
    soilSaturation: Percentage
    status: Literal["normal", "watch", "warning", "evacuate"]
    affectedRoads: list[str] = Field(default_factory=list)
    isolatedVillages: list[str] = Field(default_factory=list)
    populationAtRisk: int = Field(default=0, ge=0)
    eta: str = "Stable"


class RiskRequest(BaseModel):
    rainfall24h: float = Field(ge=0, le=350)
    slopeAngle: float = Field(default=48, ge=0, le=90)
    soilSaturation: float = Field(ge=0, le=100)
    seismicDisturbance: float = Field(default=0, ge=0, le=100)
    deforestationIndex: float = Field(default=58, ge=0, le=100)


class FactorContribution(BaseModel):
    rainfall: float
    terrain: float
    soil: float
    landUse: float


class RiskResponse(BaseModel):
    riskScore: int
    hazardLevel: Literal["LOW", "MODERATE", "HIGH", "SEVERE"]
    roadBlockageProbability: int
    estimatedFailureWindow: str
    contributions: FactorContribution
    generatedAt: datetime


class CommunityReportCreate(BaseModel):
    reporterName: str = Field(min_length=2, max_length=120)
    contact: str = Field(min_length=6, max_length=40)
    location: GeoPoint
    hazardType: Literal["Slope crack", "Falling debris", "Waterlogging", "Road crack"]
    description: str = Field(min_length=8, max_length=1200)

    @field_validator("contact")
    @classmethod
    def validate_contact(cls, value: str) -> str:
        cleaned = value.strip()
        if not any(character.isdigit() for character in cleaned):
            raise ValueError("contact must contain a telephone digit")
        return cleaned


class CommunityReport(CommunityReportCreate):
    id: str
    verified: bool = False
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AlertCreate(BaseModel):
    targetArea: str = Field(min_length=2, max_length=240)
    severity: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    message: str = Field(min_length=8, max_length=1200)
    recipients: list[Literal["Authorities", "Citizens", "Emergency Teams"]] = Field(min_length=1)
    channels: list[Literal["SMS", "WhatsApp", "Siren"]] = Field(min_length=1)


class AlertDispatch(AlertCreate):
    id: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    deliveryStatus: Literal["QUEUED", "SENT"] = "QUEUED"
