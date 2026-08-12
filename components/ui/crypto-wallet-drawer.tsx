"use client"

import React from "react"
import { User, MessageSquare, Bookmark, History, Settings, HelpCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  domainHandle?: string
  networkName?: string
  onClose?: () => void
}

export function CryptoWalletDrawer({
  domainHandle = "alex.sol",
  networkName = "Solana Mainnet-Beta",
  onClose,
  className,
  ...props
}: CryptoWalletDrawerProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans min-h-[520px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-white">
            ⚡
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{domainHandle}</h3>
            <p className="text-xs font-medium text-zinc-400">{networkName}</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-1 flex-1">
        {[
          { icon: User, label: "Profile" },
          { icon: MessageSquare, label: "dApp Chats" },
          { icon: Bookmark, label: "Watchlist" },
          { icon: History, label: "Transaction History" },
          { icon: Settings, label: "Settings" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <item.icon className="h-4 w-4 text-zinc-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-zinc-900 text-center text-[11px] text-zinc-500 font-medium">
        Oxygen UI • Solana Wallet
      </div>
    </div>
  )
}
