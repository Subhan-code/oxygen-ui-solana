"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SolanaSvg, UsdcSvg } from "./token-svgs";

export interface LiquidityPoolCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pair?: string;
  poolName?: string;
  apr?: string;
  tvl?: string;
  myLiquidity?: string;
  poolShare?: string | number;
  unclaimedFees?: string;
  feesClaimable?: string;
  onClaim?: () => void;
}

export function LiquidityPoolCard({
  pair,
  poolName,
  apr = "48.2%",
  tvl = "$84.2M",
  myLiquidity = "$1,450.00",
  poolShare = "0.017%",
  unclaimedFees,
  feesClaimable,
  onClaim,
  className,
  ...props
}: LiquidityPoolCardProps) {
  const displayPair = pair ?? poolName ?? "SOL / USDC";
  const displayUnclaimed = unclaimedFees ?? feesClaimable ?? "$34.18";

  const parsedShare = React.useMemo(() => {
    if (typeof poolShare === "number") return Math.min(100, Math.max(0, poolShare));
    const cleaned = parseFloat(String(poolShare).replace(/[^0-9.]/g, ""));
    return isNaN(cleaned) ? null : Math.min(100, Math.max(0, cleaned));
  }, [poolShare]);

  return (
    <div
      data-slot="liquidity-pool-card"
      className={cn(
        "flex flex-col gap-4 rounded-[28px] border border-white/[0.08] bg-zinc-950/80 p-5 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] select-none text-zinc-100 max-w-sm w-full font-sans font-runde",
        className
      )}
      {...props}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Dual Token Overlapping SVGs (24px) */}
          <div className="flex items-center -space-x-2 shrink-0">
            <div className="size-6 rounded-full overflow-hidden border border-white/20 ring-2 ring-zinc-950 bg-zinc-900 flex items-center justify-center">
              <SolanaSvg className="size-full" />
            </div>
            <div className="size-6 rounded-full overflow-hidden border border-white/20 ring-2 ring-zinc-950 bg-zinc-900 flex items-center justify-center">
              <UsdcSvg className="size-full" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-zinc-100 font-runde">
              {displayPair}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              Concentrated CLMM
            </span>
          </div>
        </div>

        {/* APR Pill */}
        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tabular-nums">
          APR {apr}
        </span>
      </div>

      {/* Mid Inner Well */}
      <div className="flex flex-col gap-2.5 p-3.5 rounded-[20px] bg-white/[0.04] border border-white/[0.06]">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-zinc-500">TVL</span>
            <span className="font-mono text-sm font-semibold tabular-nums text-zinc-100 mt-0.5">
              {tvl}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-zinc-500">My deposit</span>
            <span className="font-mono text-sm font-semibold tabular-nums text-zinc-100 mt-0.5">
              {myLiquidity}
            </span>
          </div>
        </div>

        {/* Thin Pool-share Bar */}
        {parsedShare !== null && (
          <div className="flex flex-col gap-1 pt-1 border-t border-white/[0.04]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Pool share</span>
              <span className="font-mono tabular-nums text-zinc-400">
                {String(poolShare)}
              </span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(parsedShare * 20, 4)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex flex-col">
          <span className="text-[11px] text-zinc-500">Unclaimed yield</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-emerald-400">
            {displayUnclaimed}
          </span>
        </div>

        <button
          type="button"
          onClick={onClaim}
          className="h-8 px-3.5 rounded-full bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer shadow-xs"
        >
          Claim
        </button>
      </div>
    </div>
  );
}

export default LiquidityPoolCard;
