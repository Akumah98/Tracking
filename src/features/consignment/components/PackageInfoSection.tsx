interface SelectField { type: "select"; label: string; key: string; options: [string, string][]; }
interface InputField { type: "input"; label: string; key: string; placeholder: string; inputType?: string; }
type FieldConfig = SelectField | InputField;

interface PkgState {
  origin: string; destination: string; carrier: string;
  shipmentType: string; shipmentMode: string; carrierReferenceNumber: string;
  product: string; contents: string; paymentMode: string;
  freightCost: string; expectedDelivery: string; weight: string;
}
interface Props { data: PkgState; onChange: (key: string, value: string) => void; }

const FIELDS: FieldConfig[] = [
  { type: "input", label: "Origin Country", key: "origin", placeholder: "e.g. United Kingdom" },
  { type: "input", label: "Destination Country", key: "destination", placeholder: "e.g. United States" },
  { type: "select", label: "Carrier", key: "carrier", options: [["DHL","DHL"],["USPS","USPS"],["FedEx","FedEx"],["Other","Other"]] },
  { type: "select", label: "Type of Shipment", key: "shipmentType", options: [["international","International"],["national","National"]] },
  { type: "select", label: "Shipment Mode", key: "shipmentMode", options: [
    ["air_freight","Air Freight"],["international_shipping","International Shipping"],
    ["van_move","Van Move"],["truckload","Truckload"],
  ]},
  { type: "input", label: "Carrier Reference No.", key: "carrierReferenceNumber", placeholder: "e.g. 4366326990" },
  { type: "input", label: "Product", key: "product", placeholder: "e.g. Electronics / Phones" },
  { type: "input", label: "Contents", key: "contents", placeholder: "e.g. 2 Laptops, 3 Chargers" },
  { type: "select", label: "Payment Mode", key: "paymentMode", options: [["prepaid","Prepaid"],["collect","Collect"],["third_party","Third Party"]] },
  { type: "input", label: "Freight Cost (USD)", key: "freightCost", placeholder: "e.g. 450.00", inputType: "number" },
  { type: "input", label: "Expected Delivery Date", key: "expectedDelivery", placeholder: "", inputType: "date" },
  { type: "input", label: "Weight (kg)", key: "weight", placeholder: "e.g. 4.5", inputType: "number" },
];

import { LocationAutocomplete } from "@/features/maps/components/LocationAutocomplete";

export function PackageInfoSection({ data, onChange }: Props) {
  const recordData = data as unknown as Record<string, string>;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-heading font-bold text-brand-dark border-b border-neutral-100 pb-2">Package Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-neutral-600 block mb-1">{f.label}</label>
            {f.key === "origin" || f.key === "destination" ? (
              <LocationAutocomplete
                value={recordData[f.key] || ""}
                onChange={(v) => onChange(f.key, v)}
                onLocationSelect={(loc) => onChange(f.key, loc.city)}
                placeholder={f.type === "input" ? f.placeholder : "Select location"}
              />
            ) : f.type === "select" ? (
              <select value={recordData[f.key] || ""} onChange={(e) => onChange(f.key, e.target.value)}
                className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none">
                {f.options.map(([v, l]: [string, string]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ) : (
              <input type={f.inputType || "text"} value={recordData[f.key] || ""} onChange={(e) => onChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
