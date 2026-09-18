"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  decimals?: number;
  trigger?: boolean;
}

export function useCountUp(
  target: number,
  { duration = 1800, decimals = 0, trigger = true }: UseCountUpOptions = {}
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula for natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;

      const factor = Math.pow(10, decimals);
      setCount(Math.round(current * factor) / factor);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, decimals, trigger]);

  return count;
}
