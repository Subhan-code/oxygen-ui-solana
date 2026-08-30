"use client"

import React from "react"
import { motion } from "motion/react"
import { User, MessageSquare, Bookmark, History, Settings, HelpCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletDrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  domainHandle?: string
  networkName?: string
  onClose?: () => void
}

export function CryptoWalletDrawer({
  domainHandle = "alex.sol",
  networkName = "Solana Mainnet",
  onClose,
  className,
  ...props
}: CryptoWalletDrawerProps) {
  return (
    <motion.div
      data-slot="crypto-wallet-drawer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[500px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            ⚡
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">{domainHandle}</h3>
            <p className="text-[11px] font-medium text-blue-400">{networkName}</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center text-zinc-400 hover:text-white motion-safe:transition-colors cursor-pointer motion-safe:active:scale-[0.97]"
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 motion-safe:transition-colors cursor-pointer motion-safe:active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40"
          >
            <item.icon className="h-4 w-4 text-zinc-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-3 border-t border-zinc-900 text-center text-[11px] text-zinc-500 font-medium">
        Oxygen UI • Solana Wallet
      </div>
    </motion.div>
  )
}
