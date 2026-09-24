"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  SolanaSvg,
  BitcoinSvg,
  EthereumSvg,
  UsdcSvg,
  DogecoinSvg,
} from "./token-svgs";

export interface PresencePerson {
  id: string;
  name: string;
  symbol?: string;
  src?: string;
  icon?: React.ReactNode;
  online?: boolean;
  value?: string;
  allocation?: string;
}

export type PortfolioAsset = PresencePerson;

export interface PresenceAvatarsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  people?: PresencePerson[];
  assets?: PresencePerson[];
  count?: number;
  max?: number;
  size?: number;
  overlap?: number;
  label?: string;
  onOverflowSelect?: (hidden: PresencePerson[]) => void;
}

export const DEFAULT_CRYPTO_ASSETS: PresencePerson[] = [
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: <SolanaSvg className="size-full" />,
    online: true,
    value: "$142.50",
    allocation: "45%",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: <BitcoinSvg className="size-full" />,
    online: true,
    value: "$64,280",
    allocation: "30%",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: <EthereumSvg className="size-full" />,
    online: true,
    value: "$3,450",
    allocation: "15%",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: <UsdcSvg className="size-full" />,
    online: true,
    value: "$1.00",
    allocation: "8%",
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    icon: <DogecoinSvg className="size-full" />,
    online: false,
    value: "$0.14",
    allocation: "2%",
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function PresenceAvatars({
  people,
  assets,
  count,
  max = 5,
  size = 36,
  overlap = 10,
  label = "Portfolio assets",
  onOverflowSelect,
  className,
  ...props
}: PresenceAvatarsProps) {
  const reduceMotion = useReducedMotion();
  const sourceList = assets ?? people ?? DEFAULT_CRYPTO_ASSETS;

  const effectiveAssets = useMemo(() => {
    if (typeof count === "number") {
      if (count <= sourceList.length) return sourceList.slice(0, count);
      const generated: PresencePerson[] = [...sourceList];
      for (let i = sourceList.length; i < count; i++) {
        generated.push({
          id: `token-${i}`,
          name: `Token ${i + 1}`,
          symbol: `TK${i + 1}`,
          online: true,
        });
      }
      return generated;
    }
    return sourceList;
  }, [sourceList, count]);

  const slots = Math.max(1, max);
  const visible = effectiveAssets.slice(0, slots);
  const hidden = effectiveAssets.slice(slots);
  const overflow = hidden.length;

  const namesSummary = effectiveAssets.map((p) => p.symbol ?? p.name).join(", ");

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const };

  return (
    <div
      data-slot="presence-avatars"
      role="group"
      aria-label={`${label}: ${namesSummary}`}
      className={cn("inline-flex items-center select-none font-runde", className)}
      {...props}
    >
      <div className="flex items-center" style={{ marginLeft: 0 }}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((asset, index) => {
            return (
              <motion.div
                key={asset.id}
                layout={!reduceMotion}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: -10, scale: 0.85 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.8, x: -10 }
                }
                transition={transition}
                style={{
                  width: size,
                  height: size,
                  marginLeft: index === 0 ? 0 : -overlap,
                  zIndex: slots - index,
                }}
                className="relative shrink-0 rounded-full ring-2 ring-zinc-950 border border-white/[0.12] bg-zinc-900 overflow-hidden shadow-sm"
              >
                {/* Token / Avatar Core */}
                <div className="size-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-800 text-[11px] font-semibold text-zinc-300">
                  {asset.icon ? (
                    <div className="size-full flex items-center justify-center">
                      {asset.icon}
                    </div>
                  ) : asset.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset.src}
                      alt={asset.name}
                      className="size-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{asset.symbol ?? getInitials(asset.name)}</span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Overflow +N Pill */}
          {overflow > 0 && (
            <motion.button
              key="overflow-pill"
              layout={!reduceMotion}
              type="button"
              onClick={() => onOverflowSelect?.(hidden)}
              aria-label={`Show ${overflow} more assets`}
              style={{
                width: size,
                height: size,
                marginLeft: -overlap,
                zIndex: 0,
              }}
              className="relative shrink-0 rounded-full ring-2 ring-zinc-950 border border-white/[0.12] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-semibold font-mono flex items-center justify-center transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
            >
              +{overflow}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <span className="sr-only" aria-live="polite">
        {effectiveAssets.length} assets in portfolio: {namesSummary}
      </span>
    </div>
  );
}

export const PortfolioAssetStack = PresenceAvatars;
export default PresenceAvatars;
