"use client";

import { Activity, Navigation, ShieldCheck } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  description: string;
}

interface DashboardFeatureTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onSelectTab: (id: string) => void;
}

const TAB_ICONS = {
  telemetry: Activity,
  dispatch: Navigation,
  clearance: ShieldCheck,
};

export function DashboardFeatureTabs({
  tabs,
  activeTab,
  onSelectTab,
}: DashboardFeatureTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {tabs.map((tab) => {
        const Icon = TAB_ICONS[tab.id as keyof typeof TAB_ICONS] || Activity;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-brand text-white shadow-md shadow-brand/20 scale-102"
                : "bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
