"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Layers, ShieldCheck, Zap, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlidingNavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultTab?: string;
}

const TABS = [
  { id: "products", label: "Products", icon: Layers },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "developers", label: "Developers", icon: Zap },
  { id: "ecosystem", label: "Ecosystem", icon: Sparkles },
];

const springBackdrop = {
  type: "spring" as const,
  stiffness: 500,
  damping: 32,
  mass: 0.6,
};

export function SlidingNavMenu({ defaultTab = "products", className, ...props }: SlidingNavMenuProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      data-slot="sliding-nav-menu"
      className={cn("flex flex-col items-center justify-center gap-6 w-full max-w-lg select-none", className)}
      {...props}
    >
      {/* Sliding Backdrop Navigation Pill Bar */}
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center gap-1 rounded-full border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 p-1.5 shadow-xl backdrop-blur-2xl"
      >
        {TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors duration-150 cursor-pointer outline-none",
                isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="sliding-nav-backdrop"
                  transition={springBackdrop}
                  className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/15 shadow-xs"
                />
              )}
              <Icon className="relative z-10 size-4 text-blue-500" />
              <span className="relative z-10">{tab.label}</span>
              <ChevronDown className="relative z-10 size-3 text-muted-foreground/60" />
            </button>
          );
        })}
      </nav>

      {/* Active Tab Sub-Card Container */}
      <div className="relative w-full rounded-3xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-[#1c1c1e]/90 p-6 shadow-2xl backdrop-blur-2xl min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                {activeTab} Overview
              </span>
            </div>

            {activeTab === "products" && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-bold text-foreground">Jupiter Swaps</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Zero-slippage SPL routing</p>
                </div>
                <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-bold text-foreground">JLP Vaults</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Automated APR yield pools</p>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">MEV Protected Validator Relay</span>
                <p className="text-muted-foreground mt-1">Direct private RPC execution preventing frontrunning.</p>
              </div>
            )}

            {activeTab === "developers" && (
              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 font-mono text-xs">
                <span className="text-blue-500 font-bold">npx shadcn add https://oxygenui.com/r/sliding-nav-menu</span>
              </div>
            )}

            {activeTab === "ecosystem" && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs">
                <span className="font-bold text-foreground">175+ Production Primitives</span>
                <span className="font-mono text-blue-500 font-bold">v15.5</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SlidingNavMenu;
