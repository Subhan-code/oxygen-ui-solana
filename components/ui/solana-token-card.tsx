"use client";

import React, { useState } from "react";
import { Eye, EyeOff, TrendingDown, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TokenAsset = {
  symbol: string;
  name: string;
  amount: number;
  usdValue: number;
  change24h: number;
  iconBg: string;
};

export interface SolanaTokenCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  portfolioName?: string;
  tokens?: TokenAsset[];
}

const DEFAULT_TOKENS: TokenAsset[] = [
  {
    symbol: "SOL",
    name: "Solana",
    amount: 32.4,
    usdValue: 5832.0,
    change24h: 6.42,
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    amount: 1450.0,
    usdValue: 1450.0,
    change24h: 0.01,
    iconBg: "bg-blue-500",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    amount: 12500000.0,
    usdValue: 312.5,
    change24h: -3.15,
    iconBg: "bg-amber-500",
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    amount: 450.0,
    usdValue: 495.0,
    change24h: 12.8,
    iconBg: "bg-blue-600",
  },
];

export function SolanaTokenCard({
  portfolioName = "Solana Portfolio",
  tokens = DEFAULT_TOKENS,
  className,
  ...props
}: SolanaTokenCardProps) {
  const reduceMotion = useReducedMotion();
  const [hideBalance, setHideBalance] = useState(false);

  const totalUsd = tokens.reduce((acc, token) => acc + token.usdValue, 0);

  return (
    <div
      data-slot="solana-token-card"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          {portfolioName}
        </span>

        <button
          type="button"
          onClick={() => setHideBalance(!hideBalance)}
          className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          title={hideBalance ? "Show balance" : "Hide balance"}
        >
          {hideBalance ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-mono text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {hideBalance
            ? "••••••••"
            : `$${totalUsd.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-0.5 font-medium text-blue-400">
            <TrendingUp className="h-3.5 w-3.5" />
            +4.85%
          </span>
          <span className="text-zinc-400">past 24h</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        {tokens.map((token) => (
          <motion.div
            key={token.symbol}
            whileHover={reduceMotion ? {} : { x: 3 }}
            className="flex items-center justify-between rounded-2xl bg-zinc-100/60 p-2.5 transition-colors dark:bg-zinc-800/40"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white shadow-xs",
                  token.iconBg
                )}
              >
                {token.symbol.slice(0, 3)}
              </div>
              <div className="flex flex-col">
                <span className="font-runde text-xs font-semibold text-zinc-900 dark:text-white">
                  {token.name}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {token.symbol}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">
                {hideBalance
                  ? "••••"
                  : token.amount.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[11px] text-zinc-400">
                  {hideBalance
                    ? "•••"
                    : `$${token.usdValue.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}`}
                </span>
                <span
                  className={cn(
                    "flex items-center text-[10px] font-medium",
                    token.change24h >= 0 ? "text-blue-400" : "text-purple-400"
                  )}
                >
                  {token.change24h >= 0 ? (
                    <TrendingUp className="h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5" />
                  )}
                  {Math.abs(token.change24h)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
