import { useState, useEffect, useCallback } from "react";
import data from "@/data/data.json";
import { Shipment } from "@/types/tracking.types";

const initialShipments: Shipment[] = (data.shipments as unknown as Shipment[]).map((s) => ({
  ...s,
  milestones: (data.milestones as any[] || []).filter((m) => s.milestoneIds?.includes(m.id)),
}));

export function useAdminShipments() {
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [activeShipment, setActiveShipment] = useState<Shipment>(initialShipments[0]);
  const [loading, setLoading] = useState(false);

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shipments");
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        const loaded: Shipment[] = json.data.map((d: any) => ({
          ...d.shipment,
          milestones: d.milestones || [],
        }));
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
