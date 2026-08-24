"use client";

import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Variants, motion } from "motion/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const transition = {
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1] as const,
};

const variants = {
  open: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    height: 112,
  },
  closed: {
    opacity: 0.6,
    scale: 0,
    filter: "blur(2px)",
    height: 0,
  },
} as Variants;

const childVariants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 1, scale: 1 },
};

const LAST_10_GITHUB_FOLLOWERS = [
  "achris2",
  "609529897",
  "AbhirajSinha179",
  "jbreite",
  "rafunderscore",
  "RJohnPaul",
  "DarkInventor",
  "TechSon1c",
  "laoqin2024",
];

export function PopoverSlideSelector({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex h-[180px] w-full flex-col items-center justify-start overflow-hidden p-4 select-none", className)}>
      <div className="flex flex-col items-center justify-start">
        <Popover onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="mb-2 rounded-[4px] bg-zinc-200 px-3 py-1.5 text-sm font-semibold outline-none dark:bg-zinc-800 text-zinc-900 dark:text-white cursor-pointer active:scale-95 transition-transform">
              <span>411</span>
              <span className="ml-1 text-zinc-500 dark:text-zinc-400">
                Followers
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            data-side="bottom"
            side="bottom"
            sideOffset={12}
            forceMount
            className="z-50"
          >
            <motion.div
              className="w-[290px] rounded-xl bg-zinc-100 py-3 dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={variants}
              transition={transition}
              style={{
                transformOrigin: "top",
              }}
            >
              <PopoverArrow className="fill-zinc-100 dark:fill-zinc-900" />
              <div className="mb-2 flex items-center justify-between px-3">
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Last Followers
                </div>
                <PopoverClose asChild>
                  <button type="button" className="cursor-pointer">
                    <Cross1Icon className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                  </button>
                </PopoverClose>
              </div>
              <div className="flex gap-4 overflow-x-auto px-3 pb-1">
                {LAST_10_GITHUB_FOLLOWERS.map((item, index) => {
                  return (
                    <motion.button
                      key={index}
                      type="button"
                      className="group flex flex-col items-center shrink-0 cursor-pointer"
                      variants={childVariants}
                      transition={transition}
                    >
                      <img
                        src={`https://avatars.githubusercontent.com/${item}`}
                        alt={item}
                        className="h-10 w-10 rounded-full transition-transform group-active:scale-95 object-cover"
                      />
                      <span className="w-12 truncate text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">
                        {item}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default PopoverSlideSelector;
