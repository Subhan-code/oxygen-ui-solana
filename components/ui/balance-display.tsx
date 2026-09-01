"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
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
    const [isShimmering, setIsShimmering] = useState(false);
    const isPositive = pnl24hPercent >= 0;
    const shouldReduceMotion = useReducedMotion();

    const handleToggle = () => {
      const next = !isHidden;
      if (!next) {
        setIsShimmering(true);
        setTimeout(() => {
          setIsShimmering(false);
          setIsHidden(false);
        }, 280);
      } else {
        setIsHidden(true);
      }
    };

    const pnlString = `${isPositive ? "+" : ""}$${pnl24hUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${pnl24hPercent.toFixed(2)}%)`;

    return (
      <div
        ref={ref}
        data-slot="balance-display"
        className={cn(
          "relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 shadow-xl select-none font-sans max-w-md w-full",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 font-semibold tracking-tight">
            <Wallet className="h-4 w-4 text-sky-500" /> Net Portfolio Balance
          </span>
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={springButton}
            onClick={handleToggle}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
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
          <div className="min-h-[40px] flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              {isShimmering ? (
                <motion.div
                  key="shimmer-skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-9 w-44 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse relative overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-zinc-400/40 to-transparent" />
                </motion.div>
              ) : isHidden ? (
                <motion.h2
                  key="hidden"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
                >
                  ••••••••
                </motion.h2>
              ) : (
                <motion.div
                  key="visible"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <NumberFlow
                    value={balanceUsd}
                    format={{ style: "currency", currency: "USD", minimumFractionDigits: 2 }}
                    className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold border shadow-2xs font-mono",
              isPositive
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
            )}
          >
            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {isHidden || isShimmering ? (
              <span>•••</span>
            ) : (
              <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                }}
                className="inline-flex"
              >
                {pnlString.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 3, filter: "blur(2px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
            <span className="text-[10px] opacity-70 font-normal">24h</span>
          </div>
        </div>
      </div>
    );
  }
);

BalanceDisplay.displayName = "BalanceDisplay";

export default BalanceDisplay;
