"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HeroTextTransitionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  sub?: string;
  children?: React.ReactNode;
  stiffness?: number;
  damping?: number;
  stepDelay?: number;
  yOffset?: number;
  blurAmount?: number;
  headlineClassName?: string;
  subClassName?: string;
}

export function HeroTextTransition({
  headline,
  sub,
  children,
  stiffness = 300,
  damping = 22,
  stepDelay = 0.09,
  yOffset = 18,
  blurAmount = 4,
  className,
  headlineClassName,
  subClassName,
  ...props
}: HeroTextTransitionProps) {
  const reduceMotion = useReducedMotion();

  const spring = { type: "spring", stiffness, damping } as const;

  const riseVariants = {
    hidden: { y: yOffset, filter: `blur(${blurAmount}px)`, opacity: 0 },
    shown: { y: 0, filter: "blur(0px)", opacity: 1 },
  };

  const getTransition = (index: number) =>
    reduceMotion ? { duration: 0 } : { ...spring, delay: index * stepDelay };

  return (
    <div
      data-slot="hero-text-transition"
      className={cn(
        "flex flex-col items-center justify-center text-center gap-4",
        className
      )}
      {...props}
    >
      <motion.h1
        initial={reduceMotion ? false : riseVariants.hidden}
        animate={riseVariants.shown}
        transition={getTransition(0)}
        className={cn(
          "max-w-4xl text-balance font-runde text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl",
          headlineClassName
        )}
      >
        {headline}
      </motion.h1>

      {sub && (
        <motion.p
          initial={reduceMotion ? false : riseVariants.hidden}
          animate={riseVariants.shown}
          transition={getTransition(1)}
          className={cn(
            "max-w-xl text-balance font-medium text-muted-foreground sm:text-lg",
            subClassName
          )}
        >
          {sub}
        </motion.p>
      )}

      {children && (
        <motion.div
          initial={reduceMotion ? false : riseVariants.hidden}
          animate={riseVariants.shown}
          transition={getTransition(2)}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
