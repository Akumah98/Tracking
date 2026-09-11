import { CheckCircle2, Clock, AlertTriangle, Package } from "lucide-react";
import { Milestone } from "@/types/tracking.types";
import { formatDate } from "@/lib/utils";

interface MilestoneItemProps {
  milestone: Milestone;
  isLatest?: boolean;
}

export function MilestoneItem({ milestone, isLatest }: MilestoneItemProps) {
  const getIcon = () => {
    switch (milestone.status) {
      case "delivered":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "exception":
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case "out_for_delivery":
      case "in_transit":
        return <Package className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0 group">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-xs transition-all ${
            isLatest ? "border-brand ring-4 ring-brand/15 shadow-sm" : "border-black/[0.08]"
          }`}
        >
          {getIcon()}
        </div>
        <div className="w-0.5 h-full bg-black/[0.06] group-last:hidden" />
      </div>

      <div className="flex-1 pt-0.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
          <h4 className="text-sm font-heading font-extrabold text-neutral-900 capitalize tracking-tight">
            {milestone.status.replace("_", " ")}
          </h4>
          <time className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/[0.03] text-neutral-500">
            {formatDate(milestone.timestamp)}
          </time>
        </div>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{milestone.description}</p>
        <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-neutral-400 font-medium">
          📍 {milestone.location}
        </span>
      </div>
    </div>
  );
}
