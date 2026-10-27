"use client";
import { useState } from "react";
import { BellRing, ChevronRight, RadioTower, Send, ShieldAlert, TriangleAlert } from "lucide-react";
import { alertItems } from "@/data/hazards";

type Severity="ALL"|"CRITICAL"|"WARNING"|"ADVISORY";
export default function AlertFeed(){
 const [filter,setFilter]=useState<Severity>("ALL"); const [sent,setSent]=useState<string[]>([]);
 const shown=alertItems.filter(a=>filter==="ALL"||a.severity===filter);
 const dispatch=async(id:string)=>{const a=alertItems.find(x=>x.id===id)!;await fetch("/api/alerts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetArea:a.place,severity:a.severity==="WARNING"?"HIGH":a.severity,message:a.detail,recipients:["Authorities","Emergency Teams"],channels:["SMS","WhatsApp"]})});setSent(v=>[...v,id]);};
 return <section id="alerts" className="flex h-[560px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 p-4"><div className="flex items-center justify-between"><div><h2 className="text-sm font-extrabold text-slate-950">Live alerts</h2><p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-full bg-red-500"/>5 active across NER</p></div><BellRing size={20} className="text-blue-600"/></div>
   <div className="mt-3 flex gap-1 rounded-lg bg-slate-100 p-1">{(["ALL","CRITICAL","WARNING","ADVISORY"] as Severity[]).map(f=><button key={f} onClick={()=>setFilter(f)} className={`flex-1 rounded-md px-1 py-1.5 text-[9px] font-bold ${filter===f?"bg-white text-blue-700 shadow-sm":"text-slate-500 hover:text-slate-800"}`}>{f}</button>)}</div>
  </div>
  <div className="scrollbar-thin flex-1 overflow-y-auto">{shown.map(alert=>{const Icon=alert.severity==="ADVISORY"?RadioTower:alert.severity==="WARNING"?TriangleAlert:ShieldAlert;const critical=alert.severity==="CRITICAL";return <article key={alert.id} className="border-b border-slate-100 p-4 hover:bg-slate-50/70"><div className="flex items-start gap-3"><span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${critical?"bg-red-50 text-red-600":alert.severity==="WARNING"?"bg-amber-50 text-amber-600":"bg-blue-50 text-blue-600"}`}><Icon size={17}/></span><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className={`text-xs font-bold ${critical?"text-red-700":"text-slate-800"}`}>{alert.title}</h3><time className="shrink-0 text-[9px] text-slate-400">{alert.time}</time></div><p className="mt-1 text-[10px] font-semibold text-slate-600">{alert.place}</p><p className="mt-1 text-[10px] leading-4 text-slate-500">{alert.detail}</p><button disabled={sent.includes(alert.id)} onClick={()=>dispatch(alert.id)} className={`mt-2 flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] font-bold ${sent.includes(alert.id)?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-blue-200 text-blue-700 hover:bg-blue-50"}`}>{sent.includes(alert.id)?<>Dispatched<ChevronRight size={12}/></>:<>Dispatch<Send size={12}/></>}</button></div></div></article>})}</div>
 </section>
}
