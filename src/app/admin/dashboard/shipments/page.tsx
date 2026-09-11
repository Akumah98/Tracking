"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shipment } from "@/types/tracking.types";
import { FleetFilterBar } from "@/features/dashboard/components/FleetFilterBar";
import { InteractiveRouteMap } from "@/features/maps/components/InteractiveRouteMap";
import { MapVisibilityControls } from "@/features/dashboard/components/MapVisibilityControls";
import { ShipmentGrid } from "@/features/dashboard/components/ShipmentGrid";
import { CreateShipmentModal } from "@/features/dashboard/components/CreateShipmentModal";
import { useAdminShipments } from "@/features/dashboard/hooks/useAdminShipments";
import { useShipmentVisibility } from "@/features/dashboard/hooks/useShipmentVisibility";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminShipmentsPage() {
  const router = useRouter();
  const {
    filtered,
    refresh,
    activeShipment,
    setActiveShipment,
    carrierFilter,
    setCarrierFilter,
    statusFilter,
    setStatusFilter,
  } = useAdminShipments();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { visibleIds, visibleShipments, toggleVisibility, toggleAll } = useShipmentVisibility(filtered);

  const handleUpdatePackage = (shipment: Shipment) => {
    router.push(`/admin/dashboard/shipments/update?id=${shipment.id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark">
            Live Fleet &amp; Telematics Control Tower
          </h1>
          <p className="text-xs text-neutral-500">
            Full-spectrum geospatial map with individual package visibility toggles and direct telemetry updates.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-brand hover:bg-brand-secondary text-white text-xs font-semibold h-10 px-4 rounded-xl shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create Consignment
        </Button>
      </div>

      <FleetFilterBar
        selectedCarrier={carrierFilter}
        onCarrierChange={setCarrierFilter}
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="space-y-3">
        <MapVisibilityControls
          shipments={filtered}
          visibleIds={visibleIds}
          onToggleVisibility={toggleVisibility}
          onToggleAll={toggleAll}
        />

        <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 ring-1 ring-white/10">
          <InteractiveRouteMap
            shipments={visibleShipments}
            selectedTrackingNumber={activeShipment?.trackingNumber}
            onSelectTrackingNumber={(tn) => {
              const s = filtered.find((item) => item.trackingNumber === tn);
              if (s) setActiveShipment(s);
            }}
            className="w-full h-[500px] sm:h-[580px] md:h-[660px]"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-heading font-bold text-brand-dark uppercase tracking-wider">
            All Active Consignments ({filtered.length})
          </h2>
          <span className="text-[11px] text-neutral-400 font-mono">
            Click &quot;Update Package&quot; to open full-screen telemetry editor
          </span>
        </div>

        <ShipmentGrid
          shipments={filtered}
          activeShipment={activeShipment}
          onSelect={setActiveShipment}
          onUpdatePackage={handleUpdatePackage}
        />
      </div>

      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={refresh}
      />
    </div>
  );
}
