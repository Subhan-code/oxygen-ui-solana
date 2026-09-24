"use client";

import React, { useState } from "react";
import { PresenceAvatars, type PresencePerson } from "@/components/ui/presence-avatars";
import {
  SolanaSvg,
  BitcoinSvg,
  EthereumSvg,
  UsdcSvg,
  DogecoinSvg,
} from "@/components/ui/token-svgs";

const ALL_ASSETS: (PresencePerson & { balance: string; usdValue: number })[] = [
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: <SolanaSvg className="size-full" />,
    online: true,
    balance: "348.5 SOL",
    usdValue: 49661.25,
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: <BitcoinSvg className="size-full" />,
    online: true,
    balance: "0.65 BTC",
    usdValue: 41782.0,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: <EthereumSvg className="size-full" />,
    online: true,
    balance: "5.2 ETH",
    usdValue: 17940.0,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: <UsdcSvg className="size-full" />,
    online: true,
    balance: "12,450 USDC",
    usdValue: 12450.0,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    icon: <DogecoinSvg className="size-full" />,
    online: true,
    balance: "21,500 DOGE",
    usdValue: 3010.0,
  },
];

export default function Demo() {
  const [activeCount, setActiveCount] = useState(3);
  const [selectedTokens, setSelectedTokens] = useState<PresencePerson[] | null>(null);

  const currentAssets = ALL_ASSETS.slice(0, activeCount);
  const totalUsd = currentAssets.reduce((acc, curr) => acc + curr.usdValue, 0);

  const handleAdd = () => {
    setActiveCount((prev) => Math.min(ALL_ASSETS.length, prev + 1));
  };

  const handleRemove = () => {
    setActiveCount((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center p-4 sm:p-6 font-runde select-none">
      <div className="w-full max-w-md rounded-[28px] border border-white/[0.08] bg-zinc-950/80 p-5 backdrop-blur-2xl shadow-xl space-y-5">
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Crypto Portfolio
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                ${totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-mono font-medium text-emerald-400">
                +{activeCount * 3.4}%
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {activeCount} active holdings
            </p>
          </div>

          <PresenceAvatars
            assets={currentAssets}
            max={3}
            size={36}
            label="Holdings stack"
            onOverflowSelect={(hidden) => setSelectedTokens(hidden)}
          />
        </div>

        <div className="flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleAdd}
            disabled={activeCount >= ALL_ASSETS.length}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-30 disabled:pointer-events-none shadow-xs"
          >
            <span>+ Add asset</span>
          </button>
          <button
            type="button"
            onClick={handleRemove}
            disabled={activeCount <= 1}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>- Remove asset</span>
          </button>
        </div>

        {selectedTokens && (
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-300">
            <span className="font-semibold text-white block mb-1">
              Overflow assets ({selectedTokens.length}):
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedTokens.map((token) => (
                <span
                  key={token.id}
                  className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[11px] font-mono text-zinc-300"
                >
                  {token.name} ({token.symbol})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
