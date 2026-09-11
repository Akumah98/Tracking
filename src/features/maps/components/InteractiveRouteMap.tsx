"use client";

import dynamic from "next/dynamic";
import { GeoLocation } from "@/types/tracking.types";
import { ShipmentMapData } from "../utils/renderShipmentRoute";
import { MapLoadingSkeleton } from "./MapLoadingSkeleton";

const DynamicMap = dynamic(() => import("./InteractiveRouteMapInner"), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />,
});

export interface InteractiveRouteMapProps {
  shipments?: ShipmentMapData[];
  selectedTrackingNumber?: string;
  onSelectTrackingNumber?: (trackingNumber: string) => void;
  origin?: GeoLocation;
  destination?: GeoLocation;
  currentLocation?: GeoLocation;
  trackingNumber?: string;
  className?: string;
}

export function InteractiveRouteMap(props: InteractiveRouteMapProps) {
  return <DynamicMap {...props} />;
}
