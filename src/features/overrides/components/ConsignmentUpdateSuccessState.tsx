"use client";

import { CheckCircle2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  trackingNumber: string;
  onDismiss: () => void;
}

export function ConsignmentUpdateSuccessState({ trackingNumber, onDismiss }: Props) {
  return (
    <div className="text-center py-4 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-95 duration-200">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="font-heading font-extrabold text-base text-brand-dark">
          Consignment Updated Successfully
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          All changes, coordinates, and activity telemetry comments have been committed to the live network.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
        <Link
          href={`/track?numbers=${encodeURIComponent(trackingNumber)}`}
          target="_blank"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-secondary transition-colors"
        >
          <span>View Public Tracking</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <Link
          href="/admin/dashboard/shipments"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Control Tower</span>
        </Link>

        <Button
          type="button"
          onClick={onDismiss}
          variant="outline"
          className="w-full sm:w-auto min-h-[44px] text-xs font-semibold rounded-xl"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
