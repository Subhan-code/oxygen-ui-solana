"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TransactionStep = "sent" | "confirming" | "finalized" | "failed";
export type TransactionState = "finalized" | "confirmed" | "processing" | "failed";

export interface SolanaTransactionStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  signature?: string;
  step?: TransactionStep;
  status?: TransactionState;
  amountSol?: number;
  recipient?: string;
  slotNumber?: number;
  className?: string;
}

const STEPS: { id: "sent" | "confirming" | "finalized"; label: string }[] = [
  { id: "sent", label: "Sent" },
  { id: "confirming", label: "Confirming" },
  { id: "finalized", label: "Finalized" },
];

const truncate = (sig: string) => {
  if (sig.length <= 10) return sig;
  return `${sig.slice(0, 4)}...${sig.slice(-4)}`;
};

export function SolanaTransactionStatus({
  signature = "5Kz3x9vL...mP8yQ1aR",
  step,
  status,
  amountSol,
  recipient,
  slotNumber,
  className,
  ...props
}: SolanaTransactionStatusProps) {
  const resolvedStep: TransactionStep =
    step ??
    (status === "processing"
      ? "confirming"
      : status === "confirmed"
      ? "confirming"
      : status ?? "sent");

  const stepLabels: Record<TransactionStep, string> = {
    sent: "Sent",
    confirming: "Confirming",
    finalized: "Finalized",
    failed: "Failed",
  };

  const statusColors: Record<TransactionStep, string> = {
    sent: "text-sky-400",
    confirming: "text-amber-400",
    finalized: "text-emerald-400",
    failed: "text-rose-400",
  };

  const getStepIndex = (s: TransactionStep) => {
    switch (s) {
      case "sent":
        return 0;
      case "confirming":
        return 1;
      case "finalized":
        return 2;
      case "failed":
        return 1;
    }
  };

  const currentIndex = getStepIndex(resolvedStep);
  const solscanUrl = `https://solscan.io/tx/${signature}`;
  const hasDetails = amountSol != null || recipient != null || slotNumber != null;

  return (
    <div
      data-slot="solana-transaction-status"
      role="status"
      className={cn(
        "flex flex-col gap-4 w-full max-w-sm rounded-[24px] border border-white/[0.08] bg-zinc-950/80 p-5 text-zinc-100 backdrop-blur-xl shadow-2xl select-none font-runde",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-medium tracking-tight text-zinc-100">
          Transaction
        </span>
        <span className={cn("text-[13px] font-medium", statusColors[resolvedStep])}>
          {stepLabels[resolvedStep]}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 px-1 pt-1">
        {STEPS.map((s, idx) => {
          const isCompleted =
            resolvedStep === "finalized"
              ? true
              : resolvedStep !== "failed" && idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isFailed = isCurrent && resolvedStep === "failed";

          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5 shrink-0 z-10">
                <span
                  className={cn(
                    "size-6 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold transition-colors duration-150",
                    isFailed
                      ? "border border-rose-500/50 bg-rose-500/15 text-rose-400"
                      : isCompleted
                      ? resolvedStep === "finalized"
                        ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                        : "border border-zinc-600 bg-zinc-800 text-zinc-200"
                      : isCurrent
                      ? resolvedStep === "confirming"
                        ? "border border-amber-500/40 bg-amber-500/15 text-amber-300"
                        : "border border-zinc-600 bg-zinc-800 text-zinc-100"
                      : "border border-white/10 bg-white/[0.04] text-zinc-500"
                  )}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium transition-colors",
                    isCurrent || isCompleted ? "text-zinc-200" : "text-zinc-500"
                  )}
                >
                  {s.label}
                </span>
              </div>

              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mt-3 transition-colors duration-150",
                    isCompleted
                      ? resolvedStep === "finalized"
                        ? "bg-emerald-500/40"
                        : "bg-zinc-600"
                      : "bg-white/[0.08]"
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {hasDetails && (
        <div className="flex flex-col gap-2 rounded-[16px] bg-white/[0.04] border border-white/[0.06] p-3 text-xs">
          {amountSol != null && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[12px]">Amount</span>
              <span className="font-mono text-[12px] font-medium text-zinc-100">
                {amountSol} SOL
              </span>
            </div>
          )}
          {recipient != null && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[12px]">Recipient</span>
              <span className="font-mono text-[11px] text-zinc-300">
                {recipient}
              </span>
            </div>
          )}
          {slotNumber != null && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-[12px]">Slot</span>
              <span className="font-mono text-[11px] text-zinc-400">
                #{slotNumber.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[11px]">
        <span
          title={signature}
          className="font-mono text-zinc-500 truncate max-w-[200px]"
        >
          {truncate(signature)}
        </span>
        <a
          href={solscanUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View transaction on Solscan"
          className="font-medium text-sky-400 hover:text-sky-300 hover:underline transition-colors"
        >
          View
        </a>
      </div>
    </div>
  );
}

export default SolanaTransactionStatus;
