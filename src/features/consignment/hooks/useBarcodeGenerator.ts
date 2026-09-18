"use client";

import { useEffect } from "react";

declare global {
  interface Window { JsBarcode: (element: SVGSVGElement | null, text: string, options?: Record<string, unknown>) => void; }
}

export function useBarcodeGenerator(trackingNumber: string, svgRef: React.RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    if (!trackingNumber || !svgRef.current) return;

    const generate = () => {
      if (typeof window !== "undefined" && window.JsBarcode && svgRef.current) {
        window.JsBarcode(svgRef.current, trackingNumber, {
          format: "CODE128",
          lineColor: "#000000",
          width: 2,
          height: 60,
          displayValue: false,
          margin: 8,
        });
      }
    };

    if (typeof window !== "undefined" && typeof window.JsBarcode === "function") {
      generate();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js";
    script.onload = generate;
    document.head.appendChild(script);
  }, [trackingNumber, svgRef]);
}
