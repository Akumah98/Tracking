"use client";

import { useState } from "react";
import { Shipment, ShipmentStatus } from "@/types/tracking.types";
import { ContactPerson } from "@/types/consignment.types";
import { computeConsignmentDiff, FieldDiff } from "../utils/packageDiffHelper";

export type UpdateTab = "telematics" | "contacts" | "package" | "pieces";

export function useUpdatePackageForm(shipment: Shipment) {
  const c = shipment.consignment;
  const [activeTab, setActiveTab] = useState<UpdateTab>("telematics");
  const [status, setStatus] = useState<ShipmentStatus>(shipment.status || "in_transit");
  const [city, setCity] = useState(shipment.currentLocation.city || "");
  const [lat, setLat] = useState(shipment.currentLocation.lat || 0);
  const [lng, setLng] = useState(shipment.currentLocation.lng || 0);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [pickupDate, setPickupDate] = useState(c?.pickupDate || "");
  const [pickupTime, setPickupTime] = useState(c?.pickupTime || "");

  const [shipper, setShipper] = useState<ContactPerson>(c?.shipper || { name: "", email: "", phone: "", address: "", city: "" });
  const [receiver, setReceiver] = useState<ContactPerson>(c?.receiver || { name: "", email: "", phone: "", address: "", city: "" });
  const [pkg, setPkg] = useState({
    origin: c?.origin || shipment.origin.city || "", destination: c?.destination || shipment.destination.city || "",
    carrier: c?.carrier || shipment.carrierId || "DHL", shipmentType: c?.shipmentType || "international",
    shipmentMode: c?.shipmentMode || "air_freight", carrierReferenceNumber: c?.carrierReferenceNumber || "",
    product: c?.product || "", contents: c?.contents || "", paymentMode: c?.paymentMode || "Credit Card",
    freightCost: String(c?.freightCost || ""), departureDate: "",
    expectedDeliveryDate: c?.expectedDelivery?.slice(0, 10) || shipment.estimatedDelivery?.slice(0, 10) || "",
    weight: String(c?.totalActualWeight || shipment.weight || ""),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateShipper = (k: keyof ContactPerson, v: string) => setShipper((p) => ({ ...p, [k]: v }));
  const updateReceiver = (k: keyof ContactPerson, v: string) => setReceiver((p) => ({ ...p, [k]: v }));
  const updatePkg = (k: string, v: string) => setPkg((p) => ({ ...p, [k]: v }));

  const getDiffs = (piecesCount: number): FieldDiff[] =>
    computeConsignmentDiff(shipment, { status, city, lat, lng, description, reason, shipper, receiver, pkg, piecesCount });

  const submitUpdate = async (pieces: unknown[], totals: Record<string, unknown>) => {
    if (!status) return setErrorMsg("Consignment status is mandatory. Please select a status.");
    if (!description.trim()) return setErrorMsg("Admin comment is mandatory for Activity Telemetry Log.");
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const payload = {
        id: shipment.id, trackingNumber: shipment.trackingNumber,
        status, city, lat, lng, milestoneDesc: description.trim(),
        originLat: shipment.origin.lat, originLng: shipment.origin.lng,
        destLat: shipment.destination.lat, destLng: shipment.destination.lng,
        reason: reason.trim() || "Admin update from Control Tower",
        pickupDate: status === "delivered" ? pickupDate : null,
        pickupTime: status === "delivered" ? pickupTime : null,
        shipper, receiver, ...pkg, packagePieces: pieces,
        totalActualWeight: totals.totalActualWeight,
        totalVolumetricWeight: totals.totalVolumetricWeight,
        totalVolume: totals.totalVolume,
      };
      const res = await fetch("/api/admin/shipments", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      setIsSuccess(true);
      setSuccessMsg("Consignment details and telemetry updated successfully!");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to update package");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activeTab, setActiveTab, status, setStatus, city, setCity, lat, setLat, lng, setLng,
    description, setDescription, reason, setReason, pickupDate, setPickupDate, pickupTime, setPickupTime,
    shipper, updateShipper, receiver, updateReceiver, pkg, updatePkg,
    isSubmitting, isConfirmModalOpen, setIsConfirmModalOpen, isSuccess, setIsSuccess,
    successMsg, errorMsg, setErrorMsg, submitUpdate, getDiffs,
  };
}

