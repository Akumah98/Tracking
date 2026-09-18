"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/data/data.json";
import { LogisticsAccordionItem } from "./LogisticsAccordionItem";
import { AnimatedTextReveal } from "@/features/animations/components/AnimatedTextReveal";
import { Globe } from "lucide-react";

export function LogisticsAccordionSection() {
  const { logisticsAccordions, siteMedia } = data;
  const [openId, setOpenId] = useState<string | null>(logisticsAccordions.items[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Accordion Content Column (Left) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            {logisticsAccordions.tag}
          </span>
          <AnimatedTextReveal
            text={logisticsAccordions.title}
            as="h2"
            align="left"
            className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight text-left"
            highlightWords={["Shipping", "Network"]}
            highlightClassName="text-brand"
          />
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
            {logisticsAccordions.description}
          </p>
        </div>

        <div className="apple-glass-card rounded-3xl p-5 sm:p-7 border border-black/[0.08] shadow-sm">
          {logisticsAccordions.items.map((item) => (
            <LogisticsAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Visual Image with Floating Overlay Card (Right) */}
      <div className="lg:col-span-5 relative">
        <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/[0.08]">
          <Image
            src={siteMedia.containerPort.url}
            alt={siteMedia.containerPort.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-black/[0.08] flex items-center gap-3.5">
            <Globe className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-xs text-neutral-500 font-medium">Global Network</div>
              <div className="text-sm font-heading font-bold text-brand-dark">
                {logisticsAccordions.badgeText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
