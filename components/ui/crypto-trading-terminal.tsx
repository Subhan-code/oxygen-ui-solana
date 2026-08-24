"use client"

import React, { useState } from "react"
import { ArrowDown, RefreshCw, Copy, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTradingTerminalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  userId?: string
  username?: string
  totalBalanceUsd?: number
}

export function CryptoTradingTerminal({
  userId = "11026666",
  username = "alex.sol",
  totalBalanceUsd = 920423.13,
  className,
  ...props
}: CryptoTradingTerminalProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<"1D" | "5D" | "1M" | "YTD" | "1Y" | "5Y" | "All">("1Y")
  const [fromAmount, setFromAmount] = useState("100")
  const [toAmount, setToAmount] = useState("14250.00")
  const [swapAndTransfer, setSwapAndTransfer] = useState(false)

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 rounded-2xl bg-zinc-900/90 p-3 border border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-white font-bold text-base">
            ⚡
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold text-zinc-400">
            <span className="text-white hover:text-zinc-200 cursor-pointer">Solana DEX</span>
            <span className="hover:text-zinc-200 cursor-pointer">Perps</span>
            <span className="hover:text-zinc-200 cursor-pointer">Staking</span>
            <div className="flex items-center gap-1">
              <span className="hover:text-zinc-200 cursor-pointer">Jupiter</span>
              <span className="rounded-full bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-[9px] font-bold text-zinc-300 uppercase">
                Mainnet
              </span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-1.5 border border-zinc-800 text-zinc-300">
            <span>SOL/USDC</span>
            <span className="font-bold text-white">142.50</span>
            <span className="text-blue-400 font-bold">+4.25%</span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-zinc-950 px-3 py-1.5 border border-zinc-800">
            <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white">
              ⚡
            </div>
            <span className="font-bold text-white">{username}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">ID: {userId}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-5 rounded-2xl bg-zinc-900/60 p-2.5 border border-zinc-800 text-xs font-mono">
        <div>
          <span className="text-zinc-500 block">SPL Tokens:</span>
          <span className="font-bold text-white">21,239</span>
        </div>
        <div>
          <span className="text-zinc-500 block">Solana DEXs:</span>
          <span className="font-bold text-white">127</span>
        </div>
        <div className="md:col-span-2">
          <span className="text-zinc-500 block">Solana TVL:</span>
          <span className="font-bold text-blue-400">$4,945,323,954</span>
        </div>
        <div>
          <span className="text-zinc-500 block">24h Vol:</span>
          <span className="font-bold text-blue-400">$2.51B</span>
        </div>
        <div>
          <span className="text-zinc-500 block">Network TPS:</span>
          <span className="font-bold text-blue-400">2,840 TPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white">Solana Swap</h3>
            <div className="flex items-center gap-2 text-zinc-500">
              <RefreshCw className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 mb-1">
                <span>FROM</span>
                <span>Balance: 142.5 <button type="button" className="text-zinc-300 hover:underline">Max</button></span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-1/2 bg-transparent text-lg font-bold text-white focus:outline-none"
                />
                <div className="flex items-center gap-1 rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-bold text-white border border-zinc-700">
                  <span>SOL</span>
                  <span className="text-[9px] text-zinc-400">Solana</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">$14,250.00</span>
            </div>

            <div className="flex justify-center -my-2 z-10 relative">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700">
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 mb-1">
                <span>TO</span>
                <span>Balance: 12,500</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="w-1/2 bg-transparent text-lg font-bold text-white focus:outline-none"
                />
                <div className="flex items-center gap-1 rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-bold text-white border border-zinc-700">
                  <span>USDC</span>
                  <span className="text-[9px] text-zinc-400">SPL</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">$14,250.00 (Jupiter)</span>
            </div>

            <div className="flex items-center justify-between py-1 px-1">
              <span className="text-xs font-medium text-zinc-400">Swap & Stake</span>
              <button
                type="button"
                onClick={() => setSwapAndTransfer(!swapAndTransfer)}
                className={cn(
                  "h-5 w-9 rounded-full transition-colors relative p-0.5 cursor-pointer",
                  swapAndTransfer ? "bg-white" : "bg-zinc-800"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full bg-zinc-950 transition-transform",
                    swapAndTransfer && "translate-x-4"
                  )}
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-white py-2.5 text-center text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer shadow"
          >
            Swap on Solana
          </button>
        </div>

        <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Portfolio Balance</h3>
            <span className="text-2xl font-extrabold text-white block">${totalBalanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            <span className="text-[11px] text-zinc-500">Live Pyth Oracle Feed</span>

            <div className="h-40 w-full my-3 relative">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 250 120">
                <path
                  d="M 0 60 Q 40 40, 70 70 T 130 90 T 180 50 T 250 70"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
                <circle cx="130" cy="90" r="4" fill="#3b82f6" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 border-t border-zinc-800 pt-3">
            {(["1D", "5D", "1M", "YTD", "1Y", "5Y", "All"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setActiveTimeframe(tf)}
                className={cn(
                  "rounded-lg px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer",
                  activeTimeframe === tf
                    ? "bg-white text-zinc-950 shadow"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white">Active Wallets</h3>
            <div className="flex items-center gap-2 text-zinc-500">
              <Copy className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
              <ExternalLink className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 max-h-[300px] no-scrollbar">
            <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-zinc-300">alex.sol</span>
                <Copy className="h-3 w-3 text-zinc-500 cursor-pointer" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">SOL</span>
                    <span className="text-[10px] text-zinc-500">Native</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">142.50</span>
                    <span className="text-[10px] text-zinc-500">$20,306.25</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">USDC</span>
                    <span className="text-[10px] text-zinc-500">SPL</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">12,500.00</span>
                    <span className="text-[10px] text-zinc-500">$12,500.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-zinc-300">Staking Vault</span>
                <Copy className="h-3 w-3 text-zinc-500 cursor-pointer" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">mSOL</span>
                    <span className="text-[10px] text-zinc-500">Marinade</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">50.00</span>
                    <span className="text-[10px] text-zinc-500">$7,850.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
