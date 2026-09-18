"use client";

import { motion } from "framer-motion";
import { DashboardFloatingBadge } from "./DashboardFloatingBadge";
import { Activity, Radio, ShieldCheck } from "lucide-react";

interface DashboardMockupFrameProps {
  activeTab: string;
  activeDescription: string;
  badges: Array<{ title: string; value: string; status: string }>;
}

export function DashboardMockupFrame({
  activeTab,
  activeDescription,
  badges,
}: DashboardMockupFrameProps) {
  return (
    <div className="relative mx-auto max-w-5xl [perspective:1200px]">
      {/* Floating Badges Covering the Edges */}
      <div className="absolute -top-6 left-4 sm:left-8 z-20 hidden sm:block">
        <DashboardFloatingBadge
          title={badges[0]?.title || "Live Radar"}
          value={badges[0]?.value || "1,420 Active Transits"}
          icon={Radio}
          delay={0.2}
        />
      </div>
      <div className="absolute -bottom-6 right-4 sm:right-8 z-20 hidden sm:block">
        <DashboardFloatingBadge
          title={badges[1]?.title || "Telemetry Sync"}
          value={badges[1]?.value || "12ms Authoritative Feed"}
          icon={Activity}
          delay={0.35}
        />
      </div>

      {/* Main Mockup Container with Perspective Tilt */}
      <motion.div
        initial={{ opacity: 0, y: 35, rotateX: 6 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl sm:rounded-[32px] border border-white/15 bg-gradient-to-b from-[#161D2F] to-[#0A0F1D] shadow-2xl ring-1 ring-white/10"
      >
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="px-4 py-1 rounded-full bg-black/40 border border-white/[0.06] text-[11px] font-mono text-neutral-400 max-w-xs truncate hidden sm:block">
            telematics.itl-global.com/live/{activeTab}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL</span>
          </div>
        </div>

        {/* Dashboard Body Preview */}
        <div className="p-5 sm:p-8 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between relative">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIRECT SATELLITE TELEMETRY</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
              {activeTab === "telemetry" && "Fleet Telematics & Sensor Matrix"}
              {activeTab === "dispatch" && "AI Intelligent Routing & Velocity"}
              {activeTab === "clearance" && "Global Customs Direct Pre-Clearance"}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {activeDescription}
            </p>
          </div>

          {/* Bottom Gradient Covering Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/80 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
