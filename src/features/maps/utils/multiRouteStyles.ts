export interface RouteTheme {
  primary: string;
  glow: string;
  remaining: string;
  badgeClass: string;
  dotClass: string;
  name: string;
}

export const ROUTE_THEMES: RouteTheme[] = [
  {
    primary: "#ff5705",
    glow: "#ff8833",
    remaining: "#ffaa66",
    badgeClass: "border-orange-500/40 text-orange-400",
    dotClass: "bg-orange-500",
    name: "Air Logistics"
  },
  {
    primary: "#0088ff",
    glow: "#33a3ff",
    remaining: "#80c4ff",
    badgeClass: "border-sky-500/40 text-sky-400",
    dotClass: "bg-sky-500",
    name: "Ocean Maritime"
  },
  {
    primary: "#10b981",
    glow: "#34d399",
    remaining: "#86efac",
    badgeClass: "border-emerald-500/40 text-emerald-400",
    dotClass: "bg-emerald-500",
    name: "Express Courier"
  },
  {
    primary: "#8b5cf6",
    glow: "#a78bfa",
    remaining: "#c4b5fd",
    badgeClass: "border-violet-500/40 text-violet-400",
    dotClass: "bg-violet-500",
    name: "Intermodal Rail"
  },
  {
    primary: "#ec4899",
    glow: "#f472b6",
    remaining: "#fbcfe8",
    badgeClass: "border-pink-500/40 text-pink-400",
    dotClass: "bg-pink-500",
    name: "Life Sciences"
  }
];

export function getRouteTheme(index: number): RouteTheme {
  return ROUTE_THEMES[index % ROUTE_THEMES.length];
}
