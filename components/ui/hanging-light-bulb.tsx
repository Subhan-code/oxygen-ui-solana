"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HangingLightBulbProps {
  className?: string;
  defaultOn?: boolean;
  onToggle?: (isOn: boolean) => void;
}

export function HangingLightBulb({
  className,
  defaultOn = true,
  onToggle,
}: HangingLightBulbProps) {
  const [isOn, setIsOn] = useState(defaultOn);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    onToggle?.(next);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start select-none",
        className
      )}
    >
      {/* Swinging Assembly */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { rotate: 0 }
            : {
                rotate: [-11, 11, -11],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 3.6,
                repeat: Infinity,
                ease: [0.445, 0.05, 0.55, 0.95],
              }
        }
        style={{ transformOrigin: "top center" }}
        className="bulb-container relative flex flex-col items-center cursor-pointer group"
        onClick={handleToggle}
        title={isOn ? "Click to turn light off" : "Click to turn light on"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-label={isOn ? "Turn light off" : "Turn light on"}
      >
        {/* Ceiling Mount */}
        <div className="h-2 w-8 rounded-full bg-zinc-700/80 border border-white/10 shadow-md shrink-0" />

        {/* Wire */}
        <div className="wire h-28 sm:h-36 w-[2px] bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-700 shadow-sm shrink-0" />

        {/* Connector Socket */}
        <div className="connector relative flex flex-col items-center justify-between w-6 h-7 rounded-t-md bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 border-x border-t border-black/30 shadow-md shrink-0 py-0.5">
          <div className="grove w-7 h-[3px] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-300 to-zinc-800 shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
          <div className="grove w-7 h-[3px] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-300 to-zinc-800 shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
          <div className="grove w-7 h-[3px] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-300 to-zinc-800 shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
        </div>

        {/* Glass Bulb Body */}
        <div
          className={cn(
            "bulb relative w-[72px] h-[80px] rounded-[50%_50%_46%_46%] border transition-all duration-300 flex items-center justify-center -mt-0.5",
            isOn
              ? "bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400/90 border-amber-200/90 shadow-[0_0_35px_rgba(251,191,36,0.85),0_0_80px_rgba(245,158,11,0.5),0_0_140px_rgba(245,158,11,0.3)]"
              : "bg-gradient-to-b from-zinc-700/50 via-zinc-800/80 to-zinc-900/90 border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.4)]"
          )}
        >
          {/* Glass Highlight Gleam */}
          <div
            className={cn(
              "absolute top-2 left-3 w-4 h-6 rounded-full rotate-[-25deg] pointer-events-none transition-opacity duration-300",
              isOn ? "bg-white/70 blur-[0.5px]" : "bg-white/20 blur-[0.5px]"
            )}
          />

          {/* Filament Metal Wires */}
          <div className="relative w-7 h-10 flex items-center justify-center">
            {/* Center stem */}
            <div
              className={cn(
                "metal-wire absolute top-0 w-[1.5px] h-5 transition-colors duration-200",
                isOn ? "bg-amber-100 shadow-[0_0_6px_#fbbf24]" : "bg-zinc-500/70"
              )}
            />
            {/* Left curved loop */}
            <div
              className={cn(
                "metal-wire absolute top-3 left-0 w-3 h-5 rounded-full border-t-[1.5px] border-l-[1.5px] transition-colors duration-200",
                isOn
                  ? "border-amber-200 shadow-[0_0_6px_#fbbf24]"
                  : "border-zinc-500/60"
              )}
            />
            {/* Right curved loop */}
            <div
              className={cn(
                "metal-wire absolute top-3 right-0 w-3 h-5 rounded-full border-t-[1.5px] border-r-[1.5px] transition-colors duration-200",
                isOn
                  ? "border-amber-200 shadow-[0_0_6px_#fbbf24]"
                  : "border-zinc-500/60"
              )}
            />
          </div>

          {/* Volumetric Radial Light Cone (Swings with bulb) */}
          <div
            className={cn(
              "absolute top-[68px] -left-[140px] w-[350px] h-[340px] pointer-events-none transition-opacity duration-300",
              isOn ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.24) 0%, rgba(245, 158, 11, 0.09) 40%, transparent 75%)",
              clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HangingLightBulb;
