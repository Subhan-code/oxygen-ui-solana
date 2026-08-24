"use client"

import React from "react"
import { motion } from "motion/react"
import { Search, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoWalletMenuSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[520px]",
        className
      )}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ⚡
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onConnectWallet}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
            >
              Connect Wallet
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search Solana ecosystem..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>

        <div className="space-y-2 font-semibold text-xs text-zinc-200">
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Solana Features</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Learn Web3</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Explore dApps</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Ecosystem</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Developers</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-zinc-500 font-medium">solana.com</div>
    </motion.div>
  )
}
