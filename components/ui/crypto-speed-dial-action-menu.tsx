"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Send, Download, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSpeedDialActionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoSpeedDialActionMenu({ className, ...props }: CryptoSpeedDialActionMenuProps) {
  const [open, setOpen] = useState(true)

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col items-center justify-center p-8 rounded-[32px] bg-black border border-zinc-800 font-sans min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-xl transition-transform cursor-pointer z-20",
            open && "rotate-45"
          )}
        >
          <Plus className="h-6 w-6 stroke-[3]" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 flex justify-center gap-4 z-10 w-48"
            >
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Send SOL"
              >
                <Send className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Receive SOL"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-emerald-400 shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Swap SPL"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
