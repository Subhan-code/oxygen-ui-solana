"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, Plus, ChevronRight, ChevronDown, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletMainProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[620px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 p-4 pb-2 border-b border-zinc-900 backdrop-blur-md bg-zinc-950/80">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400 font-bold text-sm">
          ⚡
        </div>

        <nav className="flex items-center gap-1 rounded-full bg-zinc-900 p-1 border border-zinc-800">
          {(["Home", "Trade", "Predict", "Explore"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer active:scale-95 duration-100",
                activeTab === tab ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="wallet-main-nav-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </nav>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs cursor-pointer active:scale-95 transition-transform">
          🌐
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer active:scale-98"
          >
            <span>{selectedAccount}</span>
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", accountMenuOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {accountMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                className="absolute left-0 top-7 z-30 w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl"
              >
                {accounts.map((acc) => (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => {
                      setSelectedAccount(acc)
                      setAccountMenuOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer active:scale-98",
                      selectedAccount === acc ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:bg-zinc-800/60"
                    )}
                  >
                    {acc}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white">${balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs font-medium">
            <span className="text-blue-400 font-semibold">+${changeUsd.toFixed(2)}</span>
            <span className="rounded-md bg-blue-950/60 border border-blue-800/50 px-1.5 py-0.5 text-blue-300 font-semibold">
              +{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="font-semibold text-xs text-zinc-200">Solana Balance</span>
          </div>
          <span className="font-bold text-xs text-white">$0.00</span>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-bold text-zinc-300">
            <span>Tokens</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 transition-all hover:bg-zinc-900 active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-950/60 border border-purple-800/50 text-xs font-bold text-purple-300">
                SOL
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Solana</h4>
                <p className="text-[11px] text-zinc-400">142.5 SOL</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white">$10,623.50</span>
              <span className="text-[11px] font-semibold text-blue-400">+2.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 transition-all hover:bg-zinc-900 active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 font-bold text-xs">
                USDC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">USD Coin</h4>
                <p className="text-[11px] text-zinc-400">12,500 USDC</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white">$12,500.00</span>
              <span className="text-[11px] font-semibold text-blue-400">+0.01%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tokens or dApps..."
            className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
