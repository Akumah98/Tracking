import { Shipment } from "@/types/tracking.types";
import { StatusBadge } from "@/features/tracking/components/StatusBadge";
import { MapPin, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShipmentRowProps {
  shipment: Shipment;
  isSelected: boolean;
  onSelect: (shipment: Shipment) => void;
  onUpdatePackage: (shipment: Shipment) => void;
}

export function ShipmentRow({
  shipment,
  isSelected,
  onSelect,
  onUpdatePackage,
}: ShipmentRowProps) {
  return (
    <div
      onClick={() => onSelect(shipment)}
      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
        isSelected
          ? "border-brand bg-brand/5 shadow-xs"
          : "border-neutral-100 hover:border-neutral-200 bg-neutral-50/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono font-bold text-xs text-brand-dark">
          #{shipment.trackingNumber}
        </span>
        <StatusBadge status={shipment.status} />
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{shipment.origin.city} → {shipment.destination.city}</span>
        <span className="font-mono">{shipment.weight}</span>
      </div>
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-[11px] text-neutral-400 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand" /> {shipment.currentLocation.city}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onUpdatePackage(shipment);
          }}
          className="h-7 text-[11px] font-semibold gap-1.5 border-neutral-300 hover:border-brand hover:text-brand"
        >
          <Edit3 className="w-3 h-3" /> Update Package
        </Button>
      </div>
    </div>
  );
}
