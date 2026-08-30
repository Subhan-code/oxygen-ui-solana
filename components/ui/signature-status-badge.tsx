"use client"

import * as React from "react"
import { CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export type CommitmentStatus = "finalized" | "confirmed" | "pending" | "failed"

export interface SignatureStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: CommitmentStatus
  confirmations?: number
  maxConfirmations?: number
}

export function SignatureStatusBadge({
  status = "finalized",
  confirmations = 32,
  maxConfirmations = 32,
  className,
  ...props
}: SignatureStatusBadgeProps) {
  const configs: Record<CommitmentStatus, { label: string; icon: any; style: string }> = {
    finalized: { label: "Finalized", icon: CheckCircle2, style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
    confirmed: { label: "Confirmed", icon: CheckCircle2, style: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
    pending: { label: "Pending", icon: RefreshCw, style: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
    failed: { label: "Failed", icon: AlertCircle, style: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
  }

  const config = configs[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-semibold shadow-md backdrop-blur-md",
        config.style,
        className
      )}
      data-slot="signature-status-badge"
      {...props}
    >
      <Icon className={cn("h-3.5 w-3.5", status === "pending" && "animate-spin")} />
      <span>{config.label}</span>
      {status === "confirmed" && (
        <span className="text-[10px] text-zinc-400">({confirmations}/{maxConfirmations})</span>
      )}
    </div>
  )
}
