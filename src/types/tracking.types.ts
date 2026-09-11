export type ShipmentStatus =
  | "order_placed"
  | "preparing"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "exception"
  | "returned";

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
