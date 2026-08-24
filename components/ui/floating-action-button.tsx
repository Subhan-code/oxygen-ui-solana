"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FabActionItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  color?: string;
}

export interface FloatingActionButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actions: FabActionItem[];
  icon?: LucideIcon;
  label?: string;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

export function FloatingActionButton({
  actions,
  icon: MainIcon = Plus,
  label = "Quick Actions",
  className,
  ...props
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-slot="floating-action-button"
      className={cn("relative flex flex-col items-end select-none", className)}
      {...props}
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-end gap-3 mb-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: (actions.length - 1 - index) * 0.05,
                      ...springTransition,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                    transition: {
                      delay: index * 0.03,
                      duration: 0.15,
                    },
                  }}
                  className="flex items-center gap-3 group"
                >
                  <span className="rounded-lg bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white shadow-md dark:bg-neutral-100 dark:text-neutral-900 opacity-90 transition-opacity group-hover:opacity-100 whitespace-nowrap">
                    {action.label}
                  </span>
                  <motion.button
                    type="button"
                    onClick={() => {
                      action.onClick?.();
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg cursor-pointer transition-colors",
                      action.color || "bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        type="button"
        aria-label={label}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={springTransition}
        >
          <MainIcon className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
