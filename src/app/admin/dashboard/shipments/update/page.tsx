"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminShipments } from "@/features/dashboard/hooks/useAdminShipments";
import { UpdatePackageView } from "@/features/overrides/components/UpdatePackageView";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function UpdatePackageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const trackingNumber = searchParams.get("trackingNumber");
  const { shipments, loading } = useAdminShipments();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
        <p className="text-xs text-neutral-500">Loading package details...</p>
      </div>
    );
  }

  const shipment = shipments.find(
    (s) => s.id === id || (trackingNumber && s.trackingNumber === trackingNumber)
  ) || shipments[0];

  if (!shipment) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-lg font-bold text-brand-dark">Package Not Found</h2>
        <p className="text-xs text-neutral-500">No consignment matches the requested identifier.</p>
        <Link
          href="/admin/dashboard/shipments"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Fleet Control Tower
        </Link>
      </div>
    );
  }

  return <UpdatePackageView shipment={shipment} />;
}

export default function UpdatePackagePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-16">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      }
    >
      <UpdatePackageContent />
    </Suspense>
  );
}
