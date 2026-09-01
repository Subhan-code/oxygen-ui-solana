"use client";

import * as React from "react";
import type { Transition, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type MotionElement =
  | typeof motion.p
  | typeof motion.span
  | typeof motion.code
  | typeof motion.h1
  | typeof motion.h2
  | typeof motion.h3;

export type BlurShimmerTextProps = {
  as?: MotionElement;
  className?: string;
  interval?: number;
  blur?: number;
  transition?: Transition;
  variants?: Variants;
  texts: string[];
  mode?: "char" | "word";
};

export function BlurShimmerText({
  as = motion.span,
  className,
  interval = 3.5,
  blur = 6,
  transition = { duration: 0.5 },
  variants,
  texts,
  mode = "word",
}: BlurShimmerTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const Component = (as || motion.span) as typeof motion.span;

  const resolvedVariants: Variants = variants ?? {
    initial: { filter: `blur(${blur}px)`, opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: `blur(${blur}px)`, opacity: 0 },
  };

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;

    const timeout = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval * 1000);

    return () => clearInterval(timeout);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  const duration = (transition.duration as number) || 0.6;
  const currentText = texts[currentIndex];
  const items = mode === "word" ? currentText.split(" ") : currentText.split("");

  return (
    <span className={cn("grid w-full items-center justify-center text-center", className)}>
      {texts.map((text, index) => (
        <span
          key={index}
          className="invisible col-start-1 row-start-1 block w-full text-center leading-relaxed"
          aria-hidden="true"
        >
          {text}
        </span>
      ))}
      <AnimatePresence mode="wait">
        <Component
          key={currentIndex}
          className="col-start-1 row-start-1 block w-full text-center leading-relaxed"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {items.map((item, i) => {
            const staggerDelay = (i * duration) / items.length;
            const displayItem =
              mode === "word" ? (i < items.length - 1 ? `${item} ` : item) : item;

            return (
              <motion.span
                key={i}
                variants={resolvedVariants}
                transition={{
                  ...transition,
                  delay: staggerDelay,
                }}
                className="inline-block whitespace-pre"
              >
                {displayItem}
              </motion.span>
            );
          })}
        </Component>
      </AnimatePresence>
    </span>
  );
}

export default BlurShimmerText;
