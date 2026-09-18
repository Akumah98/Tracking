"use client";

import Link from "next/link";
import Image from "next/image";
import data from "@/data/data.json";

interface NavbarBrandProps {
  isTransparent: boolean;
}

export function NavbarBrand({ isTransparent }: NavbarBrandProps) {
  const { branding } = data.siteMedia;

  return (
    <Link
      href="/"
      className="flex items-center group active:scale-[0.98] transition-transform"
      aria-label="International Transport Line"
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <Image
          src={isTransparent ? branding.logoWhite : branding.logoColor}
          alt={branding.alt}
          width={56}
          height={56}
          priority
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm"
        />
      </div>
    </Link>
  );
}
