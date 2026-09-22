"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export default function ProjectIntroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
            Open Source Architecture
          </span>

          <h2 className="font-runde text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-5xl md:leading-[1.15] dark:text-white">
            The design system engineered exclusively for the Solana ecosystem.
          </h2>

          <p className="max-w-2xl text-base font-medium text-zinc-600 sm:text-lg sm:leading-relaxed md:text-xl dark:text-zinc-400">
            Production-grade React primitives you fully own: wallet surfaces, swap terminals, dynamic charts, and physical spring motion for modern dApps.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
