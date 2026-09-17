import Image from "next/image";
import { HeroSearchBar } from "@/features/tracking/components/HeroSearchBar";
import { CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import data from "@/data/data.json";

export function HomeHeroVisual() {
  const { heroBanner } = data.siteMedia;

  return (
    <section className="relative overflow-hidden bg-brand-dark min-h-[580px] sm:min-h-[640px] flex items-center justify-center pt-24 pb-16 border-b border-black/[0.08]">
      {/* Background Hero Image with dark gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroBanner.url}
          alt={heroBanner.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/90" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-transparent border border-white/20 text-white text-xs font-bold tracking-tight shadow-sm">
          <span>Express Postal &amp; Global Logistics Solutions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
          Transporting Goods{" "}
          <span className="text-brand block sm:inline">Round The Globe</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
          We are more than just a transportation company. We are your trusted partner in moving goods, delivering solutions, and connecting people across 220 countries safely and on time.
        </p>

        <div className="pt-2 max-w-2xl mx-auto">
          <HeroSearchBar />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-white" />
            No Box or Label Necessary
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-white" />
            24/7 Live Telemetry Visibility
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <HeartHandshake className="w-4 h-4 text-white" />
            Friction-Free Returns
          </span>
        </div>
      </div>
    </section>
  );
}
