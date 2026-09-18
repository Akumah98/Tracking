"use client";

import { useState } from "react";
import { Shipment, ShipmentStatus } from "@/types/tracking.types";
import { getDefaultMilestoneDescription } from "../utils/statusDescriptions";

export function useUpdatePackage(shipment: Shipment | null) {
  const [status, setStatus] = useState<ShipmentStatus>(shipment?.status || "in_transit");
  const [city, setCity] = useState(shipment?.currentLocation.city || "");
  const [lat, setLat] = useState(shipment?.currentLocation.lat || 0);
  const [lng, setLng] = useState(shipment?.currentLocation.lng || 0);
  const [description, setDescription] = useState(
    shipment ? getDefaultMilestoneDescription(shipment.status) : ""
  );
  const [reason, setReason] = useState("");
  const [pickupDate, setPickupDate] = useState(shipment?.consignment?.pickupDate || "");
  const [pickupTime, setPickupTime] = useState(shipment?.consignment?.pickupTime || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isDelivered = status === "delivered";

  const handleCoordinateChange = (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipment) return;
    setIsSubmitting(true);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId: shipment.id,
          status,
          city,
          lat,
          lng,
          reason,
          milestoneDesc: description,
          pickupDate: isDelivered ? pickupDate : null,
          pickupTime: isDelivered ? pickupTime : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update package");

      setSuccessMsg("Package telemetry and milestone updated successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    status, setStatus,
    city, setCity,
    lat, lng,
    description, setDescription,
    reason, setReason,
    pickupDate, setPickupDate,
    pickupTime, setPickupTime,
    isDelivered,
    isSubmitting, successMsg,
    handleCoordinateChange, handleSubmit,
  };
}
