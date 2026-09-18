import { NetworkStatsBar } from "@/features/public-pages/components/NetworkStatsBar";
import { AboutCompanyVisuals } from "@/features/public-pages/components/AboutCompanyVisuals";
import { PartnerLogosBar } from "@/features/public-pages/components/PartnerLogosBar";
import { ShieldCheck, Globe2, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 space-y-16">
      {/* Header */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">About Our Company</span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-dark tracking-tight">
          Transporting Goods Round The Globe
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          At International Transport Line, we are more than just a logistics company. We are your trusted partner in moving goods, delivering solutions, and eliminating shipping friction across 220 countries safely, on time, and with care.
        </p>
      </div>

      {/* Photography & Real Operational Facts */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <AboutCompanyVisuals />
      </div>

      {/* Network Stats */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <NetworkStatsBar />
      </div>

      {/* Core Values */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-7 space-y-4 hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shadow-xs">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-lg text-brand-dark tracking-tight">Vast Global Network</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            With direct hubs and air-cargo connections spanning 220 countries, we combine global logistics scale with deep local ground expertise.
          </p>
        </div>

        <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-7 space-y-4 hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-lg text-brand-dark tracking-tight">Friction-Free Shipping</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Drop off packages at any International Transport Line center with no box or label required. Our automated systems handle packaging and customs.
          </p>
        </div>

        <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-7 space-y-4 hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shadow-xs">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-lg text-brand-dark tracking-tight">Customer-First Service</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Clear and consistent communication every step of the way. 24/7 dedicated support ensures your high-value cargo arrives with complete peace of mind.
          </p>
        </div>
      </div>

      {/* Partner strip */}
      <PartnerLogosBar />
    </div>
  );
}
