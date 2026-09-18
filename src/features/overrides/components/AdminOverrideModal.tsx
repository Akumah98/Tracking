"use client";

import { useState } from "react";
import { Shipment } from "@/types/tracking.types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { LocationOverrideForm } from "./LocationOverrideForm";
import { ParcelOverrideForm } from "./ParcelOverrideForm";
import { StatusOverrideForm } from "./StatusOverrideForm";
import { AdminOverrideTabs } from "./AdminOverrideTabs";
import { OverrideSuccessView } from "./OverrideSuccessView";
import { getDefaultDescription } from "../utils/statusDescriptions";

interface Props {
  shipment: Shipment | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdminOverrideModal({ shipment, onClose, onSuccess }: Props) {
  const [tab, setTab] = useState<"location" | "parcel" | "status">("location");
  const [city, setCity] = useState(shipment?.currentLocation?.city || "");
  const [coords, setCoords] = useState({ lat: shipment?.currentLocation?.lat || 0, lng: shipment?.currentLocation?.lng || 0 });
  const [status, setStatus] = useState(shipment?.status || "in_transit");
  const [desc, setDesc] = useState(getDefaultDescription(shipment?.status || "in_transit"));
  const [loc, setLoc] = useState(shipment?.currentLocation?.city || "Central Hub");
  const [saved, setSaved] = useState(false);

  if (!shipment) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId: shipment.id, field: tab, city: tab === "location" ? city : loc,
          lat: tab === "location" ? coords.lat : undefined, lng: tab === "location" ? coords.lng : undefined,
          status: tab === "status" ? status : undefined, reason: "Manual admin dispatch",
          milestoneDesc: tab === "location" ? `In Transit: Arrived at ${city}` : desc,
        }),
      });
      if (onSuccess) onSuccess();
    } catch {}
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 border border-neutral-200">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="font-heading font-bold text-base text-brand-dark">Telemetry Manual Override</h3>
            <span className="text-xs font-mono text-neutral-400">#{shipment.trackingNumber}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <AdminOverrideTabs activeTab={tab} onTabChange={setTab} />

        {saved ? <OverrideSuccessView /> : (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            {tab === "location" && (
              <LocationOverrideForm
                location={shipment.currentLocation} city={city} lat={coords.lat} lng={coords.lng}
                onChange={(up) => { setCity(up.city); setCoords({ lat: up.lat, lng: up.lng }); }}
              />
            )}
            {tab === "parcel" && <ParcelOverrideForm weight={shipment.weight} dimensions={shipment.dimensions} />}
            {tab === "status" && (
              <StatusOverrideForm
                currentStatus={status} location={loc} onLocationChange={setLoc}
                onStatusChange={(s) => { setStatus(s as any); setDesc(getDefaultDescription(s)); }}
                description={desc} onDescChange={setDesc}
              />
            )}
            <Button type="submit" className="w-full h-11 rounded-xl bg-brand hover:bg-brand-secondary text-white font-bold">
              Commit Override &amp; Update Map
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
