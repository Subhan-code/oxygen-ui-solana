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
  inline?: boolean
  className?: string
}

const DEFAULT_DIFFS: BalanceDiffItem[] = [
  { tokenSymbol: "SOL", diffAmount: -1.5, tokenIcon: "/tokens/sol.svg" },
  { tokenSymbol: "USDC", diffAmount: +224.80, tokenIcon: "/tokens/usdc.svg" },
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
  inline = false,
  className
}: TransactionModalProps) {
  const [loading, setLoading] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleApprove = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (onConfirm) onConfirm()
      if (!inline) onClose()
    }, 1500)
  }

  const modalContent = (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
      transition={shouldReduceMotion ? { duration: 0.16 } : { type: "spring", duration: 0.35, bounce: 0 }}
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-[32px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 shadow-2xl backdrop-blur-2xl text-left text-zinc-900 dark:text-white select-none",
        className
      )}
    >
            <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-[#0a0a0a] p-2 border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center">
                  <img src={dappIcon} alt={dappName} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="font-runde text-sm font-bold text-zinc-900 dark:text-white">{dappName}</h3>
                  <p className="font-runde text-[11px] text-zinc-500 dark:text-zinc-400">Pre-flight Simulation</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#141416] hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer active:scale-95">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="my-5">
              <span className="font-runde text-[11px] font-semibold tracking-wider text-zinc-500 uppercase block mb-2">
                Estimated Net Balance Change
              </span>

              <div className="space-y-2">
                {diffs.map((diff, index) => {
                  const isPositive = diff.diffAmount > 0
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        {diff.tokenIcon && (
                          <img src={diff.tokenIcon} alt={diff.tokenSymbol} className="h-6 w-6 rounded-full" />
                        )}
                        <span className="font-runde text-sm font-bold text-zinc-900 dark:text-white">{diff.tokenSymbol}</span>
                      </div>
                      <div className={cn("flex items-center gap-1 font-mono text-sm font-bold", isPositive ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-200")}>
                        {isPositive ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 text-zinc-400" />}
                        <span>{isPositive ? `+${diff.diffAmount}` : diff.diffAmount}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2 py-3 border-t border-black/5 dark:border-white/10 text-xs">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span className="font-runde">Network Fee</span>
                <span className="text-zinc-900 dark:text-white font-mono font-semibold">{estimatedFeeSol} SOL</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="font-runde">Simulation passed with 0 errors</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-[#0a0a0a] font-runde font-semibold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-[#141414] dark:hover:text-white transition-colors cursor-pointer"
              >
                Reject
              </motion.button>
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={handleApprove}
                disabled={loading || isSimulating}
                className="w-full py-2.5 rounded-2xl bg-zinc-900 dark:bg-white font-runde font-bold text-xs text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                <span>{loading ? "Confirming..." : "Approve"}</span>
              </motion.button>
            </div>
    </motion.div>
  )

  if (inline) {
    return isOpen ? modalContent : null
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
          {modalContent}
        </div>
      )}
    </AnimatePresence>
  )
}
