# SafeLand

Production-oriented Next.js control-room application for AI-assisted landslide, flash-flood and slope-failure early warning in North-Eastern India.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The UI and API routes work with the bundled NER seed data. MongoDB and Redis are optional during local evaluation; add values from `.env.example` to enable persistence and telemetry caching.

## Architecture

- Next.js 14 App Router, TypeScript and Tailwind CSS
- React Leaflet with OpenStreetMap tiles and GeoJSON NER boundaries
- Recharts incident analytics
- Next.js route handlers for risk scoring, alerts, hazards and field reports
- Mongoose models with GeoJSON `2dsphere` indexes
- Redis read-through caching with automatic seed-data fallback

## Risk engine

Composite score = rainfall/API (40%) + slope/DEM (25%) + soil/shear strength (20%) + land-use disturbance (15%). The simulator is explanatory decision support; operational deployment requires agency-calibrated thresholds and validated sensor feeds.

## Data layer

Run `npm run seed` after starting MongoDB. The dataset contains Dima Hasao, Barak Valley, East Khasi Hills, Sohra/Mawsynram, NH-10 Teesta Valley, Kohima–Mao and Aizawl slope-cut hotspots.
