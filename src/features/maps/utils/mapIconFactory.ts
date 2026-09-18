import L from "leaflet";

export function createOriginIcon(city: string, tracking?: string, color: string = "#10b981") {
  const label = tracking ? `${city} (${tracking.slice(-4)})` : city;
  return L.divIcon({
    className: "custom-map-icon",
    html: `
      <div class="flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer">
        <span class="px-2 py-0.5 rounded-md bg-neutral-900/90 text-[10px] font-bold border border-white/20 shadow-md whitespace-nowrap mb-1" style="color:${color}">
          🛫 ${label}
        </span>
        <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md" style="background-color:${color}"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function createDestIcon(city: string, tracking?: string, color: string = "#0088ff") {
  const label = tracking ? `${city} (${tracking.slice(-4)})` : city;
  return L.divIcon({
    className: "custom-map-icon",
    html: `
      <div class="flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer">
        <span class="px-2 py-0.5 rounded-md bg-neutral-900/90 text-[10px] font-bold border border-white/20 shadow-md whitespace-nowrap mb-1" style="color:${color}">
          🛬 ${label}
        </span>
        <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md" style="background-color:${color}"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function createVectorIcon(city: string, tracking?: string, color: string = "#ff5705", isHighlighted: boolean = false) {
  const label = tracking ? `⚡ ${city} • #${tracking}` : `⚡ ${city}`;
  const scale = isHighlighted ? "scale-110 ring-4 ring-white/30" : "";
  return L.divIcon({
    className: "custom-map-icon",
    html: `
      <div class="flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer ${scale} transition-transform">
        <span class="px-2.5 py-0.5 rounded-md text-white text-[10px] font-extrabold shadow-lg whitespace-nowrap mb-1" style="background-color:${color}">
          ${label}
        </span>
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full animate-ping opacity-60" style="background-color:${color}"></div>
          <div class="w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px] font-bold" style="background-color:${color}">
            ▲
          </div>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function createWaypointIcon(city: string, labelText?: string, color: string = "#f59e0b") {
  const label = labelText || city;
  return L.divIcon({
    className: "custom-map-icon",
    html: `
      <div class="flex flex-col items-center -translate-x-1/2 -translate-y-full cursor-pointer">
        <span class="px-2 py-0.5 rounded-md bg-neutral-900/90 text-[10px] font-bold border border-white/20 shadow-md whitespace-nowrap mb-1" style="color:${color}">
          📍 ${label}
        </span>
        <div class="w-2.5 h-2.5 rounded-full border-2 border-white shadow-md" style="background-color:${color}"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

