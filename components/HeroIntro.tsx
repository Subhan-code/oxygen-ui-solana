"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_UI } from "@/lib/ease";
import BlurShimmerText from "./BlurShimmerText";

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

const SMART_TITLE_PHRASES = [
  "frontends in minutes.",
  "dApps you actually own.",
  "wallets & swap terminals.",
  "trading surfaces at scale.",
  "interfaces at lightspeed.",
  "composite UI blocks.",
  "defi apps with ease.",
];

export default function HeroIntro({
  sub,
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
        className="max-w-4xl font-runde text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.6rem] md:leading-[1.15] lg:text-[4rem] flex flex-col items-center justify-center gap-0.5 sm:gap-1"
      >
        <span className="block">Craft premium Solana</span>
        <span className="block text-white/95">
          <BlurShimmerText
            as={motion.span}
            texts={SMART_TITLE_PHRASES}
            interval={2.8}
            blur={8}
            transition={{ duration: 0.55 }}
          />
        </span>
      </motion.h1>

      <motion.p
        initial={hidden}
        animate={shown}
        transition={step(1)}
        className="mt-4 w-full max-w-xl mx-auto text-center font-medium text-white/80 text-sm sm:text-base leading-relaxed"
      >
        {sub ?? "Open-source React primitives for Solana dApps. Copy-paste components you own, installed directly into your codebase via the shadcn CLI."}
      </motion.p>

      <motion.div
        initial={hidden}
        animate={shown}
        transition={step(2)}
        className="w-full flex justify-center mt-6"
      >
        {children}
      </motion.div>
    </div>
  );
}
