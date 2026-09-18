const PREFIXES = ["ITL", "GTX", "LTL", "XPR"];
const REGIONS = ["US", "UK", "EU", "AE", "NG", "CA", "AU"];

export function generateTrackingNumber(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const digits = Math.floor(100000 + Math.random() * 900000).toString();
  const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  return `${prefix}-${digits}-${region}`;
}
