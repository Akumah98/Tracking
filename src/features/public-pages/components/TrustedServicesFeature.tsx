import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";

export function TrustedServicesFeature() {
  const { trustedServices } = data.siteMedia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Visual Image with Floating Pill */}
      <div className="lg:col-span-6 relative">
        <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] group">
          <Image
            src={trustedServices.url}
            alt={trustedServices.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-dark">Enterprise Ground Facility</p>
                <p className="text-[11px] text-neutral-500">Certified ISO 9001:2026 Facility</p>
              </div>
            </div>
            <span className="text-xs font-mono font-extrabold text-emerald-600">100% Secure</span>
          </div>
        </div>
      </div>

      {/* Right Column: Editorial Copy */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Operational Excellence</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight">
            We Provide Trusted Logistics Services For You
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          At International Transport Line, we are your trusted partner in moving goods, delivering solutions, and connecting businesses worldwide. We ensure your shipments reach their destination safely, on time, and with dedicated care.
        </p>

        <ul className="space-y-2.5">
          {["Global reach spanning 220 international destinations", "Climate-controlled automated facilities", "Dedicated personal customs broker support"].map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-700 font-semibold">
              <CheckCircle className="w-4 h-4 text-brand shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link href="/services">
            <Button className="h-11 min-h-[44px] px-6 rounded-full bg-brand hover:bg-brand-secondary text-white font-bold text-xs gap-2 active:scale-95 transition-all shadow-sm">
              Explore All Freight Solutions <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
