"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Truck } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] apple-glass-nav transition-all">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group active:scale-[0.98] transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center text-white shadow-sm ring-1 ring-white/20">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base sm:text-lg text-brand-dark tracking-tight leading-none">
                INTL TRANSPORT LINE
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-brand">
                Global Logistics &amp; Freight
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full text-neutral-600 hover:text-brand-dark hover:bg-black/[0.03] active:scale-[0.97] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/track">
              <Button className="h-11 min-h-[44px] px-5 rounded-full bg-brand hover:bg-brand-secondary text-white font-semibold shadow-xs active:scale-[0.97] transition-all">
                Track Shipment
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-700 hover:bg-black/[0.04] active:scale-95 rounded-full transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

