import { STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_LABELS[status] || {
    label: status.replace("_", " "),
    color: "text-neutral-700",
    bg: "bg-neutral-100 border-neutral-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm shadow-xs",
        config.bg,
        config.color,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse opacity-80" />
      {config.label}
    </span>
  );
}
