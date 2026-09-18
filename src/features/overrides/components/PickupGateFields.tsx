"use client";

interface Props {
  pickupDate: string;
  setPickupDate: (v: string) => void;
  pickupTime: string;
  setPickupTime: (v: string) => void;
  isDelivered: boolean;
}

export function PickupGateFields({
  pickupDate, setPickupDate,
  pickupTime, setPickupTime,
  isDelivered,
}: Props) {
  return (
    <div className="space-y-3 pt-2 border-t border-neutral-100">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-700">Pickup Date</label>
          {!isDelivered && (
            <span className="text-[10px] text-amber-500 font-medium">Only active when status is Delivered</span>
          )}
        </div>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          disabled={!isDelivered}
          className={`w-full text-xs rounded-xl border p-2.5 focus:outline-none transition-colors ${
            isDelivered
              ? "border-neutral-200 bg-neutral-50/50 focus:border-brand"
              : "border-neutral-100 bg-neutral-100/60 text-neutral-400 cursor-not-allowed"
          }`}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Pickup Time</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          disabled={!isDelivered}
          className={`w-full text-xs rounded-xl border p-2.5 focus:outline-none transition-colors ${
            isDelivered
              ? "border-neutral-200 bg-neutral-50/50 focus:border-brand"
              : "border-neutral-100 bg-neutral-100/60 text-neutral-400 cursor-not-allowed"
          }`}
        />
      </div>
    </div>
  );
}
