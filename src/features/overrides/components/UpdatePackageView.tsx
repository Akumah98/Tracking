"use client";

import { useState } from "react";
import { Shipment } from "@/types/tracking.types";
import { useUpdatePackage } from "../hooks/useUpdatePackage";
import { UpdatePackageHeader } from "./UpdatePackageHeader";
import { UpdatePackageMapPane } from "./UpdatePackageMapPane";
import { UpdatePackageFormPane } from "./UpdatePackageFormPane";
import { Map, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  shipment: Shipment;
}

export function UpdatePackageView({ shipment }: Props) {
  const [showMap, setShowMap] = useState(true);
  const {
    status,
    setStatus,
    city,
    setCity,
    lat,
    lng,
    description,
    setDescription,
    reason,
    setReason,
    isSubmitting,
    successMsg,
    handleCoordinateChange,
    handleSubmit,
  } = useUpdatePackage(shipment);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <UpdatePackageHeader shipment={shipment} />
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-200/60 border border-black/[0.04] self-start sm:self-auto">
          <button
            onClick={() => setShowMap(true)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
              showMap ? "bg-white text-brand-dark shadow-xs" : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            <Map className="w-3.5 h-3.5 text-brand" /> Map &amp; Form
          </button>
          <button
            onClick={() => setShowMap(false)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
              !showMap ? "bg-white text-brand-dark shadow-xs" : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            <FileText className="w-3.5 h-3.5 text-brand" /> Form Only (No Map)
          </button>
        </div>
      </div>

      <div className={cn("grid gap-6 items-start", showMap ? "grid-cols-1 lg:grid-cols-12" : "max-w-2xl mx-auto")}>
        {showMap && (
          <div className="lg:col-span-7">
            <UpdatePackageMapPane
              lat={lat}
              lng={lng}
              city={city}
              onCoordinateChange={handleCoordinateChange}
            />
          </div>
        )}

        <div className={cn(showMap ? "lg:col-span-5" : "w-full")}>
          <UpdatePackageFormPane
            status={status}
            setStatus={setStatus}
            city={city}
            setCity={setCity}
            lat={lat}
            lng={lng}
            onCoordinateChange={handleCoordinateChange}
            description={description}
            setDescription={setDescription}
            reason={reason}
            setReason={setReason}
            isSubmitting={isSubmitting}
            successMsg={successMsg}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
