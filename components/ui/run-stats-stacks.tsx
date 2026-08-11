"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const runs = [
  {
    distance: 10.29,
    pace: "5:14 /km",
    time: "53m 49s",
  },
  {
    distance: 12.75,
    pace: "5:30 /km",
    time: "01h 10m",
  },
  {
    distance: 8.43,
    pace: "5:00 /km",
    time: "42m 15s",
  },
  {
    distance: 15.62,
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

export default function RunStatsStacks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="relative flex h-full w-full flex-col items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        {runs.map((run, i) => {
          return (
            <motion.div
              className="absolute w-[250px] rounded-3xl border-t border-neutral-50 bg-neutral-200 bg-opacity-80 px-3 py-3 backdrop-blur-2xl dark:border-neutral-50/20 dark:bg-neutral-800"
              key={i}
              animate={isOpen ? "open" : "closed"}
              style={{
                height: CARD_HEIGHT,
              }}
              variants={{
                open: {
                  y: i * (CARD_HEIGHT + GAP),
                  z: 0,
                  // add movement
                  top: `16%`,
                },
                closed: {
                  y: i * 10,
                  z: i * 40,
                  top: `50%`,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <div className="flex justify-between text-[15px]">
                {Object.keys(label).map((key) => {
                  return (
                    <div
                      className="pointer-events-none flex flex-col"
                      key={key}
                    >
                      <span className="text-neutral-950/50 dark:text-neutral-50/50">
                        {label[key as keyof typeof label]}
                      </span>
                      <span className="text-neutral-950 dark:text-neutral-50">
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
