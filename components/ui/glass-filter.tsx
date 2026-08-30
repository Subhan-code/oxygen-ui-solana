"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface GlassFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "frosted" | "liquid" | "neon" | "aurora";
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function GlassFilter({
  variant = "liquid",
  interactive = true,
  children,
  className,
  ...props
}: GlassFilterProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const variantStyles = {
    frosted:
      "bg-white/80 dark:bg-zinc-900/80 border-white/60 dark:border-white/10 text-zinc-900 dark:text-zinc-100 shadow-lg",
    liquid:
      "bg-white/90 dark:bg-zinc-950/90 border-white/80 dark:border-white/15 text-zinc-900 dark:text-zinc-100 shadow-xl shadow-sky-500/5",
    neon:
      "bg-zinc-950/90 border-cyan-500/30 text-white shadow-[0_0_25px_rgba(6,182,212,0.15)]",
    aurora:
      "bg-zinc-900/90 border-white/30 dark:border-white/10 text-zinc-900 dark:text-white shadow-xl",
  };

  return (
    <div
      data-slot="glass-filter"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Specular glare tracking cursor position */}
      {interactive && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 bg-white/5"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Internal rim highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20 dark:ring-white/10" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GlassFilter;
