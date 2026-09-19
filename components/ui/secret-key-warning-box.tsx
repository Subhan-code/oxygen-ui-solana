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
        "rounded-[32px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-left select-none",
        className
      )}
      data-slot="secret-key-warning-box"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-500 dark:text-rose-400" />
          <h3 className="font-runde font-bold text-sm text-zinc-900 dark:text-white">12-Word Recovery Mnemonic</h3>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className="flex items-center gap-1.5 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-[#0a0a0a] px-3 py-1 font-runde text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-[#141414] dark:hover:text-white transition-colors cursor-pointer"
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

      <p className="my-3 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
        Never share your recovery phrase with anyone. Anyone with these 12 words can take full control of your wallet funds.
      </p>

      <div className="relative my-4 rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100/70 dark:bg-[#0a0a0a] p-4">
        {!revealed ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-xs font-mono text-zinc-500">
            <Lock className="h-6 w-6 text-rose-500 dark:text-rose-400 mb-2" />
            <span>Click Reveal Secret to view seed words</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {mnemonicWords.map((word, idx) => (
              <div key={idx} className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#121214] p-2 border border-black/5 dark:border-white/10">
                <span className="text-zinc-400 dark:text-zinc-500 text-[10px] w-4">{idx + 1}.</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{word}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {revealed && (
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-[#0a0a0a] py-2.5 font-runde text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-[#141414] dark:hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />}
          <span>{copied ? "Copied Mnemonic to Clipboard" : "Copy Seed Words"}</span>
        </button>
      )}
    </div>
  )
}
