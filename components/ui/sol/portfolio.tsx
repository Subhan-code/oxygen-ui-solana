"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
} from "lucide-react";
import { TokenCard, TokenItem } from "./token";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export interface BalanceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  symbol?: string;
  fiatValue?: number;
  hideBalance?: boolean;
}

export function BalanceDisplay({
  className,
  amount,
  symbol = "SOL",
  fiatValue,
  hideBalance = false,
  ...props
}: BalanceDisplayProps) {
  return (
    <div
      data-slot="balance-display"
      className={cn(
        "flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl",
        className
      )}
      {...props}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Available Balance
      </span>
      <div className="flex items-baseline gap-2">
        <motion.h2
          key={hideBalance ? "hidden" : amount}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-3xl font-black text-white tracking-tight"
        >
          {hideBalance
            ? "••••••••"
            : `${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${symbol}`}
        </motion.h2>
      </div>
      {fiatValue !== undefined && !hideBalance && (
        <span className="text-sm text-zinc-400 font-medium">
          ≈ ${fiatValue.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
        </span>
      )}
    </div>
  );
}

export interface PortfolioSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  totalUsd: number;
  change24hUsd: number;
  change24hPercent: number;
  hideBalance?: boolean;
}

export function PortfolioSummary({
  className,
  totalUsd,
  change24hUsd,
  change24hPercent,
  hideBalance = false,
  ...props
}: PortfolioSummaryProps) {
  const isPositive = change24hPercent >= 0;

  return (
    <div
      data-slot="portfolio-summary"
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
        Total Net Worth
      </span>
      <div className="flex items-baseline gap-3">
        <motion.h1
          key={hideBalance ? "hidden" : totalUsd}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="text-4xl font-black text-white tracking-tight"
        >
          {hideBalance
            ? "••••••••"
            : `$${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        </motion.h1>
        {!hideBalance && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-md",
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>
              {isPositive ? "+" : ""}
              {change24hPercent.toFixed(2)}% (${Math.abs(change24hUsd).toFixed(2)})
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export interface PortfolioChartProps extends React.HTMLAttributes<HTMLDivElement> {
  dataPoints?: number[];
  height?: number;
}

export function PortfolioChart({
  className,
  dataPoints = [1200, 1350, 1280, 1420, 1600, 1550, 1780],
  height = 120,
  ...props
}: PortfolioChartProps) {
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const points = dataPoints
    .map((val, idx) => {
      const x = (idx / (dataPoints.length - 1)) * 300;
      const y = height - ((val - min) / (max - min || 1)) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      data-slot="portfolio-chart"
      className={cn(
        "rounded-2xl border border-white/10 bg-zinc-950/80 p-4 backdrop-blur-xl shadow-xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-zinc-400">Performance</span>
        <span className="text-xs text-emerald-400 font-bold">7-Day Trend</span>
      </div>
      <svg
        viewBox={`0 0 300 ${height}`}
        className="w-full overflow-visible text-emerald-400 stroke-current"
        style={{ height }}
      >
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}

export interface AllocationItem {
  label: string;
  percentage: number;
  color: string;
}

export interface AssetAllocationProps extends React.HTMLAttributes<HTMLDivElement> {
  allocations?: AllocationItem[];
}

export function AssetAllocation({
  className,
  allocations = [
    { label: "SOL", percentage: 55, color: "bg-emerald-500" },
    { label: "USDC", percentage: 30, color: "bg-blue-500" },
    { label: "BONK", percentage: 15, color: "bg-amber-500" },
  ],
  ...props
}: AssetAllocationProps) {
  return (
    <div
      data-slot="asset-allocation"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl shadow-xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-400">Asset Allocation</span>
        <PieIcon className="h-4 w-4 text-emerald-400" />
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-900">
        {allocations.map((a) => (
          <motion.div
            key={a.label}
            initial={{ width: 0 }}
            animate={{ width: `${a.percentage}%` }}
            transition={springTransition}
            className={cn("h-full", a.color)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs pt-1">
        {allocations.map((a) => (
          <div key={a.label} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", a.color)} />
            <span className="font-semibold text-zinc-300">{a.label}</span>
            <span className="text-zinc-500 font-medium">{a.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface TokenBalanceListProps {
  tokens: TokenItem[];
  hideBalance?: boolean;
  className?: string;
}

export function TokenBalanceList({
  tokens,
  hideBalance = false,
  className,
}: TokenBalanceListProps) {
  return (
    <div
      data-slot="token-balance-list"
      className={cn("flex flex-col gap-2", className)}
    >
      {tokens.map((t, idx) => (
        <motion.div
          key={t.symbol}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: idx * 0.04 }}
        >
          <TokenCard
            name={t.name}
            symbol={t.symbol}
            balance={hideBalance ? 0 : t.balance}
            price={t.price}
            logoUrl={t.logoUrl}
          />
        </motion.div>
      ))}
    </div>
  );
}

export interface HiddenBalanceToggleProps {
  hidden: boolean;
  onToggle: () => void;
  className?: string;
}

export function HiddenBalanceToggle({
  hidden,
  onToggle,
  className,
}: HiddenBalanceToggleProps) {
  return (
    <motion.button
      data-slot="hidden-balance-toggle"
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors backdrop-blur-xl",
        className
      )}
      title={hidden ? "Show Balance" : "Hide Balance"}
    >
      <AnimatePresence mode="wait">
        {hidden ? (
          <motion.span
            key="eye-off"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={springTransition}
          >
            <EyeOff className="h-4 w-4 text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span
            key="eye"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={springTransition}
          >
            <Eye className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="font-semibold">{hidden ? "Balance Hidden" : "Hide Balance"}</span>
    </motion.button>
  );
}

export interface PortfolioValueChangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timeframe?: "24h" | "7d" | "30d";
  percentage: number;
}

export function PortfolioValueChange({
  className,
  timeframe = "24h",
  percentage,
  ...props
}: PortfolioValueChangeProps) {
  const isPositive = percentage >= 0;

  return (
    <motion.div
      data-slot="portfolio-value-change"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold backdrop-blur-md",
        isPositive
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-rose-500/20 bg-rose-500/10 text-rose-400",
        className
      )}
      {...(props as any)}
    >
      {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      <span>
        {timeframe}: {isPositive ? "+" : ""}
        {percentage.toFixed(2)}%
      </span>
    </motion.div>
  );
}

