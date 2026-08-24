"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, Repeat, Video, Navigation, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EventTag {
  id: string;
  label: string;
  icon: React.ReactNode;
  colorPreset: "blue" | "orange" | "green" | "sky" | "rose" | "purple";
}

export interface EventTagPillsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  tags?: EventTag[];
  onTagClick?: (tag: EventTag) => void;
}

const DEFAULT_TAGS: EventTag[] = [
  {
    id: "date",
    label: "March 09 — 16",
    icon: <Calendar className="h-4 w-4" />,
    colorPreset: "blue",
  },
  {
    id: "repeat",
    label: "Weekly",
    icon: <Repeat className="h-4 w-4" />,
    colorPreset: "orange",
  },
  {
    id: "platform",
    label: "Zoom",
    icon: <Video className="h-4 w-4" />,
    colorPreset: "green",
  },
  {
    id: "location",
    label: "Herengracht 133, Amst...",
    icon: <Navigation className="h-4 w-4 fill-current" />,
    colorPreset: "sky",
  },
  {
    id: "participants",
    label: "Participants",
    icon: <User className="h-4 w-4 fill-current" />,
    colorPreset: "rose",
  },
  {
    id: "time",
    label: "12:00 — 13:00",
    icon: <Clock className="h-4 w-4 fill-current" />,
    colorPreset: "purple",
  },
];

const COLOR_STYLES = {
  blue: "bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 hover:bg-sky-200/80 dark:hover:bg-sky-900/80",
  orange: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 hover:bg-amber-200/80 dark:hover:bg-amber-900/80",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80",
  sky: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 hover:bg-blue-200/80 dark:hover:bg-blue-900/80",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 hover:bg-rose-200/80 dark:hover:bg-rose-900/80",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 hover:bg-purple-200/80 dark:hover:bg-purple-900/80",
};

export function EventTagPills({
  tags = DEFAULT_TAGS,
  onTagClick,
  className,
  ...props
}: EventTagPillsProps) {
  const reduceMotion = useReducedMotion();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleClick = (tag: EventTag) => {
    setSelectedTag(tag.id);
    onTagClick?.(tag);
  };

  return (
    <div
      data-slot="event-tag-pills"
      className={cn("flex flex-wrap items-center justify-center gap-3 p-4 select-none max-w-md mx-auto", className)}
      {...props}
    >
      {tags.map((tag) => {
        const isSelected = selectedTag === tag.id;

        return (
          <motion.button
            key={tag.id}
            type="button"
            onClick={() => handleClick(tag)}
            whileHover={reduceMotion ? {} : { scale: 1.04 }}
            whileTap={reduceMotion ? {} : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs border border-transparent",
              COLOR_STYLES[tag.colorPreset],
              isSelected && "ring-2 ring-current ring-offset-2 dark:ring-offset-zinc-950"
            )}
          >
            <span className="shrink-0">{tag.icon}</span>
            <span className="truncate tracking-tight">{tag.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default EventTagPills;
