"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowUpRight, Coins, ShieldCheck, Wallet, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
}

const COMMANDS: CommandItem[] = [
  { id: "swap", label: "Swap SOL for USDC on Jupiter", category: "Actions", icon: RefreshCw },
  { id: "stake", label: "Stake SOL for 7.85% APY rewards", category: "Actions", icon: Coins },
  { id: "send", label: "Send Solana tokens to address", category: "Actions", icon: ArrowUpRight },
  { id: "wallet", label: "Connect Phantom / Backpack Wallet", category: "Wallet", icon: Wallet },
  { id: "mev", label: "Enable Jito MEV protection", category: "Security", icon: ShieldCheck },
];

export function CommandPalette({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("swap");

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      data-slot="command-palette"
      className={cn(
        "w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 font-sans select-none",
        className
      )}
    >
      <div className="relative flex items-center px-3 py-2 border-b border-zinc-100 dark:border-zinc-900">
        <Search className="h-4 w-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Solana commands..."
          className="w-full bg-transparent px-3 text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
        />
        <span className="rounded-lg bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
          ⌘K
        </span>
      </div>

      <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {filtered.map((cmd) => {
            const Icon = cmd.icon;
            const isSelected = selectedId === cmd.id;

            return (
              <motion.div
                key={cmd.id}
                onClick={() => setSelectedId(cmd.id)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors",
                  isSelected
                    ? "bg-purple-600 text-white"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{cmd.label}</span>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    isSelected ? "text-purple-200" : "text-zinc-400"
                  )}
                >
                  {cmd.category}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CommandPalette;
