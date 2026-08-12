"use client"

import React, { useState } from "react"
import { Search, Plus, ChevronRight, ChevronDown, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletMainProps
  extends React.HTMLAttributes<HTMLDivElement> {
  accountName?: string
  balanceUsd?: number
  changeUsd?: number
  changePercent?: number
}

export function CryptoWalletMain({
  accountName = "Mainnet Vault",
  balanceUsd = 24850.50,
  changeUsd = 142.80,
  changePercent = 2.45,
  className,
  ...props
}: CryptoWalletMainProps) {
  const [activeTab, setActiveTab] = useState<"Home" | "Trade" | "Predict" | "Explore">("Home")
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(accountName)

  const accounts = ["Mainnet Vault", "Devnet Testing", "Staking Wallet"]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[640px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-1 p-3 pb-2 pt-4 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-teal-400 to-emerald-300 cursor-pointer shadow-md">
          <span className="text-sm font-bold text-zinc-950">⚡</span>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto rounded-full bg-zinc-900/90 p-1 no-scrollbar border border-zinc-800/60">
          {(["Home", "Trade", "Predict", "Explore"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                activeTab === tab ? "bg-emerald-300 text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 text-xs cursor-pointer">
          🌐
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-2">
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <span>{selectedAccount}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", accountMenuOpen && "rotate-180")} />
          </button>

          {accountMenuOpen && (
            <div className="absolute left-0 top-7 z-30 w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl">
              {accounts.map((acc) => (
                <button
                  key={acc}
                  type="button"
                  onClick={() => {
                    setSelectedAccount(acc)
                    setAccountMenuOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer",
                    selectedAccount === acc ? "bg-emerald-500/20 text-emerald-300" : "text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  {acc}
                </button>
              ))}
            </div>
          )}

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-white">${balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs font-semibold">
            <span className="text-emerald-400">+${changeUsd.toFixed(2)}</span>
            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-emerald-400">
              +{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-emerald-400 font-bold">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="font-semibold text-sm text-zinc-100">Solana Pay Cash</span>
          </div>
          <span className="font-semibold text-sm text-zinc-100">$0.00</span>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-bold text-zinc-200">
            <span>SPL Tokens</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-teal-500 to-emerald-400 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                  <span className="text-xs font-bold text-emerald-400">SOL</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Solana</h4>
                <p className="text-xs text-zinc-400">142.5 SOL</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-semibold text-white">$10,623.50</span>
              <span className="text-xs text-emerald-400">+2.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                USDC
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">USD Coin (SPL)</h4>
                <p className="text-xs text-zinc-400">12,500 USDC</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-semibold text-white">$12,500.00</span>
              <span className="text-xs text-emerald-400">+0.01%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-black/90 backdrop-blur-md flex items-center gap-2 border-t border-zinc-900">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search Solana tokens or dApps..."
            className="w-full rounded-full border border-zinc-800/80 bg-zinc-900/90 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-lg cursor-pointer"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
