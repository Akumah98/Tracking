"use client";

import { useEffect, useState, useRef } from "react";
import L from "leaflet";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  mapRef: React.RefObject<L.Map | null>;
}

export function useCooperativeGestures({ containerRef, mapRef }: Props) {
  const [hint, setHint] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showHint = (msg: string) => {
    setHint(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHint(null), 1600);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const map = mapRef.current;
      if (!map) return;

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY;
        if (delta < 0) map.zoomIn(1);
        else if (delta > 0) map.zoomOut(1);
      } else {
        showHint("Use Ctrl + scroll to zoom the map");
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const map = mapRef.current;
      if (!map) return;
      if (e.touches.length >= 2) {
        map.dragging.enable();
      } else {
        map.dragging.disable();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        showHint("Use two fingers to move the map");
      }
    };

    const onTouchEnd = () => {
      mapRef.current?.dragging.enable();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [containerRef, mapRef]);

  return { hint };
}
