"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-zinc-300">Privacy Notice</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>Terms</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mb-5 space-y-2">
        <h3 className="text-base font-bold tracking-tight text-white">We Value Your Privacy</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          We use essential cookies to maintain RPC network connections, optimize performance, and handle non-custodial sessions securely.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onReject?.()
          }}
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-center text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onAccept?.()
          }}
          className="flex-1 rounded-xl bg-white py-2 text-center text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors active:scale-95 cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </motion.div>
  )
}
