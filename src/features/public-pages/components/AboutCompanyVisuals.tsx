import Image from "next/image";
import { Users, Globe, CheckCircle2 } from "lucide-react";
import data from "@/data/data.json";

export function AboutCompanyVisuals() {
  const { trustedServices, industryLeaders, airCargo } = data.siteMedia;

  const facts = [
    { icon: Users, label: ">230+ Professionals", desc: "Dedicated cargo engineers & dispatchers" },
    { icon: Globe, label: "150+ Countries", desc: "Global freight lanes & customs brokers" },
    { icon: CheckCircle2, label: "780,000+ Shipments", desc: "Delivered securely with 99.4% SLA" },
  ];

  return (
    <div className="space-y-8">
      {/* 3-Photo Visual Montage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-md border border-black/[0.08] group">
          <Image
            src={trustedServices.url}
            alt={trustedServices.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 text-xs font-bold text-white">Automated Sorting Hubs</p>
        </div>

        <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-md border border-black/[0.08] group">
          <Image
            src={industryLeaders.url}
            alt={industryLeaders.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 text-xs font-bold text-white">Transcontinental Fleets</p>
        </div>

        <div className="relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-md border border-black/[0.08] group">
          <Image
            src={airCargo.url}
            alt={airCargo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 text-xs font-bold text-white">Air Cargo Direct Lanes</p>
        </div>
      </div>

      {/* Facts Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="p-5 rounded-2xl bg-neutral-50 border border-black/[0.06] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-heading font-extrabold text-brand-dark">{f.label}</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
