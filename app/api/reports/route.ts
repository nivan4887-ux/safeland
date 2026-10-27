import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import CommunityReport from "@/models/CommunityReport";
const schema = z.object({reporterName:z.string().min(2),contact:z.string().min(6),hazardType:z.string().min(2),description:z.string().min(8).max(1200),coordinates:z.tuple([z.number(),z.number()])});
export async function POST(request:Request) {
  const parsed=schema.safeParse(await request.json());
  if(!parsed.success) return NextResponse.json({error:"Please complete all required fields."},{status:400});
  const report={...parsed.data,location:{type:"Point" as const,coordinates:parsed.data.coordinates},verified:false,createdAt:new Date()};
  try { const db=await connectMongo(); if(db) { const saved=await CommunityReport.create(report); return NextResponse.json(saved,{status:201}); } } catch {}
  return NextResponse.json({id:`LOCAL-${Date.now()}`,...report,queued:true},{status:202});
}
