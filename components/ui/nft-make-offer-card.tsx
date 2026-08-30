"use client"

import * as React from "react"
import { Clock, ShieldCheck, Tag, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NftMakeOfferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  nftName?: string
  topOfferSol?: number
  floorPriceSol?: number
  onMakeOffer?: (offerSol: number, durationDays: number) => void
}

export function NftMakeOfferCard({
  nftName = "Mad Lad #4821",
  topOfferSol = 135.0,
  floorPriceSol = 142.5,
  onMakeOffer,
  className,
  ...props
}: NftMakeOfferCardProps) {
  const [offerInput, setOfferInput] = React.useState<string>((topOfferSol + 1.0).toString())
  const [durationDays, setDurationDays] = React.useState<number>(7)

  const parsedOffer = parseFloat(offerInput) || 0

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="nft-make-offer-card"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <h3 className="font-bold text-sm text-zinc-100">Make Escrow Offer</h3>
        <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Escrow Safe
        </span>
      </div>

      <div className="my-3 flex justify-between text-xs font-mono text-zinc-400">
        <span>Current Floor: <strong className="text-zinc-200">{floorPriceSol} SOL</strong></span>
        <span>Top Offer: <strong className="text-purple-400">{topOfferSol} SOL</strong></span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1">Your SOL Bid</label>
          <div className="relative">
            <input
              type="number"
              value={offerInput}
              onChange={(e) => setOfferInput(e.target.value)}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 font-mono font-bold text-base text-white outline-none focus:border-purple-500"
            />
            <span className="absolute right-3.5 top-3.5 text-xs font-mono font-bold text-purple-400">SOL</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1">Offer Expiration</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 7, 30].map((days) => (
              <button
                key={days}
                onClick={() => setDurationDays(days)}
                className={cn(
                  "rounded-xl py-2 text-xs font-mono font-semibold transition-all border",
                  durationDays === days
                    ? "bg-purple-600 text-white border-purple-500 shadow-md"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                )}
              >
                {days} {days === 1 ? "Day" : "Days"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onMakeOffer?.(parsedOffer, durationDays)}
        disabled={parsedOffer <= 0}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3 text-sm font-bold text-white shadow-lg hover:bg-purple-500 transition-all active:scale-[0.99] disabled:opacity-50"
      >
        Submit Escrow Offer <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
