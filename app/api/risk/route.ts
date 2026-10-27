import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateRisk } from "@/data/hazards";

const schema = z.object({ rainfall:z.number().min(0).max(350), saturation:z.number().min(0).max(100), seismic:z.number().min(0).max(100), slope:z.number().min(0).max(90).optional(), deforestation:z.number().min(0).max(100).optional() });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({error:"Invalid simulation parameters",issues:parsed.error.flatten()}, {status:400});
  return NextResponse.json({ ...calculateRisk(parsed.data.rainfall, parsed.data.saturation, parsed.data.seismic, parsed.data.slope, parsed.data.deforestation), weights:{rainfall:.4,slope:.25,soil:.2,deforestation:.15}, generatedAt:new Date().toISOString() });
}
