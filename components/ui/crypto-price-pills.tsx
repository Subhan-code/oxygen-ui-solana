"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CryptoToken {
  id: string;
  symbol: string;
  name: string;
  price: number | string;
  change24h: number;
  iconType: "btc" | "eth" | "sol" | "doge" | "custom";
  customIcon?: React.ReactNode;
}

export interface CryptoPricePillsProps {
  items?: CryptoToken[];
  value?: string;
  defaultValue?: string;
  onSelect?: (token: CryptoToken) => void;
  className?: string;
}

const DEFAULT_TOKENS: CryptoToken[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    price: "$64,328.12",
    change24h: 2.36,
    iconType: "btc",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    price: "$2,482.17",
    change24h: 1.24,
    iconType: "eth",
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    price: "$142.36",
    change24h: 3.17,
    iconType: "sol",
  },
  {
    id: "doge",
    symbol: "DOGE",
    name: "Dogecoin",
    price: "$0.1542",
    change24h: -1.08,
    iconType: "doge",
  },
];

function TokenIcon({ type, custom }: { type: CryptoToken["iconType"]; custom?: React.ReactNode }) {
  if (custom) return <>{custom}</>;

  switch (type) {
    case "btc":
      return (
        <span className="font-bold font-serif text-lg leading-none">₿</span>
      );
    case "eth":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
        </svg>
      );
    case "sol":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M4 17.75a1.25 1.25 0 0 1 1.25-1.25h14.5a.75.75 0 0 1 .53 1.28l-2.75 2.75a1.25 1.25 0 0 1-.88.37H2.15a.75.75 0 0 1-.53-1.28l2.38-2.37zm16-6.5a1.25 1.25 0 0 1-1.25 1.25H4.25a.75.75 0 0 1-.53-1.28l2.75-2.75a1.25 1.25 0 0 1 .88-.37h14.5a.75.75 0 0 1 .53 1.28l-2.38 2.37zm-16-6.5A1.25 1.25 0 0 1 5.25 3.5h14.5a.75.75 0 0 1 .53 1.28l-2.75 2.75a1.25 1.25 0 0 1-.88.37H2.15a.75.75 0 0 1-.53-1.28l2.38-2.37z" />
        </svg>
      );
    case "doge":
      return (
        <span className="font-bold text-lg leading-none font-sans">Ð</span>
      );
    default:
      return null;
  }
}

export function CryptoPricePills({
  items = DEFAULT_TOKENS,
  value,
  defaultValue = "btc",
  onSelect,
  className,
}: CryptoPricePillsProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(value ?? defaultValue);

  const activeId = value !== undefined ? value : selectedId;

  const handleSelect = (token: CryptoToken) => {
    setSelectedId(token.id);
    onSelect?.(token);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Crypto Price Pills"
      className={cn("flex flex-col gap-3 w-full max-w-[280px] mx-auto select-none", className)}
    >
      {items.map((token) => {
        const isSelected = activeId === token.id;
        const isPositive = token.change24h >= 0;

        return (
          <motion.button
            key={token.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelect(token)}
            whileHover={reduceMotion ? undefined : { scale: isSelected ? 1.01 : 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={cn(
              "relative flex items-center justify-between w-full h-[62px] px-4 rounded-full transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2",
              isSelected
                ? "bg-[#18181B] text-white shadow-[0_8px_20px_rgba(0,0,0,0.22)] border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-700/80"
                : "bg-[#F7F8F9] text-zinc-900 border border-zinc-200/80 shadow-xs hover:border-zinc-300 hover:bg-[#F2F4F6] dark:bg-zinc-900/50 dark:text-zinc-100 dark:border-zinc-800/80 dark:hover:bg-zinc-800/60 dark:hover:border-zinc-700"
            )}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  "flex items-center justify-center size-10 rounded-full shrink-0 transition-colors",
                  isSelected
                    ? "bg-[#27272A] text-white border border-zinc-700/70 dark:bg-zinc-800 dark:text-white"
                    : "bg-[#E4E6EA] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                )}
              >
                <TokenIcon type={token.iconType} custom={token.customIcon} />
              </div>

              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    "text-[15px] font-bold tracking-tight leading-tight",
                    isSelected ? "text-white" : "text-zinc-900 dark:text-zinc-100"
                  )}
                >
                  {token.symbol}
                </span>
                <span
                  className={cn(
                    "text-xs font-mono font-medium tracking-tight mt-0.5",
                    isSelected ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {typeof token.price === "number" ? `$${token.price.toLocaleString()}` : token.price}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-tight shrink-0",
                isSelected
                  ? isPositive
                    ? "bg-[#0E3A28] text-[#34D399] border border-[#10B981]/30"
                    : "bg-[#3B151A] text-[#F87171] border border-[#EF4444]/30"
                  : isPositive
                  ? "bg-[#D1FBE4] text-[#059669] dark:bg-emerald-950/50 dark:text-emerald-400 dark:border dark:border-emerald-800/40"
                  : "bg-[#FFE4E6] text-[#E11D48] dark:bg-rose-950/50 dark:text-rose-400 dark:border dark:border-rose-800/40"
              )}
            >
              <span className="text-[10px] leading-none">
                {isPositive ? "▲" : "▼"}
              </span>
              <span>
                {isPositive ? `+${token.change24h}%` : `${token.change24h}%`}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default CryptoPricePills;
