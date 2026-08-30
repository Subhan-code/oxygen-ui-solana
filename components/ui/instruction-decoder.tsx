"use client"

import * as React from "react"
import { Code, Binary, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InstructionDecoderProps extends React.HTMLAttributes<HTMLDivElement> {
  programId?: string
  programName?: string
  instructionType?: string
  rawBase58Data?: string
  parsedAccounts?: { pubkey: string; isSigner: boolean; isWritable: boolean }[]
}

export function InstructionDecoder({
  programId = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  programName = "SPL Token Program",
  instructionType = "TransferChecked",
  rawBase58Data = "3Bxs49KmLqZvP91xQ...",
  parsedAccounts = [
    { pubkey: "7xKX...gAsU", isSigner: true, isWritable: true },
    { pubkey: "3Fz9...kL2m", isSigner: false, isWritable: true },
  ],
  className,
  ...props
}: InstructionDecoderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="instruction-decoder"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-100">Instruction Decoder</h3>
        </div>
        <span className="font-mono text-xs text-emerald-400 font-semibold">{instructionType}</span>
      </div>

      <div className="my-3 space-y-2 text-xs font-mono">
        <div className="rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">Target Program ID</span>
          <span className="font-bold text-zinc-200 text-[11px] break-all">{programId}</span>
        </div>

        <div className="rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">Raw Base58 Data</span>
          <span className="font-semibold text-purple-400 text-[11px] break-all">{rawBase58Data}</span>
        </div>
      </div>

      <div className="pt-2 text-xs font-mono">
        <span className="text-zinc-400 text-[11px] block mb-1.5 font-bold">Account Keys Meta</span>
        <div className="space-y-1">
          {parsedAccounts.map((acc, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-zinc-950/40 px-2.5 py-1.5 border border-zinc-800/40 text-[11px]">
              <span className="text-zinc-300 font-semibold">{acc.pubkey}</span>
              <div className="flex gap-1">
                {acc.isSigner && <span className="rounded bg-amber-500/10 px-1 py-0.2 text-[9px] text-amber-400 border border-amber-500/20">Signer</span>}
                {acc.isWritable && <span className="rounded bg-rose-500/10 px-1 py-0.2 text-[9px] text-rose-400 border border-rose-500/20">Writable</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
