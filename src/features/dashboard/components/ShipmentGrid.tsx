"use client";

import { Shipment } from "@/types/tracking.types";
import { ShipmentRow } from "./ShipmentRow";

interface Props {
  shipments: Shipment[];
  activeShipment: Shipment | null;
  onSelect: (shipment: Shipment) => void;
  onUpdatePackage: (shipment: Shipment) => void;
}

export function ShipmentGrid({
  shipments,
  activeShipment,
  onSelect,
  onUpdatePackage,
}: Props) {
  if (shipments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center text-xs text-neutral-500">
        No active consignments matching current fleet filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shipments.map((s) => (
        <ShipmentRow
          key={s.id}
          shipment={s}
          isSelected={activeShipment?.id === s.id}
          onSelect={onSelect}
          onUpdatePackage={onUpdatePackage}
        />
      ))}
    </div>
  );
}
