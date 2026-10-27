import { ArrowRight, TriangleAlert } from "lucide-react";
export default function AlertTicker(){return <div className="no-print flex min-h-11 items-center overflow-hidden rounded-xl border border-red-200 bg-red-50 text-red-800 shadow-sm">
  <div className="flex self-stretch items-center gap-2 bg-red-600 px-4 text-xs font-extrabold tracking-wide text-white"><TriangleAlert size={18}/>CRITICAL</div>
  <p className="min-w-0 flex-1 truncate px-4 text-xs font-medium sm:text-[13px]"><b>Teesta Valley, Sikkim:</b> Failure threshold exceeded after 248 mm rainfall. Evacuation window estimated at 2–4 hours.</p>
  <button className="hidden items-center gap-2 px-4 text-xs font-bold sm:flex">View details<ArrowRight size={15}/></button>
</div>}
