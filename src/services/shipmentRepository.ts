import { TrackingResult } from "@/types/tracking.types";
import { ShipmentQueries } from "./shipmentQueries";
import { ShipmentMutations } from "./shipmentMutations";
import { ShipmentUpdateService } from "./shipmentUpdateService";

export class ShipmentRepository {
  public static async findByTrackingNumber(num: string): Promise<TrackingResult | null> {
    return ShipmentQueries.findByTrackingNumber(num);
  }

  public static async getAllShipments(): Promise<TrackingResult[]> {
    return ShipmentQueries.getAllShipments();
  }

  public static async createShipment(data: any) {
    return ShipmentMutations.createShipment(data);
  }

  public static async updateFullShipment(data: any) {
    return ShipmentUpdateService.updateFullShipment(data);
  }

  public static async updateLocationAndStatus(params: {
    shipmentId: string;
    city?: string;
    lat?: number;
    lng?: number;
    status?: string;
  }) {
    return ShipmentMutations.updateLocationAndStatus(params);
  }

  public static async addMilestone(params: {
    shipmentId: string;
    location: string;
    status: string;
    description: string;
    lat?: number;
    lng?: number;
  }) {
    return ShipmentMutations.addMilestone(params);
  }

  public static async recordOverride(data: any) {
    return ShipmentMutations.recordOverride(data);
  }

  public static async deleteShipment(id: string) {
    return ShipmentMutations.deleteShipment(id);
  }
}
