"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SlippageSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  onChange?: (val: number) => void
  options?: number[]
}

export function SlippageSelector({
  value = 0.5,
  onChange,
  options = [0.1, 0.5, 1.0],
  className,
  ...props
}: SlippageSelectorProps) {
  const [customVal, setCustomVal] = React.useState<string>("")
  const [isCustom, setIsCustom] = React.useState(false)

  const handleSelectOption = (opt: number) => {
    setIsCustom(false)
    setCustomVal("")
    onChange?.(opt)
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCustomVal(val)
    const parsed = parseFloat(val)
    if (!isNaN(parsed) && parsed > 0 && parsed <= 50) {
      onChange?.(parsed)
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-2.5 rounded-[28px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-4 shadow-2xl backdrop-blur-xl text-zinc-900 dark:text-white select-none", className)}
      data-slot="slippage-selector"
      {...props}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-runde font-semibold text-zinc-600 dark:text-zinc-400">
          <Settings2 className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" /> Max Slippage Tolerance
        </span>
        <span className="font-mono text-zinc-900 dark:text-white font-bold">{value}%</span>
      </div>

      <div className="flex items-center gap-1.5">
        {options.map((opt) => {
          const active = !isCustom && value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelectOption(opt)}
              className={cn(
                "relative flex-1 h-10 rounded-xl text-xs font-mono font-semibold border motion-safe:transition-colors motion-safe:duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 cursor-pointer",
                active
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white shadow-xs"
                  : "border-black/5 dark:border-white/10 bg-zinc-100/80 dark:bg-[#0a0a0a] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#141414] hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              <span className="relative z-10">{opt}%</span>
            </button>
          )
        })}

        <div className="relative flex-1">
          <input
            type="number"
            placeholder="Custom"
            value={customVal}
            onFocus={() => setIsCustom(true)}
            onChange={handleCustomChange}
            className={cn(
              "w-full h-10 rounded-xl border py-1.5 px-2 text-center text-xs font-mono font-semibold motion-safe:transition-colors motion-safe:duration-150 bg-zinc-100/80 dark:bg-[#0a0a0a] outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-sky-500/40",
              isCustom
                ? "border-sky-500 text-zinc-900 dark:text-white bg-sky-500/10"
                : "border-black/5 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:border-black/20 dark:hover:border-white/20"
            )}
          />
          <span className="pointer-events-none absolute right-2 top-2.5 text-xs text-zinc-400 font-mono">%</span>
        </div>
      </div>
    </div>
  )
}
