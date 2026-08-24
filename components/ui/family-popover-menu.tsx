"use client";

import React, { useRef, useState, RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  EnvelopeClosedIcon,
  GearIcon,
  HeartIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export type FamilyPopoverMenuProps = React.HTMLAttributes<HTMLDivElement>;

export function FamilyPopoverMenu({ className, ...props }: FamilyPopoverMenuProps) {
  const refMenu = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");

  const duration = 0.2;
  const transition = { duration, ease: [0.32, 0.72, 0, 1] as const };

  const menuVariants = {
    open: {
      opacity: 1,
      width: isScreenSizeSm ? "100%" : "320px",
      height: 220,
      borderRadius: "16px",
      bottom: -44,
      transition,
    },
    closed: {
      bottom: 0,
      opacity: 1,
      width: "48px",
      height: 48,
      borderRadius: "50%",
      transition,
    },
  };

  const contentVariants = {
    open: { opacity: 1, scale: 1, transition },
    closed: { opacity: 0, scale: 1, transition },
  };

  const buttonVariants = {
    open: {
      opacity: 0,
      transition: {
        duration: duration / 2,
      },
    },
    closed: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
  };

  const items = [
    {
      title: "Settings",
      text: "Adjust your preferences",
      icon: GearIcon,
    },
    {
      title: "Messages",
      text: "View your messages",
      icon: EnvelopeClosedIcon,
    },
    {
      title: "Favorites",
      text: "Manage your favorites",
      icon: HeartIcon,
    },
  ];

  useClickOutside<HTMLDivElement>(refMenu as RefObject<HTMLDivElement>, () => {
    setOpenMenu(false);
  });

  return (
    <div
      data-slot="family-popover-menu"
      className={cn(
        "relative mx-6 mb-16 flex h-[300px] w-full max-w-sm items-end justify-start select-none p-4",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="absolute bottom-0 left-0 flex flex-col items-center overflow-hidden bg-zinc-950 p-1 dark:bg-zinc-900 shadow-2xl rounded-2xl border border-zinc-800"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
            ref={refMenu}
          >
            <motion.ul
              variants={contentVariants}
              className="relative flex w-full flex-col space-y-1"
            >
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className="w-full select-none rounded-b-[4px] rounded-t-[4px] bg-zinc-900/90 transition-transform first:rounded-t-[12px] last:rounded-b-[12px] active:scale-[0.98] dark:bg-zinc-800/90 cursor-pointer"
                  >
                    <div className="flex items-center py-3">
                      <div className="px-4">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className="absolute bottom-0 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 p-2 text-white outline-none dark:bg-white dark:text-zinc-950 cursor-pointer shadow-lg"
        disabled={openMenu}
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(true);
        }}
        variants={buttonVariants}
        initial="closed"
        animate={openMenu ? "open" : "closed"}
        whileTap={{ scale: 0.95 }}
      >
        <PlusIcon className="h-6 w-6" />
      </motion.button>
    </div>
  );
}

export default FamilyPopoverMenu;
