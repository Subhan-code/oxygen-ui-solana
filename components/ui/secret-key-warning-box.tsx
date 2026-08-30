"use client"

import * as React from "react"
import { ShieldAlert, Eye, EyeOff, Copy, Check, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SecretKeyWarningBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  mnemonicWords?: string[]
}

const DEFAULT_WORDS = [
  "alpha", "bravo", "charlie", "delta", "echo", "foxtrot",
  "golf", "hotel", "india", "juliet", "kilo", "lima"
]

export function SecretKeyWarningBox({
  mnemonicWords = DEFAULT_WORDS,
  className,
  ...props
}: SecretKeyWarningBoxProps) {
  const [revealed, setRevealed] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonicWords.join(" "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="secret-key-warning-box"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-400" />
          <h3 className="font-bold text-sm text-zinc-100">12-Word Recovery Mnemonic</h3>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-mono font-bold text-rose-300 hover:bg-rose-500/20 transition-colors"
        >
          {revealed ? (
            <>
              <EyeOff className="h-3.5 w-3.5" /> Hide Secret
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> Reveal Secret
            </>
          )}
        </button>
      </div>

      <p className="my-3 text-xs text-zinc-400 leading-relaxed">
        Never share your recovery phrase with anyone. Anyone with these 12 words can take full control of your wallet funds.
      </p>

      <div className="relative my-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
        {!revealed ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-xs font-mono text-zinc-500">
            <Lock className="h-6 w-6 text-rose-400 mb-2" />
            <span>Click Reveal Secret to view seed words</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {mnemonicWords.map((word, idx) => (
              <div key={idx} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 p-2 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] w-4">{idx + 1}.</span>
                <span className="font-bold text-zinc-100">{word}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {revealed && (
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 py-2.5 text-xs font-mono font-bold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? "Copied Mnemonic to Clipboard" : "Copy Seed Words"}</span>
        </button>
      )}
    </div>
  )
}
