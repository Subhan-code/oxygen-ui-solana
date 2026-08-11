"use client";

import {
  EnvelopeClosedIcon,
  GearIcon,
  HeartIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { RefObject, useState } from "react";
import useClickOutside from "hooks/useClickOutside";
import { useMediaQuery } from "hooks/useMediaQuery";

export default function FamilyPopoverMenu() {
  const refMenu = React.useRef<HTMLDivElement>(null);
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
      bottom: -10,
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
    closed: { opacity: 0, scale: 0.95, transition },
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
    <div className="relative flex h-[320px] w-full items-center justify-center p-4">
      <div className="relative flex h-full w-full max-w-[340px] items-end justify-center">
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className="absolute bottom-0 flex flex-col items-center overflow-hidden border border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl dark:border-zinc-200 dark:bg-white"
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
                  return (
                    <li
                      key={index}
                      className="w-full select-none rounded-[10px] bg-zinc-800/80 px-3 py-2.5 transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:hover:bg-zinc-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-500 dark:bg-blue-500/15 dark:text-blue-600">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white dark:text-zinc-900">
                            {item.title}
                          </h3>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500">
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
          className="absolute bottom-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 outline-hidden hover:bg-blue-500 dark:bg-blue-600 dark:text-white"
          disabled={openMenu}
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(true);
          }}
          variants={buttonVariants}
          initial="closed"
          animate={openMenu ? "open" : "closed"}
          whileTap={{ scale: 0.95 }}
          aria-label="Open family menu"
        >
          <PlusIcon className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
}
