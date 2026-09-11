import { ITrackingProviderAdapter, ProviderResponse } from "./types";
import { AdminControlTowerAdapter } from "./adminControlTowerAdapter";

export class ProviderOrchestrator {
  private static adapter: ITrackingProviderAdapter = new AdminControlTowerAdapter();

  public static async trackWithFallback(
    trackingNumber: string
  ): Promise<{ response: ProviderResponse; attemptHistory: string[] }> {
    const attemptHistory: string[] = [
      "Accessing Supabase / PostgreSQL Admin Control Tower Database...",
    ];

    const res = await this.adapter.trackShipment(trackingNumber);

    if (res.success && res.result) {
      attemptHistory.push(`Authoritative record verified (${res.latencyMs}ms)`);
      return { response: res, attemptHistory };
    }

    attemptHistory.push(res.errorMessage || "Waybill not found in Control Tower");

    return {
      response: res,
      attemptHistory,
    };
  }
}
