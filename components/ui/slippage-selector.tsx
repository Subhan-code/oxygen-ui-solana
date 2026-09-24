"use client";

import * as React from "react";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlippageSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (val: number) => void;
  options?: number[];
}

export function SlippageSelector({
  value = 0.5,
  onChange,
  options = [0.1, 0.5, 1.0],
  className,
  ...props
}: SlippageSelectorProps) {
  const [customVal, setCustomVal] = React.useState<string>("");
  const [isCustom, setIsCustom] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isPresetActive = !isCustom && options.includes(value);

  const handleSelectOption = (opt: number) => {
    setIsCustom(false);
    setCustomVal("");
    onChange?.(opt);
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
    if (!customVal && !options.includes(value)) {
      setCustomVal(String(value));
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomVal(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) {
      const clamped = Math.min(50, Math.max(0, parsed));
      onChange?.(clamped);
    }
  };

  const handleCustomBlur = () => {
    const parsed = parseFloat(customVal);
    if (isNaN(parsed) || parsed <= 0) {
      if (!options.includes(value)) {
        setIsCustom(false);
        onChange?.(options[1] ?? 0.5);
      }
    }
  };

  const isHighSlippage = value > 5;

  return (
    <div
      data-slot="slippage-selector"
      className={cn(
        "flex flex-col gap-3 rounded-[28px] border border-white/[0.08] bg-zinc-950/80 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] select-none text-zinc-100",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-1.5 font-medium tracking-[-0.01em] text-zinc-400">
          <Settings2 className="size-3.5 text-sky-400" />
          <span>Max slippage</span>
        </span>
        <span
          className={cn(
            "font-mono tabular-nums text-xs font-semibold tracking-tight transition-colors duration-200",
            isHighSlippage ? "text-amber-400" : "text-zinc-200"
          )}
        >
          {value}%
        </span>
      </div>

      {/* Segmented Control Well */}
      <div className="flex items-center gap-1.5 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.06]">
        {options.map((opt) => {
          const active = !isCustom && value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelectOption(opt)}
              className={cn(
                "relative flex-1 h-9 rounded-[12px] text-xs font-mono font-medium transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer",
                active
                  ? "bg-white text-zinc-950 shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              )}
            >
              <span>{opt}%</span>
            </button>
          );
        })}

        {/* Custom Input Cell */}
        <div className="relative flex-1 h-9">
          <input
            ref={inputRef}
            type="number"
            inputMode="decimal"
            min={0}
            max={50}
            step={0.1}
            placeholder="Custom"
            value={customVal}
            onFocus={handleCustomFocus}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            aria-label="Custom slippage percentage"
            className={cn(
              "w-full h-full rounded-[12px] text-center text-xs font-mono font-medium pl-2 pr-5 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] outline-none placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
              !isPresetActive
                ? "bg-white/[0.12] text-white ring-1 ring-white/15 font-semibold"
                : "bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            )}
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-500">
            %
          </span>
        </div>
      </div>
    </div>
  );
}

export default SlippageSelector;
