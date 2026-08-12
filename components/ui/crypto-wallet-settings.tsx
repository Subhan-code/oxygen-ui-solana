"use client"

import React from "react"
import { Search, ChevronRight, Wallet, Sliders, Shield, Globe, Users, Code, X } from "lucide-react"
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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans min-h-[600px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <h2 className="text-sm font-bold text-white">Wallet Settings</h2>
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

      <div className="mb-4 flex items-center justify-between rounded-2xl bg-zinc-900/80 p-3 border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-white font-bold">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold text-white block">{domainHandle}</span>
            <span className="text-[11px] text-zinc-400">Verified Solana Identity</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-1 divide-y divide-zinc-800/60">
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Wallet className="h-4 w-4 text-zinc-400" />
              <span>Manage Accounts</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span>4</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Sliders className="h-4 w-4 text-zinc-400" />
              <span>RPC Preferences</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Shield className="h-4 w-4 text-zinc-400" />
              <span>Security & Passkey</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-1 divide-y divide-zinc-800/60">
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Globe className="h-4 w-4 text-zinc-400" />
              <span>Active Network</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium">
              <span>Mainnet-Beta</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Users className="h-4 w-4 text-zinc-400" />
              <span>Address Book</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-200">
              <Code className="h-4 w-4 text-zinc-400" />
              <span>Connected dApps</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
