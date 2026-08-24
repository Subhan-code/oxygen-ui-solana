"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfettiButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children?: React.ReactNode;
}

export function ConfettiButton({
  children = "Celebrate 🎉",
  className,
  ...props
}: ConfettiButtonProps) {
  const [claimed, setClaimed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClaimed(true);
    props.onClick?.(e);
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-purple-500 active:scale-95 cursor-pointer select-none",
        claimed && "bg-emerald-600 hover:bg-emerald-500",
        className
      )}
      {...props}
    >
      <Sparkles className="h-4 w-4" />
      <span>{claimed ? "Celebrated! 🎉" : children}</span>
    </motion.button>
  );
}

export default ConfettiButton;
