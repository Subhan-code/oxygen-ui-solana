"use client";

import React, { useState, memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentItem } from "@/lib/components";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";
import PreviewVideo from "./PreviewVideo";
import LiveComponentPreview from "./LiveComponentPreview";

export const ComponentCard = memo(function ComponentCard({
  item,
  large = false,
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

  return (
    <motion.div
      onClick={(e) => {
        if (e.defaultPrevented) return;
        window.open(item.href, "_blank", "noopener,noreferrer");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(item.href, "_blank", "noopener,noreferrer");
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`View ${item.name} component`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={SPRING_PRESS}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-[22px] p-3 h-[265px]",
        "bg-zinc-100/70 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900/90",
        "border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg",
        "will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 select-none",
        large && "lg:h-full",
        className
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      {/* Live Preview Container */}
      <div
        className="lift-on-hover relative w-full flex-1 overflow-hidden rounded-[16px] border border-black/5 dark:border-white/5 bg-background"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
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

      {/* Card Footer Info */}
      <div className="flex items-center justify-between gap-2 px-1.5 pt-2.5">
        <div className="flex items-center gap-2 truncate min-w-0">
          <p className="font-semibold text-xs sm:text-sm text-foreground truncate group-hover:text-[#0066FF] dark:group-hover:text-[#0A84FF] motion-safe:transition-colors motion-safe:duration-200">
            {item.name}
          </p>
        </div>
        <div className="relative flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md px-1">
          {/* resting: subtle ring */}
          <span className="absolute inset-0 rounded-md border border-black/10 dark:border-white/10 opacity-100 motion-safe:transition-all motion-safe:duration-200 group-hover:opacity-0" />
          {/* hover: filled chip */}
          <span className="absolute inset-0 rounded-md bg-zinc-900 dark:bg-white opacity-0 motion-safe:transition-all motion-safe:duration-200 group-hover:opacity-100" />
          <span className="relative z-10 font-mono text-[10px] font-bold leading-none text-zinc-400 dark:text-zinc-500 motion-safe:transition-colors motion-safe:duration-200 group-hover:text-white dark:group-hover:text-zinc-900">
            {item.id}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default ComponentCard;
