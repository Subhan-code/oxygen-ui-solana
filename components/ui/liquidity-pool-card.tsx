"use client";

import { CoinsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Button = ({ className, size, variant, asChild, ...props }: React.ComponentProps<"button"> & { size?: string; variant?: string; asChild?: boolean }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props} />
);

export interface LiquidityPoolCardProps {
  poolName?: string;
  apr?: string;
  tvl?: string;
  myLiquidity?: string;
  feesClaimable?: string;
  onClaim?: () => void;
  className?: string;
}

export function LiquidityPoolCard({
  poolName = "SOL-USDC CLMM",
  apr = "48.2%",
  tvl = "$84.2M",
  myLiquidity = "$1,450.00",
  feesClaimable = "$34.18",
  onClaim,
  className,
}: LiquidityPoolCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-card border border-black/10 dark:border-white/10 flex flex-col gap-3 shadow-xs text-foreground",
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CoinsIcon className="size-4 text-sky-500" />
          <span className="text-sm font-bold text-foreground">{poolName}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
          APR {apr}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <div>
          <span className="text-[10px] text-muted-foreground block font-sans">TVL</span>
          <span className="text-foreground font-semibold">{tvl}</span>
        </div>
        <div>
          <span className="text-[10px] text-muted-foreground block font-sans">My Deposit</span>
          <span className="text-foreground font-semibold">{myLiquidity}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">Unclaimed Yield</span>
          <span className="text-xs font-bold font-mono text-emerald-500">{feesClaimable}</span>
        </div>
        <Button
          size="sm"
          onClick={onClaim}
          className="h-7 px-3 bg-sky-500 hover:bg-sky-600 text-white text-xs rounded-lg shadow-xs"
        >
          Claim Fees
        </Button>
      </div>
    </div>
  );
}
