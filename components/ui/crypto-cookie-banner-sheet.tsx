"use client"

import React, { useState } from "react"
import { ShieldCheck, Download, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoCookieBannerSheetProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onAccept?: () => void
  onReject?: () => void
}

export function CryptoCookieBannerSheet({
  onAccept,
  onReject,
  className,
  ...props
}: CryptoCookieBannerSheetProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-gradient-to-b from-indigo-950 via-purple-950 to-black p-5 text-white shadow-2xl border border-indigo-500/30 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4 border-b border-indigo-800/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-400/20 text-indigo-300">
            <Download className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-indigo-200">Solana Privacy Standard</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>PDF Notice</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mb-5 space-y-2">
        <h3 className="text-lg font-black tracking-tight text-white">Solana dApp Cookie Preferences</h3>
        <p className="text-xs text-indigo-200/80 leading-relaxed">
          Manage your Web3 cookie consent. Strictly necessary cookies are required for RPC node connections and wallet authentication.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onReject?.()
          }}
          className="flex-1 rounded-full border border-indigo-700/50 bg-indigo-950/60 py-2.5 text-center text-xs font-bold text-indigo-200 hover:bg-indigo-900/60 transition-colors cursor-pointer"
        >
          Decline Optional
        </button>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false)
            onAccept?.()
          }}
          className="flex-1 rounded-full bg-indigo-300 py-2.5 text-center text-xs font-black text-zinc-950 hover:bg-indigo-200 transition-colors shadow-lg cursor-pointer"
        >
          Allow Cookies
        </button>
      </div>
    </div>
  )
}
