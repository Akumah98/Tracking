"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateTrackingNumber } from "../utils/trackingNumberGenerator";
import type { ContactPerson } from "@/types/consignment.types";

const emptyContact = (): ContactPerson => ({
  name: "", email: "", phone: "", address: "", city: "",
});

export function useConsignmentForm() {
  const router = useRouter();
  const [trackingNumber] = useState(generateTrackingNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipper, setShipper] = useState<ContactPerson>(emptyContact());
  const [receiver, setReceiver] = useState<ContactPerson>(emptyContact());

  const [pkg, setPkg] = useState({
    origin: "", destination: "", carrier: "DHL", shipmentType: "international",
    shipmentMode: "air_freight", carrierReferenceNumber: "", product: "",
    contents: "", paymentMode: "prepaid", freightCost: "",
    expectedDelivery: "", weight: "1.0",
  });

  const updateShipper = (k: keyof ContactPerson, v: string) =>
    setShipper((p) => ({ ...p, [k]: v }));

  const updateReceiver = (k: keyof ContactPerson, v: string) =>
    setReceiver((p) => ({ ...p, [k]: v }));

  const updatePkg = (k: string, v: string) =>
    setPkg((p) => ({ ...p, [k]: v }));

  const submit = async (pieces: any[], totals: any) => {
    setLoading(true);
    setError(null);
    try {
      const body = {
        trackingNumber, carrierId: pkg.carrier.toLowerCase().replace(/\s/g, "_"),
        status: "order_placed", originCity: pkg.origin, destCity: pkg.destination,
        ...pkg, shipper, receiver,
        packagePieces: pieces, ...totals,
      };
      const res = await fetch("/api/admin/shipments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Creation failed");
      router.push("/admin/dashboard/shipments");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    trackingNumber, shipper, receiver, pkg,
    updateShipper, updateReceiver, updatePkg,
    submit, loading, error,
  };
}
