import { Input } from "@/components/ui/input";

interface ParcelOverrideFormProps {
  weight: string;
  dimensions: string;
}

export function ParcelOverrideForm({ weight, dimensions }: ParcelOverrideFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="font-medium text-neutral-700 block mb-1">Weight</label>
        <Input defaultValue={weight} required />
      </div>
      <div>
        <label className="font-medium text-neutral-700 block mb-1">Dimensions</label>
        <Input defaultValue={dimensions} required />
      </div>
    </div>
  );
}
