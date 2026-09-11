import { Input } from "@/components/ui/input";

interface MilestoneOverrideFormProps {
  desc: string;
  city: string;
  lat: number;
  lng: number;
  status: string;
  onChange: (updates: { desc: string; city: string; lat: number; lng: number; status: string }) => void;
}

export function MilestoneOverrideForm({
  desc,
  city,
  lat,
  lng,
  status,
  onChange,
}: MilestoneOverrideFormProps) {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="font-semibold text-neutral-700 block mb-1">Checkpoint Description *</label>
        <Input
          value={desc}
          onChange={(e) => onChange({ desc: e.target.value, city, lat, lng, status })}
          placeholder="e.g. Cleared customs and transferred to local hub"
          required
        />
      </div>
      <div>
        <label className="font-semibold text-neutral-700 block mb-1">Facility / Hub City</label>
        <Input
          value={city}
          onChange={(e) => onChange({ desc, city: e.target.value, lat, lng, status })}
          placeholder="e.g. Frankfurt Airport Logistics Center"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Hub Latitude</label>
          <Input
            value={lat}
            onChange={(e) => onChange({ desc, city, lat: parseFloat(e.target.value) || 0, lng, status })}
            type="number"
            step="any"
          />
        </div>
        <div>
          <label className="font-semibold text-neutral-700 block mb-1">Hub Longitude</label>
          <Input
            value={lng}
            onChange={(e) => onChange({ desc, city, lat, lng: parseFloat(e.target.value) || 0, status })}
            type="number"
            step="any"
          />
        </div>
      </div>
    </div>
  );
}
