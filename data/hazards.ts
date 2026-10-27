import type { CommunityWatch, HazardZone, RoadCorridor } from "@/types";

export const hazards: HazardZone[] = [
  { id:"hz-001", name:"NH-10 • Teesta Valley", state:"Sikkim", location:{type:"Point",coordinates:[88.426,27.151]}, hazardType:"landslide", riskScore:92, rainfall24h:248, slopeAngle:58, soilSaturation:94, status:"evacuate", affectedRoads:["NH-10"], isolatedVillages:["Melli","Rangpo Upper Ward"], populationAtRisk:18400, eta:"2–4 hours" },
  { id:"hz-002", name:"Haflong • Dima Hasao", state:"Assam", location:{type:"Point",coordinates:[93.017,25.164]}, hazardType:"slope_failure", riskScore:87, rainfall24h:216, slopeAngle:52, soilSaturation:91, status:"evacuate", affectedRoads:["NH-27","Lumding–Silchar Rail"], isolatedVillages:["Jatinga","Mahur"], populationAtRisk:32100, eta:"3–6 hours" },
  { id:"hz-003", name:"Sonai • Barak Valley", state:"Assam", location:{type:"Point",coordinates:[92.763,24.733]}, hazardType:"flash_flood", riskScore:81, rainfall24h:278, slopeAngle:37, soilSaturation:96, status:"evacuate", affectedRoads:["NH-306"], isolatedVillages:["Kachudaram","Dholai"], populationAtRisk:46800, eta:"1–3 hours" },
  { id:"hz-004", name:"Sohra–Mawsynram Corridor", state:"Meghalaya", location:{type:"Point",coordinates:[91.585,25.299]}, hazardType:"landslide", riskScore:84, rainfall24h:263, slopeAngle:49, soilSaturation:93, status:"warning", affectedRoads:["SH-5"], isolatedVillages:["Mawlynnong","Laitkynsew"], populationAtRisk:12750, eta:"4–8 hours" },
  { id:"hz-005", name:"Kohima–Mao Corridor", state:"Nagaland", location:{type:"Point",coordinates:[94.111,25.674]}, hazardType:"slope_failure", riskScore:76, rainfall24h:174, slopeAngle:55, soilSaturation:82, status:"warning", affectedRoads:["NH-29"], isolatedVillages:["Khuzama","Viswema"], populationAtRisk:9400, eta:"8–12 hours" },
  { id:"hz-006", name:"Aizawl • Zemabawk Cut", state:"Mizoram", location:{type:"Point",coordinates:[92.765,23.744]}, hazardType:"landslide", riskScore:73, rainfall24h:162, slopeAngle:60, soilSaturation:79, status:"warning", affectedRoads:["NH-6"], isolatedVillages:["Seling","Tuirial"], populationAtRisk:6800, eta:"12–18 hours" },
  { id:"hz-007", name:"Dibang Valley", state:"Arunachal Pradesh", location:{type:"Point",coordinates:[95.732,28.037]}, hazardType:"flash_flood", riskScore:68, rainfall24h:188, slopeAngle:41, soilSaturation:85, status:"watch", affectedRoads:["NH-313"], isolatedVillages:["Anini","Etalin"], populationAtRisk:4200, eta:"12–24 hours" },
  { id:"hz-008", name:"Tamenglong Ridge", state:"Manipur", location:{type:"Point",coordinates:[93.501,24.975]}, hazardType:"landslide", riskScore:55, rainfall24h:132, slopeAngle:44, soilSaturation:74, status:"watch", affectedRoads:["NH-37"], isolatedVillages:["Tousem"], populationAtRisk:3100, eta:"24–36 hours" },
  { id:"hz-009", name:"Jampui Hills", state:"Tripura", location:{type:"Point",coordinates:[92.277,24.002]}, hazardType:"slope_failure", riskScore:34, rainfall24h:96, slopeAngle:39, soilSaturation:61, status:"normal", affectedRoads:["NH-8"], isolatedVillages:[], populationAtRisk:900, eta:"Stable" }
];

export const roads: RoadCorridor[] = [
  { id:"rd-1", corridor:"Siliguri–Gangtok", route:"NH-10", state:"Sikkim", probability:91, status:"Blocked", villages:["Melli","Rangpo","Singtam"] },
  { id:"rd-2", corridor:"Guwahati–Shillong", route:"NH-6", state:"Assam / Meghalaya", probability:67, status:"Vulnerable", villages:["Nongpoh","Umiam"] },
  { id:"rd-3", corridor:"Dimapur–Kohima", route:"NH-29", state:"Nagaland", probability:74, status:"Vulnerable", villages:["Zubza","Jakhama","Khuzama"] },
  { id:"rd-4", corridor:"Silchar–Aizawl", route:"NH-306", state:"Assam / Mizoram", probability:58, status:"Monitoring", villages:["Vairengte","Kolasib"] },
  { id:"rd-5", corridor:"Lumding–Haflong", route:"NH-27", state:"Assam", probability:84, status:"Vulnerable", villages:["Jatinga","Mahur","Harangajao"] }
];

export const communities: CommunityWatch[] = [
  { village:"Jatinga", district:"Dima Hasao, Assam", population:2480, reserves:2, helipad:"Haflong Heliport • 11 km", status:"Critical" },
  { village:"Melli", district:"South Sikkim", population:3720, reserves:1, helipad:"Namchi Helipad • 18 km", status:"Critical" },
  { village:"Laitkynsew", district:"East Khasi Hills", population:1640, reserves:4, helipad:"Shillong ALG • 52 km", status:"Watch" },
  { village:"Khuzama", district:"Kohima, Nagaland", population:2910, reserves:3, helipad:"Kohima Helipad • 22 km", status:"Watch" },
  { village:"Seling", district:"Aizawl, Mizoram", population:1180, reserves:7, helipad:"Thuampui Helipad • 27 km", status:"Ready" }
];

export const rainfallHistory = [
  { month:"Nov", rainfall:84, incidents:4 }, { month:"Dec", rainfall:52, incidents:2 }, { month:"Jan", rainfall:38, incidents:1 },
  { month:"Feb", rainfall:61, incidents:3 }, { month:"Mar", rainfall:118, incidents:7 }, { month:"Apr", rainfall:176, incidents:12 },
  { month:"May", rainfall:244, incidents:21 }, { month:"Jun", rainfall:318, incidents:34 }, { month:"Jul", rainfall:336, incidents:39 },
  { month:"Aug", rainfall:282, incidents:28 }, { month:"Sep", rainfall:211, incidents:17 }, { month:"Oct", rainfall:139, incidents:9 }
];

export const alertItems = [
  { id:"a1", severity:"CRITICAL" as const, title:"Landslide risk escalating", place:"NH-10, Teesta Valley • Sikkim", time:"10:18", detail:"248 mm rainfall; probable failure in 2–4 hours." },
  { id:"a2", severity:"WARNING" as const, title:"Flash flood warning", place:"Sonai, Barak Valley • Assam", time:"10:03", detail:"River gauge rising rapidly above danger level." },
  { id:"a3", severity:"CRITICAL" as const, title:"Multiple slope failures", place:"Haflong • Dima Hasao", time:"09:41", detail:"Rail and road access at high risk of closure." },
  { id:"a4", severity:"WARNING" as const, title:"Persistent heavy rainfall", place:"East Khasi Hills • Meghalaya", time:"09:12", detail:"Saturation threshold exceeded at 4 stations." },
  { id:"a5", severity:"ADVISORY" as const, title:"Field verification requested", place:"Kohima–Mao • Nagaland", time:"08:50", detail:"Citizen reports of falling debris under review." }
];

export function calculateRisk(rainfall: number, saturation: number, seismic: number, slope = 48, deforestation = 58) {
  const rainFactor = Math.min(rainfall / 350, 1) * 100;
  const slopeFactor = Math.min(slope / 65, 1) * 100;
  const soilFactor = Math.min((saturation * 0.82) + (seismic * 0.18), 100);
  const score = Math.round(rainFactor * .4 + slopeFactor * .25 + soilFactor * .2 + deforestation * .15);
  const blockage = Math.min(98, Math.round(score * .88 + seismic * .12));
  return { score, blockage, level: score >= 80 ? "Severe" : score >= 60 ? "High" : score >= 40 ? "Moderate" : "Low" };
}
