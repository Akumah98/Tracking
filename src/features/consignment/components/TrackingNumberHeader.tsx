"use client";

import { useRef } from "react";
import { useBarcodeGenerator } from "../hooks/useBarcodeGenerator";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Props { trackingNumber: string; }

export function TrackingNumberHeader({ trackingNumber }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);
  useBarcodeGenerator(trackingNumber, svgRef);

  const copy = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-brand-dark to-brand rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center gap-6">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
          Auto-Generated Tracking Number
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-mono font-extrabold tracking-tight">{trackingNumber}</span>
          <button onClick={copy} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            {copied ? <CheckCircle className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-white/50 mt-1">Give this number to the customer for tracking</p>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-lg">
        <svg ref={svgRef} />
      </div>
    </div>
  );
}
