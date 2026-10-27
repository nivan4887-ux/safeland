import { NextResponse } from "next/server";
import { hazards } from "@/data/hazards";
import { getRedis } from "@/lib/redis";
import { connectMongo } from "@/lib/mongodb";
import HazardZone from "@/models/HazardZone";

export async function GET() {
  const redis = getRedis();
  try {
    if (redis) { if (redis.status === "wait") await redis.connect(); const hit = await redis.get("safeland:hazards"); if (hit) return NextResponse.json(JSON.parse(hit)); }
    const db = await connectMongo();
    const data = db ? await HazardZone.find().lean() : hazards;
    if (redis) await redis.set("safeland:hazards", JSON.stringify(data), "EX", 30);
    return NextResponse.json(data);
  } catch { return NextResponse.json(hazards, { headers:{"X-SafeLand-Data-Source":"seed-fallback"} }); }
}
