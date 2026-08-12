"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionTabSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSelectTab?: (tab: string) => void
}

export function CryptoPredictionTabSelector({
  onSelectTab,
  className,
  ...props
}: CryptoPredictionTabSelectorProps) {
  const [activeTab, setActiveTab] = useState("Top")
  const tabs = ["Top", "5m Markets", "Politics", "Crypto", "Tech"]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-zinc-950 p-1.5 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab)
              onSelectTab?.(tab)
            }}
            className={cn(
              "relative rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 active:scale-95 duration-100",
              activeTab === tab ? "text-zinc-950" : "text-zinc-400 hover:text-white"
            )}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="pred-selector-pill"
                className="absolute inset-0 rounded-xl bg-white"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
