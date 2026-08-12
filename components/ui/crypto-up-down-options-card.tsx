"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ArrowUp, ArrowDown, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoUpDownOptionsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tokenSymbol?: string
  currentPrice?: number
  targetPrice?: number
}

export function CryptoUpDownOptionsCard({
  tokenSymbol = "SOL",
  currentPrice = 142.85,
  targetPrice = 142.50,
  className,
  ...props
}: CryptoUpDownOptionsCardProps) {
  const [secondsLeft, setSecondsLeft] = useState(184)
  const [userChoice, setUserChoice] = useState<"UP" | "DOWN" | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 300))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-300 font-bold text-xs">
            ⚡
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">{tokenSymbol} Price Option</h3>
            <p className="text-[10px] text-zinc-400">Pyth Oracle Feed</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />
          <span>{formatTime(secondsLeft)}</span>
        </div>
      </div>

      <div className="my-3 rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] font-medium text-zinc-400">Target: ${targetPrice.toFixed(2)}</span>
          <span className="text-base font-bold text-white">${currentPrice.toFixed(2)}</span>
        </div>

        <div className="relative h-24 w-full my-2">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 300 100">
            <line x1="0" y1="50" x2="300" y2="50" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />
            <path
              d="M 0 70 Q 50 30, 100 65 T 200 40 T 260 25 T 300 15"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <circle cx="300" cy="15" r="4" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setUserChoice("UP")}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl p-3 transition-transform active:scale-98 cursor-pointer border",
            userChoice === "UP"
              ? "bg-blue-600 text-white border-blue-500 shadow-md"
              : "bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800"
          )}
        >
          <ArrowUp className="h-4 w-4 mb-1 text-blue-400" />
          <span className="text-xs font-bold uppercase">Higher</span>
          <span className="text-[10px] text-zinc-400 mt-0.5">Payout 1.92x</span>
        </button>

        <button
          type="button"
          onClick={() => setUserChoice("DOWN")}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl p-3 transition-transform active:scale-98 cursor-pointer border",
            userChoice === "DOWN"
              ? "bg-purple-600 text-white border-purple-500 shadow-md"
              : "bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800"
          )}
        >
          <ArrowDown className="h-4 w-4 mb-1 text-purple-300" />
          <span className="text-xs font-bold uppercase">Lower</span>
          <span className="text-[10px] text-zinc-400 mt-0.5">Payout 1.88x</span>
        </button>
      </div>
    </motion.div>
  )
}
