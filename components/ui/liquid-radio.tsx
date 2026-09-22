"use client";

import React, { useState, createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";

export function GlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
      <defs>
        <filter
          id="radio-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (val: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (val: string) => void;
}

export function RadioGroup({
  value,
  onValueChange,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internalVal, setInternalVal] = useState("online");
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalVal;
  const name = useId();

  const handleValueChange = (val: string) => {
    if (!isControlled) setInternalVal(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ value: activeValue, onValueChange: handleValueChange, name }}>
      <div
        data-slot="radio-group"
        className={className}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export function RadioGroupItem({ value, className, id, ...props }: RadioGroupItemProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) return null;

  return (
    <input
      type="radio"
      id={id}
      name={ctx.name}
      value={value}
      checked={ctx.value === value}
      onChange={() => ctx.onValueChange(value)}
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

export function LiquidRadio() {
  const [token, setToken] = useState("sol");

  return (
    <div className="inline-flex h-9 rounded-lg bg-input/50 p-0.5">
      <RadioGroup
        value={token}
        onValueChange={setToken}
        className="group relative inline-grid grid-cols-3 items-center gap-0 text-xs font-bold after:absolute after:inset-y-0 after:w-1/3 after:rounded-md after:bg-background/80 after:shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=sol]:after:translate-x-0 data-[state=usdc]:after:translate-x-full data-[state=bonk]:after:translate-x-[200%] dark:after:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
        data-state={token}
      >
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
          style={{ filter: 'url("#radio-glass")' }}
        />
        <label className={cn(
          "relative z-10 inline-flex h-full min-w-10 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3.5 transition-colors",
          token === "sol" ? "text-foreground" : "text-muted-foreground/70"
        )}>
          SOL
          <RadioGroupItem id="token-sol" value="sol" className="sr-only" />
        </label>
        <label className={cn(
          "relative z-10 inline-flex h-full min-w-10 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3.5 transition-colors",
          token === "usdc" ? "text-foreground" : "text-muted-foreground/70"
        )}>
          USDC
          <RadioGroupItem id="token-usdc" value="usdc" className="sr-only" />
        </label>
        <label className={cn(
          "relative z-10 inline-flex h-full min-w-10 cursor-pointer select-none items-center justify-center whitespace-nowrap px-3.5 transition-colors",
          token === "bonk" ? "text-foreground" : "text-muted-foreground/70"
        )}>
          BONK
          <RadioGroupItem id="token-bonk" value="bonk" className="sr-only" />
        </label>
        <GlassFilter />
      </RadioGroup>
    </div>
  );
}

export default LiquidRadio;
