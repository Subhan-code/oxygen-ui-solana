"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const years = Array.from({ length: 2024 - 1993 + 1 }, (_, i) => 2024 - i);

export function Timeline({ className }: { className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.4;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1 - distance * 0.2, 0.4);
  };

  return (
    <div className={cn("flex h-[500px] w-full items-center justify-center select-none", className)}>
      <div className="flex flex-col">
        {years.map((year, i) => {
          const isSelected = selected === i;

          return (
            <button
              key={i}
              type="button"
              className="relative inline-flex items-end justify-center py-1 cursor-pointer outline-none"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelected(i)}
              onTouchStart={() => handleMouseEnter(i)}
              onTouchEnd={handleMouseLeave}
            >
              <motion.div
                className={cn(
                  "h-1 w-10 rounded-[4px] transition-colors",
                  isSelected
                    ? "bg-amber-400"
                    : "bg-zinc-400 dark:bg-zinc-600"
                )}
                animate={{
                  scale: calculateScale(i),
                }}
                initial={{ scale: 0.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {hoveredIndex === i ? (
                <motion.span
                  className={cn(
                    "absolute -top-0.5 left-12 text-[11px] font-bold tracking-wider",
                    isSelected
                      ? "text-amber-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  )}
                  initial={{ opacity: 0, filter: "blur(4px)", scale: 0.4 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 0.15, delay: 0.1 }}
                >
                  {year}
                </motion.span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
