# SafeLand

Production-oriented Next.js control-room application for AI-assisted landslide, flash-flood and slope-failure early warning in North-Eastern India.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The UI works with the bundled NER seed data and automatically forwards its server-side requests to the FastAPI service when `FASTAPI_URL` is configured.

### Standalone FastAPI backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API documentation is available at `http://localhost:8000/docs`, the health endpoint is `/health`, and real-time telemetry is streamed from `ws://localhost:8000/ws/telemetry`.

MongoDB and Redis are optional during local evaluation. Without them, the backend uses the comprehensive in-memory NER dataset. Copy `.env.example` and `backend/.env.example` to enable persistence, caching, CORS configuration, and optional API-key enforcement.

For the complete local stack:

```bash
docker compose up --build
```

Seed a connected MongoDB instance with:

```bash
cd backend
python seed.py
```

## Architecture

- Next.js 14 App Router, TypeScript and Tailwind CSS
- React Leaflet with OpenStreetMap tiles and GeoJSON NER boundaries
- Recharts incident analytics
- Standalone FastAPI microservice for risk scoring, geospatial queries, reports, alerts, health checks and WebSocket telemetry
- Next.js route handlers proxy to FastAPI and retain local graceful fallbacks
- Mongoose models with GeoJSON `2dsphere` indexes
- PyMongo async persistence with GeoJSON `2dsphere` indexes
- Redis read-through caching with automatic seed-data fallback

## Risk engine

Composite score = rainfall/API (40%) + slope/DEM (25%) + soil/shear strength (20%) + land-use disturbance (15%). The simulator is explanatory decision support; operational deployment requires agency-calibrated thresholds and validated sensor feeds.

## Data layer

Run `npm run seed` after starting MongoDB. The dataset contains Dima Hasao, Barak Valley, East Khasi Hills, Sohra/Mawsynram, NH-10 Teesta Valley, Kohima–Mao and Aizawl slope-cut hotspots.
