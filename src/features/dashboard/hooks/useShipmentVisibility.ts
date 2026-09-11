"use client";

import { useState, useMemo } from "react";
import { Shipment } from "@/types/tracking.types";

export function useShipmentVisibility(shipments: Shipment[]) {
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const visibleIds = useMemo(() => {
    return new Set(shipments.filter((s) => !hiddenIds.has(s.id)).map((s) => s.id));
  }, [shipments, hiddenIds]);

  const visibleShipments = useMemo(() => {
    return shipments.filter((s) => !hiddenIds.has(s.id));
  }, [shipments, hiddenIds]);

  const toggleVisibility = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (allVisible: boolean) => {
    if (allVisible) {
      setHiddenIds(new Set());
    } else {
      setHiddenIds(new Set(shipments.map((s) => s.id)));
    }
  };

  return {
    visibleIds,
    visibleShipments,
    toggleVisibility,
    toggleAll,
  };
}
