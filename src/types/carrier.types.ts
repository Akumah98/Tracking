export interface Carrier {
  id: string;
  name: string;
  regex: string;
  logo: string;
  color: string;
}

export interface CarrierDetectionResult {
  carrier: Carrier | null;
  confidence: number;
  isValid: boolean;
}
