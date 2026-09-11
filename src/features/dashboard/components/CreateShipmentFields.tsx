import { Input } from "@/components/ui/input";

interface CreateShipmentFieldsProps {
  form: any;
  onChange: (key: string, val: string) => void;
}

export function CreateShipmentFields({ form, onChange }: CreateShipmentFieldsProps) {
  return (
    <div className="space-y-3 text-xs">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Waybill / Tracking Number *</label>
          <Input value={form.trackingNumber} onChange={(e) => onChange("trackingNumber", e.target.value)} placeholder="e.g. ITL-894201-US" required />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Logistics Division</label>
          <select value={form.carrierId} onChange={(e) => onChange("carrierId", e.target.value)} className="w-full text-xs rounded-lg border border-neutral-200 p-2.5 bg-white">
            <option value="itl_air">ITL Air Express</option>
            <option value="itl_ocean">ITL Ocean Freight</option>
            <option value="itl_express">ITL Express Courier</option>
            <option value="itl_ground">ITL Overland Logistics</option>
            <option value="itl_whiteglove">ITL White-Glove Fragile</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Origin City *</label>
          <Input value={form.originCity} onChange={(e) => onChange("originCity", e.target.value)} placeholder="e.g. London" required />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Destination City *</label>
          <Input value={form.destCity} onChange={(e) => onChange("destCity", e.target.value)} placeholder="e.g. New York" required />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Current Hub City</label>
          <Input value={form.currentCity} onChange={(e) => onChange("currentCity", e.target.value)} placeholder="e.g. Heathrow Terminal" />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Latitude</label>
          <Input value={form.currentLat} onChange={(e) => onChange("currentLat", e.target.value)} type="number" step="any" placeholder="51.5074" />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Longitude</label>
          <Input value={form.currentLng} onChange={(e) => onChange("currentLng", e.target.value)} type="number" step="any" placeholder="-0.1278" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Weight</label>
          <Input value={form.weight} onChange={(e) => onChange("weight", e.target.value)} placeholder="e.g. 4.2kg" />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Dimensions</label>
          <Input value={form.dimensions} onChange={(e) => onChange("dimensions", e.target.value)} placeholder="e.g. 30x20x15cm" />
        </div>
      </div>
    </div>
  );
}
