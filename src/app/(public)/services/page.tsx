import data from "@/data/data.json";
import { Plane, Box, RefreshCw, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCardWithImage } from "@/features/public-pages/components/ServiceCardWithImage";
import { PartnerLogosBar } from "@/features/public-pages/components/PartnerLogosBar";
import Link from "next/link";

const icons = [Plane, Box, RefreshCw, Truck];

export default function ServicesPage() {
  const { services } = data;

  return (
    <div className="pt-24 sm:pt-32 pb-16 space-y-16">
      {/* Header */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Comprehensive Freight Solutions</span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-dark tracking-tight">
          Logistics Engineered for Zero Friction
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-neutral-500 leading-relaxed">
          From express air cargo and automated warehousing to friction-free returns, International Transport Line handles end-to-end global transit with 24/7 visibility.
        </p>
      </div>

      {/* Services Grid with Rich Photography */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc, i) => (
          <ServiceCardWithImage
            key={svc.id}
            service={svc}
            Icon={icons[i % icons.length]}
          />
        ))}
      </div>

      {/* Partner Strip */}
      <PartnerLogosBar />

      {/* Call to Action Banner */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#0E131F] rounded-3xl p-8 sm:p-12 border border-white/[0.08] text-white shadow-2xl space-y-4">
          <ShieldCheck className="w-9 h-9 text-white mx-auto" />
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
            Leave Your Consignments With Pros
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Experience friction-free worldwide logistics. No box or label needed when dropping off at any International Transport Line depot.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="inline-block">
              <Button className="h-12 min-h-[48px] px-7 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold gap-2 active:scale-95 transition-all shadow-md">
                Book a Shipment or Request Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
