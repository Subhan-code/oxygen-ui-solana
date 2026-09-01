"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info, ArrowUpDown } from "lucide-react";

export interface WithdrawalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  initialBalance?: number;
  exchangeRate?: number;
  feePct?: number;
  tokenSymbol?: string;
  stakedTokenSymbol?: string;
  onWithdraw?: (amount: number, instant: boolean) => void;
}

export function WithdrawalCard({
  initialBalance = 539.21,
  exchangeRate = 0.95,
  feePct = 5,
  tokenSymbol = "Aztec",
  stakedTokenSymbol = "stAztec",
  onWithdraw,
  className,
  ...props
}: WithdrawalCardProps) {
  const [amount, setAmount] = useState<string>("134.80");
  const [isInstant, setIsInstant] = useState<boolean>(true);
  const [selectedPct, setSelectedPct] = useState<number | null>(null);

  const parsedAmount = parseFloat(amount) || 0;
  const usdValue = (parsedAmount * 0.52).toFixed(2);
  const feeAmount = isInstant ? (parsedAmount * (feePct / 100)) : 0;
  const receiveAmount = Math.max(0, parsedAmount - feeAmount).toFixed(2);
  const receiveUsd = (parseFloat(receiveAmount) * 0.52).toFixed(2);

  const handlePctClick = (pct: number) => {
    setSelectedPct(pct);
    const calculated = ((initialBalance * pct) / 100).toFixed(2);
    setAmount(calculated);
  };

  const handleWithdrawClick = () => {
    if (parsedAmount <= 0) return;
    onWithdraw?.(parsedAmount, isInstant);
  };

  return (
    <div
      data-slot="withdrawal-card"
      className={cn(
        "relative overflow-hidden rounded-[36px] bg-[#FAF5F0] dark:bg-zinc-900 p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800 shadow-xl max-w-2xl w-full select-none font-sans",
        className
      )}
      {...props}
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Request Withdrawal</h2>
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-200/70 dark:bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span>Balance</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-white">
            {initialBalance} {tokenSymbol}
          </span>
        </div>
      </div>

      {/* Percentage Preset Chips */}
      <div className="flex items-center gap-2 mb-6">
        {[25, 50, 75, 100].map((pct) => {
          const label = pct === 100 ? "Max" : `${pct}%`;
          const isActive = selectedPct === pct;

          return (
            <button
              key={pct}
              type="button"
              onClick={() => handlePctClick(pct)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                isActive
                  ? "bg-pink-300 text-pink-950 font-bold shadow-xs"
                  : "bg-pink-100/70 dark:bg-pink-950/40 text-pink-900 dark:text-pink-300 hover:bg-pink-200/80"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Amount Input Row */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between gap-4">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSelectedPct(null);
            }}
            className="w-full bg-transparent font-sans text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white outline-none"
            placeholder="0.00"
          />
          <span className="text-base font-semibold text-zinc-500 shrink-0">{tokenSymbol}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-2">
          <span>${usdValue}</span>
          <ArrowUpDown className="size-3.5 cursor-pointer hover:text-zinc-600" />
        </div>
      </div>

      {/* Inner Card: You Will Receive */}
      <div className="rounded-3xl bg-[#F0EADF] dark:bg-zinc-800/70 p-5 sm:p-6 border border-zinc-300/40 dark:border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">You will receive</span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
              <span>Instant withdrawal</span>
              <Info className="size-3.5" />
              <span className="text-[10px] text-zinc-400 ml-1">Fee ({feePct}%) ~0.0001 {tokenSymbol}</span>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsInstant(!isInstant)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out border-2 border-transparent",
                isInstant ? "bg-pink-400" : "bg-zinc-300 dark:bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
                  isInstant ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>

        {/* Receive Amount */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {receiveAmount}
            </span>
            <span className="text-base font-semibold text-zinc-500">{tokenSymbol}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-1">
            <span>${receiveUsd}</span>
            <ArrowUpDown className="size-3.5 cursor-pointer hover:text-zinc-600" />
          </div>
        </div>

        {/* Rate & Fee Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-300/40 dark:border-zinc-700/40 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-4">
            <span>Exchange Rate: 1 {tokenSymbol} = {exchangeRate} {stakedTokenSymbol}</span>
            <span>Transaction Fee: ~0.0001 {tokenSymbol}</span>
          </div>

          <button
            type="button"
            onClick={handleWithdrawClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59CE4] hover:bg-[#F383DD] text-zinc-950 font-bold px-7 py-3 text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span>Withdraw</span>
            <span className="text-xs">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalCard;
