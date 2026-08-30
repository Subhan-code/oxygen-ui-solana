"use client";

import React, { useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TradeToggleSide = "buy" | "sell";
export type TradeToggleVariant = "segmented" | "split";
export type TradeToggleColorScheme = "green" | "blue" | "duo";

export interface TradeTogglePillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: TradeToggleSide;
  defaultValue?: TradeToggleSide;
  onChange?: (side: TradeToggleSide) => void;
  variant?: TradeToggleVariant;
  colorScheme?: TradeToggleColorScheme;
  buyLabel?: string;
  sellLabel?: string;
  disabled?: boolean;
}

const springConfig = {
  type: "spring" as const,
  duration: 0.2,
  bounce: 0,
};

export const TradeTogglePill = React.forwardRef<HTMLDivElement, TradeTogglePillProps>(
  (
    {
      value: controlledValue,
      defaultValue = "buy",
      onChange,
      variant = "segmented",
      colorScheme = "green",
      buyLabel = "Buy USDT",
      sellLabel = "Sell USDT",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalSide, setInternalSide] = useState<TradeToggleSide>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const active = isControlled ? controlledValue : internalSide;
    const shouldReduceMotion = useReducedMotion();
    const fromKeyboard = React.useRef(false);

    const handleSelect = useCallback(
      (side: TradeToggleSide) => {
        if (disabled) return;
        if (!isControlled) {
          setInternalSide(side);
        }
        onChange?.(side);
      },
      [disabled, isControlled, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          fromKeyboard.current = true;
          handleSelect("buy");
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          fromKeyboard.current = true;
          handleSelect("sell");
        }
      },
      [disabled, handleSelect]
    );

    if (variant === "split") {
      const isBlue = colorScheme === "blue";
      const isDuo = colorScheme === "duo";

      const containerBg = isBlue
        ? "bg-gradient-to-b from-[#132c4a] to-[#0d1e34] border-[#081423]"
        : isDuo
        ? "bg-gradient-to-b from-[#1c222c] to-[#12161d] border-[#0b0e13]"
        : "bg-gradient-to-b from-[#163f31] to-[#0f2e24] border-[#0a2019]";

      const ringColor = isBlue
        ? "focus-visible:ring-[#38bdf8]/50"
        : isDuo
        ? "focus-visible:ring-[#4ade80]/50"
        : "focus-visible:ring-[#8cf5a5]/50";

      return (
        <div
          ref={ref}
          role="radiogroup"
          aria-label="Trade direction"
          data-slot="trade-toggle-pill-split"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className={cn(
            "group/container inline-flex items-center gap-2 rounded-full p-1.5 border-[2.5px] shadow-xl",
            containerBg,
            ringColor,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0e12]",
            disabled && "opacity-50 pointer-events-none cursor-not-allowed",
            className
          )}
          {...props}
        >
          {/* Buy Button */}
          <motion.button
            type="button"
            role="radio"
            aria-checked={active === "buy"}
            disabled={disabled}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springConfig}
            onClick={() => handleSelect("buy")}
            className={cn(
              "group/buy relative flex h-11 min-w-[140px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-bold tracking-tight select-none",
              "transition-[background-color,color,box-shadow] duration-200 outline-none",
              isBlue
                ? active === "buy"
                  ? "bg-[#1d456f] text-[#38bdf8] shadow-inner ring-1 ring-[#38bdf8]/30"
                  : "bg-[#142d48] text-[#38bdf8]/75 hover:text-[#38bdf8] hover:bg-[#1a385b]"
                : isDuo
                ? active === "buy"
                  ? "bg-[#18452f] text-[#4ade80] shadow-inner ring-1 ring-[#4ade80]/30"
                  : "bg-[#132c20] text-[#4ade80]/75 hover:text-[#4ade80] hover:bg-[#18392a]"
                : active === "buy"
                ? "bg-[#1f503f] text-[#8cf5a5] shadow-inner ring-1 ring-[#8cf5a5]/30"
                : "bg-[#143a2d] text-[#8cf5a5]/75 hover:text-[#8cf5a5] hover:bg-[#194536]"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover/buy:translate-y-0.5",
                isBlue
                  ? "bg-[#38bdf8] text-[#082038]"
                  : isDuo
                  ? "bg-[#4ade80] text-[#052e16]"
                  : "bg-[#8cf5a5] text-[#103427]"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2.5v7M2.5 6l3.5 3.5L9.5 6" />
              </svg>
            </span>
            <span>{buyLabel}</span>
          </motion.button>

          {/* Sell Button */}
          <motion.button
            type="button"
            role="radio"
            aria-checked={active === "sell"}
            disabled={disabled}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springConfig}
            onClick={() => handleSelect("sell")}
            className={cn(
              "group/sell relative flex h-11 min-w-[140px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-bold tracking-tight select-none",
              "transition-[background-color,color,box-shadow] duration-200 outline-none",
              isBlue
                ? active === "sell"
                  ? "bg-[#1d456f] text-[#38bdf8] shadow-inner ring-1 ring-[#38bdf8]/30"
                  : "bg-[#142d48] text-[#38bdf8]/75 hover:text-[#38bdf8] hover:bg-[#1a385b]"
                : isDuo
                ? active === "sell"
                  ? "bg-[#4c1d24] text-[#f87171] shadow-inner ring-1 ring-[#f87171]/30"
                  : "bg-[#33141a] text-[#f87171]/75 hover:text-[#f87171] hover:bg-[#421921]"
                : active === "sell"
                ? "bg-[#1f503f] text-[#8cf5a5] shadow-inner ring-1 ring-[#8cf5a5]/30"
                : "bg-[#143a2d] text-[#8cf5a5]/75 hover:text-[#8cf5a5] hover:bg-[#194536]"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover/sell:-translate-y-0.5",
                isBlue
                  ? "bg-[#38bdf8] text-[#082038]"
                  : isDuo
                  ? "bg-[#f87171] text-[#450a0a]"
                  : "bg-[#8cf5a5] text-[#103427]"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9.5v-7M2.5 6L6 2.5 9.5 6" />
              </svg>
            </span>
            <span>{sellLabel}</span>
          </motion.button>
        </div>
      );
    }

    const isBlue = colorScheme === "blue";
    const isDuo = colorScheme === "duo";

    const containerBg = isBlue
      ? "bg-gradient-to-b from-[#132c4a] to-[#0d1e34] border-[#081423]"
      : isDuo
      ? "bg-gradient-to-b from-[#1c222c] to-[#12161d] border-[#0b0e13]"
      : "bg-gradient-to-b from-[#163f31] to-[#0f2e24] border-[#0a2019]";

    const ringColor = isBlue
      ? "focus-visible:ring-[#38bdf8]/50"
      : isDuo
      ? active === "buy"
        ? "focus-visible:ring-[#4ade80]/50"
        : "focus-visible:ring-[#f87171]/50"
      : "focus-visible:ring-[#8cf5a5]/50";

    const activeIndicatorColor = isBlue
      ? "bg-[#38bdf8] shadow-[0_2px_10px_rgba(56,189,248,0.28)]"
      : isDuo
      ? active === "buy"
        ? "bg-[#4ade80] shadow-[0_2px_10px_rgba(74,222,128,0.28)]"
        : "bg-[#f87171] shadow-[0_2px_10px_rgba(248,113,113,0.28)]"
      : "bg-[#8cf5a5] shadow-[0_2px_10px_rgba(140,245,165,0.25)]";

    const activeDotColor = isBlue
      ? "bg-[#082038]"
      : isDuo
      ? active === "buy"
        ? "bg-[#052e16]"
        : "bg-[#450a0a]"
      : "bg-[#103427]";

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Trade direction"
        data-slot="trade-toggle-pill"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-grid grid-cols-2 h-13 rounded-full p-1 border-[2.5px] shadow-xl select-none",
          containerBg,
          ringColor,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0e12]",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* GPU-accelerated Sliding Active Pill Indicator */}
        <motion.div
          animate={{
            x: active === "buy" ? "0%" : "100%",
          }}
          transition={
            shouldReduceMotion || fromKeyboard.current
              ? { duration: 0 }
              : springConfig
          }
          onAnimationComplete={() => {
            fromKeyboard.current = false;
          }}
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full pointer-events-none",
            activeIndicatorColor
          )}
          style={{ borderRadius: 999 }}
        />

        {/* Buy Option */}
        <motion.button
          type="button"
          role="radio"
          aria-checked={active === "buy"}
          disabled={disabled}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          onClick={() => handleSelect("buy")}
          className={cn(
            "group/buy relative z-10 flex h-full min-w-[136px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-bold tracking-tight outline-none",
            "transition-colors duration-150",
            isBlue
              ? active === "buy"
                ? "text-[#082038]"
                : "text-[#38bdf8] hover:text-[#bae6fd]"
              : isDuo
              ? active === "buy"
                ? "text-[#052e16]"
                : "text-[#4ade80] hover:text-[#86efac]"
              : active === "buy"
              ? "text-[#103427]"
              : "text-[#8cf5a5] hover:text-[#b4fcd1]"
          )}
        >
          {active === "buy" ? (
            <motion.span
              layoutId={`active-dot-${colorScheme}`}
              className={cn("h-3 w-3 rounded-full shrink-0 shadow-xs", activeDotColor)}
              style={{ borderRadius: 999 }}
              transition={
                shouldReduceMotion || fromKeyboard.current
                  ? { duration: 0 }
                  : springConfig
              }
            />
          ) : (
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover/buy:translate-y-0.5",
                isBlue
                  ? "bg-[#38bdf8] text-[#082038]"
                  : isDuo
                  ? "bg-[#4ade80] text-[#052e16]"
                  : "bg-[#8cf5a5] text-[#103427]"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2.5v7M2.5 6l3.5 3.5L9.5 6" />
              </svg>
            </span>
          )}
          <span>{buyLabel}</span>
        </motion.button>

        {/* Sell Option */}
        <motion.button
          type="button"
          role="radio"
          aria-checked={active === "sell"}
          disabled={disabled}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          onClick={() => handleSelect("sell")}
          className={cn(
            "group/sell relative z-10 flex h-full min-w-[136px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-bold tracking-tight outline-none",
            "transition-colors duration-150",
            isBlue
              ? active === "sell"
                ? "text-[#082038]"
                : "text-[#38bdf8] hover:text-[#bae6fd]"
              : isDuo
              ? active === "sell"
                ? "text-[#450a0a]"
                : "text-[#f87171] hover:text-[#fca5a5]"
              : active === "sell"
              ? "text-[#103427]"
              : "text-[#8cf5a5] hover:text-[#b4fcd1]"
          )}
        >
          {active === "sell" ? (
            <motion.span
              layoutId={`active-dot-${colorScheme}`}
              className={cn("h-3 w-3 rounded-full shrink-0 shadow-xs", activeDotColor)}
              style={{ borderRadius: 999 }}
              transition={
                shouldReduceMotion || fromKeyboard.current
                  ? { duration: 0 }
                  : springConfig
              }
            />
          ) : (
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover/sell:-translate-y-0.5",
                isBlue
                  ? "bg-[#38bdf8] text-[#082038]"
                  : isDuo
                  ? "bg-[#f87171] text-[#450a0a]"
                  : "bg-[#8cf5a5] text-[#103427]"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9.5v-7M2.5 6L6 2.5 9.5 6" />
              </svg>
            </span>
          )}
          <span>{sellLabel}</span>
        </motion.button>
      </div>
    );
  }
);

TradeTogglePill.displayName = "TradeTogglePill";

export default TradeTogglePill;
