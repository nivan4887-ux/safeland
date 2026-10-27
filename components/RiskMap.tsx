"use client";
import { useMemo, useState } from "react";
import L from "leaflet";
import { Circle, GeoJSON, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import { Check, Layers3, LocateFixed, MapPin, Route, X } from "lucide-react";
import { hazards } from "@/data/hazards";
import type { HazardZone } from "@/types";

const nerOutline:any={type:"FeatureCollection",features:[
 {type:"Feature",properties:{name:"Sikkim"},geometry:{type:"Polygon",coordinates:[[[88.0,27.0],[88.2,27.85],[88.9,27.5],[88.8,26.8],[88.0,27.0]]]}},
 {type:"Feature",properties:{name:"Assam"},geometry:{type:"Polygon",coordinates:[[[89.7,26.0],[91.0,27.1],[93.0,27.8],[95.3,27.4],[96.1,26.4],[94.2,25.4],[92.0,26.0],[90.4,25.5],[89.7,26.0]]]}},
 {type:"Feature",properties:{name:"Meghalaya"},geometry:{type:"Polygon",coordinates:[[[89.8,25.2],[91.0,26.1],[92.7,25.8],[92.4,25.0],[90.0,25.0],[89.8,25.2]]]}},
 {type:"Feature",properties:{name:"Nagaland"},geometry:{type:"Polygon",coordinates:[[[93.3,26.7],[94.3,27.1],[95.1,26.2],[94.5,25.2],[93.7,25.4],[93.3,26.7]]]}},
 {type:"Feature",properties:{name:"Manipur"},geometry:{type:"Polygon",coordinates:[[[93.0,25.7],[94.4,25.4],[94.8,24.1],[94.0,23.8],[93.0,24.4],[93.0,25.7]]]}},
 {type:"Feature",properties:{name:"Mizoram"},geometry:{type:"Polygon",coordinates:[[[92.2,24.5],[93.2,24.4],[93.4,22.3],[92.5,22.1],[92.2,24.5]]]}},
 {type:"Feature",properties:{name:"Tripura"},geometry:{type:"Polygon",coordinates:[[[91.1,24.6],[92.3,24.3],[92.4,22.9],[91.3,23.0],[91.1,24.6]]]}},
 {type:"Feature",properties:{name:"Arunachal Pradesh"},geometry:{type:"Polygon",coordinates:[[[91.5,27.3],[93.0,29.0],[96.2,29.3],[97.4,28.0],[96.0,26.8],[93.8,27.4],[91.5,27.3]]]}}
]};
const roadsLatLng:[[number,number],[number,number]][]=[[[26.73,88.40],[27.33,88.61]],[[25.57,91.88],[26.14,91.73]],[[25.91,93.72],[25.67,94.11]],[[24.83,92.80],[23.73,92.72]]];
const layerOptions=["Landslide susceptibility","Flash flood zones","Slope displacement","Critical NH corridors","Isolated villages"];
function Recenter({zone}:{zone:HazardZone}){const map=useMap();return <button aria-label="Center selected hazard" onClick={()=>map.flyTo([zone.location.coordinates[1],zone.location.coordinates[0]],9)} className="absolute bottom-4 left-4 z-[500] grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-md"><LocateFixed size={17}/></button>}
const color=(risk:number)=>risk>=80?"#dc2626":risk>=40?"#d97706":"#059669";

export default function RiskMap(){
 const [selected,setSelected]=useState(hazards[0]); const [layers,setLayers]=useState(new Set(layerOptions)); const [open,setOpen]=useState(true);
 const icons=useMemo(()=>new Map(hazards.map(h=>[h.id,L.divIcon({className:"hazard-marker",html:`<div class="hazard-pin" style="background:${color(h.riskScore)}"><span>${h.riskScore}</span></div>`,iconSize:[30,30],iconAnchor:[15,28]})])),[]);
 const toggle=(layer:string)=>setLayers(prev=>{const next=new Set(prev);next.has(layer)?next.delete(layer):next.add(layer);return next});
 return <div className="relative h-[560px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
  <MapContainer center={[26.2006,92.9376]} zoom={6} minZoom={5} maxZoom={12} scrollWheelZoom className="z-0">
   <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
   <GeoJSON data={nerOutline} style={{color:"#64748b",weight:1.2,fillColor:"#dbeafe",fillOpacity:.08,dashArray:"3 4"}} onEachFeature={(f,l)=>l.bindTooltip(f.properties.name,{sticky:true})}/>
   {layers.has("Flash flood zones")?hazards.filter(h=>h.hazardType==="flash_flood").map(h=><Circle key={`f${h.id}`} center={[h.location.coordinates[1],h.location.coordinates[0]]} radius={32000} pathOptions={{color:"#2563eb",fillColor:"#60a5fa",fillOpacity:.14,weight:1}}/>):null}
   {layers.has("Landslide susceptibility")?hazards.filter(h=>h.hazardType==="landslide").map(h=><Circle key={`l${h.id}`} center={[h.location.coordinates[1],h.location.coordinates[0]]} radius={24000} pathOptions={{color:color(h.riskScore),fillColor:color(h.riskScore),fillOpacity:.14,weight:1}}/>):null}
   {layers.has("Critical NH corridors")?roadsLatLng.map((line,i)=><Polyline key={i} positions={line} pathOptions={{color:i===0?"#dc2626":"#2563eb",weight:4,opacity:.75}}/>):null}
   {hazards.map(h=><Marker key={h.id} position={[h.location.coordinates[1],h.location.coordinates[0]]} icon={icons.get(h.id)!} eventHandlers={{click:()=>setSelected(h)}}><Tooltip direction="top" offset={[0,-22]}><b>{h.name}</b><br/>{h.riskScore}% risk</Tooltip></Marker>)}
   <Recenter zone={selected}/>
  </MapContainer>
  <button onClick={()=>setOpen(v=>!v)} className="absolute right-3 top-3 z-[500] flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-md"><Layers3 size={16}/>Layers</button>
  {open?<div className="absolute right-3 top-14 z-[500] w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-panel">
   <div className="mb-2 flex items-center justify-between"><b className="text-xs">Map layers</b><button aria-label="Close layers" onClick={()=>setOpen(false)}><X size={15}/></button></div>
   <div className="space-y-1">{layerOptions.map(l=><label key={l} className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1.5 text-[11px] text-slate-600 hover:bg-slate-50"><input type="checkbox" className="sr-only" checked={layers.has(l)} onChange={()=>toggle(l)}/><span className={`grid h-4 w-4 place-items-center rounded border ${layers.has(l)?"border-blue-600 bg-blue-600 text-white":"border-slate-300"}`}>{layers.has(l)?<Check size={11}/>:null}</span>{l}</label>)}</div>
  </div>:null}
  <div className="absolute bottom-4 right-3 z-[500] w-[min(340px,calc(100%-24px))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-panel">
   <div className="border-b border-slate-100 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-red-600">{selected.status} • {selected.hazardType.replace("_"," ")}</p><h3 className="mt-1 text-sm font-extrabold text-slate-950">{selected.name}</h3></div><span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-extrabold text-red-700">{selected.riskScore}% RISK</span></div></div>
   <dl className="grid grid-cols-2 gap-x-4 gap-y-2 p-3 text-[11px]"><div><dt className="text-slate-500">Rainfall / 24h</dt><dd className="font-bold">{selected.rainfall24h} mm</dd></div><div><dt className="text-slate-500">Soil saturation</dt><dd className="font-bold">{selected.soilSaturation}%</dd></div><div><dt className="text-slate-500">Slope angle</dt><dd className="font-bold">{selected.slopeAngle}°</dd></div><div><dt className="text-slate-500">Est. time to failure</dt><dd className="font-bold text-red-600">{selected.eta}</dd></div></dl>
   <div className="flex gap-2 border-t border-slate-100 p-3"><button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"><Route size={14}/>View corridor</button><button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-600"><MapPin size={15}/></button></div>
  </div>
 </div>
}
