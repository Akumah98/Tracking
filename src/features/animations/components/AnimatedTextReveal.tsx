"use client";

import { motion } from "framer-motion";

interface AnimatedTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  staggerDelay?: number;
  initialDelay?: number;
  align?: "center" | "left";
}

export function AnimatedTextReveal({
  text,
  as: Component = "h1",
  className = "",
  highlightWords = [],
  highlightClassName = "text-brand",
  staggerDelay = 0.05,
  initialDelay = 0.1,
  align = "center",
}: AnimatedTextRevealProps) {
  const lines = text.split("\n");
  const isLeft = align === "left";

  return (
    <Component
      className={`flex flex-col ${
        isLeft ? "items-start justify-start text-left" : "items-center justify-center text-center"
      } gap-1 sm:gap-2 ${className}`}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <span
            key={`line-${lineIdx}`}
            className={`flex flex-wrap items-center ${
              isLeft ? "justify-start" : "justify-center"
            } gap-x-2.5 sm:gap-x-3.5`}
          >
            {words.map((word, wordIdx) => {
              const isHighlighted = highlightWords.some(
                (hw) => hw.toLowerCase() === word.toLowerCase()
              );

              return (
                <motion.span
                  key={`${word}-${lineIdx}-${wordIdx}`}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{
                    duration: 0.55,
                    delay: initialDelay + (lineIdx * 3 + wordIdx) * staggerDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block origin-bottom ${
                    isHighlighted ? highlightClassName : ""
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
