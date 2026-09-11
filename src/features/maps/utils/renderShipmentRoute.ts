import L from "leaflet";
import { GeoLocation } from "@/types/tracking.types";
import { generateCurvedArc } from "./arcInterpolator";
import { createOriginIcon, createDestIcon, createVectorIcon } from "./mapIconFactory";
import { RouteTheme } from "./multiRouteStyles";

export interface ShipmentMapData {
  id: string;
  trackingNumber: string;
  carrierId?: string;
  origin: GeoLocation;
  destination: GeoLocation;
  currentLocation: GeoLocation;
  status?: string;
}

export function renderShipmentRoute(
  map: L.Map,
  shipment: ShipmentMapData,
  theme: RouteTheme,
  isSelected: boolean,
  onSelect?: (trackingNumber: string) => void
): [number, number][] {
  const origPt: [number, number] = [shipment.origin.lat, shipment.origin.lng];
  const currPt: [number, number] = [shipment.currentLocation.lat, shipment.currentLocation.lng];
  const destPt: [number, number] = [shipment.destination.lat, shipment.destination.lng];

  const traveledArc = generateCurvedArc(origPt, currPt, 35);
  const remainingArc = generateCurvedArc(currPt, destPt, 35);

  const glowWeight = isSelected ? 10 : 6;
  const mainWeight = isSelected ? 4.5 : 3;
  const opacity = isSelected ? 1.0 : 0.75;

  // Outer glow & main polyline
  L.polyline(traveledArc, { color: theme.primary, weight: glowWeight, opacity: 0.25, lineCap: "round" }).addTo(map);
  const travelLine = L.polyline(traveledArc, { color: theme.primary, weight: mainWeight, opacity, lineCap: "round" }).addTo(map);

  // Remaining dashed line
  const remainLine = L.polyline(remainingArc, {
    color: theme.remaining,
    weight: isSelected ? 3 : 2,
    dashArray: "6, 10",
    opacity: isSelected ? 0.95 : 0.65,
    className: "animated-route-dash"
  }).addTo(map);

  // Interactive selection on click
  if (onSelect) {
    travelLine.on("click", () => onSelect(shipment.trackingNumber));
    remainLine.on("click", () => onSelect(shipment.trackingNumber));
  }

  // Markers
  const origMarker = L.marker(origPt, { icon: createOriginIcon(shipment.origin.city, shipment.trackingNumber, theme.primary) }).addTo(map);
  const destMarker = L.marker(destPt, { icon: createDestIcon(shipment.destination.city, shipment.trackingNumber, theme.remaining) }).addTo(map);
  const currMarker = L.marker(currPt, { icon: createVectorIcon(shipment.currentLocation.city, shipment.trackingNumber, theme.primary, isSelected) }).addTo(map);

  if (onSelect) {
    currMarker.on("click", () => onSelect(shipment.trackingNumber));
    origMarker.on("click", () => onSelect(shipment.trackingNumber));
    destMarker.on("click", () => onSelect(shipment.trackingNumber));
  }

  return [...traveledArc, ...remainingArc];
}
