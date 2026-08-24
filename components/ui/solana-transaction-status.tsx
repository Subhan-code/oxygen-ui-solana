"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Clock, ExternalLink, Loader2 } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TransactionState = "finalized" | "confirmed" | "processing" | "failed";

export interface SolanaTransactionStatusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  signature?: string;
  status?: TransactionState;
  amountSol?: number;
  recipient?: string;
  slotNumber?: number;
}

export function SolanaTransactionStatus({
  signature = "5Kz3x9vL...mP8yQ1aR",
  status = "finalized",
  amountSol = 1.5,
  recipient = "9aXy...2bCd",
  slotNumber = 284910234,
  className,
  ...props
}: SolanaTransactionStatusProps) {
  const reduceMotion = useReducedMotion();

  const statusConfigs = {
    finalized: {
      label: "Finalized",
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
      animate: false,
    },
    confirmed: {
      label: "Confirmed",
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
      animate: false,
    },
    processing: {
      label: "Processing",
      icon: Loader2,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
      animate: true,
    },
    failed: {
      label: "Failed",
      icon: AlertCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10 border-rose-500/20",
      animate: false,
    },
  };

  const config = statusConfigs[status];
  const StatusIcon = config.icon;

  const solscanUrl = `https://solscan.io/tx/${signature}`;

  return (
    <div
      data-slot="solana-transaction-status"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-3.5 rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl border",
              config.bg
            )}
          >
            <StatusIcon
              className={cn(
                "h-4 w-4",
                config.color,
                config.animate && !reduceMotion && "animate-spin"
              )}
            />
          </div>
          <span className="font-runde text-sm font-semibold text-zinc-900 dark:text-white">
            Solana Transaction
          </span>
        </div>

        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase border",
            config.bg,
            config.color
          )}
        >
          {config.label}
        </span>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-100/70 p-3 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Amount</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">
            {amountSol} SOL
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Recipient</span>
          <span className="font-mono text-zinc-700 dark:text-zinc-300">
            {recipient}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Slot</span>
          <span className="font-mono text-zinc-500 dark:text-zinc-400">
            #{slotNumber.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-zinc-400">
          <Clock className="h-3 w-3" />
          <span>Just now</span>
        </div>

        <a
          href={solscanUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-mono text-[11px] font-semibold text-purple-600 hover:underline dark:text-purple-400"
        >
          <span>{signature}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
