import data from "@/data/data.json";
import { Globe2, Building2, Clock, CheckCircle2 } from "lucide-react";

export function NetworkStatsBar() {
  const { kpis } = data;

  const stats = [
    { label: "Direct Global Hubs", value: `${kpis.globalHubs}+`, icon: Building2 },
    { label: "Countries Served", value: `${kpis.countriesCovered}+`, icon: Globe2 },
    { label: "On-Time Delivery Rate", value: `${kpis.deliverySuccessRate}%`, icon: Clock },
    { label: "Friction-Free Resolution", value: `${kpis.onTimeRate}%`, icon: CheckCircle2 },
  ];

  return (
    <div className="w-full bg-[#0E131F]/90 backdrop-blur-2xl py-10 px-4 sm:px-6 rounded-3xl border border-white/[0.08] text-white shadow-2xl ring-1 ring-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col items-center space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-brand shadow-inner">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
