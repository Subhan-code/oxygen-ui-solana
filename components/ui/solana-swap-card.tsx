"use client";

import React, { useState } from "react";
import { ArrowDownUp, RefreshCw, Settings, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SwapToken = {
  symbol: string;
  name: string;
  priceUsd: number;
  balance: number;
};

const SWAP_TOKENS: SwapToken[] = [
  { symbol: "SOL", name: "Solana", priceUsd: 180.0, balance: 14.5 },
  { symbol: "USDC", name: "USD Coin", priceUsd: 1.0, balance: 850.0 },
  { symbol: "BONK", name: "Bonk", priceUsd: 0.000025, balance: 45000000.0 },
  { symbol: "JUP", name: "Jupiter", priceUsd: 1.1, balance: 350.0 },
];

export interface SolanaSwapCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultPayToken?: string;
  defaultReceiveToken?: string;
  slippagePct?: number;
}

export function SolanaSwapCard({
  defaultPayToken = "SOL",
  defaultReceiveToken = "USDC",
  slippagePct = 0.5,
  className,
  ...props
}: SolanaSwapCardProps) {
  const reduceMotion = useReducedMotion();
  const [payTokenSymbol, setPayTokenSymbol] = useState(defaultPayToken);
  const [receiveTokenSymbol, setReceiveTokenSymbol] = useState(defaultReceiveToken);
  const [payAmount, setPayAmount] = useState("1.0");
  const [swapping, setSwapping] = useState(false);

  const payToken = SWAP_TOKENS.find((t) => t.symbol === payTokenSymbol) || SWAP_TOKENS[0];
  const receiveToken = SWAP_TOKENS.find((t) => t.symbol === receiveTokenSymbol) || SWAP_TOKENS[1];

  const payValueNum = parseFloat(payAmount) || 0;
  const estimatedReceiveNum =
    receiveToken.priceUsd > 0
      ? (payValueNum * payToken.priceUsd) / receiveToken.priceUsd
      : 0;

  const handleFlip = () => {
    setPayTokenSymbol(receiveTokenSymbol);
    setReceiveTokenSymbol(payTokenSymbol);
  };

  const handleSwap = () => {
    setSwapping(true);
    setTimeout(() => {
      setSwapping(false);
    }, 2000);
  };

  return (
    <div
      data-slot="solana-swap-card"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-3 rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="font-runde text-base font-bold text-zinc-900 dark:text-white">
            Solana Swap
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-zinc-400">
            Slippage: {slippagePct}%
          </span>
          <button
            type="button"
            className="rounded-lg p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            title="Swap settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl bg-zinc-100/70 p-3.5 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>You Pay</span>
          <span className="font-mono">
            Balance: {payToken.balance.toLocaleString()} {payToken.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <input
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent font-mono text-xl font-bold text-zinc-900 outline-none dark:text-white"
          />

          <select
            value={payTokenSymbol}
            onChange={(e) => setPayTokenSymbol(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-xs font-bold text-zinc-900 shadow-xs outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {SWAP_TOKENS.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative flex justify-center -my-2 z-10">
        <motion.button
          type="button"
          onClick={handleFlip}
          whileTap={reduceMotion ? {} : { scale: 0.9, rotate: 180 }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          title="Switch pay and receive tokens"
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl bg-zinc-100/70 p-3.5 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>You Receive</span>
          <span className="font-mono">
            Balance: {receiveToken.balance.toLocaleString()} {receiveToken.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="w-full font-mono text-xl font-bold text-zinc-900 dark:text-white">
            {estimatedReceiveNum.toLocaleString("en-US", {
              maximumFractionDigits: 4,
            })}
          </span>

          <select
            value={receiveTokenSymbol}
            onChange={(e) => setReceiveTokenSymbol(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-xs font-bold text-zinc-900 shadow-xs outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {SWAP_TOKENS.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
        <span>Rate</span>
        <span>
          1 {payToken.symbol} ≈{" "}
          {(payToken.priceUsd / (receiveToken.priceUsd || 1)).toLocaleString(
            "en-US",
            { maximumFractionDigits: 4 }
          )}{" "}
          {receiveToken.symbol}
        </span>
      </div>

      <motion.button
        type="button"
        onClick={handleSwap}
        disabled={swapping || payValueNum <= 0}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-runde text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50"
      >
        {swapping ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Swapping on Jupiter...</span>
          </>
        ) : (
          <span>Execute Swap</span>
        )}
      </motion.button>
    </div>
  );
}
