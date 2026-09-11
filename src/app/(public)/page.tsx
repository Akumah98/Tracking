import { HeroSearchBar } from "@/features/tracking/components/HeroSearchBar";
import { NetworkStatsBar } from "@/features/public-pages/components/NetworkStatsBar";
import { ServicesPreview } from "@/features/public-pages/components/ServicesPreview";
import { ShieldCheck, Sparkles, CheckCircle2, HeartHandshake } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50/60 via-white to-neutral-50/60 pt-20 sm:pt-28 pb-16 border-b border-black/[0.06]">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold tracking-tight shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Express Postal &amp; Global Logistics Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-brand-dark tracking-tight leading-[1.08]">
            Transporting Goods{" "}
            <span className="text-brand block sm:inline">Round The Globe</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-500 leading-relaxed font-normal">
            We are more than just a transportation company. We are your trusted partner in moving goods, delivering solutions, and eliminating shipping friction across the globe safely, on time, and with care.
          </p>

          <div className="pt-2">
            <HeroSearchBar />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.03] text-xs font-semibold text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Box or Label Necessary
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.03] text-xs font-semibold text-neutral-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              24/7 Live Telemetry Visibility
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/[0.03] text-xs font-semibold text-neutral-700">
              <HeartHandshake className="w-4 h-4 text-brand" />
              Friction-Free Returns
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <NetworkStatsBar />
      </section>

      {/* Services Grid */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6">
        <ServicesPreview />
      </section>
    </div>
  );
}
