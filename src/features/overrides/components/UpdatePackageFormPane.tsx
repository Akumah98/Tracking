"use client";

import { ShipmentStatus } from "@/types/tracking.types";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { UpdatePackageInputFields } from "./UpdatePackageInputFields";

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
  isSubmitting: boolean;
  successMsg: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function UpdatePackageFormPane({
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
  isSubmitting,
  successMsg,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-heading font-bold text-brand-dark border-b border-neutral-100 pb-2">
        Package Status &amp; Telematics Details
      </h3>

      <UpdatePackageInputFields
        status={status}
        setStatus={setStatus}
        city={city}
        setCity={setCity}
        lat={lat}
        lng={lng}
        onCoordinateChange={onCoordinateChange}
        description={description}
        setDescription={setDescription}
        reason={reason}
        setReason={setReason}
      />

      {successMsg && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 bg-brand hover:bg-brand-secondary text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Package Updates...
          </>
        ) : (
          "Save & Update Package"
        )}
      </Button>
    </form>
  );
}
