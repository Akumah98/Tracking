"use client";

import { Printer } from "lucide-react";

interface Props { trackingNumber: string; }

export function DownloadReceiptButton({ trackingNumber }: Props) {
  const handlePrint = () => {
    const title = document.title;
    document.title = `Receipt-${trackingNumber}`;
    window.print();
    document.title = title;
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-brand border border-neutral-200 hover:border-brand/30 rounded-xl px-3 py-1.5 transition-all"
    >
      <Printer className="w-3.5 h-3.5" />
      Print Receipt
    </button>
  );
}
