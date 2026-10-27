"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CloudLightning, Gauge, MapPinned, Mountain, Plus, Route, Siren, Users } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AlertTicker from "@/components/AlertTicker";
import HazardMetricCard from "@/components/HazardMetricCard";
import AlertFeed from "@/components/AlertFeed";
import SimulatorModal from "@/components/SimulatorModal";
import CitizenReportModal from "@/components/CitizenReportModal";
import InfrastructurePanel from "@/components/InfrastructurePanel";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import AlertCenter from "@/components/AlertCenter";

const RiskMap=dynamic(()=>import("@/components/RiskMap"),{ssr:false,loading:()=> <div className="grid h-[560px] place-items-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500">Loading geospatial intelligence…</div>});

export default function Dashboard(){
 const [simulator,setSimulator]=useState(false);const [report,setReport]=useState(false);
 return <div className="min-h-screen bg-slate-50"><Sidebar/><div className="lg:pl-[228px]"><Header/><main className="mx-auto max-w-[1700px] space-y-4 p-4 lg:p-6" id="command">
  <AlertTicker/>
  <section aria-label="Live telemetry" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
   <HazardMetricCard label="High-risk zones" value="47" trend="↑ 8" detail="6 require immediate field verification" icon={Mountain} tone="red"/>
   <HazardMetricCard label="Population at risk" value="2.34L" trend="↑ 28%" detail="18 villages face potential isolation" icon={Users} tone="blue"/>
   <HazardMetricCard label="Vulnerable roads" value="112 km" trend="↑ 18 km" detail="NH-10 and NH-29 at severe risk" icon={Route} tone="amber"/>
   <HazardMetricCard label="IMD warning" value="Red" detail="Heavy to very heavy rainfall expected" icon={CloudLightning} tone="red"/>
  </section>
  <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
   <div><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-sm font-extrabold">Real-time multi-hazard map</h2><p className="mt-0.5 text-[11px] text-slate-500">Sensor fusion, terrain susceptibility and corridor exposure across 8 NER states</p></div><div className="no-print flex gap-2"><button onClick={()=>setReport(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 shadow-sm hover:bg-slate-50"><Plus size={14}/>Field report</button><button onClick={()=>setSimulator(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-bold text-white shadow-sm hover:bg-blue-700"><Gauge size={14}/>Run simulation</button></div></div><RiskMap/></div>
   <AlertFeed/>
  </section>
  <section id="simulator" className="scroll-mt-24 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="grid items-center gap-6 p-5 md:grid-cols-[1fr_auto]"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Gauge size={24}/></span><div><h2 className="text-base font-extrabold">Predictive multi-hazard simulator</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">Stress-test rainfall, slope saturation and seismic disturbance. SafeLand combines rainfall (40%), terrain (25%), soil/shear strength (20%) and land-use disturbance (15%) into an explainable risk score.</p></div></div><button onClick={()=>setSimulator(true)} className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800"><MapPinned size={16}/>Open simulator</button></div></section>
  <InfrastructurePanel/>
  <AlertCenter/>
  <AnalyticsPanel/>
  <footer className="flex flex-wrap items-center justify-between gap-3 py-3 text-[10px] text-slate-400"><p>SafeLand • Decision-support prototype for NER disaster management</p><p>Last telemetry sync: 27 Oct 2026, 10:22:41 IST</p></footer>
 </main></div><SimulatorModal open={simulator} onClose={()=>setSimulator(false)}/><CitizenReportModal open={report} onClose={()=>setReport(false)}/></div>
}
