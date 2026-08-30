"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface BorrowLendPositionProps extends HTMLMotionProps<"div"> {
  healthFactor?: number;
  depositedUSD?: string;
  borrowedUSD?: string;
  borrowAPY?: string;
}

const SPRING_PRESS = { type: "spring" as const, duration: 0.15, bounce: 0 };

const healthFill = (factor: number) =>
  Math.max(0, Math.min(1, factor / 3));

export const BorrowLendPosition = React.forwardRef<HTMLDivElement, BorrowLendPositionProps>(
  (
    {
      healthFactor = 2.15,
      depositedUSD = "$14,500.00",
      borrowedUSD = "$4,200.00",
      borrowAPY = "3.8%",
      className,
      ...props
    },
    ref
  ) => {
    const isHealthy = healthFactor >= 1.5;
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        data-slot="borrow-lend-position"
        transition={SPRING_PRESS}
        className={cn(
          "relative flex flex-col gap-3.5 p-5 rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl shadow-xl text-foreground select-none",
          className
        )}
        suppressHydrationWarning
        {...props}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-foreground tracking-tight">
            Lending Position (Kamino/Marginfi)
          </span>
          <span
            className={cn(
              "text-xs font-mono font-bold px-2.5 py-0.5 rounded-full shadow-2xs",
              isHealthy
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20"
            )}
          >
            Health Factor: {healthFactor.toFixed(2)}
          </span>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
          aria-hidden="true"
        >
          <div
            className={cn(
              "h-full origin-left rounded-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[var(--ease-out-expo)]",
              isHealthy
                ? "bg-emerald-500"
                : "bg-rose-500",
            )}
            style={{
              transform: shouldReduceMotion
                ? `scaleX(${healthFill(healthFactor)})`
                : `scaleX(${healthFill(healthFactor)})`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
          <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
            <span className="text-[11px] text-muted-foreground font-sans font-medium">
              Supplied Collateral
            </span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
              {depositedUSD}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
            <span className="text-[11px] text-muted-foreground font-sans font-medium">
              Borrowed Debt
            </span>
            <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-1 tracking-tight">
              {borrowedUSD} <span className="text-xs font-normal opacity-80">({borrowAPY})</span>
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

BorrowLendPosition.displayName = "BorrowLendPosition";

export default BorrowLendPosition;
