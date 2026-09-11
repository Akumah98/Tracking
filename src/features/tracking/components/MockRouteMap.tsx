import { GeoLocation } from "@/types/tracking.types";
import { MapPin, Navigation, Radio } from "lucide-react";

interface MockRouteMapProps {
  origin: GeoLocation;
  destination: GeoLocation;
  currentLocation: GeoLocation;
  trackingNumber: string;
}

export function MockRouteMap({
  origin,
  destination,
  currentLocation,
  trackingNumber,
}: MockRouteMapProps) {
  return (
    <div className="relative w-full h-[360px] md:h-full min-h-[380px] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-inner flex flex-col justify-between p-4 sm:p-6 text-white">
      {/* Map Grid Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-700/60 text-xs">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Live IoT Vector (project44)</span>
        </div>
        <div className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-700/60 text-xs font-mono text-neutral-300">
          #{trackingNumber}
        </div>
      </div>

      {/* Visual Route Vector */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
        <div className="w-full max-w-md relative flex items-center justify-between px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-dashed border-t-2 border-dashed border-neutral-600 z-0" />
          <div className="absolute left-8 right-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-brand z-0" />

          {/* Origin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-400 flex items-center justify-center text-xs">
              <MapPin className="w-4 h-4 text-neutral-300" />
            </div>
            <span className="text-[11px] font-medium text-neutral-300 mt-2">{origin.city}</span>
          </div>

          {/* Current position */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-white mt-1.5 bg-brand/80 px-2 py-0.5 rounded-md">
              {currentLocation.city}
            </span>
          </div>

          {/* Destination */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-600 flex items-center justify-center text-xs">
              <MapPin className="w-4 h-4 text-neutral-500" />
            </div>
            <span className="text-[11px] font-medium text-neutral-400 mt-2">{destination.city}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400 bg-black/60 backdrop-blur px-3.5 py-2 rounded-lg border border-neutral-700/60">
        <span>Lat/Lng: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}</span>
        <span>Sub-60min Telemetry Refresh</span>
      </div>
    </div>
  );
}
