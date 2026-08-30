"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_UI } from "@/lib/ease";
import { cn } from "@/lib/utils";

const spring = SPRING_UI;

const STEP = 0.05;

const rise = {
  hidden: { y: 14, opacity: 0, scale: 0.97, filter: "blur(2px)" },
  shown: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
};

const riseReduced = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

export default function HeroIntro({
  headline,
  sub,
  children,
}: {
  headline?: string;
  sub: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  const hidden = reduceMotion ? riseReduced.hidden : rise.hidden;
  const shown = reduceMotion ? riseReduced.shown : rise.shown;
  const step = (index: number) =>
    reduceMotion
      ? { duration: 0.2, ease: [0.19, 1, 0.22, 1] as const }
      : { ...spring, delay: index * STEP };

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <motion.h1
        initial={hidden}
        animate={shown}
        transition={step(0)}
        className="max-w-3xl text-balance font-runde text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-[3.5rem] md:leading-[1.08] lg:text-[4rem]"
      >
        Craft premium <span className="text-[#0066FF] dark:text-[#0A84FF]">Solana frontends</span> in minutes.
      </motion.h1>

      <motion.p
        initial={hidden}
        animate={shown}
        transition={step(1)}
        className="mt-4 max-w-xl text-pretty font-medium text-black/65 dark:text-white/70 sm:text-lg md:text-xl leading-relaxed"
      >
        {sub}
      </motion.p>

      <motion.div
        initial={hidden}
        animate={shown}
        transition={step(2)}
        className="w-full flex justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
