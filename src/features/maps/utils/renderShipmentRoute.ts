import L from "leaflet";
import { GeoLocation, Milestone } from "@/types/tracking.types";
import { generateCurvedArc } from "./arcInterpolator";
import { createOriginIcon, createDestIcon, createVectorIcon, createWaypointIcon } from "./mapIconFactory";
import { resolveCoordinates } from "./geocodingService";
import { RouteTheme } from "./multiRouteStyles";

export interface ShipmentMapData {
  id: string;
  trackingNumber: string;
  carrierId?: string;
  origin: GeoLocation;
  destination: GeoLocation;
  currentLocation: GeoLocation;
  status?: string;
  milestones?: Milestone[];
}

export function renderShipmentRoute(
  map: L.Map, shipment: ShipmentMapData, theme: RouteTheme,
  isSelected: boolean, onSelect?: (trackingNumber: string) => void
): [number, number][] {
  const origPt: [number, number] = [shipment.origin.lat, shipment.origin.lng];
  const currPt: [number, number] = [shipment.currentLocation.lat, shipment.currentLocation.lng];
  const destPt: [number, number] = [shipment.destination.lat, shipment.destination.lng];

  const waypoints: { pt: [number, number]; label: string; desc?: string }[] = [];
  if (shipment.milestones && shipment.milestones.length > 0) {
    const sorted = [...shipment.milestones].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    for (const m of sorted) {
      if (!m.location) continue;
      const g = resolveCoordinates(m.location);
      const isNearOrig = Math.hypot(g.lat - origPt[0], g.lng - origPt[1]) < 0.2;
      const isNearCurr = Math.hypot(g.lat - currPt[0], g.lng - currPt[1]) < 0.2;
      const isDup = waypoints.some((w) => Math.hypot(w.pt[0] - g.lat, w.pt[1] - g.lng) < 0.2);
      if (!isNearOrig && !isNearCurr && !isDup) {
        waypoints.push({ pt: [g.lat, g.lng], label: m.location, desc: m.description });
      }
    }
  }

  const stopPoints: [number, number][] = [origPt, ...waypoints.map((w) => w.pt), currPt];
  const traveledArc: [number, number][] = [];
  for (let i = 0; i < stopPoints.length - 1; i++) {
    traveledArc.push(...generateCurvedArc(stopPoints[i], stopPoints[i + 1], 25));
  }
  const remainingArc = generateCurvedArc(currPt, destPt, 35);

  const glowWeight = isSelected ? 10 : 6;
  const mainWeight = isSelected ? 4.5 : 3;
  const opacity = isSelected ? 1.0 : 0.75;

  L.polyline(traveledArc, { color: theme.primary, weight: glowWeight, opacity: 0.25, lineCap: "round" }).addTo(map);
  const travelLine = L.polyline(traveledArc, { color: theme.primary, weight: mainWeight, opacity, lineCap: "round" }).addTo(map);

  const remainLine = L.polyline(remainingArc, {
    color: theme.remaining, weight: isSelected ? 3 : 2, dashArray: "6, 10",
    opacity: isSelected ? 0.95 : 0.65, className: "animated-route-dash"
  }).addTo(map);

  if (onSelect) {
    travelLine.on("click", () => onSelect(shipment.trackingNumber));
    remainLine.on("click", () => onSelect(shipment.trackingNumber));
  }

  const origMarker = L.marker(origPt, { icon: createOriginIcon(shipment.origin.city, shipment.trackingNumber, theme.primary) }).addTo(map);
  const destMarker = L.marker(destPt, { icon: createDestIcon(shipment.destination.city, shipment.trackingNumber, theme.remaining) }).addTo(map);
  const currMarker = L.marker(currPt, { icon: createVectorIcon(shipment.currentLocation.city, shipment.trackingNumber, theme.primary, isSelected) }).addTo(map);

  waypoints.forEach((w) => {
    const marker = L.marker(w.pt, { icon: createWaypointIcon(w.label, w.label, theme.primary) }).addTo(map);
    if (w.desc) marker.bindPopup(`<div class="text-xs p-1"><b>${w.label}</b><br/>${w.desc}</div>`);
    if (onSelect) marker.on("click", () => onSelect(shipment.trackingNumber));
  });

  if (onSelect) {
    currMarker.on("click", () => onSelect(shipment.trackingNumber));
    origMarker.on("click", () => onSelect(shipment.trackingNumber));
    destMarker.on("click", () => onSelect(shipment.trackingNumber));
  }

  return [...traveledArc, ...remainingArc];
}

