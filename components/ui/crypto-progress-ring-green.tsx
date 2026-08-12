"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface CryptoProgressRingGreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number
  label?: string
}

export function CryptoProgressRingGreen({
  percent = 84,
  label = "Staking Capacity",
  className,
  ...props
}: CryptoProgressRingGreenProps) {
  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="7"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * percent) / 100 }}
            transition={{ type: "spring", bounce: 0, duration: 1.0 }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white">{percent}%</span>
          <span className="text-xs font-semibold text-blue-400 mt-0.5">{label}</span>
        </div>
      </div>
    </motion.div>
  )
}
