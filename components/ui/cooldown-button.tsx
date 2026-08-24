"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CooldownButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  cooldownSeconds?: number;
}

export function CooldownButton({
  cooldownSeconds = 5,
  className,
  ...props
}: CooldownButtonProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isCoolingDown = secondsLeft > 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCoolingDown) return;
    setSecondsLeft(cooldownSeconds);
    props.onClick?.(e);
  };

  return (
    <motion.button
      type="button"
      whileTap={isCoolingDown ? undefined : { scale: 0.96 }}
      onClick={handleClick}
      disabled={isCoolingDown}
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all cursor-pointer select-none",
        isCoolingDown && "opacity-60 cursor-not-allowed bg-zinc-700",
        className
      )}
      {...props}
    >
      <Timer className="h-4 w-4" />
      <span>
        {isCoolingDown ? `Cooldown (${secondsLeft}s)...` : "Submit Action"}
      </span>
    </motion.button>
  );
}

export default CooldownButton;
