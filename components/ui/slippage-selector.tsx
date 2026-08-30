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
      className={cn("flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-xl", className)}
      data-slot="slippage-selector"
      {...props}
    >
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Settings2 className="h-3.5 w-3.5 text-purple-400" /> Max Slippage Tolerance
        </span>
        <span className="font-mono text-zinc-200 font-semibold">{value}%</span>
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
                "relative flex-1 h-11 rounded-xl text-xs font-mono font-semibold border motion-safe:transition-colors motion-safe:duration-150 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40",
                active
                  ? "text-white border-purple-500"
                  : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              {active && (
                <motion.span
                  layoutId="slippage-active"
                  className="absolute inset-0 rounded-xl bg-purple-600 shadow-md shadow-purple-500/20"
                  style={{ borderRadius: 12 }}
                  transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                />
              )}
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
              "w-full h-11 rounded-xl border py-1.5 px-2 text-center text-xs font-mono font-semibold motion-safe:transition-colors motion-safe:duration-150 bg-zinc-950/60 outline-none placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500/40",
              isCustom
                ? "border-purple-500 text-white bg-purple-500/10"
                : "border-zinc-800 text-zinc-300 hover:border-zinc-700"
            )}
          />
          <span className="pointer-events-none absolute right-2 top-1.5 text-xs text-zinc-500">%</span>
        </div>
      </div>
    </div>
  )
}
