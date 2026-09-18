"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardFloatingBadgeProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  className?: string;
  delay?: number;
}

export function DashboardFloatingBadge({
  title,
  value,
  icon: Icon,
  className = "",
  delay = 0,
}: DashboardFloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`apple-glass-card rounded-2xl p-3 sm:p-3.5 border border-white/15 bg-[#0E131F]/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center shrink-0">
        {Icon ? <Icon className="w-4 h-4 text-brand" /> : (
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        )}
      </div>
      <div className="space-y-0.5">
        <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
          {title}
        </div>
        <div className="text-xs sm:text-sm font-bold text-white font-mono">
          {value}
        </div>
      </div>
    </motion.div>
  );
}
