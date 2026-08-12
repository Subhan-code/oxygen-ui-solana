"use client"

import React from "react"
import { ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoUpDownUpcomingCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoUpDownUpcomingCarousel({ className, ...props }: CryptoUpDownUpcomingCarouselProps) {
  const upcomingRounds = [
    { id: "#1042", time: "05:00", pool: "$12,450" },
    { id: "#1043", time: "10:00", pool: "$18,200" },
    { id: "#1044", time: "15:00", pool: "$15,800" },
  ]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-black p-4 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-3">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-emerald-400" />
          <span>Upcoming Solana Option Rounds</span>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500 cursor-pointer" />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {upcomingRounds.map((r) => (
          <div
            key={r.id}
            className="flex-1 min-w-[100px] rounded-xl bg-zinc-900/80 p-2.5 border border-zinc-800 flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono font-bold text-zinc-400">{r.id}</span>
            <span className="text-sm font-extrabold text-white mt-1 block">{r.time}</span>
            <span className="text-[10px] font-bold text-emerald-400 mt-0.5">{r.pool}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
