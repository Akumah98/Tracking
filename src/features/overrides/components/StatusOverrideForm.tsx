import { Input } from "@/components/ui/input";

interface StatusOverrideFormProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  description: string;
  onDescChange: (desc: string) => void;
  location: string;
  onLocationChange: (loc: string) => void;
}

export function StatusOverrideForm({
  currentStatus,
  onStatusChange,
  description,
  onDescChange,
  location,
  onLocationChange,
}: StatusOverrideFormProps) {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="font-semibold text-neutral-700 block mb-1">Status Transition</label>
        <select
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full text-xs rounded-xl border border-neutral-200 p-2.5 bg-white focus:outline-none focus:border-brand"
        >
          <option value="order_placed">Order Placed</option>
          <option value="preparing">Preparing</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="exception">Exception Hold</option>
          <option value="returned">Returned to Sender</option>
        </select>
      </div>

      <div>
        <label className="font-semibold text-neutral-700 block mb-1">Milestone Checkpoint Description</label>
        <Input
          value={description}
          onChange={(e) => onDescChange(e.target.value)}
          placeholder="e.g. Customs clearance completed or Delivered to recipient"
          className="rounded-xl"
        />
      </div>

      <div>
        <label className="font-semibold text-neutral-700 block mb-1">Checkpoint Location / Facility</label>
        <Input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="e.g. Frankfurt Central Logistics Hub"
          className="rounded-xl"
        />
      </div>

      <p className="text-[10px] text-neutral-400">
        Submitting updates the live status badge and inserts an authoritative milestone event.
      </p>
    </div>
  );
}
