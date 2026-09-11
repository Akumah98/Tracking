import { Carrier } from "@/types/carrier.types";
import { Badge } from "@/components/ui/badge";

interface CarrierBadgeProps {
  carrier: Carrier | null;
  confidence?: number;
}

export function CarrierBadge({ carrier, confidence }: CarrierBadgeProps) {
  if (!carrier) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/60 text-xs font-semibold text-neutral-800">
      <span className="w-2 h-2 rounded-full bg-brand" />
      <span>{carrier.name}</span>
      {confidence && confidence > 0.8 && (
        <Badge variant="success" className="text-[9px] py-0 px-1 font-bold">
          Verified
        </Badge>
      )}
    </div>
  );
}
