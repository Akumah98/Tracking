import type { ConsignmentDetails } from "./consignment.types";
export type { ConsignmentDetails };

export type ShipmentStatus =
  | "picked_up"
  | "in_transit"
  | "on_hold"
  | "customs_hold"
  | "supporting_documents_needed"
  | "seized"
  | "returned"
  | "delivered"
  | "cancelled"
  | "order_placed"
  | "preparing"
  | "out_for_delivery"
  | "exception";

export interface GeoLocation {
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Milestone {
  id: string;
  timestamp: string;
  status: ShipmentStatus;
  location: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  carrierId: string;
  status: ShipmentStatus;
  origin: GeoLocation;
  destination: GeoLocation;
  currentLocation: GeoLocation;
  estimatedDelivery: string;
  eddConfidence: number;
  shippedAt: string;
  weight: string;
  dimensions: string;
  sku: string;
  milestoneIds: string[];
  milestones?: Milestone[];
  consignment?: ConsignmentDetails;
}

export interface TrackingSearchInput {
  trackingNumbers: string[];
  autoDetect: boolean;
}

export interface TrackingResult {
  shipment: Shipment;
  milestones: Milestone[];
  carrierId: string;
}
