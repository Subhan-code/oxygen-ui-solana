"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CryptoTokenOption {
  symbol: string;
  name: string;
  priceUsd: number;
  balance: number;
  icon: string;
}

export interface CryptoCheckoutCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  itemName?: string;
  itemDescription?: string;
  priceUsd?: number;
  tokens?: CryptoTokenOption[];
  onSuccess?: (details: { token: string; amount: number; txHash: string }) => void;
}

const DEFAULT_TOKENS: CryptoTokenOption[] = [
  {
    symbol: "SOL",
    name: "Solana",
    priceUsd: 145.5,
    balance: 12.45,
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    priceUsd: 1.0,
    balance: 340.0,
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    priceUsd: 0.000024,
    balance: 4500000,
    icon: "https://arweave.net/hQiWwqawrFZXauicZ0w7MTyo8p55UtWyQBq4vyjgnhU",
  },
];

export function CryptoCheckoutCard({
  itemName = "Oxygen Pro Pass",
  itemDescription = "Lifetime access to premium Solana component primitives.",
  priceUsd = 49.0,
  tokens = DEFAULT_TOKENS,
  onSuccess,
  className,
  ...props
}: CryptoCheckoutCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedToken, setSelectedToken] = useState<CryptoTokenOption>(
    tokens[0] || DEFAULT_TOKENS[0]
  );
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const tokenAmount = (priceUsd / selectedToken.priceUsd).toLocaleString(
    undefined,
    {
      maximumFractionDigits: selectedToken.symbol === "BONK" ? 0 : 4,
    }
  );

  const txHash = "5Kj8...9PqW";

  const handlePay = () => {
    if (status !== "idle") return;
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      onSuccess?.({
        token: selectedToken.symbol,
        amount: priceUsd / selectedToken.priceUsd,
        txHash,
      });
    }, 1800);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText("5Kj8mN2vPqW9xL7yR4zT3uE6iO1aS8dF0gH");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-slot="crypto-checkout-card"
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 select-none transition-all duration-300",
        className
      )}
      {...props}
    >
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-4 space-y-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Payment Complete</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Successfully paid {tokenAmount} {selectedToken.symbol} (${priceUsd.toFixed(2)})
            </p>
          </div>

          <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-200/60 dark:border-zinc-800/60 text-left space-y-2 text-xs">
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Item</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {itemName}
              </span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Signature</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {txHash}
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-colors"
          >
            Done
          </button>
        </motion.div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Instant Checkout
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold tracking-tight">{itemName}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {itemDescription}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold">${priceUsd.toFixed(2)}</div>
              <span className="text-[10px] text-zinc-400">USD Equivalent</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Pay With
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50/50 p-3 text-left hover:bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selectedToken.icon}
                    alt={selectedToken.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      {selectedToken.symbol}
                      <span className="text-xs font-normal text-zinc-500">
                        ({selectedToken.name})
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Balance: {selectedToken.balance} {selectedToken.symbol}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-zinc-400 transition-transform duration-200",
                    isSelectorOpen && "rotate-180"
                  )}
                />
              </button>

              {isSelectorOpen && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 py-1">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      type="button"
                      onClick={() => {
                        setSelectedToken(token);
                        setIsSelectorOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                        selectedToken.symbol === token.symbol &&
                          "bg-zinc-50 dark:bg-zinc-800/60 font-semibold"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={token.icon}
                          alt={token.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <span>{token.symbol}</span>
                      </div>
                      <span className="text-zinc-500">
                        {token.balance} {token.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-3 dark:border-zinc-800/80 dark:bg-zinc-900/40 space-y-1.5 text-xs">
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Payable Amount</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {tokenAmount} {selectedToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-500" /> Network Fee
              </span>
              <span>~0.000005 SOL</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={status === "processing"}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.99] disabled:opacity-70 transition-all duration-200"
          >
            {status === "processing" ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Pay {tokenAmount} {selectedToken.symbol}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CryptoCheckoutCard;
