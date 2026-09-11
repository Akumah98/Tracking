import { TrackingResult, ShipmentStatus, Milestone } from "@/types/tracking.types";

export class ShipmentMapper {
  public static toTrackingResult(raw: any): TrackingResult {
    const milestones: Milestone[] = (raw.milestones || []).map((m: any) => ({
      id: m.id,
      timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
      status: m.status as ShipmentStatus,
      location: m.location,
      description: m.description,
    }));

    return {
      shipment: {
        id: raw.id,
        trackingNumber: raw.trackingNumber,
        carrierId: raw.carrierId,
        status: raw.status as ShipmentStatus,
        origin: { city: raw.originCity, state: "", country: raw.originCountry, lat: raw.originLat, lng: raw.originLng },
        destination: { city: raw.destCity, state: "", country: raw.destCountry, lat: raw.destLat, lng: raw.destLng },
        currentLocation: {
          city: raw.currentCity,
          state: "",
          country: raw.currentCountry || raw.destCountry,
          lat: raw.currentLat,
          lng: raw.currentLng,
        },
        estimatedDelivery: raw.estimatedDelivery ? new Date(raw.estimatedDelivery).toISOString() : "",
        eddConfidence: raw.eddConfidence || 95,
        shippedAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
        weight: raw.weight || "N/A",
        dimensions: raw.dimensions || "N/A",
        sku: raw.sku || `SKU-${raw.trackingNumber.slice(-4)}`,
        milestoneIds: milestones.map((m) => m.id),
      },
      milestones,
      carrierId: raw.carrierId,
    };
  }

  public static toCreateInput(data: any) {
    return {
      id: data.id || `SHP-${Date.now()}`,
      trackingNumber: data.trackingNumber,
      carrierId: data.carrierId || "line_logistics",
      status: data.status || "order_placed",
      originCity: data.originCity,
      originCountry: data.originCountry || "Global",
      originLat: parseFloat(data.originLat) || 0,
      originLng: parseFloat(data.originLng) || 0,
      destCity: data.destCity,
      destCountry: data.destCountry || "Global",
      destLat: parseFloat(data.destLat) || 0,
      destLng: parseFloat(data.destLng) || 0,
      currentCity: data.currentCity || data.originCity,
      currentCountry: data.currentCountry || data.originCountry || "Global",
      currentLat: parseFloat(data.currentLat || data.originLat) || 0,
      currentLng: parseFloat(data.currentLng || data.originLng) || 0,
      estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
      weight: data.weight || "1.0kg",
      dimensions: data.dimensions || "20x15x10cm",
      sku: data.sku || `SKU-${data.trackingNumber.slice(-4)}`,
      sourceProvider: "admin_control_tower",
      milestones: {
        create: [{
          id: `MLS-${Date.now()}`,
          timestamp: new Date(),
          status: data.status || "order_placed",
          location: data.currentCity || data.originCity,
          description: "Consignment registered in Control Tower manifest",
        }],
      },
    };
  }
}
