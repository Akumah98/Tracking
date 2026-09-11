"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrackingResult } from "@/types/tracking.types";
import { getRouteTheme } from "@/features/maps/utils/multiRouteStyles";

interface Props {
  results: TrackingResult[];
  selectedIndex: number; // -1 = All Routes, 0..N-1 = specific consignment
  onSelect: (index: number) => void;
}

export function ConsignmentSegmentedControl({
  results,
  selectedIndex,
  onSelect,
}: Props) {
  if (results.length <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="inline-flex p-1 rounded-2xl bg-neutral-200/60 backdrop-blur-md border border-black/[0.04] overflow-x-auto max-w-full gap-1">
        <button
          onClick={() => onSelect(-1)}
          className={cn(
            "h-10 min-h-[40px] px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 active:scale-[0.97]",
            selectedIndex === -1
              ? "bg-white text-brand-dark shadow-xs ring-1 ring-black/5"
              : "text-neutral-600 hover:text-neutral-900"
          )}
        >
          <Globe className="w-3.5 h-3.5 text-brand" />
          <span>All Routes ({results.length})</span>
        </button>

        {results.map((res, i) => {
          const isActive = selectedIndex === i;
          const theme = getRouteTheme(i);
          return (
            <button
              key={res.shipment.id}
              onClick={() => onSelect(i)}
              className={cn(
                "h-10 min-h-[40px] px-3.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 active:scale-[0.97]",
                isActive
                  ? "bg-white text-brand-dark shadow-xs ring-1 ring-black/5"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", theme.dotClass)} />
              <span>#{res.shipment.trackingNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
