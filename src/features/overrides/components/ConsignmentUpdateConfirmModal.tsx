"use client";

import { FieldDiff } from "../utils/packageDiffHelper";
import { ConsignmentDiffList } from "./ConsignmentDiffList";
import { ConsignmentUpdateSuccessState } from "./ConsignmentUpdateSuccessState";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, ShieldCheck, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  trackingNumber: string;
  diffs: FieldDiff[];
  errorMsg: string | null;
}

export function ConsignmentUpdateConfirmModal({
  isOpen, onClose, onConfirm, isSubmitting, isSuccess, trackingNumber, diffs, errorMsg,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-brand-dark">Review Consignment Updates</h3>
              <p className="text-[11px] font-mono text-neutral-400">{trackingNumber}</p>
            </div>
          </div>
          {!isSubmitting && (
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-400 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isSuccess ? (
          <ConsignmentUpdateSuccessState trackingNumber={trackingNumber} onDismiss={onClose} />
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neutral-700">Summary of Pending Modifications ({diffs.length})</p>
              <p className="text-[11px] text-neutral-400">Please review before saving to the live telemetry network.</p>
            </div>

            <ConsignmentDiffList diffs={diffs} />

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[44px] text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel / Keep Editing
              </Button>
              <Button
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[44px] px-5 bg-brand hover:bg-brand-secondary text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Updates...
                  </>
                ) : (
                  "Accept & Save Consignment"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
