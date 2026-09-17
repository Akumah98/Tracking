import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  trackingNumber?: string;
  className?: string;
}

export function MapLoadingSkeleton({ trackingNumber, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[620px] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 flex flex-col items-center justify-center p-6 text-neutral-400 animate-pulse",
        className
      )}
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
          <Radio className="w-5 h-5 animate-spin text-white" />
        </div>
        <p className="text-xs font-semibold text-neutral-300">
          Initializing Geospatial Vector Radar...
        </p>
        {trackingNumber && (
          <span className="text-[11px] font-mono text-neutral-500 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
            Waybill #{trackingNumber}
          </span>
        )}
      </div>
    </div>
  );
}
