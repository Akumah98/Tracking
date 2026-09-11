interface AdminOverrideTabsProps {
  activeTab: "location" | "parcel" | "status";
  onTabChange: (tab: "location" | "parcel" | "status") => void;
}

export function AdminOverrideTabs({ activeTab, onTabChange }: AdminOverrideTabsProps) {
  const tabs = ["location", "parcel", "status"] as const;
  return (
    <div className="flex border-b border-neutral-200 text-xs font-semibold">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`pb-2 px-3 capitalize transition-colors ${
            activeTab === t
              ? "border-b-2 border-brand text-brand font-bold"
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
