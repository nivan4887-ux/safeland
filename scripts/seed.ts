import mongoose from "mongoose";
import { hazards } from "../data/hazards";
import HazardZone from "../models/HazardZone";
const uri=process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/safeland";
await mongoose.connect(uri);
await HazardZone.deleteMany({});
await HazardZone.insertMany(hazards.map(({id,populationAtRisk,eta,...zone})=>zone));
console.log(`Seeded ${hazards.length} NER hazard zones.`);
await mongoose.disconnect();
