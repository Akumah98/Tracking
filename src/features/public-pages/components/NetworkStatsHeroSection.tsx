import Image from "next/image";
import data from "@/data/data.json";
import { Globe2, Building2, Clock, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/features/animations/components/AnimatedCounter";

export function NetworkStatsHeroSection() {
  const { kpis, siteMedia } = data;
  const image = siteMedia.statsHero || siteMedia.containerPort;

  const stats = [
    { label: "Direct Global Hubs", target: kpis.globalHubs, suffix: "+", icon: Building2 },
    { label: "Countries Served", target: kpis.countriesCovered, suffix: "+", icon: Globe2 },
    { label: "On-Time Delivery Rate", target: kpis.deliverySuccessRate, suffix: "%", decimals: 1, icon: Clock },
    { label: "Friction-Free Resolution", target: kpis.onTimeRate, suffix: "%", decimals: 0, icon: CheckCircle2 },
  ];

  return (
    <div className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0500]/95 via-[#0A0500]/85 to-[#0A0500]/75 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full container max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Verified Operational Scale
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Numbers Powering World-Class Logistics
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Continuous telematics coordination across 220 international territories ensuring seamless consignment dispatch and real-time transit visibility.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center space-y-3"
              >
                <Icon className="w-7 h-7 text-white" />
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
                  <AnimatedCounter
                    target={item.target}
                    suffix={item.suffix}
                    decimals={item.decimals}
                  />
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-300">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
