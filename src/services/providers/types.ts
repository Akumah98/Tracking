import { TrackingResult } from "@/types/tracking.types";

export type ProviderName = "admin_control_tower" | "local_cache";

export interface ProviderResponse {
  provider: ProviderName;
  success: boolean;
  result: TrackingResult | null;
  latencyMs: number;
  errorMessage?: string;
}

export interface ITrackingProviderAdapter {
  name: ProviderName;
  isEnabled(): boolean;
  trackShipment(trackingNumber: string): Promise<ProviderResponse>;
}
