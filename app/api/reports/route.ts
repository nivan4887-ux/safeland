import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import CommunityReport from "@/models/CommunityReport";
const schema = z.object({reporterName:z.string().min(2),contact:z.string().min(6),hazardType:z.string().min(2),description:z.string().min(8).max(1200),coordinates:z.tuple([z.number(),z.number()])});
export async function POST(request:Request) {
  const parsed=schema.safeParse(await request.json());
  if(!parsed.success) return NextResponse.json({error:"Please complete all required fields."},{status:400});
  const report={...parsed.data,location:{type:"Point" as const,coordinates:parsed.data.coordinates},verified:false,createdAt:new Date()};
  if(process.env.FASTAPI_URL){try{const response=await fetch(`${process.env.FASTAPI_URL}/api/v1/reports`,{method:"POST",headers:{"Content-Type":"application/json",...(process.env.SAFELAND_API_KEY?{"X-API-Key":process.env.SAFELAND_API_KEY}:{})},body:JSON.stringify({reporterName:parsed.data.reporterName,contact:parsed.data.contact,hazardType:parsed.data.hazardType,description:parsed.data.description,location:report.location})});if(response.ok)return NextResponse.json(await response.json(),{status:201});}catch{}}
  try { const db=await connectMongo(); if(db) { const saved=await CommunityReport.create(report); return NextResponse.json(saved,{status:201}); } } catch {}
  return NextResponse.json({id:`LOCAL-${Date.now()}`,...report,queued:true},{status:202});
}
