"use client";

import { Radio } from "lucide-react";
import { ShipmentMapData } from "../utils/renderShipmentRoute";
import { getRouteTheme } from "../utils/multiRouteStyles";
import { cn } from "@/lib/utils";

interface Props {
  shipments: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onSelect?: (trackingNumber: string) => void;
}

export function MapHeaderHUD({ shipments, selectedTrackingNumber, onSelect }: Props) {
  return (
    <div className="relative z-10 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
      <div className="flex items-center gap-2 bg-neutral-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-neutral-800 text-xs text-white shadow-md pointer-events-auto">
        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span className="font-semibold">ITL Radar Vector</span>
        <span className="text-neutral-500">|</span>
        <span className="text-neutral-300 font-mono text-[11px]">{shipments.length} Active Routes</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pointer-events-auto">
        {shipments.map((s, idx) => {
          const theme = getRouteTheme(idx);
          const isSelected = selectedTrackingNumber === s.trackingNumber;
          return (
            <button
              key={s.id}
              onClick={() => onSelect?.(s.trackingNumber)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border shadow-sm cursor-pointer",
                isSelected
                  ? "bg-neutral-900 text-white border-white/40 ring-1 ring-white/30"
                  : "bg-neutral-950/80 text-neutral-400 border-neutral-800 hover:text-white"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", theme.dotClass)} />
              #{s.trackingNumber.slice(-6)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
