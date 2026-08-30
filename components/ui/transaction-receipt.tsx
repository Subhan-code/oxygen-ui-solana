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
        "rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="transaction-receipt"
      {...props}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-zinc-100">Transaction Executed</h3>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/20 capitalize">
              {status}
            </span>
          </div>
          <p className="text-xs text-zinc-400">{timestamp}</p>
        </div>
      </div>

      <div className="my-4 space-y-2.5 text-xs font-mono">
        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Hash className="h-3.5 w-3.5 text-purple-400" /> Signature
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-200">{signatureHash}</span>
            <button onClick={handleCopy} className="text-zinc-500 hover:text-white transition-colors">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Layers className="h-3.5 w-3.5 text-blue-400" /> Slot
          </span>
          <span className="font-semibold text-zinc-200">{slotNumber.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Cpu className="h-3.5 w-3.5 text-amber-400" /> Compute Units (CU)
          </span>
          <span className="font-semibold text-zinc-200">{computeUnitsUsed.toLocaleString()} CU</span>
        </div>
      </div>

      <a
        href={`https://solscan.io/tx/${signatureHash}`}
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 py-2.5 text-xs font-bold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
      >
        View on Solscan Explorer <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
