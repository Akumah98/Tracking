export type ExceptionSeverity = "high" | "medium" | "low";
export type ExceptionType = "customs_hold" | "update_lag" | "silent_edd_change" | "damage" | "lost";

export interface Exception {
  id: string;
  shipmentId: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  message: string;
  flaggedAt: string;
  lastUpdate: string;
  carrierId: string;
}

export interface KPIs {
  totalShipments: number;
  activeTransit: number;
  deliverySuccessRate: number;
  wismoReduction: number;
  avgEtaAccuracy: number;
  countriesCovered: number;
  globalHubs: number;
  onTimeRate: number;
}

export interface WISMODataPoint {
  month: string;
  tickets: number;
  reduced: number;
}

export interface CarrierPerformance {
  carrier: string;
  etaAccuracy: number;
  status: "above_sla" | "below_sla";
  shipments: number;
}

export interface FleetFilter {
  carrierId: string | null;
  region: string | null;
  status: string | null;
}

export interface OverridePayload {
  shipmentId: string;
  type: "location" | "parcel" | "status";
  data: Record<string, unknown>;
}
