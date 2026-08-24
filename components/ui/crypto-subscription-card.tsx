"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ShieldCheck, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CryptoSubscriptionCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  planName?: string;
  creatorName?: string;
  monthlyPrice?: number;
  annualPrice?: number;
}

type BillingCycle = "Monthly" | "Annual" | "Lifetime";

export function CryptoSubscriptionCard({
  planName = "Oxygen UI Pro Pass",
  creatorName = "SubhanHQ",
  monthlyPrice = 29,
  annualPrice = 249,
  className,
  ...props
}: CryptoSubscriptionCardProps) {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState<BillingCycle>("Monthly");
  const [autopay, setAutopay] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const price = cycle === "Monthly" ? `$${monthlyPrice}` : cycle === "Annual" ? `$${annualPrice}` : "$499";
  const periodText = cycle === "Monthly" ? "/ month" : cycle === "Annual" ? "/ year" : "one-time";
  const savingsTag = cycle === "Annual" ? "Save 28%" : cycle === "Lifetime" ? "Best Value" : null;

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <motion.div
      data-slot="crypto-subscription-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      className={cn("relative mx-auto w-full max-w-sm font-sans select-none p-2", className)}
      {...props}
    >
      {/* Background Merchant Header Card */}
      <div className="relative rounded-3xl bg-zinc-200/70 p-5 text-zinc-950 dark:bg-zinc-900/70 dark:text-white border border-zinc-300/40 dark:border-zinc-800/60 shadow-xs">
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-3">
            {/* Electric Blue Avatar Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-base font-semibold tracking-tight leading-tight text-zinc-900 dark:text-white">
                  {planName}
                </h4>
                <ShieldCheck className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                by {creatorName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              {price}
            </span>
            <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
              {periodText}
            </span>
          </div>
        </div>
      </div>

      {/* Foreground Interactive Subscription Options Card */}
      <div className="relative -mt-8 z-10 rounded-3xl bg-white p-5 shadow-2xl border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80">
        {/* Billing Cycle Selector Bar */}
        <div className="relative mb-5 flex rounded-full bg-zinc-100/90 p-1 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-800/60">
          {(["Monthly", "Annual", "Lifetime"] as const).map((item) => {
            const isSelected = cycle === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCycle(item)}
                className={cn(
                  "relative flex-1 py-2.5 text-center text-xs font-semibold transition-colors cursor-pointer z-10",
                  isSelected
                    ? "text-white dark:text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-cycle-tab"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white shadow-sm"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Details List */}
        <div className="flex flex-col gap-2.5">
          {/* Savings Badge Notice */}
          {savingsTag && (
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2.5 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span>Billing Tier Offer</span>
              <span className="font-bold uppercase tracking-wider">{savingsTag}</span>
            </div>
          )}

          {/* Payment Method */}
          <div className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Payment</span>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
              <span className="rounded-md bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white dark:bg-white dark:text-zinc-900 font-mono">
                SOL
              </span>
              <span>USDC · Solana Pay</span>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
            </div>
          </div>

          {/* Autopay Toggle Row */}
          <div className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Auto-Renew</span>
            <button
              type="button"
              onClick={() => setAutopay(!autopay)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5",
                autopay ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
              )}
            >
              <motion.span
                animate={{ x: autopay ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md"
              />
            </button>
          </div>
        </div>

        {/* Subscribe Action Button */}
        <motion.button
          type="button"
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
          onClick={handleSubscribe}
          className={cn(
            "mt-5 flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-semibold text-white shadow-lg transition-all cursor-pointer",
            isSubscribed
              ? "bg-emerald-600 shadow-emerald-500/20"
              : "bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          )}
        >
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Subscription Active!</span>
              </motion.div>
            ) : (
              <motion.span
                key="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Confirm {price} {periodText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CryptoSubscriptionCard;
