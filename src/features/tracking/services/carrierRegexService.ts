import data from "@/data/data.json";
import { Carrier, CarrierDetectionResult } from "@/types/carrier.types";

export class CarrierRegexService {
  private static carriers: Carrier[] = data.carriers;

  public static detectCarrier(query: string): CarrierDetectionResult {
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) {
      return { carrier: null, confidence: 0, isValid: false };
    }

    for (const carrier of this.carriers) {
      const regex = new RegExp(carrier.regex);
      if (regex.test(trimmed)) {
        return {
          carrier,
          confidence: 0.95,
          isValid: true,
        };
      }
    }

    const genericAlphaNumeric = /^[A-Z0-9]{8,35}$/;
    const isValidFormat = genericAlphaNumeric.test(trimmed);

    return {
      carrier: null,
      confidence: isValidFormat ? 0.4 : 0,
      isValid: isValidFormat,
    };
  }

  public static getCarriers(): Carrier[] {
    return this.carriers;
  }
}
