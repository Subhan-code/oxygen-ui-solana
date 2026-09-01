"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getSolComponents } from "@/lib/sol-components";
import ComponentCard from "./gallery/ComponentCard";
import ViewAllCard from "./gallery/ViewAllCard";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

const SHOWCASE_TABS = [
  {
    id: "all",
    label: "All 56 Sol Components",
    slugs: [
      "qrcode",
      "solanawalletcard",
      "cryptoswapbox",
      "solanaidentitycard",
      "tradebuttons",
    ],
  },
  {
    id: "account",
    label: "Account & Identity",
    slugs: [
      "qrcode",
      "accountcard",
      "solanaidentitycard",
      "solanawalletcard",
      "multiwalletswitcher",
    ],
  },
  {
    id: "trading",
    label: "Swap & Trading",
    slugs: [
      "cryptoswapbox",
      "orderbook",
      "orderform",
      "tradebuttons",
      "slippageselector",
    ],
  },
  {
    id: "tokens",
    label: "Tokens & Assets",
    slugs: [
      "solanatokencard",
      "solananftcard",
      "tokeninput",
      "tokenpair",
      "tokencommand",
    ],
  },
];

function ShowcaseTabs({
  tabs,
  activeTab,
  onSelect,
}: {
  tabs: typeof SHOWCASE_TABS;
  activeTab: string;
  onSelect: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 backdrop-blur-xl shrink-0 overflow-x-auto max-w-full">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={cn(
              "relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-150 select-none whitespace-nowrap cursor-pointer",
              isActive
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            {isActive && !reduceMotion && (
              <motion.span
                layoutId="showcase-tab-active-pill"
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 rounded-xl bg-white dark:bg-white/15 border border-zinc-200/80 dark:border-white/10 shadow-xs"
              />
            )}
            {isActive && reduceMotion && (
              <span className="absolute inset-0 rounded-xl bg-white dark:bg-white/15 border border-zinc-200/80 dark:border-white/10 shadow-xs" />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const sol56Items = getSolComponents();

  const currentTab =
    SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];

  const showcaseItems = currentTab.slugs
    .map((slug) =>
      sol56Items.find(
        (c) =>
          c.slug === slug ||
          c.href === `/components/${slug}` ||
          c.id.toLowerCase() === slug.toLowerCase()
      )
    )
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const displayList =
    showcaseItems.length >= 4
      ? showcaseItems.slice(0, 5)
      : sol56Items.slice(0, 5);

  const heroItem = displayList[0];
  const gridItems = displayList.slice(1, 5);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-6 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="flex flex-col items-start gap-3 text-left">
          <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
            Sol 56 Catalog
          </span>
          <h2 className="max-w-2xl text-balance font-runde text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
            56 Sol Components & Primitives
          </h2>
          <p className="max-w-xl text-pretty text-sm font-medium text-muted-foreground sm:text-base md:text-lg">
            Production-grade Solana React primitives organized into 7 core modules. Install any component with the shadcn CLI.
          </p>
        </header>

        <ShowcaseTabs
          tabs={SHOWCASE_TABS}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
      </div>

      <ScrollReveal className="mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroItem && (
            <ComponentCard
              key={`${heroItem.href}-${activeTab}`}
              item={heroItem}
              large
              autoPlay
              className="sm:col-span-2 lg:row-span-2"
            />
          )}
          {gridItems.map((item) => (
            <ComponentCard
              key={`${item.href}-${activeTab}`}
              item={item}
              autoPlay
            />
          ))}
          <ViewAllCard
            count={56}
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
