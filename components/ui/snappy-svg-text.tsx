"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, RefreshCw, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SnappySvgTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
}

export function SnappySvgText({
  text = "OXYGEN UI",
  strokeColor = "#3B82F6",
  fillColor = "#2563EB",
  className,
  ...props
}: SnappySvgTextProps) {
  const [key, setKey] = useState(0);
  const [isFilled, setIsFilled] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div
      data-slot="snappy-svg-text"
      className={cn("flex flex-col items-center justify-center gap-6 w-full max-w-md select-none", className)}
      {...props}
    >
      {/* SVG Canvas Container */}
      <div className="relative flex min-h-[200px] w-full items-center justify-center rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 p-8 shadow-2xl backdrop-blur-2xl">
        <svg
          key={key}
          viewBox="0 0 500 120"
          className="w-full h-auto max-h-[140px] drop-shadow-xl"
        >
          {/* Background Path Glow */}
          <motion.text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="font-black text-6xl font-mono tracking-widest opacity-20 blur-sm"
          >
            {text}
          </motion.text>

          {/* Animated Draw Stroke Path */}
          <motion.text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeDasharray="1000"
            initial={shouldReduceMotion ? false : { strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-6xl font-mono tracking-widest"
          >
            {text}
          </motion.text>

          {/* Snappy Liquid Fill Reveal */}
          {isFilled && (
            <motion.text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={fillColor}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.45, ease: "easeOut" }}
              className="font-black text-6xl font-mono tracking-widest"
            >
              {text}
            </motion.text>
          )}
        </svg>
      </div>

      {/* Control Switches */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReplay}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-500 transition-colors cursor-pointer"
        >
          <Play className="size-3.5 fill-current" />
          <span>Replay Stroke</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFilled(!isFilled)}
          className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1c1c1e]/80 px-4 py-2 text-xs font-bold text-foreground shadow-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Sparkles className="size-3.5 text-blue-500" />
          <span>{isFilled ? "Stroke Only" : "Liquid Fill"}</span>
        </button>
      </div>
    </div>
  );
}

export default SnappySvgText;
