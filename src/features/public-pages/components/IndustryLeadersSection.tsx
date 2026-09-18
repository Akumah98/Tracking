import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";

export function IndustryLeadersSection() {
  const { industryLeaders } = data.siteMedia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Text & CTAs */}
      <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Real-Time Telemetry</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight">
            We Are Transport Industry Leaders
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          As the logistics industry’s premier multimodal carrier, we offer a sophisticated live tracking system. Gain 24/7 peace of mind through real-time GPS visibility into the exact coordinates and status of your consignment, from pickup to doorstep delivery.
        </p>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-black/[0.05] space-y-1">
            <div className="flex items-center gap-2 text-brand font-bold text-xs">
              <Activity className="w-4 h-4" /> Real-Time Telemetry
            </div>
            <p className="text-[11px] text-neutral-500">Live GPS pings updated every 60 seconds.</p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-black/[0.05] space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <Clock className="w-4 h-4" /> 99.4% On-Time SLA
            </div>
            <p className="text-[11px] text-neutral-500">Industry-leading dispatch punctuality.</p>
          </div>
        </div>

        <div>
          <Link href="/track">
            <Button className="h-11 min-h-[44px] px-6 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold text-xs gap-2 active:scale-95 transition-all shadow-sm">
              Track Your Package Today <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Image with Floating Radar */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] group">
          <Image
            src={industryLeaders.url}
            alt={industryLeaders.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-brand-dark/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Trans-Continental Highway Lane Active</span>
            </div>
            <span className="text-[11px] font-mono text-white">GPS Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
