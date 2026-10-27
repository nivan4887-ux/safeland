import asyncio
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from . import cache
from .cache import close_cache, connect_cache
from .config import get_settings
from .database import close_database, connect_database, get_database
from .routers import alerts, hazards, reports, risk
from .seed_data import HAZARD_ZONES

settings = get_settings()
runtime = {"mongodb": False, "redis": False}


@asynccontextmanager
async def lifespan(_: FastAPI):
    runtime["mongodb"], runtime["redis"] = await asyncio.gather(connect_database(), connect_cache())
    yield
    await asyncio.gather(close_database(), close_cache())


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Geospatial multi-hazard prediction, telemetry and alerting service for North-Eastern India.",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-API-Key"],
)
app.include_router(hazards.router, prefix=settings.api_prefix)
app.include_router(risk.router, prefix=settings.api_prefix)
app.include_router(reports.router, prefix=settings.api_prefix)
app.include_router(alerts.router, prefix=settings.api_prefix)


@app.get("/", tags=["System"])
async def root() -> dict:
    return {"service": settings.app_name, "version": "1.0.0", "docs": "/docs"}


@app.get("/health", tags=["System"])
async def health() -> dict:
    return {
        "status": "healthy",
        "environment": settings.app_env,
        "dependencies": {
            "mongodb": "connected" if get_database() is not None else "seed-fallback",
            "redis": "connected" if cache.redis_client is not None else "disabled",
        },
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.websocket("/ws/telemetry")
async def telemetry_stream(websocket: WebSocket) -> None:
    await websocket.accept()
    sequence = 0
    try:
        while True:
            zone = HAZARD_ZONES[sequence % len(HAZARD_ZONES)]
            await websocket.send_json({
                "event": "telemetry.update",
                "sequence": sequence,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "zone": zone,
            })
            sequence += 1
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        return
