"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const count = useCountUp(target, { duration, decimals, trigger: isInView });

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span>{decimals > 0 ? count.toFixed(decimals) : count}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
