"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type FeeTier = "low" | "medium" | "high" | "turbo" | "fast" | "ultra";

export interface PriorityFeeSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tier?: FeeTier;
  selectedTier?: FeeTier;
  onChange?: (tier: FeeTier, microLamports: number) => void;
  onChangeTier?: (tier: FeeTier) => void;
}

interface TierConfig {
  id: "low" | "medium" | "high" | "turbo";
  label: string;
  fee: string;
  microLamports: number;
}

const TIERS: TierConfig[] = [
  {
    id: "low",
    label: "Economy",
    fee: "0.00001",
    microLamports: 10000,
  },
  {
    id: "medium",
    label: "Standard",
    fee: "0.00005",
    microLamports: 50000,
  },
  {
    id: "high",
    label: "Fast",
    fee: "0.0002",
    microLamports: 200000,
  },
  {
    id: "turbo",
    label: "Priority",
    fee: "0.001",
    microLamports: 1000000,
  },
];

export function PriorityFeeSelector({
  tier,
  selectedTier,
  onChange,
  onChangeTier,
  className,
  ...props
}: PriorityFeeSelectorProps) {
  const currentTier = tier ?? selectedTier ?? "medium";

  const normalizeTier = (t: FeeTier): "low" | "medium" | "high" | "turbo" => {
    if (t === "fast") return "high";
    if (t === "ultra") return "turbo";
    return t;
  };

  const normalized = normalizeTier(currentTier);
  const selectedConfig = TIERS.find((t) => t.id === normalized) ?? TIERS[1];

  const handleSelect = (item: TierConfig) => {
    onChange?.(item.id, item.microLamports);
    onChangeTier?.(item.id);
  };

  return (
    <div
      data-slot="priority-fee-selector"
      className={cn(
        "flex flex-col gap-2.5 w-full rounded-[24px] border border-white/[0.08] bg-zinc-950/80 p-3.5 backdrop-blur-xl shadow-2xl select-none font-sans text-zinc-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[13px] font-medium text-zinc-400">
          Priority fee
        </span>
        <span className="font-mono text-[11px] text-zinc-400 tabular-nums">
          {selectedConfig.fee} SOL
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Priority fee tier"
        className="grid grid-cols-4 gap-1 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.06]"
      >
        {TIERS.map((item) => {
          const isSelected = item.id === normalized;

          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(item)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 rounded-[12px] transition-all duration-180 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                isSelected
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              )}
            >
              <span className="text-[12px] font-medium leading-tight">
                {item.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] tabular-nums mt-0.5",
                  isSelected ? "text-zinc-600" : "text-zinc-500"
                )}
              >
                {item.fee}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PriorityFeeSelector;
