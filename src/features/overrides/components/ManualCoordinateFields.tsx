"use client";

import { Compass, MapPin } from "lucide-react";

interface Props {
  lat: number;
  lng: number;
  onCoordinateChange: (lat: number, lng: number) => void;
  onCityChange?: (city: string) => void;
}

const PRESET_HUBS = [
  { name: "Tokyo HND", city: "Tokyo", lat: 35.5494, lng: 139.7798 },
  { name: "Los Angeles LAX", city: "Los Angeles", lat: 33.9416, lng: -118.4085 },
  { name: "Frankfurt FRA", city: "Frankfurt", lat: 50.0379, lng: 8.5622 },
  { name: "Paris CDG", city: "Paris", lat: 49.0097, lng: 2.5479 },
  { name: "New York JFK", city: "New York", lat: 40.6413, lng: -73.7781 },
  { name: "Rotterdam Port", city: "Rotterdam", lat: 51.9244, lng: 4.4777 },
];

export function ManualCoordinateFields({
  lat,
  lng,
  onCoordinateChange,
  onCityChange,
}: Props) {
  const handlePresetSelect = (hub: typeof PRESET_HUBS[0]) => {
    onCoordinateChange(hub.lat, hub.lng);
    onCityChange?.(hub.city);
  };

  return (
    <div className="space-y-2.5 pt-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-brand" />
          <span>Manual GPS Coordinates (Inputs)</span>
        </label>
        <span className="text-[10px] text-neutral-400 font-mono">2-way synced</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-neutral-500">Latitude</span>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => onCoordinateChange(parseFloat(e.target.value) || 0, lng)}
            placeholder="e.g. 50.0379"
            className="w-full text-xs font-mono rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-neutral-500">Longitude</span>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => onCoordinateChange(lat, parseFloat(e.target.value) || 0)}
            placeholder="e.g. 8.5622"
            className="w-full text-xs font-mono rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1 pt-1">
        <span className="text-[11px] text-neutral-400 font-medium">Quick Hub Presets:</span>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_HUBS.map((hub) => (
            <button
              key={hub.name}
              type="button"
              onClick={() => handlePresetSelect(hub)}
              className="px-2 py-1 rounded-lg text-[10px] font-mono bg-neutral-100 hover:bg-brand/10 hover:text-brand border border-neutral-200/60 transition-colors cursor-pointer flex items-center gap-1"
            >
              <MapPin className="w-2.5 h-2.5" />
              {hub.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
