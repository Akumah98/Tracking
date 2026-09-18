"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  isSubmitting: boolean;
  successMsg: string | null;
  errorMsg: string | null;
  onSubmit: () => void;
}

export function UpdatePackageActionsBar({
  isSubmitting, successMsg, errorMsg, onSubmit,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-xs space-y-3">
      {successMsg && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <Link
          href="/admin/dashboard/shipments"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet Control Tower
        </Link>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="min-h-[44px] px-6 bg-brand hover:bg-brand-secondary text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving All Changes...
            </>
          ) : (
            "Save & Update Consignment"
          )}
        </Button>
      </div>
    </div>
  );
}
