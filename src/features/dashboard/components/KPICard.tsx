import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  delta?: string;
  subtitle: string;
  icon: LucideIcon;
  badgeColor?: string;
}

export function KPICard({
  title,
  value,
  delta,
  subtitle,
  icon: Icon,
}: KPICardProps) {
  return (
    <Card className="p-5 border-neutral-200/80 bg-white hover:border-brand/40 transition-all shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
          <Icon className="w-4 h-4 text-brand" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-heading font-extrabold text-brand-dark">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {delta && (
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            {delta}
          </span>
        )}
      </div>

      <p className="mt-1 text-[11px] text-neutral-400 font-medium">{subtitle}</p>
    </Card>
  );
}
