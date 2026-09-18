"use client";

import dynamic from "next/dynamic";

const DynamicPicker = dynamic(() => import("./AdminMapPickerInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-400">
      Initializing High-Resolution Map Picker...
    </div>
  ),
});

interface Props {
  lat: number;
  lng: number;
  city?: string;
  onCoordinateChange: (lat: number, lng: number) => void;
  className?: string;
}

export function AdminMapPicker({ lat, lng, city, onCoordinateChange, className }: Props) {
  return (
    <DynamicPicker
      lat={lat}
      lng={lng}
      city={city}
      onCoordinateChange={onCoordinateChange}
      className={className}
    />
  );
}
