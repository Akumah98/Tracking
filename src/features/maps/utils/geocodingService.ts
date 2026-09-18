import mockData from "@/data/data.json";

export interface ResolvedGeo {
  lat: number;
  lng: number;
  resolvedCity: string;
}

export interface CatalogLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  code: string;
  type: string;
  lat: number;
  lng: number;
}

export const LOCATION_CATALOG: CatalogLocation[] =
  ((mockData as unknown as { locationCatalog?: CatalogLocation[] }).locationCatalog) || [];

function hashCoords(str: string): [number, number] {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  const lat = 10 + (Math.abs(hash % 450) / 10);
  const lng = -60 + (Math.abs((hash >> 3) % 1400) / 10);
  return [parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4))];
}

export function resolveCoordinates(locationName: string): ResolvedGeo {
  if (!locationName || !locationName.trim()) {
    return { lat: 40.7128, lng: -74.0060, resolvedCity: "Global Logistics Hub" };
  }
  const clean = locationName.toLowerCase().trim().replace(/[^\w\s]/g, "");

  // Match against global location catalog first
  for (const loc of LOCATION_CATALOG) {
    const nameMatch = loc.name.toLowerCase().includes(clean) || clean.includes(loc.name.toLowerCase());
    const cityMatch = loc.city.toLowerCase() === clean || clean.includes(loc.city.toLowerCase());
    const codeMatch = loc.code.toLowerCase() === clean;
    if (nameMatch || cityMatch || codeMatch) {
      return { lat: loc.lat, lng: loc.lng, resolvedCity: loc.name };
    }
  }

  const [lat, lng] = hashCoords(clean);
  return { lat, lng, resolvedCity: locationName };
}

