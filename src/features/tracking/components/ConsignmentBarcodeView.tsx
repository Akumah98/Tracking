"use client";

import { useRef, useState } from "react";
import { useBarcodeGenerator } from "@/features/consignment/hooks/useBarcodeGenerator";
import { Copy, Check, Barcode } from "lucide-react";

interface Props {
  trackingNumber: string;
}

export function ConsignmentBarcodeView({ trackingNumber }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);
  useBarcodeGenerator(trackingNumber, svgRef);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Barcode className="w-4 h-4 text-brand" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-dark">
            Consignment Air Waybill Barcode
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-bold">
          CODE 128
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
        <div className="bg-white p-2 rounded-lg border border-neutral-200/60 shadow-xs max-w-full overflow-x-auto">
          <svg ref={svgRef} className="max-w-full h-auto" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Manifest ID</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight">
              {trackingNumber}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-600"
            title="Copy tracking number"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
