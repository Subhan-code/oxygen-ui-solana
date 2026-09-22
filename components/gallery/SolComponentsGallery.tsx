"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { getSolCategories, type SolCategory } from "@/lib/sol-components";
import ComponentCard from "./ComponentCard";
import { cn } from "@/lib/utils";

type OrderMode = "default" | "newest";

export default function SolComponentsGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orderMode, setOrderMode] = useState<OrderMode>("default");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const solCategories = useMemo(() => getSolCategories(), []);
  const allSolComponents = useMemo(() => solCategories.flatMap((c) => c.items), [solCategories]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && document.activeElement?.tagName !== "INPUT")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return solCategories
      .map((cat) => {
        let items = cat.items.filter((item) => {
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.slug.toLowerCase().includes(q)
          );
        });
        if (orderMode === "newest") items = [...items].reverse();
        if (items.length === 0) return null;
        return { ...cat, items };
      })
      .filter((cat): cat is SolCategory => cat !== null);
  }, [solCategories, searchQuery, orderMode]);

  const isSearching = searchQuery.trim().length > 0;
  const hasResults = filteredCategories.length > 0;

  return (
    <div className="w-full relative space-y-6" suppressHydrationWarning>
      {/* Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-2">
        {/* Search */}
        <div className="relative w-full sm:w-80 lg:w-96 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={searchInputRef}
            id="sol-components-search-input"
            name="sol-components-search-input"
            type="text"
            autoComplete="off"
            suppressHydrationWarning
            placeholder={`Search ${allSolComponents.length} Sol components by name...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-9 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border border-black/10 dark:border-white/10 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 dark:focus:ring-[#0A84FF]/30 transition-all duration-200 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {isSearching && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => { setSearchQuery(""); searchInputRef.current?.focus(); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex size-5 items-center justify-center rounded-full bg-zinc-300/80 dark:bg-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-400/80 dark:hover:bg-zinc-600/80 transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-3" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Order toggle */}
        <div className="flex items-center h-9 p-1 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 shadow-2xs shrink-0">
          {(["default", "newest"] as const).map((order) => {
            const isSelected = orderMode === order;
            return (
              <button
                key={order}
                type="button"
                onClick={() => setOrderMode(order)}
                className={cn(
                  "relative px-3.5 h-full text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer select-none flex items-center justify-center",
                  isSelected
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="sol-gallery-order-mode-pill"
                    transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-white/15 border border-black/5 dark:border-white/10 shadow-2xs"
                  />
                )}
                <span className="relative z-10 capitalize">{order}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <div className="flex flex-col space-y-16 pb-24">
        {!hasResults ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 dark:border-white/10 py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/30 gap-4">
            <div className="size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-2xs">
              💡
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-foreground">Have a component in mind?</h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                No match for <span className="font-semibold text-foreground">&ldquo;{searchQuery}&rdquo;</span> — need it added? Pin me or tag me on X.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
              >
                Clear search
              </button>
              <a
                href="https://x.com/intent/tweet?text=Hey%20%40uxdotsol%20can%20you%20add%20this%20component%20to%20Oxygen%20UI%3F"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Tag me on X
              </a>
            </div>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section
              key={cat.name}
              id={cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200/80 dark:border-white/10 pb-3 text-left">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl font-runde flex items-baseline">
                    {cat.name}
                    <sup className="ml-1 text-xs sm:text-sm font-mono font-normal text-zinc-400 dark:text-zinc-500 tracking-normal select-none">
                      [{cat.items.length}]
                    </sup>
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              </div>
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <ComponentCard key={`${cat.name}-${item.slug}`} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
