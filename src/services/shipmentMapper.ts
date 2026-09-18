import { TrackingResult, ShipmentStatus, Milestone } from "@/types/tracking.types";
import { mapConsignment } from "./consignmentMapper";
import { resolveCoordinates } from "@/features/maps/utils/geocodingService";

export class ShipmentMapper {
  public static toTrackingResult(raw: any): TrackingResult {
    const milestones: Milestone[] = (raw.milestones || []).map((m: any) => ({
      id: m.id, timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
      status: m.status as ShipmentStatus, location: m.location, description: m.description,
    }));

    const origGeo = (!raw.originLat && !raw.originLng) || (raw.originLat === 0 && raw.originLng === 0)
      ? resolveCoordinates(raw.originCity || raw.originCountry) : { lat: raw.originLat, lng: raw.originLng };
    const destGeo = (!raw.destLat && !raw.destLng) || (raw.destLat === 0 && raw.destLng === 0)
      ? resolveCoordinates(raw.destCity || raw.destCountry) : { lat: raw.destLat, lng: raw.destLng };
    const currGeo = (!raw.currentLat && !raw.currentLng) || (raw.currentLat === 0 && raw.currentLng === 0)
      ? origGeo : { lat: raw.currentLat, lng: raw.currentLng };

    return {
      shipment: {
        id: raw.id, trackingNumber: raw.trackingNumber, carrierId: raw.carrierId,
        status: raw.status as ShipmentStatus,
        origin: { city: raw.originCity, state: "", country: raw.originCountry, lat: origGeo.lat, lng: origGeo.lng },
        destination: { city: raw.destCity, state: "", country: raw.destCountry, lat: destGeo.lat, lng: destGeo.lng },
        currentLocation: { city: raw.currentCity, state: "", country: raw.currentCountry || raw.destCountry, lat: currGeo.lat, lng: currGeo.lng },
        estimatedDelivery: raw.estimatedDelivery ? new Date(raw.estimatedDelivery).toISOString() : "",
        eddConfidence: raw.eddConfidence || 95,
        shippedAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
        weight: raw.weight || "N/A", dimensions: raw.dimensions || "N/A", sku: raw.sku || `SKU-${raw.trackingNumber.slice(-4)}`,
        milestoneIds: milestones.map((m) => m.id), consignment: mapConsignment(raw),
      },
      milestones, carrierId: raw.carrierId,
    };
  }

  public static toCreateInput(data: any) {
    const origGeo = resolveCoordinates(data.origin || data.originCity || "Global");
    const destGeo = resolveCoordinates(data.destination || data.destCity || "Global");
    const origLat = parseFloat(data.originLat) || origGeo.lat;
    const origLng = parseFloat(data.originLng) || origGeo.lng;
    const destLat = parseFloat(data.destLat) || destGeo.lat;
    const destLng = parseFloat(data.destLng) || destGeo.lng;

    return {
      id: data.id || `SHP-${Date.now()}`, trackingNumber: data.trackingNumber,
      carrierId: data.carrierId || "line_logistics", status: data.status || "order_placed",
      originCity: data.origin || data.originCity, originCountry: data.origin || data.originCountry || "Global",
      originLat: origLat, originLng: origLng,
      destCity: data.destination || data.destCity, destCountry: data.destination || data.destCountry || "Global",
      destLat, destLng,
      currentCity: data.currentCity || data.origin || data.originCity,
      currentCountry: data.currentCountry || data.origin || data.originCountry || "Global",
      currentLat: parseFloat(data.currentLat) || origLat, currentLng: parseFloat(data.currentLng) || origLng,
      estimatedDelivery: data.expectedDelivery ? new Date(data.expectedDelivery) : null,
      weight: data.weight ? `${data.weight}kg` : "1.0kg", dimensions: data.dimensions || "20x15x10cm",
      sku: data.sku || `SKU-${data.trackingNumber.slice(-4)}`, sourceProvider: "admin_control_tower",
      ...this.toConsignmentColumns(data),
    };
  }

  public static toConsignmentColumns(data: any) {
    return {
      shipperName: data.shipper?.name ?? data.shipperName ?? null,
      shipperEmail: data.shipper?.email ?? data.shipperEmail ?? null,
      shipperPhone: data.shipper?.phone ?? data.shipperPhone ?? null,
      shipperAddress: data.shipper?.address ?? data.shipperAddress ?? null,
      shipperCity: data.shipper?.city ?? data.shipperCity ?? null,
      receiverName: data.receiver?.name ?? data.receiverName ?? null,
      receiverEmail: data.receiver?.email ?? data.receiverEmail ?? null,
      receiverPhone: data.receiver?.phone ?? data.receiverPhone ?? null,
      receiverAddress: data.receiver?.address ?? data.receiverAddress ?? null,
      receiverCity: data.receiver?.city ?? data.receiverCity ?? null,
      product: data.product ?? null, contents: data.contents ?? null, carrier: data.carrier ?? null,
      shipmentType: data.shipmentType ?? null, shipmentMode: data.shipmentMode ?? null,
      carrierReferenceNumber: data.carrierReferenceNumber ?? null, paymentMode: data.paymentMode ?? null,
      freightCost: data.freightCost ? parseFloat(data.freightCost) : null,
      totalActualWeight: data.totalActualWeight ?? null, totalVolumetricWeight: data.totalVolumetricWeight ?? null,
      totalVolume: data.totalVolume ?? null, pickupDate: data.pickupDate ?? null, pickupTime: data.pickupTime ?? null,
    };
  }
}
