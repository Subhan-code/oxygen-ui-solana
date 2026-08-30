"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BalanceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  balanceUsd?: number;
  pnl24hUsd?: number;
  pnl24hPercent?: number;
  currencySymbol?: string;
  hideByDefault?: boolean;
}

const springButton = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.6,
};

export const BalanceDisplay = React.forwardRef<HTMLDivElement, BalanceDisplayProps>(
  (
    {
      balanceUsd = 48291.5,
      pnl24hUsd = 1420.8,
      pnl24hPercent = 3.03,
      currencySymbol = "$",
      hideByDefault = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isHidden, setIsHidden] = useState(hideByDefault);
    const isPositive = pnl24hPercent >= 0;
    const shouldReduceMotion = useReducedMotion();

    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
    };

    return (
      <div
        ref={ref}
        data-slot="balance-display"
        className={cn(
          "relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-6 shadow-xl select-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium tracking-tight">
            <Wallet className="h-4 w-4 text-sky-500 dark:text-sky-400" /> Net Portfolio Balance
          </span>
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springButton}
            onClick={() => setIsHidden(!isHidden)}
            className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {isHidden ? (
              <>
                <Eye className="h-3.5 w-3.5" /> Show
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5" /> Hide
              </>
            )}
          </motion.button>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <motion.h2
              key={isHidden ? "hidden" : "visible"}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
            >
              {isHidden ? "••••••••" : formatCurrency(balanceUsd)}
            </motion.h2>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border shadow-2xs",
              isPositive
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
            )}
          >
            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            <span className="font-mono">
              {isHidden
                ? "•••"
                : `${isPositive ? "+" : ""}${formatCurrency(pnl24hUsd)} (${pnl24hPercent.toFixed(2)}%)`}
            </span>
            <span className="text-[10px] opacity-70 font-normal">24h</span>
          </div>
        </div>
      </div>
    );
  }
);

BalanceDisplay.displayName = "BalanceDisplay";

export default BalanceDisplay;
