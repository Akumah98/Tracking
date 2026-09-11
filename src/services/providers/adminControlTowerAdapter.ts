import { ITrackingProviderAdapter, ProviderResponse } from "./types";
import { ShipmentRepository } from "@/services/shipmentRepository";
import { TrackingService } from "@/features/tracking/services/trackingService";

export class AdminControlTowerAdapter implements ITrackingProviderAdapter {
  public name = "admin_control_tower" as const;

  public isEnabled(): boolean {
    return true;
  }

  public async trackShipment(trackingNumber: string): Promise<ProviderResponse> {
    const start = Date.now();

    try {
      // 1. Check primary Supabase/PostgreSQL database
      const dbShipment = await ShipmentRepository.findByTrackingNumber(trackingNumber);
      if (dbShipment) {
        return {
          provider: "admin_control_tower",
          success: true,
          result: dbShipment,
          latencyMs: Date.now() - start,
        };
      }

      // 2. Fallback to seed manifest
      const seedShipment = TrackingService.getShipmentByTrackingNumber(trackingNumber);
      if (seedShipment) {
        return {
          provider: "admin_control_tower",
          success: true,
          result: seedShipment,
          latencyMs: Date.now() - start,
        };
      }

      return {
        provider: "admin_control_tower",
        success: false,
        result: null,
        latencyMs: Date.now() - start,
        errorMessage: "Consignment not registered in ITL Control Tower database.",
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Database lookup failed";
      return {
        provider: "admin_control_tower",
        success: false,
        result: null,
        latencyMs: Date.now() - start,
        errorMessage: msg,
      };
    }
  }
}
