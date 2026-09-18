"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Globe } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import data from "@/data/data.json";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  if (!isOpen) return null;
  const { branding } = data.siteMedia;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md md:hidden transition-all">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between border-l border-black/[0.06]">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <Image
                  src={branding.logoColor}
                  alt={branding.alt}
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-base text-brand-dark tracking-tight">
                INTL TRANSPORT
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-brand-dark hover:bg-black/[0.04] rounded-full active:scale-90 transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-5 flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`min-h-[44px] flex items-center justify-between px-3.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-brand/10 text-brand font-bold"
                      : "text-neutral-800 hover:bg-black/[0.03] active:bg-black/[0.06] active:scale-[0.98]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-black/[0.06] space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 px-1">
            <Globe className="w-4 h-4 text-brand" />
            <span>Serving 220+ Countries Worldwide</span>
          </div>
          <Link href="/track" onClick={onClose} className="block">
            <Button className="w-full h-12 min-h-[48px] rounded-full bg-brand hover:bg-brand-secondary text-white font-semibold shadow-xs active:scale-[0.98] transition-all">
              Track Consignment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
