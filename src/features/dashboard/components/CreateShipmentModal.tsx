"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, PackageCheck } from "lucide-react";
import { CreateShipmentFields } from "./CreateShipmentFields";

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateShipmentModal({ isOpen, onClose, onSuccess }: CreateShipmentModalProps) {
  const [form, setForm] = useState({
    trackingNumber: `LL-${Math.floor(100000 + Math.random() * 900000)}-US`,
    carrierId: "line_logistics",
    originCity: "",
    destCity: "",
    currentCity: "",
    currentLat: "37.7749",
    currentLng: "-122.4194",
    weight: "2.5kg",
    dimensions: "25x20x15cm",
    status: "in_transit",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          originLat: form.currentLat,
          originLng: form.currentLng,
          destLat: "40.7128",
          destLng: "-74.0060",
        }),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch {
      // Graceful error handle
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 border border-neutral-200">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-brand-dark">Register New Consignment</h3>
              <p className="text-xs text-neutral-400">Admin Control Tower live manifest insertion</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CreateShipmentFields form={form} onChange={(k, v) => setForm((prev) => ({ ...prev, [k]: v }))} />
          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={onClose} className="text-xs">Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-brand hover:bg-brand-secondary text-white text-xs font-semibold">
              <PackageCheck className="w-3.5 h-3.5 mr-1" />
              {loading ? "Registering..." : "Commit Consignment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
