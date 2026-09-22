"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { User, ArrowLeftRight, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { RefObject, useState } from "react";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export function FamilyPopoverMenu({ className }: { className?: string }) {
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
      title: "Account",
      text: "Manage your wallet and profile",
      icon: User,
    },
    {
      title: "Transactions",
      text: "View recent activity and transfers",
      icon: ArrowLeftRight,
    },
    {
      title: "Settings",
      text: "Adjust preferences and security",
      icon: Settings,
    },
  ];

  useClickOutside<HTMLDivElement>(refMenu as RefObject<HTMLDivElement>, () => {
    setOpenMenu(false);
  });

  return (
    <div className={cn("relative mx-6 mb-16 flex h-[300px] w-full max-w-sm items-end justify-start select-none", className)}>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="absolute bottom-0 left-0 flex flex-col items-center overflow-hidden bg-zinc-900 p-1 dark:bg-zinc-100 shadow-2xl rounded-2xl border border-zinc-800"
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
                    className="w-full select-none rounded-b-[4px] rounded-t-[4px] bg-zinc-800 transition-transform first:rounded-t-[12px] last:rounded-b-[12px] active:scale-[0.98] dark:bg-zinc-200 cursor-pointer"
                  >
                    <div className="flex items-center py-3">
                      <div className="px-4">
                        <item.icon className="h-5 w-5 text-white dark:text-zinc-950" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white dark:text-zinc-950">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400 dark:text-zinc-600">
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
        className="absolute bottom-0 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 p-2 text-white outline-none dark:bg-zinc-100 dark:text-zinc-950 cursor-pointer shadow-lg"
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
