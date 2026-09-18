"use client";

import { useRef, useMemo } from "react";
import { GeoLocation } from "@/types/tracking.types";
import { cn } from "@/lib/utils";
import { ShipmentMapData } from "../utils/renderShipmentRoute";
import { MapHeaderHUD } from "./MapHeaderHUD";
import { MapFooterHUD } from "./MapFooterHUD";
import { MapGestureToast } from "./MapGestureToast";
import { useRouteMap } from "../hooks/useRouteMap";
import { useCooperativeGestures } from "../hooks/useCooperativeGestures";

interface Props {
  shipments?: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onSelectTrackingNumber?: (trackingNumber: string) => void;
  origin?: GeoLocation;
  destination?: GeoLocation;
  currentLocation?: GeoLocation;
  trackingNumber?: string;
  milestones?: import("@/types/tracking.types").Milestone[];
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
  milestones,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedShipments: ShipmentMapData[] = useMemo(() => {
    if (shipments && shipments.length > 0) return shipments;
    if (origin && destination && currentLocation && trackingNumber) {
      return [{ id: trackingNumber, trackingNumber, origin, destination, currentLocation, milestones }];
    }
    return [];
  }, [shipments, origin, destination, currentLocation, trackingNumber, milestones]);

  const { mapRef, focusCurrent, zoomFullRoute } = useRouteMap({
    containerRef,
    shipments: resolvedShipments,
    selectedTrackingNumber,
    onSelect: onSelectTrackingNumber,
  });

  const { hint } = useCooperativeGestures({
    containerRef,
    mapRef,
  });

  return (
    <div
      className={cn(
        "relative w-full h-[500px] sm:h-[560px] md:h-[620px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-between",
        className
      )}
    >
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />
      <MapGestureToast message={hint} />
      <MapHeaderHUD
        shipments={resolvedShipments}
        selectedTrackingNumber={selectedTrackingNumber}
        onSelect={onSelectTrackingNumber}
      />
      <MapFooterHUD
        shipments={resolvedShipments}
        selectedTrackingNumber={selectedTrackingNumber}
        onFocusCurrent={focusCurrent}
        onZoomFullRoute={zoomFullRoute}
      />
    </div>
  );
}
