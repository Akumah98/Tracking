"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { getRouteTheme } from "../utils/multiRouteStyles";
import { renderShipmentRoute, ShipmentMapData } from "../utils/renderShipmentRoute";

interface UseRouteMapProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  shipments: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onSelect?: (trackingNumber: string) => void;
}

export function useRouteMap({
  containerRef,
  shipments,
  selectedTrackingNumber,
  onSelect,
}: UseRouteMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const targetBoundsRef = useRef<[number, number][]>([]);

  useEffect(() => {
    if (!containerRef.current || shipments.length === 0) return;
    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16 }
    ).addTo(map);

    const allPoints: [number, number][] = [];
    const selectedPoints: [number, number][] = [];

    shipments.forEach((s, idx) => {
      const theme = getRouteTheme(idx);
      const isSelected = selectedTrackingNumber === s.trackingNumber;
      const pts = renderShipmentRoute(map, s, theme, isSelected, onSelect);
      allPoints.push(...pts);
      if (isSelected) selectedPoints.push(...pts);
    });

    targetBoundsRef.current = selectedPoints.length > 0 ? selectedPoints : allPoints;

    const focused =
      shipments.find((s) => s.trackingNumber === selectedTrackingNumber) || shipments[0];

    if (targetBoundsRef.current.length > 0) {
      map.fitBounds(targetBoundsRef.current, { padding: [50, 50], maxZoom: 7 });
    } else if (focused?.currentLocation) {
      map.setView([focused.currentLocation.lat, focused.currentLocation.lng], 5);
    }

    const timer = setTimeout(() => map.invalidateSize(), 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapRef.current = null;
    };
  }, [containerRef, shipments, selectedTrackingNumber, onSelect]);

  const zoomFullRoute = () => {
    if (mapRef.current && targetBoundsRef.current.length > 0) {
      mapRef.current.fitBounds(targetBoundsRef.current, { padding: [55, 55] });
    }
  };

  const focusCurrent = () => {
    const focused =
      shipments.find((s) => s.trackingNumber === selectedTrackingNumber) || shipments[0];
    if (mapRef.current && focused?.currentLocation) {
      mapRef.current.flyTo([focused.currentLocation.lat, focused.currentLocation.lng], 14, {
        duration: 1.2,
      });
    }
  };

  return { mapRef, focusCurrent, zoomFullRoute };
}
