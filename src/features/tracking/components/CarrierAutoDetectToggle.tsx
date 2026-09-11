import { Sparkles } from "lucide-react";

interface CarrierAutoDetectToggleProps {
  enabled: boolean;
  onToggle: (val: boolean) => void;
}

export function CarrierAutoDetectToggle({
  enabled,
  onToggle,
}: CarrierAutoDetectToggleProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-600 hover:text-neutral-900">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-8 h-4 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand relative" />
      <span className="flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-brand" />
        Auto-detect Carrier (80%+ accuracy)
      </span>
    </label>
  );
}
