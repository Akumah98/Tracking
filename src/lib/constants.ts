export const APP_CONFIG = {
  name: "International Transport Line",
  tagline: "Transporting Goods Round The Globe With Zero Friction",
  supportEmail: "info@internationaltransportline.com",
  maxTrackingNumbers: 5,
  debounceMs: 200,
} as const;

export const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  picked_up: { label: "Picked Up", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
  in_transit: { label: "In Transit", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  on_hold: { label: "On Hold", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  customs_hold: { label: "Customs Hold", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  supporting_documents_needed: { label: "Supporting Documents Needed", color: "text-yellow-800", bg: "bg-yellow-50 border-yellow-200" },
  seized: { label: "Seized", color: "text-rose-800", bg: "bg-rose-100 border-rose-300" },
  returned: { label: "Returned", color: "text-zinc-700", bg: "bg-zinc-50 border-zinc-200" },
  delivered: { label: "Delivered", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  order_placed: { label: "Order Placed", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  preparing: { label: "Preparing", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  out_for_delivery: { label: "Out for Delivery", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  exception: { label: "Exception", color: "text-rose-700", bg: "bg-rose-50 border-rose-200" },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/track", label: "Track Package" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
