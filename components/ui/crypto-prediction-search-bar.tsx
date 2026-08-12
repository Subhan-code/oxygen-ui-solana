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
        "relative mx-auto flex w-full max-w-sm items-center gap-2 rounded-2xl bg-black p-2 text-white shadow-lg border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search prediction markets..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
      </div>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
        aria-label="Filter markets"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}
