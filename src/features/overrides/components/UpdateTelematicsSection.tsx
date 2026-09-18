"use client";

import { useState } from "react";
import { ShipmentStatus } from "@/types/tracking.types";
import { UpdatePackageMapPane } from "./UpdatePackageMapPane";
import { UpdatePackageInputFields } from "./UpdatePackageInputFields";
import { Map, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

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
  pickupDate: string;
  setPickupDate: (v: string) => void;
  pickupTime: string;
  setPickupTime: (v: string) => void;
}

export function UpdateTelematicsSection({
  status, setStatus, city, setCity, lat, lng,
  onCoordinateChange, description, setDescription,
  reason, setReason, pickupDate, setPickupDate,
  pickupTime, setPickupTime,
}: Props) {
  const [showMap, setShowMap] = useState(true);
  const isDelivered = status === "delivered";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-heading font-bold text-brand-dark">
          Checkpoint Hub &amp; Geospatial Tracking
        </h3>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-200/60 border border-black/[0.04]">
          <button
            type="button"
            onClick={() => setShowMap(true)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
              showMap ? "bg-white text-brand-dark shadow-xs" : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            <Map className="w-3.5 h-3.5 text-brand" /> Map &amp; Form
          </button>
          <button
            type="button"
            onClick={() => setShowMap(false)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
              !showMap ? "bg-white text-brand-dark shadow-xs" : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            <FileText className="w-3.5 h-3.5 text-brand" /> Form Only
          </button>
        </div>
      </div>

      <div className={cn("grid gap-6 items-start", showMap ? "grid-cols-1 lg:grid-cols-12" : "max-w-2xl mx-auto")}>
        {showMap && (
          <div className="lg:col-span-7">
            <UpdatePackageMapPane lat={lat} lng={lng} city={city} onCoordinateChange={onCoordinateChange} />
          </div>
        )}
        <div className={cn("bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs", showMap ? "lg:col-span-5" : "w-full")}>
          <UpdatePackageInputFields
            status={status} setStatus={setStatus}
            city={city} setCity={setCity}
            lat={lat} lng={lng} onCoordinateChange={onCoordinateChange}
            description={description} setDescription={setDescription}
            reason={reason} setReason={setReason}
            pickupDate={pickupDate} setPickupDate={setPickupDate}
            pickupTime={pickupTime} setPickupTime={setPickupTime}
            isDelivered={isDelivered}
          />
        </div>
      </div>
    </div>
  );
}
