export type HazardType = "landslide" | "flash_flood" | "slope_failure";
export type HazardStatus = "normal" | "watch" | "warning" | "evacuate";

export interface GeoPoint { type: "Point"; coordinates: [number, number]; }

export interface HazardZone {
  id: string;
  name: string;
  state: string;
  location: GeoPoint;
  hazardType: HazardType;
  riskScore: number;
  rainfall24h: number;
  slopeAngle: number;
  soilSaturation: number;
  status: HazardStatus;
  affectedRoads: string[];
  isolatedVillages: string[];
  populationAtRisk: number;
  eta: string;
}

export interface CommunityReport {
  reporterName: string;
  contact: string;
  location: GeoPoint;
  hazardType: string;
  description: string;
  verified: boolean;
  createdAt: Date;
}

export interface AlertDispatch {
  targetArea: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  recipients: ("Authorities" | "Citizens" | "Emergency Teams")[];
  timestamp: Date;
}

export interface RoadCorridor {
  id: string; corridor: string; route: string; state: string; probability: number;
  status: "Blocked" | "Vulnerable" | "Monitoring" | "Open"; villages: string[];
}

export interface CommunityWatch {
  village: string; district: string; population: number; reserves: number; helipad: string; status: "Critical" | "Watch" | "Ready";
}
