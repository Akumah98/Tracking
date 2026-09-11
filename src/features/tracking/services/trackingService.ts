import data from "@/data/data.json";
import { Shipment, Milestone, TrackingResult } from "@/types/tracking.types";

export class TrackingService {
  private static shipments: Shipment[] = data.shipments as unknown as Shipment[];
  private static milestones: Milestone[] = data.milestones as unknown as Milestone[];

  public static getShipmentByTrackingNumber(trackingNumber: string): TrackingResult | null {
    const cleanNumber = trackingNumber.trim().toUpperCase();
    const shipment = this.shipments.find(
      (s) => s.trackingNumber.toUpperCase() === cleanNumber || s.id.toUpperCase() === cleanNumber
    );

    if (!shipment) return null;

    const matchedMilestones = this.milestones.filter((m) =>
      shipment.milestoneIds.includes(m.id)
    );

    return {
      shipment,
      milestones: matchedMilestones,
      carrierId: shipment.carrierId,
    };
  }

  public static getMultipleShipments(trackingNumbers: string[]): TrackingResult[] {
    return trackingNumbers
      .map((num) => this.getShipmentByTrackingNumber(num))
      .filter((res): res is TrackingResult => res !== null);
  }

  public static getAllShipments(): Shipment[] {
    return this.shipments;
  }
}
