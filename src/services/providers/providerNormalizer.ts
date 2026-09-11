import { TrackingResult, ShipmentStatus, Milestone } from "@/types/tracking.types";

export class ProviderNormalizer {
  public static mapStatus(rawStatus: string): ShipmentStatus {
    const s = rawStatus.toLowerCase();
    if (s.includes("deliver") && !s.includes("out")) return "delivered";
    if (s.includes("out") || s.includes("courier")) return "out_for_delivery";
    if (s.includes("transit") || s.includes("departs") || s.includes("arrived")) return "in_transit";
    if (s.includes("pickup") || s.includes("collected")) return "picked_up";
    if (s.includes("exception") || s.includes("hold") || s.includes("delay")) return "exception";
    if (s.includes("prepar") || s.includes("label")) return "preparing";
    return "order_placed";
  }

  public static createNormalizedResult(params: {
    trackingNumber: string;
    carrierId: string;
    status: ShipmentStatus;
    originCity: string;
    destCity: string;
    currentCity: string;
    milestones: Milestone[];
    provider: string;
  }): TrackingResult {
    return {
      shipment: {
        id: `SHP-${params.trackingNumber.slice(-4)}`,
        trackingNumber: params.trackingNumber,
        carrierId: params.carrierId,
        status: params.status,
        origin: { city: params.originCity, state: "", country: "Global", lat: 37.7749, lng: -122.4194 },
        destination: { city: params.destCity, state: "", country: "Global", lat: 40.7128, lng: -74.006 },
        currentLocation: { city: params.currentCity, state: "", country: "Global", lat: 39.0, lng: -98.0 },
        estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
        eddConfidence: 95,
        shippedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        weight: "3.5kg",
        dimensions: "25x20x15cm",
        sku: `ORD-${params.trackingNumber.slice(-5)}`,
        milestoneIds: params.milestones.map((m) => m.id),
      },
      milestones: params.milestones,
      carrierId: params.carrierId,
    };
  }
}
