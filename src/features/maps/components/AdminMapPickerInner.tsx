"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { createVectorIcon } from "../utils/mapIconFactory";
import { useCooperativeGestures } from "../hooks/useCooperativeGestures";
import { MapGestureToast } from "./MapGestureToast";
import { AdminMapPickerHUD } from "./AdminMapPickerHUD";
import { cn } from "@/lib/utils";

interface Props {
  lat: number;
  lng: number;
  city?: string;
  onCoordinateChange: (lat: number, lng: number) => void;
  className?: string;
}

export default function AdminMapPickerInner({
  lat, lng, city, onCoordinateChange, className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const { hint } = useCooperativeGestures({ containerRef, mapRef });

  useEffect(() => {
    if (!containerRef.current) return;
    const initialPos: [number, number] = [lat || 0, lng || 0];
    const initialZoom = lat && lng && (lat !== 0 || lng !== 0) ? 14 : 4;

    const map = L.map(containerRef.current, {
      center: initialPos,
      zoom: initialZoom,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    mapRef.current = map;

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16 }
    ).addTo(map);

    const marker = L.marker(initialPos, {
      draggable: true,
      icon: createVectorIcon("GPS Vector"),
    }).addTo(map);
    markerRef.current = marker;

    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      onCoordinateChange(pos.lat, pos.lng);
    });

    map.on("click", (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      onCoordinateChange(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (markerRef.current && lat !== undefined && lng !== undefined) {
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  const handleFocusPin = () => {
    if (mapRef.current) mapRef.current.flyTo([lat, lng], 14, { duration: 1.2 });
  };

  const handleResetOverview = () => {
    if (mapRef.current) mapRef.current.flyTo([lat, lng], 4, { duration: 1.2 });
  };

  return (
    <div className={cn("relative w-full h-[450px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl", className)}>
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />
      <MapGestureToast message={hint} />
      <AdminMapPickerHUD
        lat={lat} lng={lng} city={city}
        onFocusPin={handleFocusPin}
        onResetOverview={handleResetOverview}
      />
    </div>
  );
}
