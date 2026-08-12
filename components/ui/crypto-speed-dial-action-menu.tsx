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
        "relative mx-auto flex w-full max-w-sm flex-col items-center justify-center p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 font-sans min-h-[200px]",
        className
      )}
      {...props}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-md transition-transform active:scale-95 cursor-pointer z-20 hover:bg-zinc-200",
            open && "rotate-45"
          )}
        >
          <Plus className="h-5 w-5 stroke-[2.5]" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0, duration: 0.25 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-10 w-48"
            >
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-transform active:scale-95 cursor-pointer"
                title="Send SOL"
              >
                <Send className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-transform active:scale-95 cursor-pointer"
                title="Receive SOL"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 shadow hover:bg-zinc-800 transition-transform active:scale-95 cursor-pointer"
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
