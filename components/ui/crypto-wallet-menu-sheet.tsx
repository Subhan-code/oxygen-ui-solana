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
        "relative mx-auto flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans min-h-[540px]",
        className
      )}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onConnectWallet}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Connect Wallet
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search Solana ecosystem..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>

        <div className="space-y-3 font-semibold text-sm">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Solana Features</span>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Learn Web3</span>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Explore dApps</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Ecosystem</span>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Developers</span>
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-zinc-500 font-medium">solana.com</div>
    </div>
  )
}
