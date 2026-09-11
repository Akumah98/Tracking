"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, MapPin, Radio } from "lucide-react";

interface TelemetryDiagnosticBadgeProps {
  logs: Array<{ trackingNumber: string; attempts: string[]; provider: string }>;
}

export function TelemetryDiagnosticBadge({ logs }: TelemetryDiagnosticBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  if (!logs || logs.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200/80 p-3 shadow-xs text-xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="font-semibold text-neutral-800">
            Control Tower Telemetry:
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 font-mono font-bold text-[11px] text-emerald-800 uppercase">
            Official Live Stream
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 font-medium"
        >
          <span>{expanded ? "Hide Details" : "View Telemetry Verification"}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          {logs.map((log) => (
            <div key={log.trackingNumber} className="bg-neutral-50 rounded-lg p-2.5 font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-neutral-700">
                <MapPin className="w-3 h-3 text-brand" />
                <span>Consignment #{log.trackingNumber}</span>
              </div>
              <div className="space-y-0.5 text-neutral-600 pl-4 border-l border-neutral-200">
                {log.attempts.map((att, idx) => (
                  <div key={idx} className="leading-tight flex items-center gap-1.5">
                    <span className="text-emerald-600 font-semibold">✔</span>
                    <span>{att}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1 text-[10px] text-neutral-400 pt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Telemetry validated by Line Logistics operations team.</span>
          </div>
        </div>
      )}
    </div>
  );
}
