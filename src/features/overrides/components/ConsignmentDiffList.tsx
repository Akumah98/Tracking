"use client";

import { FieldDiff } from "../utils/packageDiffHelper";
import { ArrowRight, AlertCircle } from "lucide-react";

interface Props {
  diffs: FieldDiff[];
}

export function ConsignmentDiffList({ diffs }: Props) {
  if (diffs.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
        <AlertCircle className="w-4 h-4 text-neutral-400" />
        <span>No field modifications detected. Telemetry and coordinates remain unchanged.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
      {diffs.map((d, i) => (
        <div
          key={`${d.label}-${i}`}
          className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              {d.category}
            </span>
            <p className="font-semibold text-neutral-800">{d.label}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-400 line-through truncate max-w-[130px] sm:max-w-[160px]">
              {d.oldVal}
            </span>
            <ArrowRight className="w-3 h-3 text-brand shrink-0" />
            <span className="font-bold text-brand-dark bg-brand/10 px-2 py-0.5 rounded-md truncate max-w-[160px] sm:max-w-[200px]">
              {d.newVal}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
