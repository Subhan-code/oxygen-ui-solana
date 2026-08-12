"use client"

import React from "react"
import { Search, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletMenuSheetProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onConnectWallet?: () => void
  onClose?: () => void
}

export function CryptoWalletMenuSheet({
  onConnectWallet,
  onClose,
  className,
  ...props
}: CryptoWalletMenuSheetProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-[36px] bg-zinc-100 p-5 text-zinc-900 shadow-2xl font-sans min-h-[580px]",
        className
      )}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onConnectWallet}
              className="rounded-full bg-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-950 hover:bg-emerald-300 transition-colors cursor-pointer"
            >
              Connect Wallet
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search Solana ecosystem..."
            className="w-full rounded-2xl bg-zinc-200/80 py-2 pl-9 pr-3 text-xs text-zinc-800 placeholder-zinc-500 focus:outline-none"
          />
        </div>

        <div className="space-y-4 font-semibold text-lg">
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Solana Features</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Learn Web3</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Explore dApps</span>
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Ecosystem</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Developers</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:text-emerald-700 transition-colors">
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400">solana.com</div>
    </div>
  )
}
