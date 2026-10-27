"use client";
import { useState } from "react";
import { Activity, BellRing, ChartNoAxesCombined, ChevronLeft, Gauge, Map, Menu, Mountain, Radio, Settings, Siren, X } from "lucide-react";

const links=[
  {id:"command",label:"Command Center",icon:Map}, {id:"simulator",label:"Risk Simulator",icon:Gauge},
  {id:"infrastructure",label:"Infrastructure",icon:Mountain}, {id:"alerts",label:"Alert Center",icon:BellRing,badge:5},
  {id:"analytics",label:"Analytics",icon:ChartNoAxesCombined}
];
export default function Sidebar(){
  const [open,setOpen]=useState(false); const [active,setActive]=useState("command");
  const navigate=(id:string)=>{setActive(id);document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});setOpen(false)};
  return <>
    <button aria-label="Open navigation" onClick={()=>setOpen(true)} className="fixed left-4 top-4 z-[70] grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white shadow-md lg:hidden"><Menu size={20}/></button>
    {open?<button aria-label="Close navigation overlay" onClick={()=>setOpen(false)} className="fixed inset-0 z-[75] bg-slate-900/20 lg:hidden"/>:null}
    <aside className={`fixed inset-y-0 left-0 z-[80] flex w-[228px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${open?"translate-x-0":"-translate-x-full"}`}>
      <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><Mountain size={24}/><Radio size={13} className="absolute right-1 top-1"/></div>
        <div><div className="text-[17px] font-extrabold tracking-tight">SafeLand</div><div className="text-[10px] leading-3 text-slate-500">Safer North East<br/>Stronger Communities</div></div>
        <button aria-label="Close navigation" onClick={()=>setOpen(false)} className="ml-auto lg:hidden"><X size={18}/></button>
      </div>
      <nav aria-label="Primary" className="space-y-1 p-3">
        {links.map(({id,label,icon:Icon,badge})=><button key={id} onClick={()=>navigate(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition ${active===id?"bg-blue-50 text-blue-700":"text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
          <Icon size={19} strokeWidth={active===id?2.4:1.8}/><span>{label}</span>{badge?<span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] text-white">{badge}</span>:null}
        </button>)}
      </nav>
      <div className="mt-auto border-t border-slate-100 p-3">
        <div className="mb-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3"><div className="flex items-center gap-2 text-xs font-bold text-emerald-800"><Activity size={15}/>Sensor network</div><div className="mt-1 text-[11px] text-emerald-700">128 of 131 stations online</div></div>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"><Settings size={18}/>Settings</button>
      </div>
    </aside>
  </>
}
