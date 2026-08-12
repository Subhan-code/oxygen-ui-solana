"use client"

import React, { useState, useEffect } from "react"
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
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
            ⚡
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{tokenSymbol} 5m Option</h3>
            <p className="text-[10px] text-zinc-400">Solana Pyth Oracle</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatTime(secondsLeft)}</span>
        </div>
      </div>

      <div className="my-3 rounded-2xl bg-zinc-950 p-3 border border-zinc-900">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] font-bold text-zinc-400">Target Price: ${targetPrice.toFixed(2)}</span>
          <span className="text-lg font-extrabold text-white">${currentPrice.toFixed(2)}</span>
        </div>

        <div className="relative h-28 w-full my-2">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 300 100">
            <line x1="0" y1="50" x2="300" y2="50" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />
            <path
              d="M 0 70 Q 50 30, 100 65 T 200 40 T 260 25 T 300 15"
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
            />
            <circle cx="300" cy="15" r="4" fill="#34d399" className="drop-shadow-[0_0_8px_#34d399]" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setUserChoice("UP")}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl p-3.5 transition-all cursor-pointer border",
            userChoice === "UP"
              ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg"
              : "bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/80"
          )}
        >
          <ArrowUp className="h-5 w-5 mb-1" />
          <span className="text-xs font-black uppercase">SOL Higher</span>
          <span className="text-[10px] opacity-80">Payout 1.92x</span>
        </button>

        <button
          type="button"
          onClick={() => setUserChoice("DOWN")}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl p-3.5 transition-all cursor-pointer border",
            userChoice === "DOWN"
              ? "bg-rose-500 text-white border-rose-400 shadow-lg"
              : "bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-950/80"
          )}
        >
          <ArrowDown className="h-5 w-5 mb-1" />
          <span className="text-xs font-black uppercase">SOL Lower</span>
          <span className="text-[10px] opacity-80">Payout 1.88x</span>
        </button>
      </div>
    </div>
  )
}
