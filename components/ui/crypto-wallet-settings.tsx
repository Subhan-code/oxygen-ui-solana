"use client"

import React from "react"
import { Search, ChevronRight, Wallet, Sliders, Shield, Globe, Users, Code, HelpCircle, Share2, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletSettingsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  domainHandle?: string
  onClose?: () => void
}

export function CryptoWalletSettings({
  domainHandle = "alex.sol",
  onClose,
  className,
  ...props
}: CryptoWalletSettingsProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[640px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <h2 className="text-base font-bold text-white">Solana Settings</h2>
        <div className="w-8" />
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search settings..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
        />
      </div>

      <div className="mb-4 flex items-center justify-between rounded-2xl bg-zinc-900 p-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-300 flex items-center justify-center text-xs text-black font-bold">
            ⚡
          </div>
          <div>
            <span className="text-sm font-bold text-white block">{domainHandle}</span>
            <span className="text-[11px] text-emerald-400">Verified Solana Identity</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="rounded-2xl bg-zinc-900 p-1 divide-y divide-zinc-800/60">
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Wallet className="h-4 w-4 text-zinc-400" />
              <span>Manage Accounts</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <span>4</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Sliders className="h-4 w-4 text-zinc-400" />
              <span>RPC Preferences</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Shield className="h-4 w-4 text-zinc-400" />
              <span>Security & Seed Phrase</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-1 divide-y divide-zinc-800/60">
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Globe className="h-4 w-4 text-zinc-400" />
              <span>Active Clusters</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <span>Mainnet-Beta</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Users className="h-4 w-4 text-zinc-400" />
              <span>Contacts</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <Code className="h-4 w-4 text-zinc-400" />
              <span>Connected dApps</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-3 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3 text-sm text-zinc-200">
            <Code className="h-4 w-4 text-zinc-400" />
            <span>Developer Settings</span>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-400" />
        </div>
      </div>
    </div>
  )
}
