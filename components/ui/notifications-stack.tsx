"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Bell, MessageSquare, ShieldAlert, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Security Alert",
    body: "New login detected from Safari on macOS (San Francisco, US)",
    time: "2m ago",
    icon: ShieldAlert,
    color: "bg-rose-500",
  },
  {
    id: "2",
    title: "Alex Morgan",
    body: "Hey! Can you review the latest Figma components library pull request?",
    time: "15m ago",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    id: "3",
    title: "Apple Intelligence",
    body: "Your weekly productivity summary is ready to review with 12 highlights",
    time: "1h ago",
    icon: Sparkles,
    color: "bg-purple-500",
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

export function NotificationsStack({
  items = DEFAULT_NOTIFICATIONS,
  className,
}: {
  items?: NotificationItem[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsList] = useState(items);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      data-slot="notifications-stack"
      className={cn("flex flex-col items-center w-full max-w-sm mx-auto select-none", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            Notifications ({notificationsList.length})
          </span>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>{isOpen ? "Stack" : "Expand"}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springTransition}>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </button>
      </div>

      {/* Stack Container */}
      <div
        onClick={toggle}
        className={cn(
          "relative w-full cursor-pointer transition-all duration-300",
          isOpen ? "flex flex-col gap-2.5" : "h-24"
        )}
      >
        <AnimatePresence>
          {notificationsList.map((item, index) => {
            const Icon = item.icon;
            const position = index;

            const collapsedY = position * 8;
            const collapsedScale = 1 - position * 0.05;
            const collapsedOpacity = 1 - position * 0.15;
            const zIndex = notificationsList.length - position;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{
                  opacity: isOpen ? 1 : collapsedOpacity,
                  y: isOpen ? 0 : collapsedY,
                  scale: isOpen ? 1 : collapsedScale,
                  zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                transition={springTransition}
                style={{
                  position: isOpen ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
                className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-md backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-xs",
                      item.color
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-neutral-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
