import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Anchor, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";

export function SmartWarehouseFeature() {
  const { containerPort } = data.siteMedia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Copy */}
      <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Multimodal Ports &amp; Hubs</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight">
            Smart Warehouses &amp; Ocean Lines
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Equipped with advanced RFID scanners, AI camera sorting, and real-time temperature telemetry, our automated hubs and deep-water terminals keep international supply chains flowing without friction.
        </p>

        <div className="grid grid-cols-2 gap-3 py-1">
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-black/[0.05] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
              <Cpu className="w-4 h-4 text-brand" /> RFID Tracking
            </div>
            <p className="text-[11px] text-neutral-500">Autonomous scan gates eliminate handling errors.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-black/[0.05] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
              <Layers className="w-4 h-4 text-brand" /> Buffer Storage
            </div>
            <p className="text-[11px] text-neutral-500">Free 14-day bonded transit warehousing.</p>
          </div>
        </div>

        <div>
          <Link href="/services">
            <Button className="h-11 min-h-[44px] px-6 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold text-xs gap-2 active:scale-95 transition-all shadow-sm">
              Discover Smart Hubs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Column: Ocean Port Image */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <div className="relative h-[320px] sm:h-[390px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] group">
          <Image
            src={containerPort.url}
            alt={containerPort.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-brand-dark/95 text-white backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                <Anchor className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">Deep-Sea Marine Terminals</p>
                <p className="text-[10px] text-neutral-400">Rotterdam • Shanghai • LA • Felixstowe</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">Port Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}
