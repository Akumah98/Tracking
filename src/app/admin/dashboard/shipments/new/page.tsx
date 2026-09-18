"use client";

import { useConsignmentForm } from "@/features/consignment/hooks/useConsignmentForm";
import { usePackagePieces } from "@/features/consignment/hooks/usePackagePieces";
import { TrackingNumberHeader } from "@/features/consignment/components/TrackingNumberHeader";
import { ContactInfoSection } from "@/features/consignment/components/ContactInfoSection";
import { PackageInfoSection } from "@/features/consignment/components/PackageInfoSection";
import { PackagePiecesTable } from "@/features/consignment/components/PackagePiecesTable";
import { ConsignmentFormActions } from "@/features/consignment/components/ConsignmentFormActions";

export default function NewConsignmentPage() {
  const { trackingNumber, shipper, receiver, pkg, updateShipper, updateReceiver, updatePkg, submit, loading, error } =
    useConsignmentForm();

  const actualWeightKg = parseFloat(pkg.weight) || 0;
  const { pieces, addPiece, removePiece, updatePiece, totals } = usePackagePieces(actualWeightKg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(pieces, totals);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark">
          Register New Consignment
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Admin Control Tower — complete all sections to commit consignment to the manifest.
        </p>
      </div>

      <TrackingNumberHeader trackingNumber={trackingNumber} />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <ContactInfoSection label="Shipper Information" data={shipper} onChange={updateShipper} />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <ContactInfoSection label="Receiver Information" data={receiver} onChange={updateReceiver} />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <PackageInfoSection data={pkg} onChange={updatePkg} />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <PackagePiecesTable
            pieces={pieces} totals={totals}
            onAdd={addPiece} onRemove={removePiece} onChange={updatePiece}
          />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <ConsignmentFormActions loading={loading} error={error} />
        </div>
      </form>
    </div>
  );
}
