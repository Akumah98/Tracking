import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";

export function AirFreightFeature() {
  const { airCargo } = data.siteMedia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Air Cargo Image */}
      <div className="lg:col-span-6">
        <div className="relative h-[320px] sm:h-[390px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] group">
          <Image
            src={airCargo.url}
            alt={airCargo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center">
            <div className="flex items-center gap-3">
              <Plane className="w-6 h-6 text-black shrink-0" />
              <div>
                <p className="text-xs font-bold text-brand-dark">Direct Flight Vectors</p>
                <p className="text-[11px] text-neutral-500">Scheduled Transatlantic &amp; Transpacific</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Editorial Copy */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Priority Skyways</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight">
            Next-Gen Air Freight Logistics
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Clear and consistent communication is essential to a successful shipping journey. We keep you informed at every milestone, from tarmac palletization to touchdown customs clearance.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-800">Direct Charters</p>
              <p className="text-[11px] text-neutral-500">Zero hub layover risks.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Thermometer className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-800">Cold Chain Active</p>
              <p className="text-[11px] text-neutral-500">Pharma &amp; perishable safe.</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/services">
            <Button className="h-11 min-h-[44px] px-6 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold text-xs gap-2 active:scale-95 transition-all shadow-sm">
              View Air Cargo Specs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
