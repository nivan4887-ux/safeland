"use client";
import { Bell, CalendarDays, ChevronDown, CloudSun, UserRound } from "lucide-react";
export default function Header(){return <header className="sticky top-0 z-50 h-[76px] border-b border-slate-200 bg-white/95 backdrop-blur">
  <div className="flex h-full items-center justify-between px-5 pl-16 lg:px-7">
    <div><h1 className="text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">North Eastern Region Command Center</h1><p className="hidden text-xs text-slate-500 sm:block">Multi-hazard intelligence for coordinated, early action</p></div>
    <div className="flex items-center gap-3 sm:gap-5">
      <div className="hidden items-center gap-2 border-r border-slate-200 pr-5 md:flex"><span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"/></span><div><div className="text-xs font-bold text-emerald-700">System live</div><div className="text-[10px] text-slate-500">All services nominal</div></div></div>
      <div className="hidden items-center gap-2 text-slate-600 sm:flex"><CalendarDays size={17}/><div className="text-[11px] leading-4"><div className="font-semibold text-slate-700">27 Oct 2026</div><div>10:24 AM IST</div></div></div>
      <button aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell size={19}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-white bg-red-600"/></button>
      <button className="flex items-center gap-2 rounded-xl border-l border-slate-200 pl-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600"><UserRound size={18}/></span><span className="hidden text-left text-xs lg:block"><b className="block text-slate-800">R. Sharma</b><span className="text-slate-500">District Admin</span></span><ChevronDown size={14} className="hidden lg:block"/></button>
    </div>
  </div>
</header>}
