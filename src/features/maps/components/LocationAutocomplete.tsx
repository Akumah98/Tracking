"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { LOCATION_CATALOG, resolveCoordinates, CatalogLocation } from "../utils/geocodingService";
import { MapPin, Plane, Ship, Building2, Check } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (loc: { city: string; lat: number; lng: number }) => void;
  placeholder?: string;
}

export function LocationAutocomplete({ value, onChange, onLocationSelect, placeholder }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!value || value.trim().length < 1) return LOCATION_CATALOG.slice(0, 7);
    const q = value.toLowerCase().trim();
    return LOCATION_CATALOG.filter((l) =>
      l.city.toLowerCase().includes(q) || l.country.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) || l.name.toLowerCase().includes(q)
    ).slice(0, 7);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (val: string) => {
    onChange(val);
    setIsOpen(true);
    if (val && val.trim()) {
      const geo = resolveCoordinates(val);
      onLocationSelect({ city: val, lat: geo.lat, lng: geo.lng });
    }
  };

  const handleSelect = (loc: CatalogLocation) => {
    onChange(loc.city);
    onLocationSelect({ city: loc.city, lat: loc.lat, lng: loc.lng });
    setIsOpen(false);
  };

  const getIcon = (type: string) => {
    if (type.includes("Air")) return <Plane className="w-3.5 h-3.5 text-brand shrink-0" />;
    if (type.includes("Port")) return <Ship className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
    return <Building2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || "Search city, airport code (FRA, JFK), or hub..."}
          className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 pr-8 focus:border-brand focus:outline-none transition-colors"
        />
        <MapPin className="absolute right-2.5 top-3 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-xl bg-white border border-neutral-200 shadow-lg overflow-hidden py-1 max-h-56 overflow-y-auto">
          {suggestions.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(loc); }}
              className="w-full min-h-[44px] px-3 py-2 text-left hover:bg-brand/5 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {getIcon(loc.type)}
                <div className="truncate">
                  <span className="font-semibold text-neutral-800">{loc.name}</span>
                  <span className="text-[11px] text-neutral-400 block truncate">{loc.city}, {loc.country}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">{loc.code}</span>
                {loc.city.toLowerCase() === value.toLowerCase() && <Check className="w-3.5 h-3.5 text-brand" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

