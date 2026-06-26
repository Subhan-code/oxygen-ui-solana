"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CopyGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none">
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
  </svg>
);

const CheckGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13l4 4L19 7"
      stroke="#FC4C01"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CopyButtonProps = Omit<ComponentProps<"button">, "value"> & {
  value: string;
  label?: string;
  idleIcon?: ReactNode;
  iconClassName?: string;
  children?: ReactNode;
};


export default function CopyButton({
  value,
  label = "Copy",
  idleIcon,
  iconClassName = "size-3.5",
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

  const layer =
    "col-start-1 row-start-1 block h-full w-full [&>svg]:h-full [&>svg]:w-full";

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
      <span className={cn("grid place-items-center", iconClassName)}>
        <motion.span
          className={layer}
          initial={false}
          animate={{
            opacity: copied ? 0 : 1,
            scale: copied ? 0.6 : 1,
            filter: copied ? "blur(3px)" : "blur(0px)",
          }}
          transition={{ duration: 0.15, ease: "easeIn" }}
        >
          {idleIcon ?? <CopyGlyph />}
        </motion.span>

        <motion.span
          className={layer}
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
        >
          <CheckGlyph />
        </motion.span>
      </span>
      {children}
    </button>
  );
}
