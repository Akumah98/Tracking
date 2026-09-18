"use client";

interface Props {
  message: string | null;
}

export function MapGestureToast({ message }: Props) {
  if (!message) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300">
      <div className="bg-neutral-950/90 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
        {message}
      </div>
    </div>
  );
}
