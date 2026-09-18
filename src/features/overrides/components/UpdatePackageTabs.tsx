"use client";

import { UpdateTab } from "../hooks/useUpdatePackageForm";
import { Navigation, Users, Package, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  activeTab: UpdateTab;
  onTabChange: (tab: UpdateTab) => void;
}

const TABS: { id: UpdateTab; label: string; icon: any }[] = [
  { id: "telematics", label: "Telematics & Hub", icon: Navigation },
  { id: "contacts", label: "Shipper & Receiver", icon: Users },
  { id: "package", label: "Package Specifications", icon: Package },
  { id: "pieces", label: "Pieces & Dimensions", icon: Layers },
];

export function UpdatePackageTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-neutral-200/60 border border-black/[0.04]">
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              "px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer",
              isActive
                ? "bg-white text-brand-dark shadow-xs font-bold"
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand" : "text-neutral-400")} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
