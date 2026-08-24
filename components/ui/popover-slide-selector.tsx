"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PopoverSlideSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  merchantName?: string;
  merchantEmail?: string;
  amount?: string;
}

type PayTab = "Bank" | "Card" | "Pay Later";
type PayLaterDays = 30 | 60 | 90;

export function PopoverSlideSelector({
  merchantName = "Matango Inc",
  merchantEmail = "finance@matango.io",
  amount = "$11,000.00",
  className,
  ...props
}: PopoverSlideSelectorProps) {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<PayTab>("Bank");
  const [payLaterDays, setPayLaterDays] = useState<PayLaterDays>(30);
  const [fromAccount, setFromAccount] = useState("Chase •••• 9460");
  const [selectedDate, setSelectedDate] = useState("Jul 30, 2024");

  // Dynamic fee calculation for Pay Later
  const numericAmount = 11000;
  const feeRate = payLaterDays === 30 ? 0.016 : payLaterDays === 60 ? 0.024 : 0.032;
  const feeAmount = (numericAmount * feeRate).toFixed(2);
  const totalAmount = (numericAmount + parseFloat(feeAmount)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      data-slot="popover-slide-selector"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      className={cn("relative mx-auto w-full max-w-sm font-sans select-none p-2", className)}
      {...props}
    >
      {/* Background Merchant Info Card */}
      <div className="relative rounded-3xl bg-zinc-200/70 p-5 text-zinc-950 dark:bg-zinc-900/70 dark:text-white border border-zinc-300/40 dark:border-zinc-800/60 shadow-xs">
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-3">
            {/* Lavender Merchant Avatar with Geometric Logo */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-300 text-zinc-950 font-bold dark:bg-indigo-900/60 dark:text-indigo-200">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="7,14 12,5 17,14" />
                <circle cx="15" cy="15" r="3" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-semibold tracking-tight leading-tight text-zinc-900 dark:text-white">
                {merchantName}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                {merchantEmail}
              </p>
            </div>
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            {amount}
          </span>
        </div>
      </div>

      {/* Foreground Interactive Payment Selector Card */}
      <div className="relative -mt-8 z-10 rounded-3xl bg-white p-5 shadow-2xl border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80">
        {/* Top Payment Method Selector Bar */}
        <div className="relative mb-5 flex rounded-full bg-zinc-100/90 p-1 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-800/60">
          {(["Bank", "Card", "Pay Later"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative flex-1 py-2.5 text-center text-sm font-semibold transition-colors cursor-pointer z-10",
                  isSelected
                    ? "text-white dark:text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-pay-tab"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white shadow-sm"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents with Fluid Motion */}
        <AnimatePresence mode="wait">
          {activeTab === "Bank" && (
            <motion.div
              key="bank-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5"
            >
              {/* From Row */}
              <motion.button
                type="button"
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                onClick={() => {
                  const accounts = ["Chase •••• 9460", "Bank of America •••• 1204", "Wells Fargo •••• 5821"];
                  const nextIndex = (accounts.indexOf(fromAccount) + 1) % accounts.length;
                  setFromAccount(accounts[nextIndex]);
                }}
                className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3.5 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60 cursor-pointer text-left transition-colors hover:bg-zinc-100/80 dark:hover:bg-zinc-900"
              >
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">From</span>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px]">
                    C
                  </div>
                  <span>{fromAccount}</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </motion.button>

              {/* To Row */}
              <div className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3.5 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">To</span>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                  <div className="h-4 w-4 rounded-md bg-amber-500" />
                  <span>{merchantName}</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>

              {/* When Row */}
              <motion.button
                type="button"
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                onClick={() => {
                  const dates = ["Jul 30, 2024", "Aug 15, 2024", "Sep 01, 2024"];
                  const nextIndex = (dates.indexOf(selectedDate) + 1) % dates.length;
                  setSelectedDate(dates[nextIndex]);
                }}
                className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3.5 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60 cursor-pointer text-left transition-colors hover:bg-zinc-100/80 dark:hover:bg-zinc-900"
              >
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">When</span>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                  <span>{selectedDate}</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </motion.button>
            </motion.div>
          )}

          {activeTab === "Card" && (
            <motion.div
              key="card-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3.5 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Card Number</span>
                <div className="flex items-center gap-2 text-sm font-mono font-semibold text-zinc-900 dark:text-white">
                  <span>•••• •••• •••• 4242</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-zinc-50/80 px-4 py-3.5 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Expires & CVC</span>
                <div className="flex items-center gap-2 text-sm font-mono font-semibold text-zinc-900 dark:text-white">
                  <span>08/28 · •••</span>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Pay Later" && (
            <motion.div
              key="pay-later-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 pt-1"
            >
              {/* Days Pill Selector Bar */}
              <div className="relative flex items-center rounded-full bg-zinc-100/90 p-1 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-800/60">
                {([30, 60, 90] as const).map((days) => {
                  const isSelected = payLaterDays === days;
                  return (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setPayLaterDays(days)}
                      className={cn(
                        "relative flex-1 py-2 text-center text-sm font-semibold transition-colors cursor-pointer z-10",
                        isSelected
                          ? "text-white dark:text-zinc-950"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="active-days-tab"
                          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 28 }}
                          className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{days}</span>
                    </button>
                  );
                })}
                <span className="px-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  Days
                </span>
              </div>

              {/* Fee & Total Summary Breakdown */}
              <div className="flex flex-col gap-2.5 px-1 pt-1 text-sm font-semibold">
                <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Fee {(feeRate * 100).toFixed(1)}%</span>
                  <span className="font-mono">${feeAmount}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-base text-zinc-950 dark:text-white">
                  <span>Total</span>
                  <span className="font-mono text-lg font-bold">${totalAmount}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default PopoverSlideSelector;
