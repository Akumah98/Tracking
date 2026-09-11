"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { APP_CONFIG } from "@/lib/constants";

export function useTrackingSearch() {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState("");
  const [autoDetect, setAutoDetect] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const rawTokens = inputQuery
      .split(/[\n, ]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (rawTokens.length === 0) {
      setError("Please enter at least one tracking number.");
      return;
    }

    if (rawTokens.length > APP_CONFIG.maxTrackingNumbers) {
      setError(`You can track a maximum of ${APP_CONFIG.maxTrackingNumbers} packages at once.`);
      return;
    }

    const queryParam = encodeURIComponent(rawTokens.join(","));
    router.push(`/track?numbers=${queryParam}&autoDetect=${autoDetect}`);
  };

  return {
    inputQuery,
    setInputQuery,
    autoDetect,
    setAutoDetect,
    error,
    handleSearch,
  };
}
