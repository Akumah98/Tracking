import { TrackingResult } from "@/types/tracking.types";
import { StatusBadge } from "./StatusBadge";
import { MilestoneTimeline } from "./MilestoneTimeline";
import { ConsignmentPublicDetails } from "./ConsignmentPublicDetails";
import { ConsignmentBarcodeView } from "./ConsignmentBarcodeView";
import { DownloadReceiptButton } from "./DownloadReceiptButton";
import { Package, Truck } from "lucide-react";

interface TrackingResultCardProps { result: TrackingResult; }

export function TrackingResultCard({ result }: TrackingResultCardProps) {
  const { shipment, milestones } = result;

  return (
    <div className="apple-glass-card rounded-3xl border border-black/[0.06] p-5 sm:p-7 shadow-sm space-y-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.05]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Verified Consignment
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-black/[0.04] font-mono text-xs uppercase font-bold text-neutral-700">
              {shipment.carrierId}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-brand-dark tracking-tight mt-1">
            {shipment.trackingNumber}
          </h2>
          <span className="text-xs text-neutral-400">Order Reference: {shipment.sku}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={shipment.status} />
          <DownloadReceiptButton trackingNumber={shipment.trackingNumber} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-2xl bg-black/[0.02] border border-black/[0.04] text-xs">
        <div>
          <span className="text-neutral-400 block text-[11px] font-medium mb-1">Origin</span>
          <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-neutral-400" />
            {shipment.origin.city}, {shipment.origin.country}
          </span>
        </div>
        <div>
          <span className="text-neutral-400 block text-[11px] font-medium mb-1">Destination</span>
          <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-brand" />
            {shipment.destination.city}, {shipment.destination.country}
          </span>
        </div>
      </div>

      <ConsignmentPublicDetails shipment={shipment} />
      <ConsignmentBarcodeView trackingNumber={shipment.trackingNumber} />
      <MilestoneTimeline milestones={milestones} />
    </div>
  );
}

