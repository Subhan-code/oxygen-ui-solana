"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Hourglass, ArrowUpRight, PieChart, Link as LinkIcon, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  subtitleValue?: string;
  icon: React.ReactNode;
  rows?: { label: string; value: string; isLink?: boolean }[];
  progressPercent?: number;
  actionText?: string;
}

export interface FinancialMetricsGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  onActionClick?: (metricId: string) => void;
}

export function FinancialMetricsGrid({
  onActionClick,
  className,
  ...props
}: FinancialMetricsGridProps) {
  const reduceMotion = useReducedMotion();
  const [invoiceCount, setInvoiceCount] = useState(0);

  return (
    <div
      data-slot="financial-metrics-grid"
      className={cn("grid w-full max-w-lg grid-cols-1 sm:grid-cols-2 gap-4 p-2 font-sans select-none mx-auto", className)}
      {...props}
    >
      {/* Card 1: Total Hours */}
      <motion.div
        whileHover={reduceMotion ? {} : { y: -2 }}
        className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-lg border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80"
      >
        <div>
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Total hours</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
              <Hourglass className="h-4 w-4" />
            </div>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
            17.00
          </h3>
        </div>

        <div className="mt-6 flex flex-col gap-1.5 rounded-2xl bg-zinc-50/80 p-3 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60 text-xs font-medium">
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
            <span>Billable</span>
            <span className="font-semibold font-mono">17.00</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Non-billable</span>
            <span className="font-mono">0.00</span>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Internal Costs */}
      <motion.div
        whileHover={reduceMotion ? {} : { y: -2 }}
        className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-lg border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80"
      >
        <div>
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Internal costs</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
            <span className="text-base font-semibold mr-0.5">$</span>611.37
          </h3>
        </div>

        <div className="mt-6 flex flex-col gap-1.5 rounded-2xl bg-zinc-50/80 p-3 border border-zinc-200/60 dark:bg-zinc-900/60 dark:border-zinc-800/60 text-xs font-medium">
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
            <span>Time</span>
            <span className="font-semibold font-mono">$1,190.00</span>
          </div>
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 cursor-pointer">
            <span>Non-billable</span>
            <div className="flex items-center gap-0.5 font-semibold font-mono">
              <span>$32.75</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 3: Budget Remaining */}
      <motion.div
        whileHover={reduceMotion ? {} : { y: -2 }}
        className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-lg border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80"
      >
        <div>
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Budget remaining</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
              <PieChart className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
              8.00
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              32%
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-white">
            <span>Total budget</span>
            <span className="font-mono">25.00</span>
          </div>
          {/* Blue Filled Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full w-[32%] rounded-full bg-blue-600" />
          </div>
        </div>
      </motion.div>

      {/* Card 4: Unvoiced Amount */}
      <motion.div
        whileHover={reduceMotion ? {} : { y: -2 }}
        className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-lg border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80"
      >
        <div>
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Unvoiced amount</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
              <LinkIcon className="h-4 w-4" />
            </div>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
            <span className="text-base font-semibold mr-0.5">$</span>1,716.37
          </h3>
        </div>

        {/* Soft Blue Action Pill Button */}
        <motion.button
          type="button"
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
          onClick={() => {
            setInvoiceCount((prev) => prev + 1);
            onActionClick?.("new-invoice");
          }}
          className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-blue-50 py-3 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{invoiceCount > 0 ? `Invoice Created (${invoiceCount})` : "New invoice"}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default FinancialMetricsGrid;
