"use client";

import { ShipmentStatus } from "@/types/tracking.types";
import { getDefaultMilestoneDescription } from "../utils/statusDescriptions";
import { ManualCoordinateFields } from "./ManualCoordinateFields";

interface Props {
  status: ShipmentStatus;
  setStatus: (status: ShipmentStatus) => void;
  city: string;
  setCity: (city: string) => void;
  lat: number;
  lng: number;
  onCoordinateChange: (lat: number, lng: number) => void;
  description: string;
  setDescription: (desc: string) => void;
  reason: string;
  setReason: (reason: string) => void;
}

export function UpdatePackageInputFields({
  status,
  setStatus,
  city,
  setCity,
  lat,
  lng,
  onCoordinateChange,
  description,
  setDescription,
  reason,
  setReason,
}: Props) {
  const handleStatusChange = (newStatus: ShipmentStatus) => {
    setStatus(newStatus);
    setDescription(getDefaultMilestoneDescription(newStatus));
  };

  return (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Consignment Status</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as ShipmentStatus)}
          className="w-full text-xs font-semibold rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
        >
          <option value="in_transit">In Transit (Active Linehaul)</option>
          <option value="out_for_delivery">Out for Delivery (Local Courier)</option>
          <option value="delivered">Delivered (Completed)</option>
          <option value="exception">Exception / Inspection</option>
          <option value="picked_up">Picked Up</option>
          <option value="order_placed">Order Manifest Created</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Current Checkpoint City / Hub</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Frankfurt Air Cargo Hub"
          className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
        />
      </div>

      <ManualCoordinateFields
        lat={lat}
        lng={lng}
        onCoordinateChange={onCoordinateChange}
        onCityChange={setCity}
      />

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Customer Milestone Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed milestone notice for customer timeline..."
          className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700">Audit Reason / Internal Notes</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Manual dispatch GPS calibration"
          className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
        />
      </div>
    </div>
  );
}
