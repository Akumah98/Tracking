import type { ConsignmentDetails } from "@/types/consignment.types";

export function mapContact(raw: any, prefix: string) {
  const n = (k: string) => raw[`${prefix}${k}`] || "";
  return {
    name: n("Name"),
    email: n("Email"),
    phone: n("Phone"),
    address: n("Address"),
    city: n("City"),
  };
}

export function mapConsignment(raw: any): ConsignmentDetails | undefined {
  if (!raw.shipperName && !raw.product) return undefined;
  return {
    shipper: mapContact(raw, "shipper"),
    receiver: mapContact(raw, "receiver"),
    origin: raw.originCountry || raw.originCity || "",
    destination: raw.destCountry || raw.destCity || "",
    carrier: raw.carrier || raw.carrierId || "",
    shipmentType: raw.shipmentType || "international",
    shipmentMode: raw.shipmentMode || "air_freight",
    carrierReferenceNumber: raw.carrierReferenceNumber || "",
    product: raw.product || "",
    contents: raw.contents || "",
    paymentMode: raw.paymentMode || "",
    freightCost: raw.freightCost || 0,
    expectedDelivery: raw.estimatedDelivery ? new Date(raw.estimatedDelivery).toISOString() : "",
    pickupDate: raw.pickupDate || "",
    pickupTime: raw.pickupTime || "",
    packagePieces: (raw.packagePieces || []).map((p: any) => ({
      id: p.id,
      quantity: p.quantity,
      pieceType: p.pieceType,
      length: p.length,
      width: p.width,
      height: p.height,
      description: p.description || "",
    })),
    totalActualWeight: raw.totalActualWeight || 0,
    totalVolumetricWeight: raw.totalVolumetricWeight || 0,
    totalVolume: raw.totalVolume || 0,
  };
}
