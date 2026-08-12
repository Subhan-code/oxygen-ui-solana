"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Send, Download, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  solBalance?: number
  stakingHealthPercent?: number
}

export function CryptoProgressRing({
  solBalance = 142.5,
  stakingHealthPercent = 84,
  className,
  ...props
}: CryptoProgressRingProps) {
  const [dialOpen, setDialOpen] = useState(false)

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[36px] bg-black p-6 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400">Solana Health</span>
          <h3 className="text-sm font-extrabold text-white">Staking & Gas Pool</h3>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
          Optimal
        </span>
      </div>

      <div className="relative my-4 flex h-48 w-48 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#34d399"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * stakingHealthPercent) / 100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-white">{stakingHealthPercent}%</span>
          <span className="text-xs font-semibold text-zinc-400 mt-0.5">{solBalance} SOL Staked</span>
        </div>
      </div>

      <div className="relative mt-2 w-full">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setDialOpen(!dialOpen)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-xl transition-transform active:scale-95 cursor-pointer z-20",
              dialOpen && "rotate-45"
            )}
            aria-label="Toggle Solana quick actions"
          >
            <Plus className="h-6 w-6 stroke-[3]" />
          </button>
        </div>

        <AnimatePresence>
          {dialOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-14 left-0 right-0 flex justify-center gap-4 z-10"
            >
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Send SOL"
              >
                <Send className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Receive SOL"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Swap SPL"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
