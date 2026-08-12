"use client"

import React, { useState } from "react"
import { ArrowDown, RefreshCw, Copy, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTradingTerminalWorkspaceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  userId?: string
  username?: string
  totalBalanceUsd?: number
}

export function CryptoTradingTerminalWorkspace({
  userId = "11026666",
  username = "alex.sol",
  totalBalanceUsd = 920423.13,
  className,
  ...props
}: CryptoTradingTerminalWorkspaceProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<"1D" | "5D" | "1M" | "YTD" | "1Y" | "5Y" | "All">("1Y")
  const [fromAmount, setFromAmount] = useState("100")
  const [toAmount, setToAmount] = useState("14250.00")
  const [swapAndTransfer, setSwapAndTransfer] = useState(false)

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-zinc-950 p-5 text-white shadow-2xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 rounded-2xl bg-black p-3 border border-zinc-800/80">
        <div className="flex items-center gap-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-black font-black text-lg">
            ⚡
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold text-zinc-400">
            <span className="text-white hover:text-emerald-300 cursor-pointer">Solana DEX</span>
            <span className="hover:text-emerald-300 cursor-pointer">Perps</span>
            <span className="hover:text-emerald-300 cursor-pointer">Staking</span>
            <div className="flex items-center gap-1">
              <span className="hover:text-emerald-300 cursor-pointer">Jupiter</span>
              <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-[9px] font-black text-black uppercase">
                Solana
              </span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-1.5 border border-zinc-800 text-zinc-300">
            <span>SOL/USDC</span>
            <span className="font-bold text-white">142.50</span>
            <span className="text-emerald-400 font-bold">+4.25%</span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-zinc-900 px-3 py-1.5 border border-zinc-800">
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-300 flex items-center justify-center text-xs font-bold text-black">
              ⚡
            </div>
            <span className="font-bold text-white">{username}</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">ID: {userId}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-5 rounded-2xl bg-zinc-900/60 p-2.5 border border-zinc-800/60 text-xs font-mono">
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
          <span className="font-bold text-emerald-400">$4,945,323,954</span>
        </div>
        <div>
          <span className="text-zinc-500 block">24h Vol:</span>
          <span className="font-bold text-emerald-400">$2.51B</span>
        </div>
        <div>
          <span className="text-zinc-500 block">Network TPS:</span>
          <span className="font-bold text-emerald-400">2,840 TPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-black p-4 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Solana Swap</h3>
            <div className="flex items-center gap-2 text-zinc-500">
              <RefreshCw className="h-4 w-4 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-zinc-900/80 p-3 border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>FROM</span>
                <span>Balance: 142.5 <button type="button" className="text-emerald-400 hover:underline">Max</button></span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-1/2 bg-transparent text-xl font-bold text-white focus:outline-none"
                />
                <div className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-bold text-white">
                  <span>SOL</span>
                  <span className="text-[9px] text-zinc-400">Solana</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">$14,250.00</span>
            </div>

            <div className="flex justify-center -my-2 z-10 relative">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900/80 p-3 border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>TO</span>
                <span>Balance: 12,500</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="w-1/2 bg-transparent text-xl font-bold text-white focus:outline-none"
                />
                <div className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-bold text-white">
                  <span>USDC</span>
                  <span className="text-[9px] text-zinc-400">SPL</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">$14,250.00 (Jupiter Route)</span>
            </div>

            <div className="flex items-center justify-between py-1 px-1">
              <span className="text-xs font-medium text-zinc-400">Swap & Stake</span>
              <button
                type="button"
                onClick={() => setSwapAndTransfer(!swapAndTransfer)}
                className={cn(
                  "h-5 w-9 rounded-full transition-colors relative p-0.5 cursor-pointer",
                  swapAndTransfer ? "bg-emerald-400" : "bg-zinc-800"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full bg-black transition-transform",
                    swapAndTransfer && "translate-x-4"
                  )}
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-emerald-400 py-3 text-center text-sm font-black text-black shadow-lg hover:bg-emerald-300 transition-colors active:scale-98 cursor-pointer"
          >
            Swap on Solana
          </button>
        </div>

        <div className="rounded-3xl bg-black p-4 border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Solana Portfolio</h3>
            <span className="text-3xl font-black text-white block">${totalBalanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            <span className="text-xs text-zinc-500">Live Pyth Oracle Rate</span>

            <div className="h-44 w-full my-4 relative">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 250 120">
                <path
                  d="M 0 60 Q 40 40, 70 70 T 130 90 T 180 50 T 250 70"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                />
                <circle cx="130" cy="90" r="5" fill="#34d399" className="drop-shadow-[0_0_8px_#34d399]" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 border-t border-zinc-900 pt-3">
            {(["1D", "5D", "1M", "YTD", "1Y", "5Y", "All"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setActiveTimeframe(tf)}
                className={cn(
                  "rounded-lg px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer",
                  activeTimeframe === tf
                    ? "bg-emerald-400 text-black shadow"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-black p-4 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Solana Wallets</h3>
            <div className="flex items-center gap-2 text-zinc-500">
              <Copy className="h-4 w-4 hover:text-white cursor-pointer" />
              <ExternalLink className="h-4 w-4 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto pr-1 max-h-[320px] no-scrollbar">
            <div className="rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-zinc-300">alex.sol (Mainnet)</span>
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

            <div className="rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-zinc-300">Staking Vault</span>
                <Copy className="h-3 w-3 text-zinc-500 cursor-pointer" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">mSOL</span>
                    <span className="text-[10px] text-zinc-500">Marinade SOL</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">50.00</span>
                    <span className="text-[10px] text-zinc-500">$7,850.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">JUP</span>
                    <span className="text-[10px] text-zinc-500">Governance</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">5,000.00</span>
                    <span className="text-[10px] text-zinc-500">$5,600.00</span>
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
