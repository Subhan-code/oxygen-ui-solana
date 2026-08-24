"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
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

export function AnimatedTabs({
  tabs = DEFAULT_TABS,
  defaultTab = "tokens",
  onTabChange,
  className,
  ...props
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  return (
    <div
      data-slot="animated-tabs"
      className={cn(
        "relative flex items-center gap-1 rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 select-none",
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
            onClick={() => handleSelect(tab.id)}
            className={cn(
              "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors duration-200 cursor-pointer active:scale-95",
              isActive
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-white shadow-xs dark:bg-zinc-800"
              />
            )}
            {Icon && <Icon className="relative z-10 h-3.5 w-3.5" />}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default AnimatedTabs;
