"use client";

import { cn } from "@/lib/utils";

export interface LeaderboardRowProps {
  rank?: number;
  wallet?: string;
  volumeUSD?: string;
  pnl?: string;
  className?: string;
}

export function LeaderboardRow({
  rank = 1,
  wallet = "MFv2...VacA",
  volumeUSD = "$1.45M",
  pnl = "+$84,200",
  className,
}: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-xl bg-card border border-black/10 dark:border-white/10 text-xs font-mono text-foreground",
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "size-6 rounded-full flex items-center justify-center font-bold text-xs",
            rank === 1
              ? "bg-amber-400 text-black"
              : rank === 2
              ? "bg-zinc-300 text-black"
              : rank === 3
              ? "bg-amber-600 text-white"
              : "bg-black/10 dark:bg-white/10 text-muted-foreground"
          )}
        >
          {rank}
        </span>
        <span className="font-bold text-foreground">{wallet}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-muted-foreground font-semibold">{volumeUSD}</span>
        <span className="text-emerald-500 font-bold">{pnl}</span>
      </div>
    </div>
  );
}
