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
        "relative mx-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
        <div>
          <span className="text-[10px] uppercase font-semibold text-zinc-400">Pool Health</span>
          <h3 className="text-xs font-bold text-white">Staking & Gas</h3>
        </div>
        <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300">
          Optimal
        </span>
      </div>

      <div className="relative my-3 flex h-44 w-44 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="7"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * stakingHealthPercent) / 100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white">{stakingHealthPercent}%</span>
          <span className="text-xs font-medium text-zinc-400 mt-0.5">{solBalance} SOL Staked</span>
        </div>
      </div>

      <div className="relative mt-2 w-full">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setDialOpen(!dialOpen)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-md transition-transform active:scale-95 cursor-pointer z-20 hover:bg-zinc-200",
              dialOpen && "rotate-45"
            )}
            aria-label="Toggle quick actions"
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        <AnimatePresence>
          {dialOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-14 left-0 right-0 flex justify-center gap-3 z-10"
            >
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Send SOL"
              >
                <Send className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Receive SOL"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-colors cursor-pointer"
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
