"use client";

import Link from "next/link";
import { Search, ShieldCheck, ArrowRight } from "lucide-react";

export function TrackingEmptyState() {
  return (
    <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-md transition-all">
      <div className="w-16 h-16 rounded-3xl bg-neutral-100/80 border border-black/[0.04] flex items-center justify-center text-brand mx-auto shadow-inner">
        <Search className="w-7 h-7 text-brand" />
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-extrabold text-xl text-brand-dark tracking-tight">
          Awaiting Consignment Number
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
          Enter up to 5 waybill numbers (separated by commas) in the search bar above and click{" "}
          <strong className="text-brand-dark font-semibold">&quot;Track&quot;</strong> to
          initiate real-time geospatial telemetry.
        </p>
      </div>

      <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="text-xs text-neutral-400">Try verified demo consignment:</span>
        <Link
          href="/track?numbers=ITL-894201-US"
          className="inline-flex items-center gap-2 h-11 min-h-[44px] px-4 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-brand-dark font-mono font-bold text-xs active:scale-95 transition-all"
        >
          <span>ITL-894201-US</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand" />
        </Link>
      </div>

      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Authoritative Control Tower Database • Zero Third-Party Scraping</span>
      </div>
    </div>
  );
}
