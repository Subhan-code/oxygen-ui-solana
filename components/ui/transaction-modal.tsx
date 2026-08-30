"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X, ShieldCheck, ArrowDownRight, ArrowUpRight, AlertCircle, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BalanceDiffItem {
  tokenSymbol: string
  diffAmount: number
  tokenIcon?: string
}

export interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  dappName?: string
  dappIcon?: string
  diffs?: BalanceDiffItem[]
  estimatedFeeSol?: number
  isSimulating?: boolean
  className?: string
}

const DEFAULT_DIFFS: BalanceDiffItem[] = [
  { tokenSymbol: "SOL", diffAmount: -1.5, tokenIcon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" },
  { tokenSymbol: "USDC", diffAmount: +224.80, tokenIcon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" },
]

export function TransactionModal({
  isOpen,
  onClose,
  onConfirm,
  dappName = "Jupiter Aggregator",
  dappIcon = "https://jup.ag/svg/jupiter-logo.svg",
  diffs = DEFAULT_DIFFS,
  estimatedFeeSol = 0.00005,
  isSimulating = false,
  className
}: TransactionModalProps) {
  const [loading, setLoading] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleApprove = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (onConfirm) onConfirm()
      onClose()
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)} data-slot="transaction-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={shouldReduceMotion ? { duration: 0.16 } : { type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-2xl text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-zinc-800 p-1.5 border border-zinc-700 overflow-hidden flex items-center justify-center">
                  <img src={dappIcon} alt={dappName} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{dappName}</h3>
                  <p className="text-[11px] text-zinc-400">Pre-flight Simulation</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer active:scale-95">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-5">
              <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase block mb-2">
                Estimated Net Balance Change
              </span>

              <div className="space-y-2">
                {diffs.map((diff, index) => {
                  const isPositive = diff.diffAmount > 0
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/50">
                      <div className="flex items-center gap-2.5">
                        {diff.tokenIcon && (
                          <img src={diff.tokenIcon} alt={diff.tokenSymbol} className="h-6 w-6 rounded-full" />
                        )}
                        <span className="text-sm font-medium text-white">{diff.tokenSymbol}</span>
                      </div>
                      <div className={cn("flex items-center gap-1 text-sm font-bold", isPositive ? "text-emerald-400" : "text-zinc-200")}>
                        {isPositive ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 text-zinc-400" />}
                        <span>{isPositive ? `+${diff.diffAmount}` : diff.diffAmount}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2 py-3 border-t border-zinc-800/60 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Network Fee</span>
                <span className="text-white font-mono">{estimatedFeeSol} SOL</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Simulation passed with 0 errors</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 font-medium text-xs text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Reject
              </motion.button>
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={handleApprove}
                disabled={loading || isSimulating}
                className="w-full py-2.5 rounded-xl bg-purple-600 font-medium text-xs text-white hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                <span>{loading ? "Confirming..." : "Approve"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
