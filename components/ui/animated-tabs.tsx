"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Coins, Image, Lock, Activity, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
}

const DEFAULT_TABS: TabItem[] = [
  { id: "tokens", label: "Tokens", icon: Coins },
  { id: "nfts", label: "NFTs", icon: Image },
  { id: "staking", label: "Staking", icon: Lock },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "vaults", label: "Vaults", icon: Wallet },
];

export interface AnimatedTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: TabItem[];
  defaultTab?: string;
  onTabChange?: (id: string) => void;
}

const springTab = {
  type: "spring" as const,
  stiffness: 480,
  damping: 32,
  mass: 0.65,
};

export const AnimatedTabs = React.forwardRef<HTMLDivElement, AnimatedTabsProps>(
  (
    {
      tabs = DEFAULT_TABS,
      defaultTab = "tokens",
      onTabChange,
      className,
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const shouldReduceMotion = useReducedMotion();

    const handleSelect = (id: string) => {
      setActiveTab(id);
      onTabChange?.(id);
    };

    return (
      <div
        ref={ref}
        role="tablist"
        data-slot="animated-tabs"
        className={cn(
          "relative inline-flex items-center gap-1 rounded-2xl p-1.5 border border-black/10 dark:border-white/10 select-none",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl shadow-xs",
          className
        )}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold tracking-tight transition-colors duration-140 cursor-pointer outline-none active:scale-[0.96]",
                "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="animated-tabs-active-pill"
                  transition={shouldReduceMotion ? { duration: 0 } : springTab}
                  className="absolute inset-0 rounded-xl bg-black/5 dark:bg-white/15 shadow-xs"
                />
              )}
              {Icon && <Icon className="relative z-10 h-3.5 w-3.5 shrink-0" />}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

AnimatedTabs.displayName = "AnimatedTabs";

export default AnimatedTabs;
