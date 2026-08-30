"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SPRING_PRESS = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.6,
};

const SPRING_SWAP = {
  type: "spring" as const,
  stiffness: 460,
  damping: 30,
  mass: 0.55,
};

export interface CopyButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  value?: string;
}

export function CopyButton({
  value = "https://oxygen-ui.com",
  className,
  ...props
}: CopyButtonProps) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can fail in insecure contexts
    }
  };

  const short =
    value.length > 8 ? `${value.slice(0, 4)}...${value.slice(-4)}` : value;

  return (
    <motion.button
      type="button"
      data-slot="copy-button"
      data-copied={copied}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy value"}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-white shadow-xs motion-safe:transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        copied &&
          "border-emerald-500/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
        className,
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "copied" : "idle"}
          initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6, filter: "blur(3px)" }}
          transition={reduceMotion ? { duration: 0 } : SPRING_SWAP}
          className="inline-flex items-center gap-2"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{copied ? "Copied" : short}</span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default CopyButton;
