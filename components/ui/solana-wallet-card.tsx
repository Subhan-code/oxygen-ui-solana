"use client";

import React, { useState } from "react";
import { Check, Copy, ArrowUpRight, ArrowRightLeft, Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import solana from "thesvg/solana";
import ethereum from "thesvg/ethereum";
import bitcoin from "thesvg/bitcoin";
import { cn } from "@/lib/utils";

export interface SolanaWalletCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  walletLabel?: string;
  address?: string;
  balanceFiat?: string;
  pnlPercent?: string;
  onSwap?: () => void;
  onSend?: () => void;
  onAddToken?: () => void;
}

export function SolanaWalletCard({
  walletLabel = "Main wallet",
  address = "0x3ddedt...ac563",
  balanceFiat = "$37,521",
  pnlPercent = "+17.56%",
  onSwap,
  onSend,
  onAddToken,
  className,
  ...props
}: SolanaWalletCardProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const triggerAction = (type: string, callback?: () => void) => {
    setActiveToast(type);
    callback?.();
    setTimeout(() => setActiveToast(null), 1600);
  };

  return (
    <motion.div
      data-slot="solana-wallet-card"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-3.5 rounded-[40px] border border-black/5 bg-[#eff3f8] p-3.5 shadow-xl shadow-zinc-300/40 backdrop-blur-2xl dark:border-white/10 dark:bg-[#111622] dark:shadow-black/60 font-sans select-none overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Tactile Grain Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.10] mix-blend-overlay z-10">
        <svg className="h-full w-full">
          <filter id="wallet-card-noise-refined">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wallet-card-noise-refined)" />
        </svg>
      </div>

      {/* Top Soft Pastel Card Section */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-[30px] border border-white/90 bg-[#f7f9fd] p-6 shadow-sm dark:border-white/10 dark:bg-[#1a2130]">
        {/* Top Wallet Header */}
        <div className="flex items-start justify-between z-20">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {walletLabel}
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {address}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            title="Copy Wallet Address"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-600 shadow-xs hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700/80 dark:bg-[#232c3e] dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </motion.button>
        </div>

        {/* Main Big Balance */}
        <div className="my-6 z-20">
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="font-runde text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            {balanceFiat}
          </motion.h1>
        </div>

        {/* Bottom Token Stack + PnL Badge */}
        <div className="flex items-center justify-between z-20">
          {/* Overlapping Token Avatars */}
          <div className="flex items-center -space-x-2">
            {/* Bitcoin */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-zinc-900 ring-2 ring-white dark:ring-zinc-900 shadow-xs [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover"
              dangerouslySetInnerHTML={{ __html: bitcoin.svg }}
            />
            {/* Solana */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-zinc-900 ring-2 ring-white dark:ring-zinc-900 shadow-xs [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover"
              dangerouslySetInnerHTML={{ __html: solana.svg }}
            />
            {/* Ethereum */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-zinc-900 ring-2 ring-white dark:ring-zinc-900 shadow-xs [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover"
              dangerouslySetInnerHTML={{ __html: ethereum.svg }}
            />
            {/* Plus add token */}
            <motion.button
              type="button"
              onClick={() => triggerAction("Add Token", onAddToken)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 font-bold text-xs ring-2 ring-white dark:ring-zinc-900 dark:bg-[#232c3e] dark:text-zinc-300 shadow-xs cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Soft Pastel PnL Green Pill */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#15803d] dark:bg-[#064e3b]/80 dark:text-[#86efac] dark:border dark:border-emerald-500/30">
            <span>{pnlPercent}</span>
          </div>
        </div>
      </div>

      {/* Action Notification Toast */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-xl bg-zinc-900/90 py-1 text-center text-xs font-semibold text-zinc-200 dark:bg-zinc-800 z-20"
          >
            Action: {activeToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom 2 Pill Action Buttons */}
      <div className="grid grid-cols-2 gap-3 z-20">
        {/* Swap Pill Button */}
        <motion.button
          type="button"
          onClick={() => triggerAction("Swap", onSwap)}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2.5 rounded-3xl border border-zinc-200/80 bg-white py-3.5 px-4 font-bold text-zinc-900 shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-[#1a2130] dark:text-white dark:hover:border-zinc-700 cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff3f8] text-zinc-700 dark:bg-[#252e42] dark:text-zinc-200">
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-bold tracking-tight">Swap</span>
        </motion.button>

        {/* Send Pill Button */}
        <motion.button
          type="button"
          onClick={() => triggerAction("Send", onSend)}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2.5 rounded-3xl border border-zinc-200/80 bg-white py-3.5 px-4 font-bold text-zinc-900 shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-[#1a2130] dark:text-white dark:hover:border-zinc-700 cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff3f8] text-zinc-700 dark:bg-[#252e42] dark:text-zinc-200">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-bold tracking-tight">Send</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SolanaWalletCard;
