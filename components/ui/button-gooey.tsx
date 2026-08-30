"use client";

import React, { useId, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SPRING_PRESS = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.6,
};

export interface ButtonGooeyProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  children?: React.ReactNode;
}

export const ButtonGooey = ({
  children = "Hover me",
  className,
  ...props
}: ButtonGooeyProps) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, "");
  const filterId = `gooey-filter-${uid}`;

  return (
    <div
      data-slot="button-gooey-container"
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        className,
      )}
    >
      <div
        className="inline-flex items-center justify-center"
        style={reduceMotion ? undefined : { filter: `url(#${filterId})` }}
      >
        <motion.button
          type="button"
          data-slot="button-gooey"
          {...props}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          transition={SPRING_PRESS}
          className={cn(
            "relative inline-flex h-16 items-center rounded-2xl border-none bg-black px-6 text-xl font-bold leading-5 text-neutral-200 cursor-pointer outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#0066FF]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "dark:bg-white dark:text-zinc-950",
          )}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {children}
            {reduceMotion && (
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: hovered ? "210%" : "80%" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="absolute top-0 right-0 z-[-10] flex size-16 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-zinc-950"
              style={{ transformOrigin: "right center" }}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </motion.span>
          )}
        </motion.button>
      </div>

      <svg
        className="absolute h-0 w-0"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default ButtonGooey;
