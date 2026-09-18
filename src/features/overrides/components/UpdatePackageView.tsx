"use client";

import { Shipment } from "@/types/tracking.types";
import { useUpdatePackageForm } from "../hooks/useUpdatePackageForm";
import { usePackagePieces } from "@/features/consignment/hooks/usePackagePieces";
import { UpdatePackageHeader } from "./UpdatePackageHeader";
import { UpdatePackageTabs } from "./UpdatePackageTabs";
import { UpdateTelematicsSection } from "./UpdateTelematicsSection";
import { UpdateContactsSection } from "./UpdateContactsSection";
import { UpdatePackageSpecsSection } from "./UpdatePackageSpecsSection";
import { UpdatePiecesSection } from "./UpdatePiecesSection";
import { UpdatePackageActionsBar } from "./UpdatePackageActionsBar";
import { ConsignmentUpdateConfirmModal } from "./ConsignmentUpdateConfirmModal";

interface Props { shipment: Shipment; }

export function UpdatePackageView({ shipment }: Props) {
  const form = useUpdatePackageForm(shipment);
  const actualWeight = parseFloat(form.pkg.weight) || 0;
  const { pieces, addPiece, removePiece, updatePiece, totals } = usePackagePieces(
    actualWeight, shipment.consignment?.packagePieces
  );

  const handleOpenReview = () => {
    if (!form.description.trim()) {
      form.setErrorMsg("Admin comment is required. Please provide an activity telemetry update comment.");
      return;
    }
    form.setErrorMsg(null);
    form.setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    form.submitUpdate(pieces, totals);
  };

  const diffs = form.getDiffs(pieces.length);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <UpdatePackageHeader shipment={shipment} />
        <UpdatePackageTabs activeTab={form.activeTab} onTabChange={form.setActiveTab} />
      </div>

      <div>
        {form.activeTab === "telematics" && (
          <UpdateTelematicsSection
            status={form.status} setStatus={form.setStatus} city={form.city} setCity={form.setCity}
            lat={form.lat} lng={form.lng} onCoordinateChange={(lt, lg) => { form.setLat(lt); form.setLng(lg); }}
            description={form.description} setDescription={form.setDescription}
            reason={form.reason} setReason={form.setReason}
            pickupDate={form.pickupDate} setPickupDate={form.setPickupDate}
            pickupTime={form.pickupTime} setPickupTime={form.setPickupTime}
          />
        )}
        {form.activeTab === "contacts" && (
          <UpdateContactsSection
            shipper={form.shipper} onShipperChange={form.updateShipper}
            receiver={form.receiver} onReceiverChange={form.updateReceiver}
          />
        )}
        {form.activeTab === "package" && <UpdatePackageSpecsSection data={form.pkg} onChange={form.updatePkg} />}
        {form.activeTab === "pieces" && (
          <UpdatePiecesSection pieces={pieces} totals={totals} onAdd={addPiece} onRemove={removePiece} onChange={updatePiece} />
        )}
      </div>

      <UpdatePackageActionsBar
        isSubmitting={form.isSubmitting} successMsg={form.successMsg} errorMsg={form.errorMsg}
        onSubmit={handleOpenReview}
      />

      <ConsignmentUpdateConfirmModal
        isOpen={form.isConfirmModalOpen}
        onClose={() => form.setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        isSubmitting={form.isSubmitting}
        isSuccess={form.isSuccess}
        trackingNumber={shipment.trackingNumber}
        diffs={diffs}
        errorMsg={form.errorMsg}
      />
    </div>
  );
}

