"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MorphingThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultTheme?: "dark" | "light";
  onThemeChange?: (theme: "dark" | "light") => void;
}

const springSwitch = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
};

export function MorphingThemeSwitcher({
  defaultTheme = "dark",
  onThemeChange,
  className,
  ...props
}: MorphingThemeSwitcherProps) {
  const [theme, setTheme] = useState<"dark" | "light">(defaultTheme);
  const shouldReduceMotion = useReducedMotion();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    onThemeChange?.(next);
  };

  const isDark = theme === "dark";

  return (
    <div
      data-slot="morphing-theme-switcher"
      className={cn("flex flex-col items-center justify-center gap-5 w-full max-w-sm select-none", className)}
      {...props}
    >
      {/* Morphing Switch Capsule */}
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        transition={springSwitch}
        className={cn(
          "relative flex h-14 w-32 items-center rounded-full border p-1.5 shadow-2xl backdrop-blur-2xl transition-colors duration-300 cursor-pointer outline-none",
          isDark
            ? "border-white/15 bg-black/80 shadow-black/50"
            : "border-black/10 bg-sky-100 shadow-sky-200/50"
        )}
      >
        {/* Sliding Pill Indicator */}
        <motion.div
          layout
          transition={springSwitch}
          className={cn(
            "flex size-11 items-center justify-center rounded-full text-white shadow-lg",
            isDark
              ? "ml-auto bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-indigo-500/30"
              : "ml-0 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 shadow-amber-400/40"
          )}
        >
          <motion.div
            animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1.1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {isDark ? <Moon className="size-5 fill-current" /> : <Sun className="size-5 fill-current" />}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Label Indicator */}
      <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#1c1c1e]/80 px-4 py-1.5 shadow-xs backdrop-blur-md">
        <Sparkles className="size-3.5 text-blue-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          {theme} Mode Active
        </span>
      </div>
    </div>
  );
}

export default MorphingThemeSwitcher;
