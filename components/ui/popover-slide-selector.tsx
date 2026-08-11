"use client";

import { Cross1Icon } from '@radix-ui/react-icons';
import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
} from '@radix-ui/react-popover';

const transition = {
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1] as const,
};

const variants = {
  open: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    height: 112,
  },
  closed: {
    opacity: 0.6,
    scale: 0,
    filter: 'blur(2px)',
    height: 0,
  },
} as Variants;

const childVariants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 1, scale: 1 },
};

const LAST_10_GITHUB_FOLLOWERS = [
  'achris2',
  '609529897',
  'AbhirajSinha179',
  'jbreite',
  'rafunderscore',
  'RJohnPaul',
  'DarkInventor',
  'TechSon1c',
  'laoqin2024',
];

export function PopoverSlideSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[180px] w-full flex-col items-center justify-start overflow-hidden p-4">
      <div className="flex flex-col items-center justify-start">
        <Popover onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="mb-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white shadow-xs dark:bg-white dark:text-zinc-900">
              <span>411</span>
              <span className="ml-1 opacity-80">Followers</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            data-side="bottom"
            side="bottom"
            sideOffset={12}
            forceMount
          >
            <motion.div
              className="data-[state=closed]:animate-hide w-[290px] rounded-xl bg-zinc-900 py-3 text-white shadow-xl dark:bg-white dark:text-zinc-900"
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              transition={transition}
              style={{
                transformOrigin: 'top',
              }}
            >
              <PopoverArrow className="fill-zinc-900 dark:fill-white" />
              <div className="mb-2 flex items-center justify-between px-3">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-75">
                  Last Followers
                </div>
                <PopoverClose asChild>
                  <button type="button" aria-label="Close popover">
                    <Cross1Icon className="h-3.5 w-3.5 opacity-80 hover:opacity-100" />
                  </button>
                </PopoverClose>
              </div>
              <div className="flex gap-4 overflow-x-auto px-3 pb-1">
                {LAST_10_GITHUB_FOLLOWERS.map((item, index) => {
                  return (
                    <motion.button
                      key={index}
                      className="group flex flex-col items-center"
                      variants={childVariants}
                      transition={transition}
                    >
                      <img
                        src={`https://avatars.githubusercontent.com/${item}`}
                        className="h-10 w-10 rounded-full transition-transform group-active:scale-95"
                        alt={item}
                      />
                      <span className="mt-1 w-12 truncate text-[11px] opacity-75 group-hover:opacity-100">
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
