"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { getSolComponents } from "@/lib/sol-components";
import ScrollReveal from "./ScrollReveal";

function ShowcaseCard({
  href,
  title,
  imageSrc,
  imageAlt,
  className,
  reduceMotion,
}: {
  href: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  reduceMotion: boolean | null;
}) {
  return (
    <Link
      href={href}
      className={`group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px] ${className ?? ""}`}
    >
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-full aspect-square"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h3>
          <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
        <div
          className="mt-3 relative w-full flex-1 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </Link>
  );
}

export default function ComponentsShowcase() {
  const reduceMotion = useReducedMotion();
  const allSolItems = getSolComponents();

  const nftItem = allSolItems.find((c) => c.slug === "solananftcard") || allSolItems[0];
  const balanceItem = allSolItems.find((c) => c.slug === "balancedisplay") || allSolItems[1];
  const eventItem = allSolItems.find((c) => c.slug === "solanaeventcard") || allSolItems[3];
  const stepItem = allSolItems.find((c) => c.slug === "steptrackerwidget") || allSolItems[2];
  const segmentedItem = allSolItems.find((c) => c.slug === "cryptosalessegmentedbars" || c.slug === "segmentedprogresscard") || allSolItems[4];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
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

          {/* Row 1 — three square cards */}
          <ShowcaseCard
            href={nftItem ? nftItem.href : "/components"}
            title="Solana NFT Card"
            imageSrc="/showcase/solana-nft-card.png"
            imageAlt="Solana NFT Card"
            reduceMotion={reduceMotion}
          />

          <ShowcaseCard
            href={balanceItem ? balanceItem.href : "/components"}
            title="Balance Display"
            imageSrc="/showcase/balance-display.png"
            imageAlt="Balance Display"
            reduceMotion={reduceMotion}
          />

          <ShowcaseCard
            href={eventItem ? eventItem.href : "/components"}
            title="Solana Event Card"
            imageSrc="/showcase/solana-event-card.png"
            imageAlt="Solana Event Card"
            reduceMotion={reduceMotion}
          />

          {/* Row 2 — three cells: Step Tracker | View All (center) | Token Card */}

          {/* Cell 4: Step Tracker Widget */}
          <Link
            href={stepItem ? stepItem.href : "/components"}
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-[210px] sm:h-[230px]"
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

          {/* Cell 5 (center on desktop): View all 56+ components CTA */}
          <Link
            href="/components"
            tabIndex={0}
            className="group relative flex h-[210px] sm:h-[230px] flex-col justify-between overflow-hidden rounded-[32px] bg-[#0066FF] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-colors duration-200 ease-out hover:bg-[#0052CC] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            style={{ cornerShape: "squircle" } as React.CSSProperties}
          >
            {/* Top: text and arrow that reveals on hover */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-7 sm:pt-8 w-full">
              <span className="font-runde text-xs font-semibold uppercase tracking-widest text-white/70">
                Browse the full catalog
              </span>
              <div className="mt-2 flex items-center justify-center">
                <span className="font-runde text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-x-1">
                  View all 56+ components
                </span>
                <span className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:opacity-100 group-hover:pl-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Bottom: SVG positioned at bottom edge */}
            <div className="relative flex-1 overflow-hidden flex items-end justify-center pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Oxygen UI"
                aria-hidden="true"
                className="w-44 sm:w-52 translate-y-1/3 transition-transform duration-300 ease-out group-hover:translate-y-[25%] drop-shadow-2xl"
                src="/logos/Oxygenui-shadow.svg"
              />
            </div>
          </Link>

          {/* Cell 6: Segmented Metrics */}
          <Link
            href={segmentedItem ? segmentedItem.href : "/components"}
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 rounded-[32px]"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900/90 dark:hover:border-white/20 h-[210px] sm:h-[230px]"
              style={{ cornerShape: "squircle" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-runde text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Segmented Metrics
                </h3>
                <div className="flex size-8 items-center justify-center rounded-[10px] bg-zinc-900 text-white transition-all duration-200 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-100 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
              <div
                className="mt-3 relative w-full flex-1 min-h-0 overflow-hidden rounded-[20px] border border-black/5 dark:border-white/5 bg-zinc-950 flex items-center justify-center"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/showcase/segment-bar.png"
                  alt="Segmented Metrics"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </Link>

        </div>
      </ScrollReveal>
    </section>
  );
}
