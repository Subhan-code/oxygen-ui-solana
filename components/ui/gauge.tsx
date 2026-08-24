"use client";

import React, { useMemo, useState } from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export type GaugeOrientation = "arc" | "linear";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  orientation?: GaugeOrientation;
  totalNotches?: number;
  spacing?: number;
  centerValue?: number;
  defaultLabel?: string;
  prefix?: string;
  suffix?: string;
  activeGradient?: [string, string];
  inactiveFillOpacity?: number;
  activeFillOpacity?: number;
  notchCornerRadius?: number;
  interactive?: boolean;
}

export function Gauge({
  value: controlledValue = 66,
  orientation = "arc",
  totalNotches = 40,
  spacing = 25,
  centerValue = 428000,
  defaultLabel = "ARR run rate",
  prefix = "$",
  suffix = "",
  activeGradient = ["#bef264", "#10b981"],
  inactiveFillOpacity = 0.25,
  activeFillOpacity = 1,
  interactive = true,
  className,
  ...props
}: GaugeProps) {
  const [internalValue, setInternalValue] = useState(controlledValue);
  const activeValue = interactive ? internalValue : controlledValue;

  const width = 360;
  const height = orientation === "arc" ? 280 : 80;
  const centerX = width / 2;
  const centerY = orientation === "arc" ? 180 : height / 2;

  const activeNotches = Math.round((activeValue / 100) * totalNotches);

  const transition: Transition = {
    type: "spring",
    stiffness: 350,
    damping: 25,
  };

  const notches = useMemo(() => {
    if (orientation === "arc") {
      const startAngle = 135;
      const endAngle = 405;
      const totalAngle = endAngle - startAngle;
      const availableAngle = totalAngle * (1 - spacing / 100);
      const notchAngle = totalNotches > 0 ? availableAngle / totalNotches : 0;
      const gapAngle =
        totalNotches > 1
          ? (totalAngle * (spacing / 100)) / (totalNotches - 1)
          : 0;

      const outerRadius = 130;
      const notchLength = 28;
      const innerRadius = outerRadius - notchLength;

      return Array.from({ length: totalNotches }).map((_, i) => {
        const angle = startAngle + i * (notchAngle + gapAngle) + notchAngle / 2;
        const rad = (angle * Math.PI) / 180;
        const halfWidth = ((notchAngle * 0.8) * Math.PI) / 180 / 2;

        const x1 = centerX + Math.cos(rad - halfWidth) * outerRadius;
        const y1 = centerY + Math.sin(rad - halfWidth) * outerRadius;
        const x2 = centerX + Math.cos(rad + halfWidth) * outerRadius;
        const y2 = centerY + Math.sin(rad + halfWidth) * outerRadius;
        const x3 = centerX + Math.cos(rad + halfWidth) * innerRadius;
        const y3 = centerY + Math.sin(rad + halfWidth) * innerRadius;
        const x4 = centerX + Math.cos(rad - halfWidth) * innerRadius;
        const y4 = centerY + Math.sin(rad - halfWidth) * innerRadius;

        const d = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;
        return { index: i, d, isActive: i < activeNotches };
      });
    } else {
      const availableWidth = width - 40;
      const slotWidth = availableWidth / totalNotches;
      const notchWidth = slotWidth * 0.75;
      const notchHeight = 24;

      return Array.from({ length: totalNotches }).map((_, i) => {
        const x = 20 + i * slotWidth;
        const y = centerY - notchHeight / 2;
        const d = `M ${x} ${y} h ${notchWidth} v ${notchHeight} h ${-notchWidth} Z`;
        return { index: i, d, isActive: i < activeNotches };
      });
    }
  }, [
    orientation,
    totalNotches,
    spacing,
    activeNotches,
    centerX,
    centerY,
    width,
  ]);

  const displayStat = (centerValue * (activeValue / 100)).toLocaleString(
    "en-US",
    { maximumFractionDigits: 0 }
  );

  return (
    <div
      data-slot="gauge"
      className={cn(
        "relative flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto select-none rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-2xl",
        className
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="gaugeActiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={activeGradient[0]} />
            <stop offset="100%" stopColor={activeGradient[1]} />
          </linearGradient>
        </defs>

        {/* Inactive track notches */}
        {notches.map((n) => (
          <path
            key={`bg-${n.index}`}
            d={n.d}
            className="fill-neutral-300 dark:fill-neutral-700 transition-colors"
            fillOpacity={inactiveFillOpacity}
          />
        ))}

        {/* Active notches */}
        {notches
          .filter((n) => n.isActive)
          .map((n) => (
            <motion.path
              key={`act-${n.index}`}
              d={n.d}
              fill="url(#gaugeActiveGradient)"
              fillOpacity={activeFillOpacity}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...transition, delay: n.index * 0.008 }}
            />
          ))}
      </svg>

      {/* Center Statistic Overlay */}
      {orientation === "arc" ? (
        <div className="absolute top-[135px] flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 tabular-nums">
            {prefix}
            {displayStat}
            {suffix}
          </span>
          <span className="text-xs font-semibold text-neutral-500 mt-0.5">
            {defaultLabel}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full px-4 mb-2">
          <span className="text-xs font-semibold text-neutral-500">
            {defaultLabel}
          </span>
          <span className="text-sm font-black text-neutral-900 dark:text-neutral-100 tabular-nums">
            {prefix}
            {displayStat}
            {suffix}
          </span>
        </div>
      )}

      {/* Interactive Drag / Range Scrubber */}
      {interactive ? (
        <div className="w-full flex flex-col items-center gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between w-full text-xs font-mono text-neutral-500">
            <span>Fill level</span>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {activeValue}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={activeValue}
            onChange={(e) => setInternalValue(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      ) : null}
    </div>
  );
}
