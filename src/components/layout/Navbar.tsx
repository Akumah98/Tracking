"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { NavbarBrand } from "./NavbarBrand";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const checkScroll = () => {
      const heroEl = document.getElementById("home-hero-section");
      const threshold = heroEl ? heroEl.offsetHeight - 80 : 620;
      setIsPastHero(window.scrollY > threshold);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  const isTransparent = isHome && !isPastHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-0 shadow-none text-white"
            : "bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-xs text-brand-dark"
        }`}
      >
        <div className="container max-w-7xl mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
          <NavbarBrand isTransparent={isTransparent} />

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-brand"
                      : isTransparent
                      ? "text-white/80 hover:text-white"
                      : "text-neutral-600 hover:text-brand-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/track">
              <Button className="h-10 min-h-[44px] px-5 rounded-full bg-brand hover:bg-brand-secondary text-white font-semibold shadow-xs active:scale-[0.97] transition-all">
                Track Shipment
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 rounded-full transition-all ${
              isTransparent ? "text-white hover:bg-white/10" : "text-neutral-700 hover:bg-black/[0.04]"
            }`}
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
