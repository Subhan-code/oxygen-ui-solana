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
    description: "Copy-paste production React components directly into your codebase. Zero lock-in, full code ownership.",
    tags: ["shadcn CLI", "Copy-Paste", "Full Control", "Zero Lock-in"],
    cardBg: "bg-[#EAF4FF] dark:bg-[#0E2038]",
    tagBg: "bg-blue-500/10 text-blue-800 dark:bg-blue-400/15 dark:text-blue-200 border-blue-200/50 dark:border-blue-800/40",
    href: "/docs/installation",
  },
  {
    title: "Motion That Feels Physical",
    description: "Grounded in spring physics, squircles, gesture tracking, and 60 FPS composite animations.",
    tags: ["Spring Physics", "Framer Motion", "Squircles", "60 FPS"],
    cardBg: "bg-[#F1EAFF] dark:bg-[#1E1438]",
    tagBg: "bg-purple-500/10 text-purple-800 dark:bg-purple-400/15 dark:text-purple-200 border-purple-200/50 dark:border-purple-800/40",
    href: "/components",
  },
  {
    title: "Primitives Built for Solana",
    description: "Wallet surfaces, swap terminals, order books, QR codes, and transaction feedback ready for Web3 dApps.",
    tags: ["56 Components", "Solana dApps", "Wallet Cards", "Swap Terminals"],
    cardBg: "bg-[#E9FBF3] dark:bg-[#0C2A1E]",
    tagBg: "bg-emerald-500/10 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200 border-emerald-200/50 dark:border-emerald-800/40",
    href: "/sol-components",
  },
];

export default function FeatureCardsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-6 dark:border-white/10">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
              Core Pillars
            </span>
            <h2 className="mt-2 max-w-2xl font-runde text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl md:text-4xl">
              Source you own, motion that feels physical, primitives built for Solana
            </h2>
          </div>
          <span className="font-mono text-xs font-semibold text-zinc-400 select-none">
            OXYGEN UI
          </span>
        </header>

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
              >
                <motion.div
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  transition={SPRING_PRESS}
                  className="flex flex-col justify-between rounded-[32px] border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-900/90 p-3 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl cursor-pointer h-full"
                  style={{ cornerShape: "squircle" } as React.CSSProperties}
                >
                  <div
                    className={cn(
                      "flex flex-col justify-between rounded-[24px] p-6 space-y-6 min-h-[260px] transition-colors duration-300",
                      feature.cardBg
                    )}
                  >
                    <div className="space-y-2.5">
                      <h3 className="font-runde text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "rounded-xl px-3 py-1.5 text-xs font-semibold border backdrop-blur-md transition-colors",
                            feature.tagBg
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 pt-4">
                    <span className="font-runde text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                      Explore
                    </span>
                    <div className="size-9 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-colors duration-200 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
