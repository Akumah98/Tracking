"use client";

import { useState } from "react";
import data from "@/data/data.json";
import { AnimatedTextReveal } from "@/features/animations/components/AnimatedTextReveal";
import { DashboardFeatureTabs } from "./DashboardFeatureTabs";
import { DashboardMockupFrame } from "./DashboardMockupFrame";

export function DashboardShowcaseSection() {
  const { dashboardShowcase } = data;
  const [activeTabId, setActiveTabId] = useState(dashboardShowcase.tabs[0].id);

  const activeTab =
    dashboardShowcase.tabs.find((t) => t.id === activeTabId) ||
    dashboardShowcase.tabs[0];

  return (
    <section className="py-12 sm:py-18 bg-[#090D16] border-y border-white/[0.08] relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
            {dashboardShowcase.badge}
          </div>

          <AnimatedTextReveal
            text={dashboardShowcase.title}
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight"
            highlightWords={["Command", "Intelligence"]}
            highlightClassName="text-brand"
          />

          <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
            {dashboardShowcase.description}
          </p>

          <div className="pt-2">
            <DashboardFeatureTabs
              tabs={dashboardShowcase.tabs}
              activeTab={activeTabId}
              onSelectTab={setActiveTabId}
            />
          </div>
        </div>

        {/* 3D Dashboard Mockup Frame with Edge Overlays */}
        <DashboardMockupFrame
          activeTab={activeTab.id}
          activeDescription={activeTab.description}
          badges={dashboardShowcase.floatingBadges}
        />
      </div>
    </section>
  );
}
