"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  value?: string;
}

export function CopyButton({
  value = "https://oxygen-ui.com",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white shadow-xs transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer select-none",
        copied && "border-emerald-500/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
        className
      )}
      {...props}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? "Copied Address!" : `${value.slice(0, 4)}...${value.slice(-4)}`}</span>
    </motion.button>
  );
}

export default CopyButton;
