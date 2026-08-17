"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SampleComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  badgeText?: string;
  defaultActive?: boolean;
}

export function SampleComponent({
  title = "Apple Pro Primitive",
  description = "A glassmorphic interactive card built with spring physics.",
  badgeText = "Live Metric",
  defaultActive = true,
  className,
  ...props
}: SampleComponentProps) {
  const [active, setActive] = useState(defaultActive);

  return (
    <div
      data-slot="root"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] motion-reduce:transition-none",
        className
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
      {...props}
    >
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {badgeText}
        </div>

        <button
          type="button"
          onClick={() => setActive((v) => !v)}
          className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-zinc-200 p-0.5 transition-colors duration-200 dark:bg-neutral-800"
          aria-label="Toggle active state"
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "h-5 w-5 rounded-full bg-white shadow-xs dark:bg-zinc-100",
              active && "bg-sky-500 dark:bg-sky-400"
            )}
            style={{
              translateX: active ? 20 : 0,
            }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      {/* Metric Visualizer */}
      <div className="flex items-center justify-between rounded-2xl border border-black/[0.04] bg-zinc-50/80 p-3 dark:border-white/[0.06] dark:bg-neutral-950/60">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
            System State
          </span>
          <span className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {active ? "ONLINE (99.9%)" : "STANDBY"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[40, 65, 30, 85, 55, 95].map((val, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{ height: active ? val * 0.24 : 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.04 }}
              className={cn(
                "w-1.5 rounded-full bg-zinc-300 dark:bg-neutral-700",
                active && "bg-sky-500 dark:bg-sky-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
