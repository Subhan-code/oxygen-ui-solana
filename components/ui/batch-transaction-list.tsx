"use client";

import React from "react";
import { Layers, Code } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface InstructionItem {
  programId: string;
  programName: string;
  action: string;
  cuUnits: number;
}

export interface BatchTransactionListProps extends React.HTMLAttributes<HTMLDivElement> {
  bundleId?: string;
  totalCuLimit?: number;
  usedCuTotal?: number;
  instructions?: InstructionItem[];
}

const DEFAULT_INSTRUCTIONS: InstructionItem[] = [
  { programId: "ComputeBudget111111111111111111111111111111", programName: "Compute Budget", action: "SetComputeUnitPrice (200k)", cuUnits: 150 },
  { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", programName: "SPL Token Program", action: "TransferChecked (10.5 SOL)", cuUnits: 4200 },
  { programId: "whirLMiicVdioUtAKC2CaBvu5sqD6LutZa5b5FQ5k2y", programName: "Orca Whirlpool", action: "SwapTwoHop (SOL -> USDC)", cuUnits: 68400 },
];

const springRow = {
  type: "spring" as const,
  stiffness: 480,
  damping: 30,
  mass: 0.65,
};

export const BatchTransactionList = React.forwardRef<HTMLDivElement, BatchTransactionListProps>(
  (
    {
      bundleId = "BUNDLE-94812",
      totalCuLimit = 1400000,
      usedCuTotal = 72750,
      instructions = DEFAULT_INSTRUCTIONS,
      className,
      ...props
    },
    ref
  ) => {
    const percentCu = ((usedCuTotal / totalCuLimit) * 100).toFixed(1);
    const shouldReduceMotion = useReducedMotion();

    return (
      <div
        ref={ref}
        data-slot="batch-transaction-list"
        className={cn(
          "relative flex flex-col rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-5 shadow-xl text-left select-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-2xs">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground tracking-tight block">Atomic Instruction Bundle</span>
              <span className="font-mono text-[11px] text-muted-foreground">{bundleId}</span>
            </div>
          </div>
          <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            {instructions.length} Instructions
          </span>
        </div>

        <div className="my-3 space-y-2">
          {instructions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                ...springRow,
                delay: shouldReduceMotion ? 0 : idx * 0.04,
              }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
              className="flex items-start justify-between rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] p-3.5 border border-black/5 dark:border-white/5 text-xs transition-colors"
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20 mt-0.5 shadow-2xs">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-foreground tracking-tight truncate">{item.action}</div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground mt-0.5 truncate">
                    <Code className="h-3 w-3 shrink-0 opacity-70" /> {item.programName}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[11px] font-semibold text-muted-foreground shrink-0 pl-2">
                {item.cuUnits.toLocaleString()} CU
              </span>
            </motion.div>
          ))}
        </div>

        <div className="pt-3 border-t border-black/5 dark:border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-1.5 font-medium">
            <span>Compute Unit Budget</span>
            <span className="text-foreground font-semibold">
              {usedCuTotal.toLocaleString()} / {totalCuLimit.toLocaleString()} ({percentCu}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
            <motion.div
              initial={shouldReduceMotion ? false : { width: "0%" }}
              animate={{ width: `${percentCu}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }
);

BatchTransactionList.displayName = "BatchTransactionList";

export default BatchTransactionList;
