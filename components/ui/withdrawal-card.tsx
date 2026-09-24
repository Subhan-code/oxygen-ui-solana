"use client";

import React, { useState, useMemo } from "react";
import { ArrowDownRight, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WithdrawalCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onConfirm"> {
  maxBalance?: number;
  initialBalance?: number;
  estimatedFee?: number | string;
  feePct?: number;
  tokenSymbol?: string;
  tokenPriceUsd?: number;
  destinationAddress?: string;
  onConfirm?: (amount: string) => void;
  onWithdraw?: (amount: number, instant?: boolean) => void;
}

export function WithdrawalCard({
  maxBalance,
  initialBalance,
  estimatedFee = "0.0005 SOL",
  tokenSymbol = "SOL",
  tokenPriceUsd = 142.5,
  destinationAddress = "7xKX...gAsU",
  onConfirm,
  onWithdraw,
  className,
  ...props
}: WithdrawalCardProps) {
  const effectiveMax = maxBalance ?? initialBalance ?? 24.85;

  const [amount, setAmount] = useState<string>("5.00");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const parsedAmount = parseFloat(amount) || 0;
  const isValid = parsedAmount > 0 && parsedAmount <= effectiveMax;

  const feeNumeric = useMemo(() => {
    if (typeof estimatedFee === "number") return estimatedFee;
    const match = String(estimatedFee).match(/[0-9.]+/);
    return match ? parseFloat(match[0]) : 0.0005;
  }, [estimatedFee]);

  const receiveAmount = useMemo(() => {
    if (parsedAmount <= 0) return "0.00";
    return Math.max(0, parsedAmount - feeNumeric).toFixed(4);
  }, [parsedAmount, feeNumeric]);

  const fiatEstimate = useMemo(() => {
    if (parsedAmount <= 0) return "$0.00";
    return `$${(parsedAmount * tokenPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [parsedAmount, tokenPriceUsd]);

  const handlePreset = (pct: number) => {
    setSelectedPreset(pct);
    if (pct === 100) {
      const maxNet = Math.max(0, effectiveMax - feeNumeric);
      setAmount(maxNet.toFixed(4));
    } else {
      const calc = (effectiveMax * pct) / 100;
      setAmount(calc.toFixed(2));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleCommitWithdraw = () => {
    if (!isValid) return;
    onConfirm?.(amount);
    onWithdraw?.(parsedAmount, true);
  };

  return (
    <div
      data-slot="withdrawal-card"
      className={cn(
        "flex flex-col gap-5 rounded-[32px] border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] select-none text-zinc-100 max-w-md w-full font-sans",
        className
      )}
      {...props}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-zinc-100">
          Withdraw
        </h2>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1 text-xs">
          <span className="text-zinc-500 font-medium">Balance</span>
          <span className="font-mono font-semibold tabular-nums text-zinc-200">
            {effectiveMax.toLocaleString()} {tokenSymbol}
          </span>
        </div>
      </div>

      {/* Hero Amount Input & Ticker */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex items-baseline justify-center w-full gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={effectiveMax}
            step="any"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full max-w-[240px] bg-transparent text-center font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white outline-none placeholder:text-zinc-700"
          />
          <span className="text-lg font-semibold text-zinc-400 font-mono">
            {tokenSymbol}
          </span>
        </div>
        <span className="text-xs text-zinc-500 font-mono mt-1">
          ≈ {fiatEstimate}
        </span>
      </div>

      {/* Presets: 25 / 50 / 75 / Max */}
      <div className="grid grid-cols-4 gap-2">
        {[25, 50, 75, 100].map((pct) => {
          const label = pct === 100 ? "Max" : `${pct}%`;
          const isSelected = selectedPreset === pct;

          return (
            <button
              key={pct}
              type="button"
              onClick={() => handlePreset(pct)}
              className={cn(
                "h-8 rounded-full text-xs font-semibold font-mono transition-all duration-150 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 cursor-pointer",
                isSelected
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Details Hairline Well */}
      <div className="flex flex-col gap-2.5 p-3.5 rounded-[20px] bg-white/[0.04] border border-white/[0.06] text-xs">
        {/* Destination */}
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Wallet className="size-3.5 text-zinc-500" />
            <span>To connected wallet</span>
          </span>
          <span className="font-mono text-zinc-300 text-[11px]">
            {destinationAddress}
          </span>
        </div>

        {/* Network Fee */}
        <div className="flex items-center justify-between text-zinc-400">
          <span>Network fee</span>
          <span className="font-mono text-zinc-300 text-[11px]">
            {String(estimatedFee)}
          </span>
        </div>

        {/* Receive Row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[13px] font-medium">
          <span className="text-zinc-200">You will receive</span>
          <span className="font-mono font-semibold tabular-nums text-emerald-400">
            {receiveAmount} {tokenSymbol}
          </span>
        </div>
      </div>

      {/* Full-width Apple White Pill CTA */}
      <button
        type="button"
        disabled={!isValid}
        onClick={handleCommitWithdraw}
        className={cn(
          "w-full h-11 rounded-2xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          isValid
            ? "bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] cursor-pointer shadow-xs"
            : "bg-white/10 text-zinc-600 cursor-not-allowed"
        )}
      >
        <ArrowDownRight className="size-4" />
        <span>Withdraw {tokenSymbol}</span>
      </button>
    </div>
  );
}

export const RequestWithdrawalCard = WithdrawalCard;
export default WithdrawalCard;
