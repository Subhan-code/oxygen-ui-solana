"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const batches = [
  {
    volume: "$10,290",
    fee: "0.00005 SOL",
    status: "Confirmed",
  },
  {
    volume: "$12,750",
    fee: "0.00005 SOL",
    status: "Confirmed",
  },
  {
    volume: "$8,430",
    fee: "0.00005 SOL",
    status: "Finalized",
  },
  {
    volume: "$15,620",
    fee: "0.00005 SOL",
    status: "Confirmed",
  },
];

const label = {
  volume: "Volume",
  fee: "Priority Fee",
  status: "Status",
};

const CARD_HEIGHT = 70;
const GAP = 8;

export function RunStatsStacks({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative flex h-[340px] w-full flex-col items-center justify-center select-none font-runde", className)}>
      <div
        className="relative flex h-full w-full items-center justify-center cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {batches.map((batch, i) => {
          return (
            <motion.div
              className="absolute w-[280px] rounded-3xl border border-zinc-200/80 bg-zinc-100/90 px-4 py-3 backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-900/90 shadow-xl"
              key={i}
              animate={isOpen ? "open" : "closed"}
              style={{
                height: CARD_HEIGHT,
              }}
              variants={{
                open: {
                  y: (i - 1.5) * (CARD_HEIGHT + GAP),
                  z: 0,
                  opacity: 1,
                },
                closed: {
                  y: (i - 1.5) * 10,
                  z: i * 35,
                  opacity: 1,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
              }}
            >
              <div className="flex justify-between text-[13px] items-center h-full">
                {Object.keys(label).map((key) => {
                  return (
                    <div
                      className="pointer-events-none flex flex-col"
                      key={key}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {label[key as keyof typeof label]}
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-white mt-0.5">
                        {batch[key as keyof typeof batch]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export const SolanaBatchStacks = RunStatsStacks;
export default RunStatsStacks;
