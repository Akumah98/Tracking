"use client";

import { useState } from "react";
import { useLiveTracking } from "../hooks/useLiveTracking";
import { TrackingResultCard } from "./TrackingResultCard";
import { InteractiveRouteMap } from "@/features/maps/components/InteractiveRouteMap";
import { TelemetryDiagnosticBadge } from "./TelemetryDiagnosticBadge";
import { TrackingEmptyState } from "./TrackingEmptyState";
import { ConsignmentSegmentedControl } from "./ConsignmentSegmentedControl";
import { Loader2 } from "lucide-react";

interface LiveTrackingViewProps {
  initialNumbers: string;
}

export function LiveTrackingView({ initialNumbers }: LiveTrackingViewProps) {
  const { results, logs, isLoading, error } = useLiveTracking(initialNumbers);
  // Default to -1 (All Routes) if multiple consignments, else 0
  const [selectedIdx, setSelectedIdx] = useState(-1);

  if (!initialNumbers.trim()) return <TrackingEmptyState />;

  if (isLoading) {
    return (
      <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-12 text-center max-w-md mx-auto space-y-3">
        <Loader2 className="w-8 h-8 text-brand animate-spin mx-auto" />
        <h3 className="font-heading font-extrabold text-base text-brand-dark">Connecting to ITL Telematics...</h3>
        <p className="text-xs text-neutral-500">Retrieving verified satellite coordinates from Supabase Cloud</p>
      </div>
    );
  }

  if (error || results.length === 0) {
    return (
      <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-12 text-center max-w-lg mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-2xl mx-auto">📦</div>
        <h3 className="font-heading font-extrabold text-lg text-brand-dark">Consignment Not Located</h3>
        <p className="text-xs text-neutral-500">No active telemetry found for &quot;{initialNumbers}&quot;.</p>
      </div>
    );
  }

  const selectedTrackingNumber = selectedIdx >= 0 ? results[selectedIdx]?.shipment.trackingNumber : undefined;
  const shipments = results.map((r) => r.shipment);

  const handleMapSelect = (tn: string) => {
    const idx = results.findIndex((r) => r.shipment.trackingNumber === tn);
    if (idx >= 0) setSelectedIdx(idx);
  };

  const displayedResults = selectedIdx >= 0 && results[selectedIdx]
    ? [results[selectedIdx], ...results.filter((_, i) => i !== selectedIdx)]
    : results;

  return (
    <div className="space-y-6">
      <TelemetryDiagnosticBadge logs={logs} />
      <ConsignmentSegmentedControl results={results} selectedIndex={selectedIdx} onSelect={setSelectedIdx} />

      <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 ring-1 ring-white/10">
        <InteractiveRouteMap
          shipments={shipments}
          selectedTrackingNumber={selectedTrackingNumber}
          onSelectTrackingNumber={handleMapSelect}
          className="w-full h-[500px] sm:h-[560px] md:h-[620px] lg:h-[680px]"
        />
      </div>

      <div className="space-y-6">
        {displayedResults.map((res) => (
          <TrackingResultCard key={res.shipment.id} result={res} />
        ))}
      </div>
    </div>
  );
}
