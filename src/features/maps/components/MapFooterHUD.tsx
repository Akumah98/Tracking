"use client";

import { ShipmentMapData } from "../utils/renderShipmentRoute";

interface Props {
  shipments: ShipmentMapData[];
  selectedTrackingNumber?: string;
}

export function MapFooterHUD({ shipments, selectedTrackingNumber }: Props) {
  const focused = shipments.find(s => s.trackingNumber === selectedTrackingNumber) || shipments[0];

  return (
    <div className="relative z-10 p-3 sm:p-4 pointer-events-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400 bg-neutral-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-white font-semibold">{focused?.trackingNumber}:</span>
          <span>{focused?.origin.city} → {focused?.destination.city}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400 text-[11px]">
            GPS: {focused?.currentLocation.lat.toFixed(2)}, {focused?.currentLocation.lng.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-medium">All Multi-Modal Transit Lines Live</span>
        </div>
      </div>
    </div>
  );
}
