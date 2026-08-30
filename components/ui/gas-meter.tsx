"use client";

import { ActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GasMeterProps {
  tps?: number;
  congestionPercent?: number;
  className?: string;
}

export function GasMeter({
  tps = 2840,
  congestionPercent = 38,
  className,
}: GasMeterProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-card border border-black/10 dark:border-white/10 flex flex-col gap-2.5 shadow-xs text-foreground",
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ActivityIcon className="size-4 text-emerald-500" />
          <span className="text-xs font-bold text-foreground">Solana TPU Gas / TPS Meter</span>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-500">{tps.toLocaleString()} TPS</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>Network Congestion</span>
          <span className="text-emerald-500 font-bold">{congestionPercent}% (Optimal)</span>
        </div>
        <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            style={{ width: `${congestionPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
