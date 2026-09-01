"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_UI } from "@/lib/ease";

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
  children,
}: {
  headline?: string;
  sub?: string;
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
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
      <motion.h1
        initial={hidden}
        animate={shown}
        transition={step(0)}
        className="max-w-4xl text-balance font-runde text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.6rem] md:leading-[1.12] lg:text-[4rem]"
      >
        Craft premium Solana frontends in minutes.
      </motion.h1>

      <motion.p
        initial={hidden}
        animate={shown}
        transition={step(1)}
        className="mt-5 w-full max-w-2xl sm:max-w-3xl mx-auto text-center font-normal text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed"
      >
        100% free and fully open-source React primitives for Solana dApps. Copy-paste components you own, installed directly into your codebase via the shadcn CLI.
      </motion.p>

      <motion.div
        initial={hidden}
        animate={shown}
        transition={step(2)}
        className="w-full flex justify-center mt-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
