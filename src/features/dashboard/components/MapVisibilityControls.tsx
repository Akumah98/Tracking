"use client";

import { Eye, EyeOff, CheckSquare, Square } from "lucide-react";
import { Shipment } from "@/types/tracking.types";
import { getRouteTheme } from "@/features/maps/utils/multiRouteStyles";
import { cn } from "@/lib/utils";

interface Props {
  shipments: Shipment[];
  visibleIds: Set<string>;
  onToggleVisibility: (id: string) => void;
  onToggleAll: (allVisible: boolean) => void;
}

export function MapVisibilityControls({
  shipments,
  visibleIds,
  onToggleVisibility,
  onToggleAll,
}: Props) {
  const allVisible = shipments.length > 0 && shipments.every((s) => visibleIds.has(s.id));
  const noneVisible = shipments.every((s) => !visibleIds.has(s.id));

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/80 p-3.5 shadow-xs space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <Eye className="w-3.5 h-3.5 text-brand" />
          <span>Package Map Visibility</span>
          <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
            {shipments.filter((s) => visibleIds.has(s.id)).length} of {shipments.length} shown
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onToggleAll(true)}
            disabled={allVisible}
            className="px-2.5 py-1 rounded-lg font-medium text-neutral-600 hover:text-brand hover:bg-neutral-100 disabled:opacity-40 transition-all cursor-pointer"
          >
            Show All
          </button>
          <span className="text-neutral-300">|</span>
          <button
            onClick={() => onToggleAll(false)}
            disabled={noneVisible}
            className="px-2.5 py-1 rounded-lg font-medium text-neutral-600 hover:text-rose-600 hover:bg-neutral-100 disabled:opacity-40 transition-all cursor-pointer"
          >
            Hide All
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {shipments.map((s, idx) => {
          const isVisible = visibleIds.has(s.id);
          const theme = getRouteTheme(idx);
          return (
            <button
              key={s.id}
              onClick={() => onToggleVisibility(s.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer active:scale-95",
                isVisible
                  ? "bg-neutral-900 text-white border-neutral-800 shadow-xs"
                  : "bg-neutral-100 text-neutral-400 border-neutral-200 opacity-60 hover:opacity-100"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", isVisible ? theme.dotClass : "bg-neutral-400")} />
              <span className="font-mono font-bold text-[11px]">#{s.trackingNumber}</span>
              <span className="text-[10px] text-neutral-400">({s.origin.city} → {s.destination.city})</span>
              {isVisible ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
