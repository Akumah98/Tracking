"use client";

import { Crosshair, Maximize2 } from "lucide-react";

interface Props {
  lat: number;
  lng: number;
  city?: string;
  onFocusPin: () => void;
  onResetOverview: () => void;
}

export function AdminMapPickerHUD({
  lat, lng, city, onFocusPin, onResetOverview,
}: Props) {
  return (
    <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400 bg-neutral-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-neutral-800 shadow-lg">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-brand font-semibold">{city || "GPS Hub"}:</span>
          <span className="text-neutral-300">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={onFocusPin}
            className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Zoom in closely to GPS pin"
          >
            <Crosshair className="w-3.5 h-3.5 text-brand" />
            <span>Focus Pin</span>
          </button>

          <button
            type="button"
            onClick={onResetOverview}
            className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Zoom out to full region overview"
          >
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Full Overview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
