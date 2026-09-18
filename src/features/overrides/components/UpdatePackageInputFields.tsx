"use client";

import { ShipmentStatus } from "@/types/tracking.types";
import { LocationAutocomplete } from "@/features/maps/components/LocationAutocomplete";
import { ManualCoordinateFields } from "./ManualCoordinateFields";
import { PickupGateFields } from "./PickupGateFields";

interface Props {
  status: ShipmentStatus; setStatus: (status: ShipmentStatus) => void;
  city: string; setCity: (city: string) => void;
  lat: number; lng: number; onCoordinateChange: (lat: number, lng: number) => void;
  description: string; setDescription: (desc: string) => void;
  reason: string; setReason: (reason: string) => void;
  pickupDate: string; setPickupDate: (v: string) => void;
  pickupTime: string; setPickupTime: (v: string) => void;
  isDelivered: boolean;
}

const STATUS_OPTIONS: [ShipmentStatus, string][] = [
  ["picked_up", "Picked up"], ["in_transit", "In transit"],
  ["on_hold", "On Hold"], ["customs_hold", "Customs Hold"],
  ["supporting_documents_needed", "Supporting Documents Needed"],
  ["seized", "Seized"], ["returned", "Returned"],
  ["delivered", "Delivered"], ["cancelled", "Cancelled"],
];

export function UpdatePackageInputFields({
  status, setStatus, city, setCity, lat, lng,
  onCoordinateChange, description, setDescription,
  reason, setReason, pickupDate, setPickupDate,
  pickupTime, setPickupTime, isDelivered,
}: Props) {
  return (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-700">
            Consignment Status <span className="text-rose-500 font-bold">*</span>
          </label>
          <span className="text-[10px] text-neutral-400">Mandatory</span>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
          className="w-full text-xs font-semibold rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
          required
        >
          <option value="">-- Select Consignment Status * --</option>
          {STATUS_OPTIONS.map(([val, lbl]) => (
            <option key={val} value={val}>{lbl}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-700">Current Checkpoint City / Hub</label>
          <span className="text-[10px] text-brand font-medium">Auto-populates GPS</span>
        </div>
        <LocationAutocomplete
          value={city}
          onChange={setCity}
          onLocationSelect={(loc) => {
            setCity(loc.city);
            onCoordinateChange(loc.lat, loc.lng);
          }}
          placeholder="e.g. Frankfurt, London Heathrow, JFK, Tokyo..."
        />
      </div>

      <ManualCoordinateFields lat={lat} lng={lng} onCoordinateChange={onCoordinateChange} onCityChange={setCity} />

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-700">
            Admin Update Comment / Telemetry Log <span className="text-rose-500 font-bold">*</span>
          </label>
          <span className="text-[10px] text-neutral-400">Shown on public tracking timeline</span>
        </div>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Package arrived at Frankfurt Air Cargo terminal and cleared customs..."
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

      <PickupGateFields
        pickupDate={pickupDate} setPickupDate={setPickupDate}
        pickupTime={pickupTime} setPickupTime={setPickupTime}
        isDelivered={isDelivered}
      />
    </div>
  );
}

