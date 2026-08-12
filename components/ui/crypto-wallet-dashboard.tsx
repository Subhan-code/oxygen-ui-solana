"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Search,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  User,
  MessageSquare,
  Bookmark,
  History,
  Settings as SettingsIcon,
  HelpCircle,
  Shield,
  Sliders,
  Globe,
  Users,
  Code,
  Share2,
  Info,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletDashboardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  accountName?: string
  balanceUsd?: number
  changeUsd?: number
  changePercent?: number
  solBalance?: number
  usdcBalance?: number
}

export function CryptoWalletDashboard({
  accountName = "Mainnet Vault",
  balanceUsd = 24850.50,
  changeUsd = 142.80,
  changePercent = 2.45,
  solBalance = 142.5,
  usdcBalance = 12500,
  className,
  ...props
}: CryptoWalletDashboardProps) {
  const [activeTab, setActiveTab] = useState<"Home" | "Trade" | "Predict" | "Explore">("Home")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [lightMenuOpen, setLightMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(accountName)

  const accounts = ["Mainnet Vault", "Devnet Testing", "Staking Wallet", "Trading Account"]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[680px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-1 p-3 pb-2 pt-4 px-4 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold transition-transform active:scale-95 cursor-pointer shadow"
          aria-label="Open wallet menu"
        >
          <span className="text-xs">⚡</span>
        </button>

        <nav className="flex items-center gap-1 overflow-x-auto rounded-full bg-zinc-900 p-1 no-scrollbar border border-zinc-800">
          {(["Home", "Trade", "Predict", "Explore"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative rounded-full px-3.5 py-1 text-xs font-semibold transition-colors cursor-pointer active:scale-95 duration-100",
                activeTab === tab ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="solana-dash-tab-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setLightMenuOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-xs cursor-pointer active:scale-95"
          title="Toggle Navigation Menu"
        >
          🌐
        </button>
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
                className="absolute left-0 top-7 z-30 w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl backdrop-blur-md"
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
                      selectedAccount === acc ? "bg-blue-950/60 text-blue-300 font-semibold border border-blue-800/40" : "text-zinc-400 hover:bg-zinc-800/60"
                    )}
                  >
                    {acc}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-1 flex items-baseline gap-2">
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
            <span>SPL Tokens</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900 cursor-pointer active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-300 font-bold text-xs">
                SOL
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Solana</h4>
                <p className="text-[11px] text-zinc-400">{solBalance} SOL</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white">$10,623.50</span>
              <span className="text-[11px] font-semibold text-blue-400">+2.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900 cursor-pointer active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 font-bold text-xs">
                USDC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">USD Coin (SPL)</h4>
                <p className="text-[11px] text-zinc-400">{usdcBalance.toLocaleString()} USDC</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white">$12,500.00</span>
              <span className="text-[11px] font-semibold text-blue-400">+0.01%</span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-bold text-zinc-300">
            <span>Solana Perps</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-auto">
          <div className="h-20 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col justify-between">
            <span className="text-xs font-medium text-zinc-400">SOL Long 10x</span>
            <span className="text-xs font-bold text-blue-400">+24.8%</span>
          </div>
          <div className="h-20 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col justify-between">
            <span className="text-xs font-medium text-zinc-400">JUP Short 5x</span>
            <span className="text-xs font-bold text-purple-400">-2.1%</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-zinc-950/90 backdrop-blur-md flex items-center gap-2 border-t border-zinc-900">
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
          onClick={() => setSettingsOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow cursor-pointer active:scale-95"
          aria-label="Open settings"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md flex"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="w-4/5 h-full bg-zinc-950 p-5 border-r border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">alex.sol</h3>
                      <p className="text-[10px] text-blue-400">Solana Mainnet</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 text-zinc-400 hover:text-white cursor-pointer active:scale-95"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {[
                    { icon: User, label: "Profile" },
                    { icon: MessageSquare, label: "dApp Chats" },
                    { icon: Bookmark, label: "Watchlist" },
                    { icon: History, label: "Solscan History" },
                    { icon: SettingsIcon, label: "Settings", action: () => { setDrawerOpen(false); setSettingsOpen(true); } },
                    { icon: HelpCircle, label: "Help & Support" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action || (() => setDrawerOpen(false))}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98"
                    >
                      <item.icon className="h-4 w-4 text-zinc-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="flex-1" onClick={() => setDrawerOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-zinc-950 flex flex-col p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 cursor-pointer active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 className="text-xs font-bold text-white">Settings</h2>
              <div className="w-8" />
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search settings..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 flex items-center justify-between rounded-2xl bg-zinc-900 p-3 border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">
                  ⚡
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">alex.sol</span>
                  <span className="text-[10px] text-blue-400">Verified Solana Identity</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-500" />
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-zinc-900 p-1 border border-zinc-800 divide-y divide-zinc-800">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-200 font-semibold">
                    <Wallet className="h-4 w-4 text-zinc-400" />
                    <span>Manage Accounts</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <span>4</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-200 font-semibold">
                    <Sliders className="h-4 w-4 text-zinc-400" />
                    <span>RPC Preferences</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-200 font-semibold">
                    <Shield className="h-4 w-4 text-zinc-400" />
                    <span>Security & Seed Phrase</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black p-5 flex flex-col justify-between text-white"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-950 cursor-pointer active:scale-95"
                  >
                    Connect Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer active:scale-95"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search Solana ecosystem..."
                  className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
                />
              </div>

              <div className="space-y-3 font-semibold text-sm">
                <div className="flex items-center justify-between cursor-pointer py-1.5 hover:text-blue-400 transition-colors">
                  <span>Solana Features</span>
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </div>
                <div className="flex items-center justify-between cursor-pointer py-1.5 hover:text-blue-400 transition-colors">
                  <span>Learn Web3</span>
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </div>
                <div className="flex items-center justify-between cursor-pointer py-1.5 hover:text-blue-400 transition-colors">
                  <span>Explore dApps</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-zinc-500 font-mono">solana.com</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
