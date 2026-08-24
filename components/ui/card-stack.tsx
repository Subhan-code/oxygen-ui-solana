"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Shield, Key, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: number;
  title: string;
  badge: string;
  description: string;
  accent: string;
  icon: React.ElementType;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    title: "Solana Breakpoint 2026 VIP Pass",
    badge: "EVENT TICKET",
    description: "All-access developer pass for Solana Breakpoint in Dubai with exclusive workshop entries.",
    accent: "from-purple-600 to-indigo-600",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Jupiter Pro Trader Pass",
    badge: "MEV REBATE",
    description: "Zero slippage fees and priority transaction routing across all Solana liquidity pools.",
    accent: "from-emerald-600 to-teal-600",
    icon: Shield,
  },
  {
    id: 3,
    title: "Phantom Hardware Key",
    badge: "SECURITY",
    description: "Ed25519 hardware key authentication for multi-sig vault approvals and staking.",
    accent: "from-amber-600 to-orange-600",
    icon: Key,
  },
  {
    id: 4,
    title: "Superteam Ecosystem Leader",
    badge: "BADGE",
    description: "Top 1% builder badge granted for outstanding contributions to Solana core tools.",
    accent: "from-blue-600 to-cyan-600",
    icon: Award,
  },
];

export function CardStack({ className }: { className?: string }) {
  const [cards, setCards] = useState<CardItem[]>(DEFAULT_CARDS);

  const swap = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  return (
    <div
      data-slot="card-stack"
      className={cn("relative h-60 w-full max-w-sm flex items-center justify-center select-none", className)}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            onClick={swap}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -10,
              scale: 1 - index * 0.05,
              zIndex: cards.length - index,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
              "absolute h-52 w-80 rounded-3xl p-5 shadow-xl border cursor-pointer border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between"
            )}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {card.badge}
                </span>
                <Icon className="h-4 w-4 text-zinc-400" />
              </div>
              <h4 className="mt-3 text-base font-bold text-zinc-900 dark:text-white leading-tight">
                {card.title}
              </h4>
              <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {card.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900 text-[10px] font-mono text-zinc-400">
              <span>Click to stack next</span>
              <span>SOLANA WEB3</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default CardStack;
