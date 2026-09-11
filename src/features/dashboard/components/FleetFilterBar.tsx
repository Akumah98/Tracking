import { Filter } from "lucide-react";

interface FleetFilterBarProps {
  selectedCarrier: string;
  onCarrierChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
}

export function FleetFilterBar({
  selectedCarrier,
  onCarrierChange,
  selectedStatus,
  onStatusChange,
}: FleetFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-neutral-200/80 text-xs">
      <div className="flex items-center gap-1.5 text-neutral-500 font-semibold px-2">
        <Filter className="w-3.5 h-3.5 text-brand" />
        <span>Operations Filters:</span>
      </div>

      <select
        value={selectedCarrier}
        onChange={(e) => onCarrierChange(e.target.value)}
        className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 font-medium focus:outline-none focus:border-brand"
      >
        <option value="all">All Transit Divisions</option>
        <option value="itl_air">ITL Air Express</option>
        <option value="itl_ocean">ITL Ocean Freight</option>
        <option value="itl_express">ITL Express Courier</option>
        <option value="itl_ground">ITL Overland Fleet</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 font-medium focus:outline-none focus:border-brand"
      >
        <option value="all">All Statuses</option>
        <option value="in_transit">In Transit</option>
        <option value="out_for_delivery">Out for Delivery</option>
        <option value="delivered">Delivered</option>
        <option value="exception">Active Exceptions</option>
      </select>
    </div>
  );
}
