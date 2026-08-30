"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CategoryPill {
  label: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
  border?: string;
}

export interface CategoryTagPillsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  pills?: CategoryPill[];
  onSelect?: (pill: CategoryPill) => void;
}

const DEFAULT_PILLS: CategoryPill[] = [
  {
    label: "Brand & Style",
    icon: "⭐",
    bg: "bg-blue-50/80 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200/60 dark:border-blue-800/30",
  },
  {
    label: "Compliance",
    icon: "📋",
    bg: "bg-emerald-50/80 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/60 dark:border-emerald-800/30",
  },
  {
    label: "Content Safety",
    icon: "🪶",
    bg: "bg-violet-50/80 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200/60 dark:border-violet-800/30",
  },
  {
    label: "Approval Trigger",
    icon: "👆",
    bg: "bg-zinc-100/90 dark:bg-zinc-800/50",
    text: "text-zinc-800 dark:text-zinc-200",
    border: "border-zinc-200/70 dark:border-zinc-700/40",
  },
];

const springCard = {
  type: "spring" as const,
  stiffness: 480,
  damping: 30,
  mass: 0.65,
};

export function CategoryTagPills({
  pills = DEFAULT_PILLS,
  onSelect,
  className,
  ...props
}: CategoryTagPillsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      data-slot="category-tag-pills"
      className={cn("flex flex-col gap-2.5 w-full select-none", className)}
      {...props}
    >
      {pills.map((pill, i) => (
        <motion.div
          key={pill.label}
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(pill)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.(pill);
            }
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            ...springCard,
            delay: shouldReduceMotion ? 0 : i * 0.04,
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.015, y: -1 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          className={cn(
            "flex items-center gap-3.5 rounded-2xl px-5 py-3.5 border backdrop-blur-md cursor-pointer",
            "font-semibold text-[15px] tracking-tight shadow-xs outline-none",
            "transition-[background-color,border-color,box-shadow] duration-200",
            "focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            pill.bg,
            pill.text,
            pill.border || "border-transparent"
          )}
        >
          <span className="text-xl leading-none transition-transform duration-200 ease-out group-hover:scale-110">
            {pill.icon}
          </span>
          <span className="font-bold tracking-tight text-foreground/90 dark:text-inherit">
            {pill.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default CategoryTagPills;
