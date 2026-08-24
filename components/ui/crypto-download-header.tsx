"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Menu, Download, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoDownloadHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  title?: string
  downloadText?: string
  onDownload?: () => void
  onMenuClick?: () => void
}

export function CryptoDownloadHeader({
  title = "Oxygen Wallet",
  downloadText = "Download",
  onDownload,
  onMenuClick,
  className,
  ...props
}: CryptoDownloadHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      data-slot="crypto-download-header"
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "flex w-full max-w-sm items-center justify-between gap-3 rounded-full bg-zinc-900/90 p-2 text-white shadow-xl border border-zinc-800/80 backdrop-blur-xl font-sans dark:bg-zinc-950/90 dark:border-zinc-800",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 pl-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight leading-tight text-white">{title}</span>
          <span className="text-[11px] text-zinc-400 font-medium">Solana Native dApp</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <motion.button
          whileHover={reduceMotion ? {} : { scale: 1.04 }}
          whileTap={reduceMotion ? {} : { scale: 0.96 }}
          type="button"
          onClick={onDownload}
          className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition-colors cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" />
          <span>{downloadText}</span>
        </motion.button>
        <motion.button
          whileHover={reduceMotion ? {} : { scale: 1.05 }}
          whileTap={reduceMotion ? {} : { scale: 0.95 }}
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
