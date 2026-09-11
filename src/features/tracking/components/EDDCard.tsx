import { CalendarClock, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EDDCardProps {
  estimatedDelivery: string;
  confidence: number;
}

export function EDDCard({ estimatedDelivery, confidence }: EDDCardProps) {
  return (
    <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/[0.06] via-white/80 to-white p-4.5 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.05]">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Predictive Transit Estimate</span>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
          {confidence}% Confidence
        </span>
      </div>

      <div className="flex items-center gap-3.5 pt-3">
        <div className="w-11 h-11 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
          <CalendarClock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-heading font-extrabold text-brand-dark tracking-tight">
            {formatDate(estimatedDelivery)}
          </div>
          <p className="text-xs text-neutral-500">
            Dynamically verified against live corridor telemetry.
          </p>
        </div>
      </div>
    </div>
  );
}
