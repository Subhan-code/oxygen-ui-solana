"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentItem } from "@/lib/components";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";
import PreviewVideo from "./PreviewVideo";
import LiveComponentPreview from "./LiveComponentPreview";

const MotionLink = motion.create(Link);

export const ComponentCard = memo(function ComponentCard({
  item,
  autoPlay = false,
  className,
}: {
  item: ComponentItem;
  large?: boolean;
  autoPlay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const idDisplay = item.id
    ? item.id.startsWith("#")
      ? item.id
      : `#${item.id.padStart(2, "0")}`
    : "";

  return (
    <MotionLink
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${item.name} component`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseDown={(e) => {
        if (e.button === 1) {
          // middle click: stop propagation so Framer Motion does not intercept, but do not preventDefault
          e.stopPropagation();
        }
      }}
      onAuxClick={(e) => {
        if (e.button === 1) {
          // middle click: let browser natively open link in new tab
          e.stopPropagation();
        }
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={SPRING_PRESS}
      className={cn(
        "group relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-[30px] sm:rounded-[34px] bg-black p-3 sm:p-4 border border-[#18191d] hover:border-neutral-700 shadow-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 select-none",
        className
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      {/* top edge header with title and number revealed on hover */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-5 pt-3 sm:pt-3.5 pointer-events-none opacity-0",
          reduceMotion
            ? "group-hover:opacity-100 group-focus-visible:opacity-100"
            : "-translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300 ease-out"
        )}
      >
        <span className="text-white text-sm sm:text-base font-bold tracking-tight truncate font-runde">
          {item.title || item.name}
        </span>
        <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-400 shrink-0 ml-2.5 tabular-nums">
          {idDisplay}
        </span>
      </div>

      {/* preview body / video card — decreases top size on hover to reveal title and number */}
      <div
        className={cn(
          "relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none rounded-[20px] sm:rounded-[24px]",
          reduceMotion
            ? "group-hover:mt-8 sm:group-hover:mt-9 group-hover:h-[calc(100%-2rem)] sm:group-hover:h-[calc(100%-2.25rem)] group-focus-visible:mt-8 sm:group-focus-visible:mt-9 group-focus-visible:h-[calc(100%-2rem)] sm:group-focus-visible:h-[calc(100%-2.25rem)]"
            : "transition-all duration-300 ease-out group-hover:mt-8 sm:group-hover:mt-9 group-hover:h-[calc(100%-2rem)] sm:group-hover:h-[calc(100%-2.25rem)] group-focus-visible:mt-8 sm:group-focus-visible:mt-9 group-focus-visible:h-[calc(100%-2rem)] sm:group-focus-visible:h-[calc(100%-2.25rem)]"
        )}
      >
        {item.preview ? (
          <PreviewVideo
            src={item.preview}
            playing={active}
            autoPlay={autoPlay}
          />
        ) : (
          <LiveComponentPreview item={item} />
        )}
      </div>
    </MotionLink>
  );
});

export default ComponentCard;
