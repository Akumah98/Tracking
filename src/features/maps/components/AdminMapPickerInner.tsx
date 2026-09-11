"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { createVectorIcon } from "../utils/mapIconFactory";
import { cn } from "@/lib/utils";

interface Props {
  lat: number;
  lng: number;
  onCoordinateChange: (lat: number, lng: number) => void;
  className?: string;
}

export default function AdminMapPickerInner({
  lat,
  lng,
  onCoordinateChange,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const initialPos: [number, number] = [lat || 0, lng || 0];
    const map = L.map(containerRef.current, {
      center: initialPos,
      zoom: 4,
      zoomControl: true,
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
      mapRef.current?.panTo([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={cn("relative w-full h-[450px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl", className)}>
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />
      <div className="absolute top-3 left-3 z-10 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-brand border border-brand/40 shadow-md pointer-events-none">
        Click or drag vector pin anywhere on map
      </div>
    </div>
  );
}
