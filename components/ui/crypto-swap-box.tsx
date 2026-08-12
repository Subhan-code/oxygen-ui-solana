"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { ArrowDown, Settings, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSwapBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoSwapBox({ className, ...props }: CryptoSwapBoxProps) {
  const [payAmount, setPayAmount] = useState("10")
  const [receiveAmount, setReceiveAmount] = useState("1425.00")
  const [payToken, setPayToken] = useState({ symbol: "SOL", name: "Solana", balance: "142.5" })
  const [receiveToken, setReceiveToken] = useState({ symbol: "USDC", name: "USD Coin (SPL)", balance: "12,500" })

  const handleFlip = () => {
    setPayToken(receiveToken)
    setReceiveToken(payToken)
    setPayAmount(receiveAmount)
    setReceiveAmount(payAmount)
  }

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-white">Solana Swap</h2>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            Jupiter DEX
          </span>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      <div className="relative space-y-2 mb-4">
        <div className="rounded-2xl bg-zinc-900/80 p-3.5 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span>You Pay</span>
            <span>Balance: {payToken.balance}</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="w-1/2 bg-transparent text-2xl font-extrabold text-white focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 font-bold text-[10px] text-black">
                {payToken.symbol[0]}
              </div>
              <span>{payToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2 z-10 relative">
          <button
            type="button"
            onClick={handleFlip}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700 hover:bg-zinc-700 transition-transform active:rotate-180 cursor-pointer shadow-lg"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-2xl bg-zinc-900/80 p-3.5 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span>You Receive</span>
            <span>Balance: {receiveToken.balance}</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="w-1/2 bg-transparent text-2xl font-extrabold text-white focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 font-bold text-[10px] text-white">
                {receiveToken.symbol[0]}
              </div>
              <span>{receiveToken.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>Rate</span>
        <span className="font-semibold text-zinc-200">1 {payToken.symbol} ≈ 142.5 {receiveToken.symbol}</span>
      </div>

      <button
        type="button"
        className="w-full rounded-2xl bg-emerald-400 py-3.5 text-center text-sm font-extrabold text-zinc-950 hover:bg-emerald-300 transition-colors shadow-lg active:scale-98 cursor-pointer"
      >
        Swap Tokens
      </button>
    </div>
  )
}
