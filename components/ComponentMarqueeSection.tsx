"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { ComponentCard } from "@/components/gallery/ComponentCard";
import { getComponentBySlug } from "@/lib/registry";
import type { ComponentItem } from "@/lib/components";

const ROW_1_SLUGS = [
  "accountcard",
  "cryptoswapbox",
  "solanatransactionstatus",
  "cardstack",
  "priceticker",
  "presenceavatars",
  "orderbook",
  "steptrackerwidget",
];

const ROW_2_SLUGS = [
  "stakingcard",
  "runstatsstacks",
  "multiwalletswitcher",
  "liquiditypoolcard",
  "cryptosalescandlestickchart",
  "tokenicongroup",
  "transactionmodal",
  "signaturestatusbadge",
];

export default function ComponentMarqueeSection() {
  const row1Items = useMemo(
    () =>
      ROW_1_SLUGS.map((slug) => getComponentBySlug(slug)).filter(
        (item): item is ComponentItem => Boolean(item)
      ),
    []
  );

  const row2Items = useMemo(
    () =>
      ROW_2_SLUGS.map((slug) => getComponentBySlug(slug)).filter(
        (item): item is ComponentItem => Boolean(item)
      ),
    []
  );

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20">
      <div className="mx-auto mb-8 flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:mb-12 sm:flex-row sm:items-end">
        <div className="flex flex-col items-start gap-2.5">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
            Component Showcase
          </span>
          <h2 className="font-runde text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl dark:text-white">
            Production-grade primitives for Solana
          </h2>
          <p className="max-w-xl text-sm font-medium text-zinc-600 sm:text-base dark:text-zinc-400">
            Wallet surfaces, swap terminals, order books, and real-time transaction pipelines. Copy, paste, and customize with physical spring motion.
          </p>
        </div>

        <Link
          href="/sol"
          className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-black/10 bg-black/5 px-4 py-2.5 text-xs font-semibold text-zinc-900 transition-all duration-200 hover:border-black/25 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <span>Explore all components</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex w-full flex-col gap-4 sm:gap-6">
        <Marquee
          direction="left"
          duration={45}
          pauseOnHover
          fade
          fadeAmount={10}
          className="py-3 [--gap:1.5rem] [&_.spell-marquee__segment]:gap-6 [&_.spell-marquee__segment]:pr-6"
        >
          {row1Items.map((item) => (
            <ComponentCard
              key={`row1-${item.slug}`}
              item={item}
              className="h-[280px] w-[280px] shrink-0 sm:h-[320px] sm:w-[320px]"
            />
          ))}
        </Marquee>

        <Marquee
          direction="right"
          duration={50}
          pauseOnHover
          fade
          fadeAmount={10}
          className="py-3 [--gap:1.5rem] [&_.spell-marquee__segment]:gap-6 [&_.spell-marquee__segment]:pr-6"
        >
          {row2Items.map((item) => (
            <ComponentCard
              key={`row2-${item.slug}`}
              item={item}
              className="h-[280px] w-[280px] shrink-0 sm:h-[320px] sm:w-[320px]"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
