import { Input } from "@/components/ui/input";
import { GeoLocation } from "@/types/tracking.types";
import { AdminMapPicker } from "@/features/maps/components/AdminMapPicker";
import { LocationAutocomplete } from "@/features/maps/components/LocationAutocomplete";

interface LocationOverrideFormProps {
  location: GeoLocation;
  city: string;
  lat: number;
  lng: number;
  onChange: (updates: { city: string; lat: number; lng: number }) => void;
}

export function LocationOverrideForm({
  city,
  lat,
  lng,
  onChange,
}: LocationOverrideFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="font-medium text-neutral-700 block mb-1">
          Interactive Geospatial Positioning
        </label>
        <AdminMapPicker
          lat={lat}
          lng={lng}
          onCoordinateChange={(newLat, newLng) =>
            onChange({
              city,
              lat: Number(newLat.toFixed(4)),
              lng: Number(newLng.toFixed(4)),
            })
          }
        />
      </div>

      <div>
        <label className="font-medium text-neutral-700 block mb-1">
          Current Checkpoint City / Hub
        </label>
        <LocationAutocomplete
          value={city}
          onChange={(newCity) => onChange({ city: newCity, lat, lng })}
          onLocationSelect={(loc) => onChange({ city: loc.city, lat: loc.lat, lng: loc.lng })}
          placeholder="e.g. Frankfurt, London Heathrow, JFK Cargo..."
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-medium text-neutral-700 block mb-1">Latitude</label>
          <Input
            value={lat}
            onChange={(e) =>
              onChange({ city, lat: parseFloat(e.target.value) || 0, lng })
            }
            type="number"
            step="any"
            required
          />
        </div>
        <div>
          <label className="font-medium text-neutral-700 block mb-1">Longitude</label>
          <Input
            value={lng}
            onChange={(e) =>
              onChange({ city, lat, lng: parseFloat(e.target.value) || 0 })
            }
            type="number"
            step="any"
            required
          />
        </div>
      </div>
      <p className="text-[10px] text-neutral-400">
        Clicking the map or dragging the pin updates the active vector on the public tracking map.
      </p>
    </div>
  );
}
