"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ChevronLeft, MoreVertical, X, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoMobileBrowserBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  url?: string
  tabCount?: number
  onBack?: () => void
  onMore?: () => void
  onClose?: () => void
  onTabClick?: () => void
}

export function CryptoMobileBrowserBar({
  url = "oxygenui.com",
  tabCount = 3,
  onBack,
  onMore,
  onClose,
  onTabClick,
  className,
  ...props
}: CryptoMobileBrowserBarProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      data-slot="crypto-mobile-browser-bar"
      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-3 text-white shadow-2xl border border-zinc-800/90 font-sans backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 w-full">
        <motion.button
          whileHover={reduceMotion ? {} : { scale: 1.05 }}
          whileTap={reduceMotion ? {} : { scale: 0.95 }}
          type="button"
          onClick={onTabClick}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-bold text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="View open tabs"
        >
          {tabCount}
        </motion.button>

        <div className="flex h-11 flex-1 items-center justify-between rounded-full bg-zinc-900 px-3.5 border border-zinc-800/80">
          <button
            type="button"
            onClick={onBack}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span className="text-xs font-semibold tracking-tight leading-tight text-zinc-200 truncate max-w-[140px]">
              {url}
            </span>
          </div>
          <button
            type="button"
            onClick={onMore}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="More options"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <motion.button
          whileHover={reduceMotion ? {} : { scale: 1.05 }}
          whileTap={reduceMotion ? {} : { scale: 0.95 }}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          aria-label="Close browser"
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
