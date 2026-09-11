"use client";

import Link from "next/link";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { Shipment } from "@/types/tracking.types";
import { StatusBadge } from "@/features/tracking/components/StatusBadge";

interface Props {
  shipment: Shipment;
}

export function UpdatePackageHeader({ shipment }: Props) {
  return (
    <div className="space-y-4">
      <Link
        href="/admin/dashboard/shipments"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-brand transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Fleet Control Tower
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-1.5 rounded-lg bg-brand/10 text-brand">
              <PackageCheck className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-brand-dark">
              Update Package #{shipment.trackingNumber}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold text-neutral-700">
              {shipment.carrierId.toUpperCase()}
            </span>
            <StatusBadge status={shipment.status} />
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            Lane: {shipment.origin.city}, {shipment.origin.country} → {shipment.destination.city}, {shipment.destination.country}
          </p>
        </div>
      </div>
    </div>
  );
}
