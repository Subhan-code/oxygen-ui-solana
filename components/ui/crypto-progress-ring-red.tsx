"use client"

import React from "react"
import { motion } from "motion/react"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoProgressRingRedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number
  label?: string
}

export function CryptoProgressRingRed({
  percent = 32,
  label = "Critical Liquidity",
  className,
  ...props
}: CryptoProgressRingRedProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-[32px] bg-black p-6 text-white shadow-2xl border border-rose-900/50 font-sans",
        className
      )}
      {...props}
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * percent) / 100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-5 w-5 text-rose-500 mb-1" />
          <span className="text-3xl font-black text-white">{percent}%</span>
          <span className="text-xs font-semibold text-rose-400 mt-0.5">{label}</span>
        </div>
      </div>
    </div>
  )
}
