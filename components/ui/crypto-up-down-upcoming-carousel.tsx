"use client"

import React from "react"
import { motion } from "motion/react"
import { ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type CryptoUpDownUpcomingCarouselProps =
  Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">;

export function CryptoUpDownUpcomingCarousel({ className, ...props }: CryptoUpDownUpcomingCarouselProps) {
  const upcomingRounds = [
    { id: "#1042", time: "05:00", pool: "$12,450" },
    { id: "#1043", time: "10:00", pool: "$18,200" },
    { id: "#1044", time: "15:00", pool: "$15,800" },
  ]

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-3">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-blue-400" />
          <span>Upcoming Option Rounds</span>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500 cursor-pointer" />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {upcomingRounds.map((r) => (
          <div
            key={r.id}
            className="flex-1 min-w-[100px] rounded-xl bg-zinc-900/80 p-2.5 border border-zinc-800 flex flex-col justify-between transition-transform active:scale-98 cursor-pointer"
          >
            <span className="text-[10px] font-mono font-bold text-zinc-500">{r.id}</span>
            <span className="text-xs font-bold text-white mt-1 block">{r.time}</span>
            <span className="text-[10px] font-semibold text-blue-400 mt-0.5">{r.pool}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
