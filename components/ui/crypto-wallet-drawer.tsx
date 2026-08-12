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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[550px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-purple-500 via-teal-400 to-emerald-300 flex items-center justify-center text-sm font-bold text-black shadow-md">
            ⚡
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">{domainHandle}</h3>
            <p className="text-xs font-semibold text-emerald-400">{networkName}</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-1 flex-1">
        {[
          { icon: User, label: "Profile" },
          { icon: MessageSquare, label: "dApp Chats" },
          { icon: Bookmark, label: "Watchlist" },
          { icon: History, label: "Solscan History" },
          { icon: Settings, label: "Settings" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <item.icon className="h-4 w-4 text-zinc-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-zinc-900 text-center text-xs text-zinc-500">
        Oxygen UI • Solana Wallet V2.4
      </div>
    </div>
  )
}
