"use client"

import * as React from "react"
import { Clock, Target, ArrowRight, Play, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LimitOrderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  orderId?: string
  payAmount?: string
  paySymbol?: string
  receiveAmount?: string
  receiveSymbol?: string
  triggerPrice?: string
  currentPrice?: string
  expiry?: string
  fillPercent?: number
  status?: "open" | "filled" | "cancelled"
  onCancel?: () => void
}

export function LimitOrderCard({
  orderId = "#LO-8492",
  payAmount = "10.0",
  paySymbol = "SOL",
  receiveAmount = "1,650.00",
  receiveSymbol = "USDC",
  triggerPrice = "$165.00",
  currentPrice = "$148.20",
  expiry = "3 days left",
  fillPercent = 45,
  status = "open",
  onCancel,
  className,
  ...props
}: LimitOrderCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="limit-order-card"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-400" />
          <span className="font-semibold text-sm text-zinc-100">Limit Order</span>
          <span className="font-mono text-xs text-zinc-500">{orderId}</span>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-medium font-mono border capitalize",
            status === "open" && "bg-purple-500/10 text-purple-400 border-purple-500/20",
            status === "filled" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            status === "cancelled" && "bg-zinc-800 text-zinc-400 border-zinc-700"
          )}
        >
          {status}
        </span>
      </div>

      <div className="my-3 flex items-center justify-between rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
        <div className="text-left">
          <div className="text-xs text-zinc-400">Sell Amount</div>
          <div className="font-mono font-bold text-sm text-zinc-100">{payAmount} {paySymbol}</div>
        </div>
        <ArrowRight className="h-4 w-4 text-purple-400" />
        <div className="text-right">
          <div className="text-xs text-zinc-400">Buy Amount</div>
          <div className="font-mono font-bold text-sm text-zinc-100">{receiveAmount} {receiveSymbol}</div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-zinc-400">
          <span>Target Trigger Price</span>
          <span className="font-mono font-bold text-purple-400">{triggerPrice}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span>Current Market Price</span>
          <span className="font-mono text-zinc-300">{currentPrice}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-zinc-500" /> Expiry</span>
          <span className="font-mono text-zinc-400">{expiry}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/60">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span className="text-zinc-400">Fill Progress</span>
          <span className="font-semibold text-zinc-200">{fillPercent}% Filled</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full origin-left bg-purple-500 rounded-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[var(--ease-out-expo)]"
            style={{ transform: `scaleX(${Math.max(0, Math.min(1, fillPercent / 100))})` }}
          />
        </div>
      </div>

      {status === "open" && onCancel && (
        <button
          onClick={onCancel}
          className="mt-3 w-full h-11 rounded-xl border border-rose-500/20 bg-rose-500/5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 motion-safe:transition-colors motion-safe:active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
        >
          Cancel Order
        </button>
      )}
    </div>
  )
}
