"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X, Tag, ShieldCheck, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NftListingModalProps {
  isOpen: boolean
  onClose: () => void
  nftName?: string
  nftImage?: string
  currentFloorSol?: number
  onListNft?: (priceSol: number) => void
  className?: string
}

export function NftListingModal({
  isOpen,
  onClose,
  nftName = "Mad Lad #4821",
  nftImage = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png",
  currentFloorSol = 142.5,
  onListNft,
  className
}: NftListingModalProps) {
  const [priceInput, setPriceInput] = React.useState<string>(currentFloorSol.toString())
  const [loading, setLoading] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  const parsedPrice = parseFloat(priceInput) || 0
  const creatorRoyaltyPercent = 5.0
  const marketplaceFeePercent = 2.0
  const netEarningsSol = (parsedPrice * (1 - (creatorRoyaltyPercent + marketplaceFeePercent) / 100)).toFixed(3)

  const handleList = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onListNft?.(parsedPrice)
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)} data-slot="nft-listing-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={shouldReduceMotion ? { duration: 0.16 } : { type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-2xl text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div>
                <h3 className="text-base font-bold text-white">List NFT for Sale</h3>
                <p className="text-xs text-zinc-400">Set your listing price on Solana</p>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer active:scale-95">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 flex items-center gap-3 rounded-2xl bg-zinc-950/60 p-3 border border-zinc-800/60">
              <img src={nftImage} alt={nftName} className="h-12 w-12 rounded-xl object-cover border border-zinc-700" />
              <div>
                <h4 className="font-bold text-sm text-zinc-100">{nftName}</h4>
                <p className="text-xs text-zinc-400">Current Floor: <span className="font-mono text-purple-400 font-semibold">{currentFloorSol} SOL</span></p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1.5">Listing Price (SOL)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 font-mono font-bold text-lg text-white outline-none focus:border-purple-500 transition-colors"
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs font-mono font-bold text-purple-400">SOL</span>
                </div>
              </div>

              <div className="rounded-xl bg-zinc-950/40 p-3 border border-zinc-800/50 space-y-1 text-xs font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Marketplace Fee ({marketplaceFeePercent}%):</span>
                  <span>-{(parsedPrice * (marketplaceFeePercent / 100)).toFixed(3)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span>Creator Royalty ({creatorRoyaltyPercent}%):</span>
                  <span>-{(parsedPrice * (creatorRoyaltyPercent / 100)).toFixed(3)} SOL</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-1 font-semibold text-zinc-200">
                  <span>Estimated Net Received:</span>
                  <span className="text-purple-400">{netEarningsSol} SOL</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 font-medium text-xs text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={handleList}
                disabled={loading || parsedPrice <= 0}
                className="w-full py-2.5 rounded-xl bg-purple-600 font-medium text-xs text-white hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
                <span>{loading ? "Listing..." : "Confirm Listing"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
