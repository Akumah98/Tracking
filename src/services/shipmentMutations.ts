import { createClient } from "@supabase/supabase-js";
import { ShipmentMapper } from "./shipmentMapper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

export class ShipmentMutations {
  public static async createShipment(data: any) {
    const { packagePieces, ...rest } = data;
    const input = ShipmentMapper.toCreateInput(rest);
    const { data: res, error } = await supabase.from("Shipment").insert(input).select().single();
    if (error) throw new Error(error.message);

    await supabase.from("Milestone").insert({
      id: `MLS-${Date.now()}`,
      shipmentId: res.id,
      timestamp: new Date().toISOString(),
      status: input.status || "order_placed",
      location: input.currentCity || input.originCity,
      description: "Consignment registered in Control Tower manifest",
    });

    if (Array.isArray(packagePieces) && packagePieces.length > 0) {
      const pieces = packagePieces.map((p: any) => ({
        id: p.id || `PC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        shipmentId: res.id,
        quantity: p.quantity || 1,
        pieceType: p.pieceType || "Box",
        length: p.length || 0,
        width: p.width || 0,
        height: p.height || 0,
        description: p.description || null,
      }));
      await supabase.from("PackagePiece").insert(pieces);
    }
    return res;
  }

  public static async updateLocationAndStatus(params: {
    shipmentId: string; city?: string; lat?: number; lng?: number; status?: string;
  }) {
    const updateData: any = { updatedAt: new Date().toISOString() };
    if (params.city) updateData.currentCity = params.city;
    if (params.lat !== undefined && !isNaN(params.lat)) updateData.currentLat = params.lat;
    if (params.lng !== undefined && !isNaN(params.lng)) updateData.currentLng = params.lng;
    if (params.status) updateData.status = params.status;

    const { data, error } = await supabase
      .from("Shipment").update(updateData).eq("id", params.shipmentId).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  public static async addMilestone(params: {
    shipmentId: string; location: string; status: string; description: string; lat?: number; lng?: number;
  }) {
    if (params.lat !== undefined && params.lng !== undefined) {
      await this.updateLocationAndStatus({
        shipmentId: params.shipmentId, city: params.location, lat: params.lat, lng: params.lng, status: params.status,
      });
    }
    const { data, error } = await supabase.from("Milestone").insert({
      id: `MLS-${Date.now()}`, shipmentId: params.shipmentId, timestamp: new Date().toISOString(),
      location: params.location, status: params.status, description: params.description,
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  public static async recordOverride(data: any) {
    const { data: res, error } = await supabase.from("AdminOverride").insert(data).select().single();
    if (error) throw new Error(error.message);
    return res;
  }

  public static async deleteShipment(id: string) {
    const { error } = await supabase.from("Shipment").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
