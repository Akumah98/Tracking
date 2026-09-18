import type { Shipment } from "@/types/tracking.types";
import { Package, Truck, User, Phone, Mail, MapPin, Tag, CreditCard, Weight } from "lucide-react";

interface Props { shipment: Shipment; }

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-neutral-50 last:border-0">
      <Icon className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-[11px] text-neutral-400 font-medium">{label}</p>
        <p className="text-xs font-semibold text-neutral-800">{value}</p>
      </div>
    </div>
  );
}

function ContactBlock({ title, c }: { title: string; c: any }) {
  if (!c?.name) return null;
  return (
    <div className="space-y-1">
      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{title}</h4>
      <Row icon={User} label="Name" value={c.name} />
      <Row icon={Phone} label="Phone" value={c.phone} />
      <Row icon={Mail} label="Email" value={c.email} />
      <Row icon={MapPin} label="Address" value={c.address ? `${c.address}, ${c.city}` : c.city} />
    </div>
  );
}

export function ConsignmentPublicDetails({ shipment }: Props) {
  const c = shipment.consignment;
  if (!c) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-black/[0.05]">
      <ContactBlock title="Shipper" c={c.shipper} />
      <ContactBlock title="Receiver" c={c.receiver} />
      <div className="space-y-1 sm:col-span-2">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Package Details</h4>
        <div className="grid grid-cols-2 gap-x-6">
          <Row icon={Tag} label="Product" value={c.product} />
          <Row icon={Package} label="Contents" value={c.contents} />
          <Row icon={Truck} label="Carrier" value={c.carrier} />
          <Row icon={Weight} label="Weight" value={c.totalActualWeight ? `${c.totalActualWeight} kg` : ""} />
          <Row icon={CreditCard} label="Payment Mode" value={c.paymentMode} />
          <Row icon={Package} label="Shipment Mode" value={c.shipmentMode?.replace(/_/g, " ")} />
        </div>
      </div>
    </div>
  );
}
