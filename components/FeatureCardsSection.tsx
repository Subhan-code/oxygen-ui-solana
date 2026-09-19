"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { SPRING_PRESS } from "@/lib/ease";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Source You Own",
    description: "Copy-paste React primitives directly into your codebase. Zero third-party lock-in, full code ownership.",
    cardBg: "bg-[#EAF4FF] dark:bg-[#0E2038]",
    action: "Explore Docs",
    href: "/docs/installation",
  },
  {
    title: "Motion That Feels Physical",
    description: "Engineered with Framer Motion, spring physics, dynamic squircles, and 60 FPS GPU composite performance.",
    cardBg: "bg-[#F1EAFF] dark:bg-[#1E1438]",
    action: "Browse Motion",
    href: "/components",
  },
  {
    title: "Primitives Built for Solana",
    description: "Tailored for Web3 dApps: wallet surfaces, swap terminals, order books, QR codes, and transaction feeds.",
    cardBg: "bg-[#E9FBF3] dark:bg-[#0C2A1E]",
    action: "Components",
    href: "/components",
  },
];

export default function FeatureCardsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-4 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-4 dark:border-white/10">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
              Core Pillars
            </span>
            <h2 className="mt-1.5 max-w-2xl font-runde text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl md:text-3xl">
              Source you own, motion that feels physical, primitives built for Solana
            </h2>
          </div>
          <span className="font-mono text-[11px] font-semibold text-zinc-400 select-none">
            OXYGEN UI
          </span>
        </header>

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[26px]"
              >
                <motion.div
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  transition={SPRING_PRESS}
                  className="flex flex-col justify-between min-h-[190px] sm:min-h-[205px] rounded-[28px] border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-900/90 p-3 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg cursor-pointer w-full"
                  style={{ cornerShape: "squircle" } as React.CSSProperties}
                >
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between rounded-[22px] p-5 space-y-2 transition-colors duration-300",
                      feature.cardBg
                    )}
                  >
                    <div className="space-y-1.5">
                      <h3 className="font-runde text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3.5 py-2.5 pt-3">
                    <span className="font-runde text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                      {feature.action}
                    </span>
                    <div className="size-8.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-colors duration-200 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
