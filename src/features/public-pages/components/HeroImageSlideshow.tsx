"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/data.json";

export function HeroImageSlideshow() {
  const slides = data.siteMedia.heroSlides;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 0.9, scale: 1.06 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 6, ease: "easeOut" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[current].url}
            alt={slides[current].alt}
            fill
            priority={current === 0}
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Contrast Scrim: Clear at top for navbar, rich dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-black/35 to-transparent pointer-events-none" />
    </div>
  );
}
