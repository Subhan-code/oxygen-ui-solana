"use client";

import React, { useState } from "react";
import {
  Check,
  Copy,
  ChevronDown,
  QrCode,
  Search,
  Send,
  Repeat,
  DollarSign,
  ShieldCheck,
  Wallet,
  TrendingUp,
  TrendingDown,
  Grid,
} from "lucide-react";
import solana from "thesvg/solana";
import usdc from "thesvg/usdc";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TokenAsset {
  symbol: string;
  name: string;
  amount: string;
  fiatValue: string;
  change: string;
  isPositive: boolean;
  iconBg: string;
}

export interface SolanaIdentityCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  address?: string;
  handle?: string;
  domain?: string;
  avatarUrl?: string;
  avatarEmoji?: string;
  cluster?: "mainnet-beta" | "devnet" | "testnet";
  verified?: boolean;
  totalFiatBalance?: string;
  dayChangeFiat?: string;
  dayChangePercent?: string;
  solBalance?: string;
  solFiatValue?: string;
  usdcBalance?: string;
  usdcFiatValue?: string;
  onSend?: () => void;
  onReceive?: () => void;
  onSwap?: () => void;
  onBuy?: () => void;
}

export function SolanaIdentityCard({
  address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  handle = "@oxygenui",
  domain = "oxygen.sol",
  avatarUrl,
  avatarEmoji = "🐸",
  cluster = "mainnet-beta",
  verified = true,
  totalFiatBalance = "$11,581.21",
  dayChangeFiat = "+$63.77",
  dayChangePercent = "+0.55%",
  solBalance = "24.91076 SOL",
  solFiatValue = "$6,027.16",
  usdcBalance = "5,515.92504 USDC",
  usdcFiatValue = "$5,515.93",
  onSend,
  onReceive,
  onSwap,
  onBuy,
  className,
  ...props
}: SolanaIdentityCardProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("0.5SOL - 500SOL");
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const ranges = ["0.1SOL - 50SOL", "0.5SOL - 500SOL", "1SOL - 1000SOL", "Custom Range"];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleAction = (type: string, callback?: () => void) => {
    setActiveAction(type);
    callback?.();
    setTimeout(() => setActiveAction(null), 1500);
  };

  const assets: TokenAsset[] = [
    {
      symbol: "SOL",
      name: "Solana",
      amount: solBalance,
      fiatValue: solFiatValue,
      change: "+$70.97",
      isPositive: true,
      iconBg: "bg-[#0071E3] border border-blue-400/40",
    },
    {
      symbol: "USDC",
      name: "USDC",
      amount: usdcBalance,
      fiatValue: usdcFiatValue,
      change: "-$5.97",
      isPositive: false,
      iconBg: "bg-blue-600 border border-blue-400/40",
    },
  ];

  return (
    <motion.div
      data-slot="solana-identity-card"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative flex w-full max-w-sm flex-col overflow-hidden rounded-[38px] border border-white/10 bg-[#1C1C1E] p-6 text-white shadow-2xl backdrop-blur-2xl font-sans select-none",
        className
      )}
      {...props}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950/80 border border-blue-500/40 text-lg shadow-inner">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={handle}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span>{avatarEmoji}</span>
            )}
            {verified && (
              <span
                title="Verified Solana Account"
                className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white shadow"
              >
                <ShieldCheck className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* User info & Range selector */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-zinc-300 tracking-wide">
              {handle}
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRangeOpen(!rangeOpen)}
                className="flex items-center gap-1 text-[13px] font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span>{selectedRange}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-blue-400 transition-transform duration-200", rangeOpen && "rotate-180")} />
              </button>

              {/* Range Dropdown */}
              <AnimatePresence>
                {rangeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 z-30 mt-1.5 w-44 rounded-2xl border border-blue-900/60 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
                  >
                    {ranges.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setSelectedRange(r);
                          setRangeOpen(false);
                        }}
                        className={cn(
                          "w-full rounded-xl px-3 py-1.5 text-left text-xs font-medium transition-colors cursor-pointer",
                          selectedRange === r ? "bg-blue-600/30 text-blue-300 font-bold border border-blue-500/30" : "text-zinc-300 hover:bg-blue-950/50"
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Header Icons */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            title="Scan QR / Copy Address"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-900/90 border border-blue-900/50 text-blue-300 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-blue-400" /> : <QrCode className="h-4 w-4" />}
          </motion.button>
          <motion.button
            type="button"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            title="Search transactions"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-900/90 border border-blue-900/50 text-blue-300 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer"
          >
            <Search className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Main Hero Fiat Balance */}
      <div className="my-6 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="font-runde text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          {totalFiatBalance}
        </motion.h1>

        {/* Day PnL Pill */}
        <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-blue-950/80 border border-blue-500/40 px-3.5 py-1 text-xs font-semibold text-blue-400 shadow-sm">
          <span>{dayChangeFiat}</span>
          <span className="rounded-md bg-blue-500/25 px-1.5 py-0.5 text-[11px] font-bold text-blue-200">
            {dayChangePercent}
          </span>
        </div>
      </div>

      {/* Action Notification Toast */}
      <AnimatePresence>
        {activeAction && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 rounded-xl bg-blue-600/20 border border-blue-500/40 py-1.5 text-center text-xs font-semibold text-blue-300"
          >
            Triggered {activeAction} action
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Grid (4 Buttons) */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {/* Receive */}
        <motion.button
          type="button"
          onClick={() => handleAction("Receive", onReceive)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-900/90 border border-blue-900/50 py-3.5 text-zinc-300 hover:bg-blue-950/60 hover:text-white hover:border-blue-500/50 motion-safe:transition-[background-color,border-color,color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
            <Grid className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold tracking-tight">Receive</span>
        </motion.button>

        {/* Send */}
        <motion.button
          type="button"
          onClick={() => handleAction("Send", onSend)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-900/90 border border-blue-900/50 py-3.5 text-zinc-300 hover:bg-blue-950/60 hover:text-white hover:border-blue-500/50 motion-safe:transition-[background-color,border-color,color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
            <Send className="h-4 w-4 -rotate-45" />
          </div>
          <span className="text-xs font-semibold tracking-tight">Send</span>
        </motion.button>

        {/* Swap */}
        <motion.button
          type="button"
          onClick={() => handleAction("Swap", onSwap)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-900/90 border border-blue-900/50 py-3.5 text-zinc-300 hover:bg-blue-950/60 hover:text-white hover:border-blue-500/50 motion-safe:transition-[background-color,border-color,color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
            <Repeat className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold tracking-tight">Swap</span>
        </motion.button>

        {/* Buy */}
        <motion.button
          type="button"
          onClick={() => handleAction("Buy", onBuy)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-900/90 border border-blue-900/50 py-3.5 text-zinc-300 hover:bg-blue-950/60 hover:text-white hover:border-blue-500/50 motion-safe:transition-[background-color,border-color,color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] cursor-pointer shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40">
            <DollarSign className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold tracking-tight">Buy</span>
        </motion.button>
      </div>

      {/* Asset Cards Stack */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <motion.div
            key={asset.symbol}
            whileHover={{ scale: 1.02, x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-between rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-4 motion-safe:transition-[background-color,border-color] motion-safe:duration-150 hover:bg-zinc-900 hover:border-blue-500/40 cursor-pointer shadow-sm"
          >
            {/* Left: Full-cover Token Icon + Name & Amount */}
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-zinc-900 shadow-md [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover"
                dangerouslySetInnerHTML={{
                  __html: asset.symbol === "SOL" ? solana.svg : usdc.svg,
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">
                  {asset.name}
                </span>
                <span className="text-xs font-semibold text-zinc-400 mt-0.5">
                  {asset.amount}
                </span>
              </div>
            </div>

            {/* Right: Fiat Value & Change */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-extrabold text-white leading-tight">
                {asset.fiatValue}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold mt-0.5",
                  asset.isPositive ? "text-blue-400" : "text-rose-400"
                )}
              >
                {asset.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SolanaIdentityCard;
