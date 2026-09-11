"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import { GeoLocation } from "@/types/tracking.types";
import { cn } from "@/lib/utils";
import { getRouteTheme } from "../utils/multiRouteStyles";
import { renderShipmentRoute, ShipmentMapData } from "../utils/renderShipmentRoute";
import { MapHeaderHUD } from "./MapHeaderHUD";
import { MapFooterHUD } from "./MapFooterHUD";

interface Props {
  shipments?: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onSelectTrackingNumber?: (trackingNumber: string) => void;
  origin?: GeoLocation;
  destination?: GeoLocation;
  currentLocation?: GeoLocation;
  trackingNumber?: string;
  className?: string;
}

export default function InteractiveRouteMapInner({
  shipments,
  selectedTrackingNumber,
  onSelectTrackingNumber,
  origin,
  destination,
  currentLocation,
  trackingNumber,
  className,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const resolvedShipments: ShipmentMapData[] = useMemo(() => {
    if (shipments && shipments.length > 0) return shipments;
    if (origin && destination && currentLocation && trackingNumber) {
      return [{ id: trackingNumber, trackingNumber, origin, destination, currentLocation }];
    }
    return [];
  }, [shipments, origin, destination, currentLocation, trackingNumber]);

  useEffect(() => {
    if (!mapContainerRef.current || resolvedShipments.length === 0) return;
    const map = L.map(mapContainerRef.current, { zoomControl: true, attributionControl: false });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16 }).addTo(map);

    const allPoints: [number, number][] = [];
    const selectedPoints: [number, number][] = [];

    resolvedShipments.forEach((s, idx) => {
      const theme = getRouteTheme(idx);
      const isSelected = selectedTrackingNumber === s.trackingNumber;
      const pts = renderShipmentRoute(map, s, theme, isSelected, onSelectTrackingNumber);
      allPoints.push(...pts);
      if (isSelected) selectedPoints.push(...pts);
    });

    const targetPoints = selectedPoints.length > 0 ? selectedPoints : allPoints;
    if (targetPoints.length > 0) {
      map.fitBounds(targetPoints, { padding: [55, 55] });
    }
    setTimeout(() => map.invalidateSize(), 200);

    return () => { map.remove(); };
  }, [resolvedShipments, selectedTrackingNumber, onSelectTrackingNumber]);

  return (
    <div className={cn("relative w-full h-[500px] sm:h-[560px] md:h-[620px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-between", className)}>
      <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />
      <MapHeaderHUD shipments={resolvedShipments} selectedTrackingNumber={selectedTrackingNumber} onSelect={onSelectTrackingNumber} />
      <MapFooterHUD shipments={resolvedShipments} selectedTrackingNumber={selectedTrackingNumber} />
    </div>
  );
}
