"use client";

import { motion } from "framer-motion";
import { HeroSearchBar } from "@/features/tracking/components/HeroSearchBar";
import { CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { AnimatedTextReveal } from "@/features/animations/components/AnimatedTextReveal";
import { HeroImageSlideshow } from "./HeroImageSlideshow";

export function HomeHeroVisual() {
  return (
    <section
      id="home-hero-section"
      className="relative overflow-hidden bg-brand-dark min-h-[700px] sm:min-h-[780px] lg:min-h-[840px] flex items-center justify-center pt-32 pb-24 border-b border-black/[0.08]"
    >
      <HeroImageSlideshow />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-transparent border border-white/20 text-white text-xs font-bold tracking-tight shadow-sm"
        >
          <span>Express Postal &amp; Global Logistics Solutions</span>
        </motion.div>

        <AnimatedTextReveal
          text={"Transporting Goods\nAcross The Globe"}
          as="h1"
          className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.14]"
          highlightWords={["Across", "The", "Globe"]}
          highlightClassName="text-white/70"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-normal"
        >
          We are more than just a transportation company. We are your trusted partner in moving goods, delivering solutions, and connecting people across 220 countries safely and on time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          className="pt-2 max-w-2xl mx-auto"
        >
          <HeroSearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-white" />
            No Box or Label Necessary
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-white" />
            24/7 Live Telemetry Visibility
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm border border-white/10">
            <HeartHandshake className="w-4 h-4 text-white" />
            Friction-Free Returns
          </span>
        </motion.div>
      </div>
    </section>
  );
}
