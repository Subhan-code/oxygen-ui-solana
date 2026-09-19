"use client"

import * as React from "react"
import { CheckCircle2, Copy, Check, ExternalLink, Hash, Cpu, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TransactionReceiptProps extends React.HTMLAttributes<HTMLDivElement> {
  signatureHash?: string
  slotNumber?: number
  computeUnitsUsed?: number
  priorityFeeSol?: number
  timestamp?: string
  status?: "finalized" | "confirmed"
}

export function TransactionReceipt({
  signatureHash = "5K3z...x9Pq2L",
  slotNumber = 284918239,
  computeUnitsUsed = 48291,
  priorityFeeSol = 0.0001,
  timestamp = "Just now",
  status = "finalized",
  className,
  ...props
}: TransactionReceiptProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(signatureHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-[32px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-left select-none text-zinc-900 dark:text-white",
        className
      )}
      data-slot="transaction-receipt"
      {...props}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-black/5 dark:border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-runde font-bold text-base text-zinc-900 dark:text-white">Transaction Executed</h3>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize">
              {status}
            </span>
          </div>
          <p className="font-runde text-xs text-zinc-400">{timestamp}</p>
        </div>
      </div>

      <div className="my-4 space-y-2.5 text-xs font-mono">
        <div className="flex items-center justify-between rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] p-3 border border-black/5 dark:border-white/10">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Hash className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" /> Signature
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-200">{signatureHash}</span>
            <button onClick={handleCopy} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] p-3 border border-black/5 dark:border-white/10">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Layers className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" /> Slot
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">{slotNumber.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] p-3 border border-black/5 dark:border-white/10">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Cpu className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" /> Compute Units (CU)
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">{computeUnitsUsed.toLocaleString()} CU</span>
        </div>
      </div>

      <a
        href={`https://solscan.io/tx/${signatureHash}`}
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-[#0a0a0a] py-3 font-runde text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-[#141414] dark:hover:text-white transition-colors"
      >
        View on Solscan Explorer <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
