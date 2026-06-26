"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type CopyButtonProps = Omit<ComponentProps<"button">, "value"> & {
  /** Text written to the clipboard when clicked. */
  value: string;
  /** Accessible label / tooltip. Defaults to "Copy". */
  label?: string;
  /** Optional content rendered next to the icon (e.g. a "Copy" text label). */
  children?: ReactNode;
};

/**
 * Reusable copy-to-clipboard button. The copy glyph crossfades out while the
 * checkmark draws itself in (pathLength), giving a smooth morph between states.
 * Icon-only, it's a perfect square; pass `children` for a labelled pill.
 */
export default function CopyButton({
  value,
  label = "Copy",
  className,
  children,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      {...props}
      type="button"
      onClick={copy}
      data-slot="copy-button"
      data-copied={copied}
      aria-label={copied ? "Copied" : label}
      title={label}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground/60 transition-colors hover:text-white",
        children ? "h-7 gap-1.5 px-2" : "size-7",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        {/* Copy glyph — blurs + shrinks + fades out once copied. */}
        <motion.g
          initial={false}
          animate={{
            opacity: copied ? 0 : 1,
            scale: copied ? 0.6 : 1,
            filter: copied ? "blur(3px)" : "blur(0px)",
          }}
          transition={{ duration: 0.15, ease: "easeIn" }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 15V5a2 2 0 0 1 2-2h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Check — sharpens out of the blur and pops in once copied. */}
        <motion.g
          initial={false}
          animate={{
            opacity: copied ? 1 : 0,
            scale: copied ? 1 : 0.6,
            filter: copied ? "blur(0px)" : "blur(3px)",
          }}
          transition={{
            opacity: { duration: 0.14, delay: copied ? 0.08 : 0 },
            filter: { duration: 0.14, delay: copied ? 0.08 : 0 },
            scale: {
              type: "spring",
              stiffness: 520,
              damping: 17,
              delay: copied ? 0.08 : 0,
            },
          }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#FC4C01"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
      {children}
    </button>
  );
}
