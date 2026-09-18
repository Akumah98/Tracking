"use client";

import { Crosshair, Maximize2 } from "lucide-react";
import { ShipmentMapData } from "../utils/renderShipmentRoute";

interface Props {
  shipments: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onFocusCurrent?: () => void;
  onZoomFullRoute?: () => void;
}

export function MapFooterHUD({
  shipments,
  selectedTrackingNumber,
  onFocusCurrent,
  onZoomFullRoute,
}: Props) {
  const focused =
    shipments.find((s) => s.trackingNumber === selectedTrackingNumber) || shipments[0];

  return (
    <div className="relative z-10 p-3 sm:p-4 pointer-events-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400 bg-neutral-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-neutral-800 shadow-md">
        <div className="flex flex-wrap items-center gap-2 font-mono">
          <span className="text-white font-semibold">{focused?.trackingNumber}:</span>
          <span>{focused?.origin.city} → {focused?.destination.city}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400 text-[11px]">
            GPS: {focused?.currentLocation.lat.toFixed(2)}, {focused?.currentLocation.lng.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {onFocusCurrent && (
            <button
              onClick={onFocusCurrent}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
              title="Zoom in to current GPS position"
            >
              <Crosshair className="w-3.5 h-3.5 text-brand" />
              <span>Current Position</span>
            </button>
          )}

          {onZoomFullRoute && (
            <button
              onClick={onZoomFullRoute}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-[11px] font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
              title="Zoom out to view full journey route"
            >
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Full Journey</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
