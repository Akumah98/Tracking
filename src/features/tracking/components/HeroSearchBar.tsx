"use client";

import { Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackingSearch } from "../hooks/useTrackingSearch";

export function HeroSearchBar() {
  const { inputQuery, setInputQuery, error, handleSearch } = useTrackingSearch();

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto space-y-2">
      <div className="relative flex items-center shadow-lg rounded-full">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Enter Consignment or Waybill number (e.g. ITL-894201-US)..."
          className="w-full h-12 sm:h-13 rounded-full border border-black/[0.08] bg-white pl-5 pr-28 sm:pr-32 text-sm leading-normal focus:bg-white focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 transition-all font-mono placeholder:text-neutral-400 placeholder:leading-normal"
        />
        <Button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 h-auto min-h-[38px] sm:min-h-[40px] bg-brand hover:bg-brand-secondary text-white px-5 sm:px-6 rounded-full font-bold shadow-xs active:scale-95 transition-all flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </Button>
      </div>

      {error && (
        <p className="text-xs text-rose-500 flex items-center justify-center gap-1.5 font-medium pt-0.5 px-3">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </form>
  );
}
