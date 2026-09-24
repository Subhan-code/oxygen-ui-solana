"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface StakingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  validatorName?: string;
  avatarUrl?: string;
  tokenSymbol?: string;
  tokenName?: string;
  stakedAmount?: string | number;
  stakedBalanceSol?: number;
  apy?: string | number;
  apyPercent?: number;
  epochProgress?: number;
  exchangeRate?: string;
  onStake?: () => void;
}

export function StakingCard({
  validatorName,
  avatarUrl = "https://i.pinimg.com/736x/7d/49/c8/7d49c8f690f578ce1d44104597d63d73.jpg",
  tokenSymbol,
  tokenName,
  stakedAmount,
  stakedBalanceSol,
  apy,
  apyPercent,
  epochProgress = 68,
  exchangeRate = "1 JitoSOL = 1.084 SOL",
  onStake,
  className,
  ...props
}: StakingCardProps) {
  const displayValidator = validatorName ?? tokenSymbol ?? "JitoSOL";
  const displaySubtitle = tokenName ?? "Liquid Staking Pool";

  const displayApy = React.useMemo(() => {
    if (apy !== undefined) {
      return typeof apy === "number" ? `${apy.toFixed(2)}%` : apy;
    }
    if (apyPercent !== undefined) {
      return `${apyPercent.toFixed(2)}%`;
    }
    return "7.85%";
  }, [apy, apyPercent]);

  const displayStaked = React.useMemo(() => {
    if (stakedAmount !== undefined) {
      return typeof stakedAmount === "number"
        ? `${stakedAmount.toLocaleString()} SOL`
        : stakedAmount;
    }
    if (stakedBalanceSol !== undefined) {
      return `${stakedBalanceSol} SOL`;
    }
    return "12.50 SOL";
  }, [stakedAmount, stakedBalanceSol]);

  const progressPercent = Math.min(100, Math.max(0, epochProgress));

  return (
    <div
      data-slot="staking-card"
      className={cn(
        "flex flex-col gap-4 rounded-[28px] border border-white/[0.08] bg-zinc-950/80 p-5 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] select-none text-zinc-100 max-w-sm w-full font-sans font-runde",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-3">
          {/* 40px rounded-[14px] Validator PFP */}
          <div className="size-10 rounded-[14px] overflow-hidden border border-white/15 bg-zinc-900 shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={displayValidator}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-zinc-100 leading-snug">
              {displayValidator}
            </h3>
            <p className="text-[11px] text-zinc-500 leading-none mt-0.5">
              {displaySubtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
            Est. APY
          </span>
          <span className="font-mono text-xl font-bold tabular-nums text-emerald-400 leading-tight">
            {displayApy}
          </span>
        </div>
      </div>

      {/* Epoch Progress Well */}
      <div className="flex flex-col gap-1.5 p-3 rounded-[20px] bg-white/[0.04] border border-white/[0.06]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Epoch progress</span>
          <span className="font-mono tabular-nums text-zinc-300">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-sky-400 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Two Quiet Stats Wells */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col p-3 rounded-[20px] bg-white/[0.04] border border-white/[0.06]">
          <span className="text-[11px] font-medium text-zinc-500">Staked amount</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-zinc-100 mt-1">
            {displayStaked}
          </span>
        </div>

        <div className="flex flex-col p-3 rounded-[20px] bg-white/[0.04] border border-white/[0.06]">
          <span className="text-[11px] font-medium text-zinc-500">Rate</span>
          <span className="font-mono text-[12px] font-semibold tabular-nums text-zinc-300 mt-1 truncate" title={exchangeRate}>
            {exchangeRate}
          </span>
        </div>
      </div>

      {/* Apple Primary White Pill CTA */}
      <button
        type="button"
        onClick={onStake}
        className="w-full h-11 rounded-2xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer shadow-xs mt-1"
      >
        Stake SOL
      </button>
    </div>
  );
}

export default StakingCard;
