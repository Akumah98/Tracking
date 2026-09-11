"use client";

import { useState, useEffect, useCallback } from "react";
import { TrackingResult } from "@/types/tracking.types";

interface TelemetryLog {
  trackingNumber: string;
  attempts: string[];
  provider: string;
}

export function useLiveTracking(numbersString: string) {
  const [results, setResults] = useState<TrackingResult[]>([]);
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveTelemetry = useCallback(async () => {
    if (!numbersString.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/track?numbers=${encodeURIComponent(numbersString)}`);
      if (!res.ok) throw new Error(`Gateway returned HTTP ${res.status}`);

      const json = await res.json();
      setResults(json.data || []);
      setLogs(json.telemetryLogs || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to retrieve telemetry";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [numbersString]);

  useEffect(() => {
    fetchLiveTelemetry();
  }, [fetchLiveTelemetry]);

  return { results, logs, isLoading, error, refetch: fetchLiveTelemetry };
}
