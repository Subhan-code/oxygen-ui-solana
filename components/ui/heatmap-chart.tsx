"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface HeatmapChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  weeks?: number;
  levelColors?: [string, string, string, string, string];
}

const DEFAULT_LEVEL_COLORS: [string, string, string, string, string] = [
  "#27272a", // level 0 (zinc-800)
  "#064e3b", // level 1 (emerald-900)
  "#047857", // level 2 (emerald-700)
  "#10b981", // level 3 (emerald-500)
  "#34d399", // level 4 (emerald-400)
];

const DAYS_OF_WEEK = ["Mon", "Wed", "Fri"];

export function HeatmapChart({
  weeks = 24,
  levelColors = DEFAULT_LEVEL_COLORS,
  className,
  ...props
}: HeatmapChartProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const [activeLegendLevel, setActiveLegendLevel] = useState<number | null>(
    null
  );

  // Generate realistic contribution data
  const grid = useMemo(() => {
    const columns: HeatmapDay[][] = [];
    const now = new Date();

    for (let w = weeks - 1; w >= 0; w--) {
      const col: HeatmapDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateObj = new Date(
          now.getTime() - (w * 7 + (6 - d)) * 24 * 60 * 60 * 1000
        );
        const dateStr = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        // Deterministic pseudo-random distribution
        const seed = Math.sin(w * 7 + d) * 10000;
        const rand = seed - Math.floor(seed);
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (rand > 0.4) {
          count = Math.floor(rand * 12);
          if (count === 0) level = 1;
          else if (count <= 3) level = 1;
          else if (count <= 6) level = 2;
          else if (count <= 9) level = 3;
          else level = 4;
        }

        col.push({ date: dateStr, count, level });
      }
      columns.push(col);
    }
    return columns;
  }, [weeks]);

  const totalContributions = useMemo(() => {
    return grid.reduce(
      (acc, col) => acc + col.reduce((sum, day) => sum + day.count, 0),
      0
    );
  }, [grid]);

  return (
    <div
      data-slot="heatmap-chart"
      className={cn(
        "relative flex flex-col items-center justify-center p-8 w-full max-w-2xl mx-auto select-none rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Contribution Activity
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5 font-mono">
            {totalContributions} contributions in the last {weeks} weeks
          </p>
        </div>

        {/* Legend Swatches */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {levelColors.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveLegendLevel(idx)}
                onMouseLeave={() => setActiveLegendLevel(null)}
                className={cn(
                  "h-3 w-3 rounded-xs transition-transform cursor-pointer",
                  activeLegendLevel === idx && "scale-125 ring-2 ring-white"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative flex gap-2 overflow-x-auto max-w-full pb-2">
        {/* Y-axis weekday labels */}
        <div className="flex flex-col justify-between py-1 text-[10px] font-mono text-neutral-400">
          {DAYS_OF_WEEK.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        {/* Week columns */}
        <div className="flex gap-1.5">
          {grid.map((col, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-1.5">
              {col.map((day, rIdx) => {
                const isDimmed =
                  activeLegendLevel !== null &&
                  day.level !== activeLegendLevel;

                return (
                  <motion.div
                    key={rIdx}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{
                      scale: isDimmed ? 0.8 : 1,
                      opacity: isDimmed ? 0.2 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: (cIdx * 7 + rIdx) * 0.001,
                    }}
                    whileHover={{ scale: 1.35 }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredCell({
                        date: day.date,
                        count: day.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="h-3 w-3 rounded-xs cursor-pointer transition-shadow"
                    style={{
                      backgroundColor: levelColors[day.level],
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tooltip Card */}
      <AnimatePresence>
        {hoveredCell ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="pointer-events-none mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1.5 text-xs shadow-xl text-center"
          >
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {hoveredCell.count === 0
                ? "No contributions"
                : `${hoveredCell.count} contribution${
                    hoveredCell.count === 1 ? "" : "s"
                  }`}
            </span>{" "}
            <span className="text-neutral-500 font-mono">
              on {hoveredCell.date}
            </span>
          </motion.div>
        ) : (
          <div className="h-8 mt-4" />
        )}
      </AnimatePresence>
    </div>
  );
}
