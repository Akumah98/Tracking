import data from "@/data/data.json";
import { Plane, Box, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, typeof Plane> = {
  Plane,
  Box,
  RefreshCw,
  Truck,
};

export function ServicesPreview() {
  const { services } = data;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Friction-Free Logistics</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark">
          World-Class Services You Can Count On
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500">
          Leave your shipments with pros. We eliminate friction with smart warehousing, rapid air freight, and easy returns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc) => {
          const Icon = iconMap[svc.icon] || Truck;
          return (
            <div
              key={svc.id}
              className="apple-glass-card rounded-3xl border border-black/[0.06] p-6 sm:p-7 flex flex-col justify-between hover:border-brand/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-base text-brand-dark tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="pt-6 border-t border-black/[0.05] mt-6 flex flex-wrap gap-1.5">
                {svc.features.map((feat, i) => (
                  <span key={i} className="text-[10px] bg-black/[0.03] text-neutral-600 px-2.5 py-1 rounded-full font-medium">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link href="/services">
          <Button variant="outline" className="h-11 min-h-[44px] px-6 rounded-full border-black/[0.12] hover:border-brand text-xs font-bold active:scale-95 transition-all">
            Explore All Logistics Capabilities →
          </Button>
        </Link>
      </div>
    </div>
  );
}
