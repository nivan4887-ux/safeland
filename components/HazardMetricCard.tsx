import type { LucideIcon } from "lucide-react";
type Props={label:string;value:string;detail:string;trend?:string;icon:LucideIcon;tone:"red"|"blue"|"amber"|"emerald"};
const tones={red:"border-l-red-500 bg-red-50 text-red-600",blue:"border-l-blue-500 bg-blue-50 text-blue-600",amber:"border-l-amber-500 bg-amber-50 text-amber-600",emerald:"border-l-emerald-500 bg-emerald-50 text-emerald-600"};
export default function HazardMetricCard({label,value,detail,trend,icon:Icon,tone}:Props){return <article className="flex min-h-[112px] items-start gap-3 rounded-xl border border-slate-200 border-l-[3px] bg-white p-4 shadow-sm">
  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon size={21}/></span>
  <div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p><div className="mt-1 flex items-end gap-2"><strong className="text-2xl font-extrabold tracking-tight text-slate-950">{value}</strong>{trend?<span className={`mb-1 text-[11px] font-bold ${tone==="red"?"text-red-600":"text-emerald-600"}`}>{trend}</span>:null}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{detail}</p></div>
</article>}
