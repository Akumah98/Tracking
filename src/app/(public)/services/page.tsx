import data from "@/data/data.json";
import { Plane, Box, RefreshCw, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const icons = [Plane, Box, RefreshCw, Truck];

export default function ServicesPage() {
  const { services } = data;

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Comprehensive Freight Solutions</span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-dark">
          Logistics Engineered for Zero Friction
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-neutral-500 leading-relaxed">
          From express air cargo and automated warehousing to friction-free returns, International Transport Line handles end-to-end global transit with 24/7 visibility.
        </p>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={svc.id} className="apple-glass-card rounded-3xl border border-black/[0.06] p-8 space-y-6 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shadow-xs">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold text-brand-dark tracking-tight">{svc.title}</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{svc.description}</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-black/[0.05]">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Key Advantages</span>
                <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-700 font-medium">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8">
        <div className="bg-[#0E131F] rounded-3xl p-8 sm:p-10 border border-white/[0.08] text-white shadow-2xl space-y-4">
          <ShieldCheck className="w-8 h-8 text-brand mx-auto" />
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight">Leave Your Consignments With Pros</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Experience friction-free worldwide logistics. No box or label needed when dropping off at any International Transport Line depot.
          </p>
          <Link href="/contact" className="inline-block pt-2">
            <Button className="h-12 min-h-[48px] px-6 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold gap-2 active:scale-95 transition-all shadow-xs">
              Book a Shipment or Request Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
