"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { getSolComponents } from "@/lib/sol-components";
import ScrollReveal from "./ScrollReveal";

export default function ComponentsShowcase() {
  const reduceMotion = useReducedMotion();
  const allSolItems = getSolComponents();

  const nftItem =
    allSolItems.find((c) => c.slug === "solananftcard") ||
    allSolItems[0];

  const balanceItem =
    allSolItems.find((c) => c.slug === "balancedisplay") ||
    allSolItems[1];

  const stepItem =
    allSolItems.find((c) => c.slug === "steptrackerwidget") ||
    allSolItems[2];

  const eventItem =
    allSolItems.find((c) => c.slug === "solanaeventcard") ||
    allSolItems[3];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header section: centered title */}
      <div className="mx-auto flex max-w-2xl flex-col items-center pb-10 text-center">
        <h2 className="font-runde text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          56+ Solana components
        </h2>
        <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:text-base">
          Primitives and widgets for the interfaces dApps actually ship.
        </p>
      </div>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {/* Cell 1: Solana NFT Card (Square) */}
          <Link
            href={nftItem ? nftItem.href : "/components"}
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-full aspect-square"
              style={{ cornerShape: "squircle" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Solana NFT Card
                </h3>
                <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>

              {/* Showcase Image Preview */}
              <div
                className="mt-3 relative w-full flex-1 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <img
                  src="/showcase/solana-nft-card.png"
                  alt="Solana NFT Card"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </Link>

          {/* Cell 2: Balance Display (Square) */}
          <Link
            href={balanceItem ? balanceItem.href : "/components"}
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-full aspect-square"
              style={{ cornerShape: "squircle" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Balance Display
                </h3>
                <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>

              {/* Showcase Image Preview */}
              <div
                className="mt-3 relative w-full flex-1 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <img
                  src="/showcase/balance-display.png"
                  alt="Balance Display"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </Link>

          {/* Cell 3: Solana Event Card (Square) */}
          <Link
            href={eventItem ? eventItem.href : "/components"}
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-full aspect-square"
              style={{ cornerShape: "squircle" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Solana Event Card
                </h3>
                <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>

              {/* Showcase Image Preview */}
              <div
                className="mt-3 relative w-full flex-1 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <img
                  src="/showcase/solana-event-card.png"
                  alt="Solana Event Card"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </Link>

          {/* Cell 4: Step Tracker Widget (Rectangle - 2 columns wide) */}
          <Link
            href={stepItem ? stepItem.href : "/components"}
            className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px] md:col-span-2 lg:col-span-2"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-[210px] sm:h-[220px]"
              style={{ cornerShape: "squircle" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Step Tracker Widget
                </h3>
                <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>

              {/* Showcase Image Preview */}
              <div
                className="mt-3 relative w-full flex-1 min-h-0 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <img
                  src="/showcase/step-tracker-widget.png"
                  alt="Step Tracker Widget"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </Link>

          {/* Cell 5: View all 56 components CTA card */}
          <Link
            href="/components"
            tabIndex={0}
            className="group relative flex h-[210px] sm:h-[220px] flex-col justify-between overflow-hidden rounded-[32px] bg-[#0066FF] p-5 sm:p-6 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out hover:bg-[#0052CC] outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:col-span-2 lg:col-span-1"
            style={{ cornerShape: "squircle" } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 opacity-25 [filter:brightness(0)_invert(1)]"
              src="/logos/Oxygenui.svg"
            />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              className="relative h-8 w-8 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
            <span className="lift-on-hover relative font-runde text-2xl font-bold tracking-tight">
              View all<br />56 components
            </span>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
