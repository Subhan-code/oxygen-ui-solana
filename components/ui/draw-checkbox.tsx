"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Shield, Zap, Lock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxItem {
  id: string;
  label: string;
  description?: string;
  checked?: boolean;
}

export interface DrawCheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: CheckboxItem[];
  onChange?: (items: CheckboxItem[]) => void;
}

const DEFAULT_ITEMS: CheckboxItem[] = [
  { id: "1", label: "Verify Hardware Signer", description: "Ledger / Keystone connected", checked: true },
  { id: "2", label: "Simulate Transaction", description: "Zero malicious balance changes", checked: true },
  { id: "3", label: "Enable MEV Protection", description: "Direct private validator relay", checked: false },
  { id: "4", label: "Backup Seed In Vault", description: "Encrypted offline backup", checked: false },
];

export function DrawCheckbox({
  items = DEFAULT_ITEMS,
  onChange,
  className,
  ...props
}: DrawCheckboxProps) {
  const [list, setList] = useState<CheckboxItem[]>(items);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = (id: string) => {
    const next = list.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setList(next);
    onChange?.(next);
  };

  return (
    <div
      data-slot="draw-checkbox"
      className={cn("flex flex-col gap-2.5 w-full max-w-sm select-none", className)}
      {...props}
    >
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Security Checklist
        </span>
        <span className="font-mono text-xs font-semibold text-blue-500">
          {list.filter((i) => i.checked).length}/{list.length} Complete
        </span>
      </div>

      {list.map((item) => (
        <motion.button
          key={item.id}
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.012, x: 2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          onClick={() => handleToggle(item.id)}
          className={cn(
            "flex items-center justify-between gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer outline-none",
            item.checked
              ? "bg-blue-500/[0.06] dark:bg-blue-500/10 border-blue-500/30 shadow-xs"
              : "bg-white/60 dark:bg-[#1c1c1e]/70 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
          )}
        >
          <div className="flex flex-col min-w-0">
            <span
              className={cn(
                "text-xs font-bold tracking-tight transition-colors",
                item.checked ? "text-blue-600 dark:text-blue-400" : "text-foreground"
              )}
            >
              {item.label}
            </span>
            {item.description && (
              <span className="text-[11px] text-muted-foreground mt-0.5">{item.description}</span>
            )}
          </div>

          {/* Animated Draw SVG Checkbox */}
          <div className="relative flex size-6 shrink-0 items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={cn(
                "transition-colors duration-200",
                item.checked ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground/40"
              )}
            >
              {/* Outer Box */}
              <motion.rect
                width="18"
                height="18"
                x="3"
                y="3"
                rx="6"
                strokeWidth="2"
                strokeDasharray="100 200"
                initial={false}
                animate={{
                  strokeDashoffset: item.checked ? 0 : 100,
                  fill: item.checked ? "rgba(37, 99, 235, 0.15)" : "rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              {/* Checkmark Path */}
              <motion.path
                d="M8.5 12.5L11 15L16 9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: item.checked ? 1 : 0,
                  opacity: item.checked ? 1 : 0,
                }}
                transition={{
                  duration: 0.28,
                  ease: "easeInOut",
                  delay: item.checked ? 0.1 : 0,
                }}
              />
            </svg>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export default DrawCheckbox;
