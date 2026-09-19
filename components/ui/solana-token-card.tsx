"use client";

import React, { useState } from "react";
import { ArrowDownToLine, ArrowUp, CreditCard, Eye, EyeOff, Repeat, TrendingDown, TrendingUp } from "lucide-react";
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  portfolioName?: string;
  tokens?: TokenAsset[];
  onSend?: () => void;
  onDeposit?: () => void;
  onSwap?: () => void;
  onBuy?: () => void;
}

const DEFAULT_TOKENS: TokenAsset[] = [
  {
    symbol: "SOL",
    name: "Solana",
    amount: 32.4,
    usdValue: 5832.0,
    change24h: 6.42,
    iconBg: "bg-purple-600 dark:bg-purple-500",
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
  onSend,
  onDeposit,
  onSwap,
  onBuy,
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
        "relative flex w-full max-w-sm flex-col gap-4 rounded-[32px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-zinc-900 dark:text-white font-sans select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-runde text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          {portfolioName}
        </span>

        <button
          type="button"
          onClick={() => setHideBalance(!hideBalance)}
          className="rounded-xl p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-[#141416] dark:hover:text-white cursor-pointer"
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
        <span className="font-runde text-3xl sm:text-4xl font-black tracking-tight leading-tight text-zinc-900 dark:text-white">
          {hideBalance
            ? "••••••••"
            : `$${totalUsd.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-500 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            +4.85%
          </span>
          <span className="text-zinc-400">past 24h</span>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {[
          { key: "send", label: "Send", icon: ArrowUp, onClick: onSend },
          { key: "deposit", label: "Deposit", icon: ArrowDownToLine, onClick: onDeposit },
          { key: "swap", label: "Swap", icon: Repeat, onClick: onSwap },
          { key: "buy", label: "Buy", icon: CreditCard, onClick: onBuy },
        ].map(({ key, label, icon: Icon, onClick }) => (
          <motion.button
            key={key}
            type="button"
            onClick={onClick}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 py-3 px-2 text-zinc-700 dark:text-zinc-200 transition-colors hover:bg-zinc-200/90 dark:hover:bg-[#141414] hover:text-zinc-950 dark:hover:text-white cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
          >
            <Icon className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />
            <span className="font-runde text-[11px] font-semibold tracking-tight">{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-1">
        {tokens.map((token) => (
          <motion.div
            key={token.symbol}
            whileHover={reduceMotion ? {} : { x: 3 }}
            className="flex items-center justify-between rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100/80 dark:bg-[#0a0a0a] p-3 transition-colors hover:bg-zinc-200/90 dark:hover:bg-[#141414] cursor-pointer"
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
                <span className="font-runde text-xs font-bold text-zinc-900 dark:text-white">
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
                    "flex items-center text-[10px] font-semibold",
                    token.change24h >= 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
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
