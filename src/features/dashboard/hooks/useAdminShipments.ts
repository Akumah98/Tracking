import { useState, useEffect, useCallback } from "react";
import data from "@/data/data.json";
import { Shipment } from "@/types/tracking.types";

export function useAdminShipments() {
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shipments, setShipments] = useState<Shipment[]>(data.shipments as unknown as Shipment[]);
  const [activeShipment, setActiveShipment] = useState<Shipment>(data.shipments[0] as unknown as Shipment);
  const [loading, setLoading] = useState(false);

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shipments");
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        const loaded: Shipment[] = json.data.map((d: any) => d.shipment);
        setShipments(loaded);
        setActiveShipment((prev) => {
          const matched = loaded.find((s) => s.id === prev.id || s.trackingNumber === prev.trackingNumber);
          return matched || loaded[0];
        });
      }
    } catch {
      // Fallback preserved
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const filtered = shipments.filter((s) => {
    if (carrierFilter !== "all" && s.carrierId !== carrierFilter) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    return true;
  });

  return {
    shipments,
    filtered,
    loading,
    refresh: fetchShipments,
    activeShipment,
    setActiveShipment,
    carrierFilter,
    setCarrierFilter,
    statusFilter,
    setStatusFilter,
  };
}
