"use client";

import { Search, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackingSearch } from "../hooks/useTrackingSearch";

export function HeroSearchBar() {
  const { inputQuery, setInputQuery, error, handleSearch } = useTrackingSearch();

  return (
    <div className="w-full max-w-3xl mx-auto apple-glass-card rounded-3xl p-3.5 sm:p-4.5 border border-black/[0.08] shadow-lg transition-all">
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative flex items-center">
          <textarea
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Enter Consignment or Waybill number (e.g. ITL-894201-US)..."
            rows={2}
            className="w-full resize-none rounded-2xl border border-black/[0.08] bg-white/70 p-3.5 pr-28 text-sm focus:bg-white focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition-all font-mono placeholder:text-neutral-400"
          />
          <Button
            type="submit"
            className="absolute right-2 top-2 bottom-2 h-auto min-h-[44px] bg-brand hover:bg-brand-secondary text-white px-5 rounded-xl font-bold shadow-xs active:scale-95 transition-all flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] text-[11px] font-semibold text-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            24/7 Authoritative Telematics
          </span>
          <span className="text-[11px] text-neutral-400">
            Track up to 5 consignments separated by commas.
          </span>
        </div>

        {error && (
          <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium pt-1 px-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
          </p>
        )}
      </form>
    </div>
  );
}
