"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { SPRING_PRESS } from "@/lib/ease";
import ScrollReveal from "./ScrollReveal";

const PILLARS = [
  {
    kicker: "01  CLI",
    title: "The source is yours",
    caption: "Copy the file",
    badge: "shadcn CLI",
    image: "/assets/card-arch.jpg",
    href: "/docs/installation",
  },
  {
    kicker: "02  CRAFT",
    title: "Geometry that feels physical",
    caption: "Squircles, springs",
    badge: "60 FPS Motion",
    image: "/assets/card-craft.jpg",
    href: "/components",
  },
  {
    kicker: "03  SOLANA",
    title: "Primitives, not wrappers",
    caption: "180+ components",
    badge: "Solana Native",
    image: "/assets/card-speed.jpg",
    href: "/components",
  },
];

export default function FeatureCardsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between border-b border-black/[0.08] pb-4 dark:border-white/10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0071E3]/20 bg-[#0071E3]/10 px-3.5 py-1 text-xs font-semibold text-[#0071E3] dark:text-[#0A84FF]">
              Why it exists
            </span>
            <h2 className="mt-2.5 max-w-lg font-runde text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Source you own, motion that feels physical, primitives built for Solana
            </h2>
          </div>
          <span className="hidden font-mono text-xs font-semibold text-slate-500 dark:text-zinc-400 sm:inline-block">
            CRAFT
          </span>
        </div>

        <ScrollReveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className="outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[28px]">
              <motion.div
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#F5F5F7]/80 text-slate-900 shadow-xl backdrop-blur-2xl dark:border-white/12 dark:bg-[#121216]/80 dark:text-white dark:shadow-2xl cursor-pointer"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <div className="lift-on-hover relative h-[190px] w-full overflow-hidden bg-[#003ED0] sm:h-[210px]">
                  <img
                    src={pillar.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-mono font-semibold text-white backdrop-blur-md">
                    {pillar.badge}
                  </div>
                </div>

                <div className="flex min-h-[148px] flex-col justify-between p-5">
                  <div>
                    <p className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
                      {pillar.kicker}
                    </p>
                    <h3 className="mt-1.5 font-runde text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-xl">
                      {pillar.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-3 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <img
                        src="/logos/Oxygenui.svg"
                        alt=""
                        className="h-4.5 w-4.5 drop-shadow-xs"
                      />
                      <span className="font-runde text-xs font-bold tracking-tight text-slate-900 dark:text-white">
                        Oxygen-UI
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                      {pillar.caption}
                    </span>
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
