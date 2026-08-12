"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ShieldCheck, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoCookieBannerDialogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  onAccept?: () => void
  onReject?: () => void
}

export function CryptoCookieBannerDialog({
  onAccept,
  onReject,
  className,
  ...props
}: CryptoCookieBannerDialogProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-gradient-to-b from-purple-900/90 via-indigo-950/95 to-black p-5 text-white shadow-2xl border border-purple-500/30 font-sans backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4 border-b border-purple-800/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-purple-200">Solana dApp Privacy</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>Terms</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mb-5 space-y-2">
        <h3 className="text-lg font-black tracking-tight text-white">We Value Your Solana Privacy</h3>
        <p className="text-xs text-purple-200/80 leading-relaxed">
          We use non-custodial analytics cookies to improve your dApp performance, verify RPC network latency, and deliver personalized Web3 features.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onReject?.()
          }}
          className="flex-1 rounded-full border border-purple-700/50 bg-purple-950/60 py-2.5 text-center text-xs font-bold text-purple-200 hover:bg-purple-900/60 transition-colors cursor-pointer"
        >
          Reject Non-Essential
        </button>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onAccept?.()
          }}
          className="flex-1 rounded-full bg-emerald-300 py-2.5 text-center text-xs font-black text-zinc-950 hover:bg-emerald-200 transition-colors shadow-lg active:scale-95 cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </motion.div>
  )
}
