"use client";

import React, { useState } from "react";
import { ArrowDownUp, RefreshCw, Settings, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SPRING_PRESS = { type: "spring" as const, duration: 0.15, bounce: 0 };
const SPRING_SWAP = { type: "spring" as const, duration: 0.3, bounce: 0 };

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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
  const [flipped, setFlipped] = useState(false);

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
    setFlipped((value) => !value);
  };

  const handleSwap = () => {
    setSwapping(true);
    window.setTimeout(() => {
      setSwapping(false);
    }, 2000);
  };

  return (
    <div
      data-slot="solana-swap-card"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-3.5 rounded-[32px] border border-black/10 bg-[#F5F5F7] p-5 shadow-xl backdrop-blur-2xl dark:border-white/15 dark:bg-[#1C1C1E]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0A84FF]/20 dark:text-[#0A84FF]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-runde text-base font-bold text-zinc-900 dark:text-white">
            Solana Swap
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-[#0071E3] dark:text-[#0A84FF] bg-[#0071E3]/10 px-2 py-0.5 rounded-full border border-[#0071E3]/20">
            Slippage: {slippagePct}%
          </span>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl text-zinc-400 motion-safe:transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/40"
            title="Swap settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-[#0071E3] dark:text-[#0A84FF]">You Pay</span>
          <span className="font-mono text-[11px]">
            Balance: {payToken.balance.toLocaleString()} {payToken.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <input
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent font-mono text-2xl font-bold text-zinc-900 outline-none dark:text-white"
          />

          <select
            value={payTokenSymbol}
            onChange={(e) => setPayTokenSymbol(e.target.value)}
            className="rounded-xl border border-black/10 bg-zinc-100 px-3 py-1.5 font-mono text-xs font-bold text-zinc-900 shadow-xs outline-none dark:border-white/15 dark:bg-zinc-800 dark:text-white cursor-pointer"
          >
            {SWAP_TOKENS.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative flex justify-center -my-2.5 z-10">
        <motion.button
          type="button"
          onClick={handleFlip}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          transition={SPRING_PRESS}
          className="flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#0071E3] shadow-md motion-safe:transition-colors hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-800 dark:text-[#0A84FF] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/40"
          title="Switch pay and receive tokens"
        >
          <motion.span
            animate={{ rotate: flipped ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : SPRING_SWAP}
            className="flex"
            style={{ transformOrigin: "center center" }}
          >
            <ArrowDownUp className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-[#0071E3] dark:text-[#0A84FF]">You Receive</span>
          <span className="font-mono text-[11px]">
            Balance: {receiveToken.balance.toLocaleString()} {receiveToken.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="w-full font-mono text-2xl font-bold tabular-nums text-zinc-900 dark:text-white">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${receiveTokenSymbol}-${estimatedReceiveNum}`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, filter: "blur(2px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8, filter: "blur(2px)" }
                }
                transition={reduceMotion ? { duration: 0.16 } : SPRING_SWAP}
                className="inline-block"
              >
                {estimatedReceiveNum.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </motion.span>
            </AnimatePresence>
          </span>

          <select
            value={receiveTokenSymbol}
            onChange={(e) => setReceiveTokenSymbol(e.target.value)}
            className="rounded-xl border border-black/10 bg-zinc-100 px-3 py-1.5 font-mono text-xs font-bold text-zinc-900 shadow-xs outline-none dark:border-white/15 dark:bg-zinc-800 dark:text-white cursor-pointer"
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
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={SPRING_PRESS}
        className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#0071E3] font-runde text-base font-bold text-white shadow-lg disabled:opacity-50 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={swapping ? "busy" : "idle"}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={reduceMotion ? { duration: 0.16 } : SPRING_SWAP}
            className="inline-flex items-center gap-2"
          >
            {swapping ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin [animation-duration:0.6s]" />
                <span>Swapping on Jupiter...</span>
              </>
            ) : (
              <span>Execute Swap</span>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
