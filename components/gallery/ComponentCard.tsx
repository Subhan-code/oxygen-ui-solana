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
          {item.group && (
            <span className="hidden sm:inline-flex items-center rounded-md bg-zinc-200/60 dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400 shrink-0">
              {item.group}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 text-muted-foreground/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#0066FF] dark:group-hover:text-[#0A84FF] motion-safe:transition-[opacity,transform,color] motion-safe:duration-200 will-change-transform"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
});

export default ComponentCard;


