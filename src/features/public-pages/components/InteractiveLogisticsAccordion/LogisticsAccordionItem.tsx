"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface AccordionItemData {
  id: string;
  number: string;
  title: string;
  content: string;
}

interface LogisticsAccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export function LogisticsAccordionItem({
  item,
  isOpen,
  onToggle,
}: LogisticsAccordionItemProps) {
  return (
    <div className="border-b border-black/[0.08] last:border-b-0 py-4 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 py-1.5 focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-mono text-xs sm:text-sm font-bold text-brand shrink-0">
            {item.number}
          </span>
          <span className="text-base sm:text-lg font-heading font-bold text-brand-dark group-hover:text-brand transition-colors">
            {item.title}
          </span>
        </div>

        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
            isOpen
              ? "bg-brand text-white border-brand rotate-90"
              : "bg-black/[0.03] text-neutral-600 border-black/[0.08] group-hover:bg-brand/10 group-hover:text-brand"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-3 pb-2 pl-8 sm:pl-12 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
