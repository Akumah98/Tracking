"use client";

import { AdminMapPicker } from "@/features/maps/components/AdminMapPicker";
import { Navigation } from "lucide-react";

interface Props {
  lat: number;
  lng: number;
  city: string;
  onCoordinateChange: (lat: number, lng: number) => void;
}

export function UpdatePackageMapPane({ lat, lng, city, onCoordinateChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <Navigation className="w-3.5 h-3.5 text-brand" />
          <span>Interactive GPS Target Pin</span>
        </div>
        <div className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg">
          Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
        </div>
      </div>

      <div className="w-full rounded-xl overflow-hidden border border-neutral-800">
        <AdminMapPicker
          lat={lat}
          lng={lng}
          onCoordinateChange={onCoordinateChange}
          className="w-full h-[460px] sm:h-[520px] lg:h-[580px]"
        />
      </div>

      <p className="text-[11px] text-neutral-400">
        Click anywhere on the map or drag the marker to pinpoint the exact package location for {city || "this checkpoint"}.
      </p>
    </div>
  );
}
