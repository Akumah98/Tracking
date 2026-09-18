import { Shipment } from "@/types/tracking.types";

export interface FieldDiff {
  label: string;
  category: "telematics" | "contacts" | "package" | "audit";
  oldVal: string;
  newVal: string;
}

export function computeConsignmentDiff(
  shipment: Shipment,
  formState: {
    status: string;
    city: string;
    lat: number;
    lng: number;
    description: string;
    reason: string;
    shipper: { name?: string; city?: string; address?: string };
    receiver: { name?: string; city?: string; address?: string };
    pkg: { product?: string; carrier?: string; weight?: string };
    piecesCount?: number;
  }
): FieldDiff[] {
  const diffs: FieldDiff[] = [];
  const c = shipment.consignment;

  if (shipment.status !== formState.status) {
    diffs.push({ label: "Status", category: "telematics", oldVal: shipment.status.replace("_", " "), newVal: formState.status.replace("_", " ") });
  }

  if (shipment.currentLocation.city !== formState.city) {
    diffs.push({ label: "Current Hub / City", category: "telematics", oldVal: shipment.currentLocation.city || "Unassigned", newVal: formState.city || "Unassigned" });
  }

  const oldCoords = `${shipment.currentLocation.lat.toFixed(4)}, ${shipment.currentLocation.lng.toFixed(4)}`;
  const newCoords = `${formState.lat.toFixed(4)}, ${formState.lng.toFixed(4)}`;
  if (oldCoords !== newCoords) {
    diffs.push({ label: "GPS Coordinates", category: "telematics", oldVal: oldCoords, newVal: newCoords });
  }

  if (formState.description.trim()) {
    diffs.push({ label: "Activity Telemetry Comment", category: "audit", oldVal: "Previous log entry", newVal: formState.description.trim() });
  }

  if (formState.reason.trim() && formState.reason !== "Admin update from Control Tower") {
    diffs.push({ label: "Internal Audit Reason", category: "audit", oldVal: "Standard update", newVal: formState.reason.trim() });
  }

  if (c?.receiver?.name !== formState.receiver.name) {
    diffs.push({ label: "Receiver Name", category: "contacts", oldVal: c?.receiver?.name || "-", newVal: formState.receiver.name || "-" });
  }

  if (c?.receiver?.city !== formState.receiver.city) {
    diffs.push({ label: "Receiver Destination City", category: "contacts", oldVal: c?.receiver?.city || "-", newVal: formState.receiver.city || "-" });
  }

  if (c?.product !== formState.pkg.product && formState.pkg.product) {
    diffs.push({ label: "Product Description", category: "package", oldVal: c?.product || "-", newVal: formState.pkg.product });
  }

  const origPiecesCount = c?.packagePieces?.length || 0;
  if (formState.piecesCount !== undefined && formState.piecesCount !== origPiecesCount) {
    diffs.push({ label: "Package Pieces Total", category: "package", oldVal: `${origPiecesCount} pcs`, newVal: `${formState.piecesCount} pcs` });
  }

  return diffs;
}
