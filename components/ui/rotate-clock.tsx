"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RotateClockProps extends React.HTMLAttributes<HTMLDivElement> {
  initialAngle?: number;
  onTimeChange?: (hours: number, minutes: number) => void;
}

export function RotateClock({
  initialAngle = 90,
  onTimeChange,
  className,
  ...props
}: RotateClockProps) {
  const [angle, setAngle] = useState(initialAngle);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!clockRef.current) return;
      const rect = clockRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      setAngle(Math.round(deg));
    },
    []
  );

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handlePointerMove(e.clientX, e.clientY);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, handlePointerMove]);

  const totalMinutes = Math.round((angle / 360) * 12 * 60);
  const hours = Math.floor(totalMinutes / 60) % 12 || 12;
  const minutes = Math.floor((totalMinutes % 60) / 5) * 5;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  useEffect(() => {
    onTimeChange?.(hours, minutes);
  }, [hours, minutes, onTimeChange]);

  return (
    <div
      data-slot="rotate-clock"
      className={cn("flex flex-col items-center justify-center gap-5 w-full max-w-sm select-none", className)}
      {...props}
    >
      {/* Time Header Pill */}
      <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#1c1c1e]/80 px-4 py-1.5 shadow-xs backdrop-blur-md">
        <Clock className="size-4 text-blue-500" />
        <span className="font-mono text-sm font-bold text-foreground">
          {hours}:{formattedMinutes} {angle >= 180 ? "PM" : "AM"}
        </span>
        <span className="text-[11px] text-muted-foreground font-mono">({angle}°)</span>
      </div>

      {/* Clock Dial Container */}
      <div
        ref={clockRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handlePointerMove(e.clientX, e.clientY);
        }}
        className="relative flex size-64 items-center justify-center rounded-full border-2 border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#1c1c1e]/90 p-4 shadow-2xl backdrop-blur-2xl cursor-grab active:cursor-grabbing"
      >
        {/* Dial Face Markings */}
        {Array.from({ length: 12 }).map((_, i) => {
          const tickAngle = i * 30;
          return (
            <div
              key={tickAngle}
              className="absolute inset-0 flex items-start justify-center pt-2.5 pointer-events-none"
              style={{ transform: `rotate(${tickAngle}deg)` }}
            >
              <div
                className={cn(
                  "w-0.5 rounded-full transition-all",
                  i % 3 === 0 ? "h-3.5 bg-blue-500" : "h-2 bg-muted-foreground/30"
                )}
              />
            </div>
          );
        })}

        {/* Center Pivot Point */}
        <div className="z-20 size-4 rounded-full bg-blue-600 ring-4 ring-blue-500/20 shadow-md" />

        {/* Rotating Hour Hand */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { rotate: angle }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative h-full w-full">
            <div className="absolute left-1/2 top-[32px] -translate-x-1/2 h-[96px] w-1.5 rounded-full bg-gradient-to-t from-blue-600 to-sky-400 shadow-lg shadow-blue-500/30">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rounded-full bg-sky-400 border-2 border-white shadow-xs" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Control Actions */}
      <button
        type="button"
        onClick={() => setAngle(90)}
        className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <RotateCcw className="size-3.5" />
        <span>Reset Dial</span>
      </button>
    </div>
  );
}

export default RotateClock;
