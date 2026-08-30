"use client"

import * as React from "react"
import { ShieldAlert, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SecurityAlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  severity?: "high" | "medium" | "low"
  onDismiss?: () => void
}

export function SecurityAlertBanner({
  title = "Potential Wallet Drainer Detected",
  message = "This smart contract requests unverified authority permissions over your SPL tokens. Proceed with extreme caution.",
  severity = "high",
  onDismiss,
  className,
  ...props
}: SecurityAlertBannerProps) {
  const styles = {
    high: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    low: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  }

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl text-left",
        styles[severity],
        className
      )}
      data-slot="security-alert-banner"
      {...props}
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm text-zinc-100">{title}</h4>
          <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="rounded-full p-1 hover:bg-zinc-800/50 transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
