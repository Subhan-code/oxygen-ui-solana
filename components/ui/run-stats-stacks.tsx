"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const runs = [
  {
    distance: "10.29 km",
    pace: "5:14 /km",
    time: "53m 49s",
  },
  {
    distance: "12.75 km",
    pace: "5:30 /km",
    time: "01h 10m",
  },
  {
    distance: "8.43 km",
    pace: "5:00 /km",
    time: "42m 15s",
  },
  {
    distance: "15.62 km",
    pace: "5:20 /km",
    time: "01h 23m",
  },
];

const label = {
  distance: "Distance",
  pace: "Pace",
  time: "Time",
};

const CARD_HEIGHT = 70;
const GAP = 8;

export function RunStatsStacks({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex h-[500px] w-full flex-col items-center justify-center overflow-hidden select-none", className)}>
      <div
        className="relative flex h-full w-full flex-col items-center justify-center cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {runs.map((run, i) => {
          return (
            <motion.div
              className="absolute w-[260px] rounded-3xl border border-zinc-200/80 bg-zinc-100/90 px-4 py-3 backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-900/90 shadow-xl"
              key={i}
              animate={isOpen ? "open" : "closed"}
              style={{
                height: CARD_HEIGHT,
              }}
              variants={{
                open: {
                  y: i * (CARD_HEIGHT + GAP),
                  z: 0,
                  top: `20%`,
                },
                closed: {
                  y: i * 10,
                  z: i * 40,
                  top: `45%`,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
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
                        {run[key as keyof typeof run]}
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

export default RunStatsStacks;
