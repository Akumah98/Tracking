import { createClient } from "@supabase/supabase-js";
import { TrackingResult } from "@/types/tracking.types";
import { ShipmentMapper } from "./shipmentMapper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-key"
);

const SELECT_ALL = "*, milestones:Milestone(*), packagePieces:PackagePiece(*)";

export class ShipmentQueries {
  public static async findByTrackingNumber(num: string): Promise<TrackingResult | null> {
    try {
      const { data, error } = await supabase
        .from("Shipment")
        .select(SELECT_ALL)
        .eq("trackingNumber", num)
        .maybeSingle();

      if (data && !error) return ShipmentMapper.toTrackingResult(data);
    } catch {
      // Graceful fallback
    }
    return null;
  }

  public static async getAllShipments(): Promise<TrackingResult[]> {
    try {
      const { data, error } = await supabase
        .from("Shipment")
        .select(SELECT_ALL)
        .order("createdAt", { ascending: false });

      if (data && !error) return data.map(ShipmentMapper.toTrackingResult);
    } catch {
      // Fallback
    }
    return [];
  }
}
