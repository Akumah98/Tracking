"use client";

import { useState, useEffect } from "react";
import { CarrierRegexService } from "../services/carrierRegexService";
import { CarrierDetectionResult } from "@/types/carrier.types";
import { APP_CONFIG } from "@/lib/constants";

export function useCarrierDetection(input: string, enabled = true) {
  const [result, setResult] = useState<CarrierDetectionResult>({
    carrier: null,
    confidence: 0,
    isValid: false,
  });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!enabled || !input.trim()) {
      setResult({ carrier: null, confidence: 0, isValid: false });
      return;
    }

    setIsChecking(true);
    const handler = setTimeout(() => {
      const detected = CarrierRegexService.detectCarrier(input);
      setResult(detected);
      setIsChecking(false);
    }, APP_CONFIG.debounceMs);

    return () => clearTimeout(handler);
  }, [input, enabled]);

  return { ...result, isChecking };
}
