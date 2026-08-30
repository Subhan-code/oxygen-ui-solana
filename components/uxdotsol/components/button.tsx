"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type UxSolButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success";

export type UxSolButtonSize = "sm" | "md" | "lg" | "icon";

export interface UxSolButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: UxSolButtonVariant;
  size?: UxSolButtonSize;
}

const baseClasses = [
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl select-none",
  "font-semibold outline-none will-change-transform",
  "motion-safe:transition-[transform,background-color,color,border-color,opacity,box-shadow] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
  "cursor-pointer motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:ring-2 focus-visible:ring-[#0066FF]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "dark:focus-visible:ring-[#0A84FF]/40 dark:focus-visible:ring-offset-background",
];

const variantClasses: Record<UxSolButtonVariant, string[]> = {
  primary: [
    "border border-zinc-900 bg-zinc-900 text-white shadow-xs hover:bg-zinc-800 active:bg-zinc-950",
    "dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-white",
  ],
  secondary: [
    "border border-zinc-200/80 bg-zinc-100/90 text-zinc-800 shadow-xs hover:bg-zinc-200/90 hover:text-zinc-950",
    "dark:border-white/10 dark:bg-white/8 dark:text-zinc-200 dark:hover:bg-white/12 dark:hover:text-white",
  ],
  outline: [
    "border border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 hover:border-zinc-300",
    "dark:border-white/12 dark:text-zinc-300 dark:hover:bg-white/8 dark:hover:text-white dark:hover:border-white/20",
  ],
  ghost: [
    "border border-transparent bg-transparent text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950",
    "dark:text-zinc-300 dark:hover:bg-white/8 dark:hover:text-white",
  ],
  destructive: [
    "border border-red-200/80 bg-red-50 text-red-600 shadow-xs hover:bg-red-100/80",
    "dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/18",
    "focus-visible:ring-red-500/25",
  ],
  success: [
    "border border-emerald-200/80 bg-emerald-50 text-emerald-700 shadow-xs hover:bg-emerald-100/80",
    "dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/18",
    "focus-visible:ring-emerald-500/25",
  ],
};

const sizeClasses: Record<UxSolButtonSize, string> = {
  sm: "h-9 min-w-9 px-3 text-[12.5px] tracking-normal",
  md: "h-10 min-w-10 px-4 text-[13.5px] tracking-tight",
  lg: "h-11 min-w-11 px-5 text-sm tracking-tight",
  icon: "h-10 w-10 p-0",
};

export const UxSolButton = React.forwardRef<HTMLButtonElement, UxSolButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="button"
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

UxSolButton.displayName = "UxSolButton";

export default UxSolButton;
