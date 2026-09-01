"use client";

import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AddressDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  address: string;
  truncate?: boolean;
  truncateChars?: [number, number];
  copyable?: boolean;
  explorerUrl?: string;
}

const formatAddress = (
  address: string,
  truncate: boolean,
  chars: [number, number]
) => {
  if (!truncate || address.length <= chars[0] + chars[1] + 3) return address;
  return `${address.slice(0, chars[0])}...${address.slice(-chars[1])}`;
};

const springIcon = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
  mass: 0.6,
};

export const AddressDisplay = ({
  address,
  truncate = true,
  truncateChars = [4, 4],
  copyable = true,
  explorerUrl,
  className,
  ...props
}: AddressDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      console.error("Failed to copy address to clipboard");
    }
  }, [address]);

  const displayed = formatAddress(address, truncate, truncateChars);
  const fullUrl = explorerUrl
    ? `${explorerUrl.replace(/\/+$/, "")}/${address}`
    : undefined;

  return (
    <span
      data-slot="address-display"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 select-none shadow-xs font-sans",
        className
      )}
      {...props}
    >
      <span className="font-mono text-xs font-semibold tracking-tight">
        {displayed}
      </span>
      {copyable && (
        <motion.button
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          transition={springIcon}
          onClick={handleCopy}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-sky-500/40"
          aria-label="Copy address"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
                className="flex items-center"
              >
                <CheckIcon className="size-3.5 text-emerald-500" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
                className="flex items-center"
              >
                <CopyIcon className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
      {fullUrl && (
        <motion.a
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          transition={springIcon}
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-sky-500/40"
          aria-label="View in explorer"
        >
          <ExternalLinkIcon className="size-3.5" />
        </motion.a>
      )}
    </span>
  );
};

export interface CopyButtonProps extends React.ComponentProps<typeof motion.button> {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
}



export const CopyButton = ({
  textToCopy,
  label = "Copy",
  copiedLabel = "Copied!",
  className,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      console.error("Failed to copy text to clipboard");
    }
  }, [textToCopy]);

  return (
    <motion.button
      type="button"
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={springIcon}
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 font-sans",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-1.5 text-emerald-500"
          >
            <CheckIcon className="size-3.5" />
            <span>{copiedLabel}</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-1.5"
          >
            <CopyIcon className="size-3.5 text-zinc-400" />
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AddressDisplay;

