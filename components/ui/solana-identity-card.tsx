"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck, Wallet } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SolanaIdentityCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  address?: string;
  domain?: string;
  avatarUrl?: string;
  cluster?: "mainnet-beta" | "devnet" | "testnet";
  verified?: boolean;
  balanceSol?: number;
}

export function SolanaIdentityCard({
  address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  domain = "alex.sol",
  avatarUrl,
  cluster = "mainnet-beta",
  verified = true,
  balanceSol = 24.85,
  className,
  ...props
}: SolanaIdentityCardProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failure
    }
  };

  const explorerUrl = `https://solscan.io/account/${address}${
    cluster !== "mainnet-beta" ? `?cluster=${cluster}` : ""
  }`;

  return (
    <div
      data-slot="solana-identity-card"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600 dark:bg-purple-500 text-white shadow-xs">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={domain || address}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <Wallet className="h-5 w-5" />
            )}
            {verified && (
              <span
                title="Verified Solana Identity"
                className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white"
              >
                <ShieldCheck className="h-3 w-3" />
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-runde text-base font-semibold text-zinc-900 dark:text-white">
                {domain || truncatedAddress}
              </span>
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {truncatedAddress}
            </span>
          </div>
        </div>

        <span className="rounded-full bg-purple-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-purple-600 uppercase dark:bg-purple-400/15 dark:text-purple-300">
          {cluster}
        </span>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-zinc-100/70 p-3 dark:bg-zinc-800/50">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            SOL Balance
          </span>
          <span className="font-mono text-lg font-bold text-zinc-900 dark:text-white">
            {balanceSol.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })}{" "}
            <span className="text-xs font-normal text-purple-500">SOL</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            onClick={handleCopy}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/80"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-blue-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </motion.button>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white"
            title="View on Solscan"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
