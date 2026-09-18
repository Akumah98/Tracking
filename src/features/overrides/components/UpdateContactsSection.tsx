import { ContactPerson } from "@/types/consignment.types";
import { ContactInfoSection } from "@/features/consignment/components/ContactInfoSection";

interface Props {
  shipper: ContactPerson;
  onShipperChange: (key: keyof ContactPerson, value: string) => void;
  receiver: ContactPerson;
  onReceiverChange: (key: keyof ContactPerson, value: string) => void;
}

export function UpdateContactsSection({
  shipper, onShipperChange,
  receiver, onReceiverChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
        <ContactInfoSection
          label="Shipper Information (Origin Contact)"
          data={shipper}
          onChange={onShipperChange}
        />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
        <ContactInfoSection
          label="Receiver Information (Destination Contact)"
          data={receiver}
          onChange={onReceiverChange}
        />
      </div>
    </div>
  );
}
