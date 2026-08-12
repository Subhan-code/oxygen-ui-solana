"use client"

import React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionSearchBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (query: string) => void
}

export function CryptoPredictionSearchBar({
  onSearch,
  className,
  ...props
}: CryptoPredictionSearchBarProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm items-center gap-2 rounded-2xl bg-zinc-950 p-2 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search prediction markets..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
        />
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
        aria-label="Filter markets"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
