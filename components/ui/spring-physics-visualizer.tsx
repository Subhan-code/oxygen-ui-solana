"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play, RotateCcw, Sliders, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SpringPhysicsVisualizer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(0.8);
  const [key, setKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleTrigger = () => {
    setKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setStiffness(400);
    setDamping(25);
    setMass(0.8);
    setKey((prev) => prev + 1);
  };

  return (
    <div
      data-slot="spring-physics-visualizer"
      className={cn("flex flex-col gap-5 w-full max-w-md select-none", className)}
      {...props}
    >
      {/* Motion Stage */}
      <div className="relative flex h-[160px] w-full items-center justify-center rounded-3xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-[#1c1c1e]/90 p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <motion.div
          key={key}
          initial={shouldReduceMotion ? false : { x: -140, scale: 0.8, rotate: -20 }}
          animate={{ x: 140, scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness,
            damping,
            mass,
          }}
          className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-xl shadow-blue-500/30 ring-4 ring-blue-500/20"
        >
          <Zap className="size-8 stroke-[2.5]" />
        </motion.div>
      </div>

      {/* Interactive Controls Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 p-5 shadow-xl backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Spring Parameters</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        </div>

        {/* Stiffness Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Stiffness</span>
            <span className="font-bold text-blue-500">{stiffness}</span>
          </div>
          <input
            type="range"
            min="100"
            max="1000"
            step="10"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Damping Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Damping</span>
            <span className="font-bold text-blue-500">{damping}</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="1"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Mass Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Mass</span>
            <span className="font-bold text-blue-500">{mass}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleTrigger}
          className="flex items-center justify-center gap-2 h-11 w-full rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-colors cursor-pointer outline-none mt-1"
        >
          <Play className="size-3.5 fill-current" />
          <span>Animate Spring Physics</span>
        </button>
      </div>
    </div>
  );
}

export default SpringPhysicsVisualizer;
