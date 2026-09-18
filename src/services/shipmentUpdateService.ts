import { createClient } from "@supabase/supabase-js";
import { ShipmentMapper } from "./shipmentMapper";
import { resolveCoordinates } from "@/features/maps/utils/geocodingService";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

export class ShipmentUpdateService {
  public static async updateFullShipment(data: any) {
    const { id, shipmentId, packagePieces, milestoneDesc, reason, ...rest } = data;
    const targetId = id || shipmentId;
    if (!targetId) throw new Error("Missing shipment ID for update");

    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
      ...ShipmentMapper.toConsignmentColumns(rest),
    };

    if (rest.status) updatePayload.status = rest.status;
    if (rest.city || rest.currentCity) updatePayload.currentCity = rest.city || rest.currentCity;
    if (rest.lat !== undefined && !isNaN(rest.lat)) updatePayload.currentLat = parseFloat(rest.lat);
    if (rest.lng !== undefined && !isNaN(rest.lng)) updatePayload.currentLng = parseFloat(rest.lng);
    if (rest.origin) {
      updatePayload.originCity = rest.origin;
      updatePayload.originCountry = rest.origin;
      if (rest.originLat !== undefined && !isNaN(rest.originLat)) {
        updatePayload.originLat = parseFloat(rest.originLat);
        updatePayload.originLng = parseFloat(rest.originLng);
      } else {
        const g = resolveCoordinates(rest.origin);
        updatePayload.originLat = g.lat;
        updatePayload.originLng = g.lng;
      }
    }
    if (rest.destination) {
      updatePayload.destCity = rest.destination;
      updatePayload.destCountry = rest.destination;
      if (rest.destLat !== undefined && !isNaN(rest.destLat)) {
        updatePayload.destLat = parseFloat(rest.destLat);
        updatePayload.destLng = parseFloat(rest.destLng);
      } else {
        const g = resolveCoordinates(rest.destination);
        updatePayload.destLat = g.lat;
        updatePayload.destLng = g.lng;
      }
    }
    if (rest.expectedDelivery) updatePayload.estimatedDelivery = new Date(rest.expectedDelivery);

    const { data: updated, error } = await supabase
      .from("Shipment").update(updatePayload).eq("id", targetId).select().single();
    if (error) throw new Error(error.message);

    if (Array.isArray(packagePieces) && packagePieces.length > 0) {
      await supabase.from("PackagePiece").delete().eq("shipmentId", targetId);
      const pieces = packagePieces.map((p: any) => ({
        id: p.id?.startsWith("temp-") || !p.id ? `PC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : p.id,
        shipmentId: targetId, quantity: parseInt(p.quantity, 10) || 1,
        pieceType: p.pieceType || "Box", length: parseFloat(p.length) || 0,
        width: parseFloat(p.width) || 0, height: parseFloat(p.height) || 0, description: p.description || null,
      }));
      await supabase.from("PackagePiece").insert(pieces);
    }

    if (milestoneDesc) {
      await supabase.from("Milestone").insert({
        id: `MLS-${Date.now()}`, shipmentId: targetId, timestamp: new Date().toISOString(),
        location: rest.city || rest.currentCity || "Central Logistics Hub",
        status: rest.status || "in_transit", description: milestoneDesc,
      });
    }

    if (reason) {
      await supabase.from("AdminOverride").insert({
        shipmentId: targetId, field: "consignment_full_update",
        newValue: `Updated consignment fields: ${rest.status || "active"}`, reason,
      });
    }

    return updated;
  }
}
