"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { ArrowDown, Settings, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSwapCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSwap?: (fromToken: string, toToken: string, amount: string) => void
}

export function CryptoSwapCard({
  onSwap,
  className,
  ...props
}: CryptoSwapCardProps) {
  const [payAmount, setPayAmount] = useState("10")
  const [receiveAmount, setReceiveAmount] = useState("1425.00")
  const [payToken, setPayToken] = useState({ symbol: "SOL", name: "Solana", balance: "142.5" })
  const [receiveToken, setReceiveToken] = useState({ symbol: "USDC", name: "USD Coin (SPL)", balance: "12,500" })
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setPayToken(receiveToken)
      setReceiveToken(payToken)
      setPayAmount(receiveAmount)
      setReceiveAmount(payAmount)
      setIsFlipping(false)
    }, 150)
  }

  const marketRankings = [
    { rank: 1, name: "Bonk", symbol: "BONK", category: "SPL Memes", volume: "$180M" },
    { rank: 2, name: "Jupiter", symbol: "JUP", category: "DeFi Governance", volume: "$410M" },
    { rank: 3, name: "dogwifhat", symbol: "WIF", category: "SPL Memes", volume: "$320M" },
  ]

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
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-white">Swap Tokens</h2>
          <span className="rounded-full bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
            Jupiter Route
          </span>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      <div className="relative space-y-2 mb-4">
        <motion.div
          animate={{ scale: isFlipping ? 0.96 : 1 }}
          transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          className="rounded-2xl bg-zinc-900/80 p-3.5 border border-zinc-800"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span>You Pay</span>
            <span>Balance: {payToken.balance}</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="w-1/2 bg-transparent text-xl font-extrabold text-white focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer active:scale-95"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-950/60 border border-purple-800/50 font-bold text-[10px] text-purple-300">
                {payToken.symbol[0]}
              </div>
              <span>{payToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        </motion.div>

        <div className="flex justify-center -my-2.5 z-10 relative">
          <button
            type="button"
            onClick={handleFlip}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-200 border border-zinc-700 hover:bg-zinc-800 transition-transform active:rotate-180 cursor-pointer shadow-md"
            aria-label="Flip tokens"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        <motion.div
          animate={{ scale: isFlipping ? 0.96 : 1 }}
          transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          className="rounded-2xl bg-zinc-900/80 p-3.5 border border-zinc-800"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span>You Receive</span>
            <span>Balance: {receiveToken.balance}</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="w-1/2 bg-transparent text-xl font-extrabold text-white focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer active:scale-95"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-950/60 border border-blue-800/50 font-bold text-[10px] text-blue-300">
                {receiveToken.symbol[0]}
              </div>
              <span>{receiveToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mb-4 flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>Exchange Rate</span>
        <span className="font-semibold text-zinc-200">1 {payToken.symbol} ≈ 142.5 {receiveToken.symbol}</span>
      </div>

      <button
        type="button"
        onClick={() => onSwap?.(payToken.symbol, receiveToken.symbol, payAmount)}
        className="w-full rounded-2xl bg-white py-3 text-center text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors shadow active:scale-95 cursor-pointer mb-4"
      >
        Swap Tokens
      </button>

      <div className="pt-3 border-t border-zinc-900">
        <h3 className="text-xs font-bold text-zinc-300 mb-2">Trending Solana Markets</h3>
        <div className="space-y-1.5">
          {marketRankings.map((m) => (
            <div key={m.symbol} className="flex items-center justify-between rounded-xl bg-zinc-900/40 p-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 font-bold text-[10px] text-blue-400">
                  {m.rank}
                </span>
                <div>
                  <span className="font-bold text-white block">{m.name}</span>
                  <span className="text-[10px] text-zinc-500">{m.category}</span>
                </div>
              </div>
              <span className="font-semibold text-zinc-300">{m.volume}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
