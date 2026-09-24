"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import {
  getSolCatalogMergedCategories,
  type SolResolvedItem,
  type SolResolvedCategory,
} from "@/lib/sol-catalog";
import LiveComponentPreview from "./LiveComponentPreview";
import PreviewVideo from "./PreviewVideo";
import { cn } from "@/lib/utils";

function CatalogCard({ item }: { item: SolResolvedItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 group select-none">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-950/80 p-2 sm:p-3",
          "transition-all duration-200 hover:border-white/25 hover:bg-zinc-900/40 hover:shadow-lg flex items-center justify-center cursor-pointer"
        )}
      >
        <Link
          href={item.href}
          aria-label={item.title || item.name}
          className="absolute inset-0 z-20"
        />

        <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
          {item.preview ? (
            <PreviewVideo
              src={item.preview}
              playing={isHovered}
              autoPlay={false}
            />
          ) : (
            <LiveComponentPreview item={item} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-1.5 px-0.5">
        <Link
          href={item.href}
          className="text-[11px] font-normal text-zinc-400 hover:text-zinc-200 group-hover:text-zinc-200 transition-colors truncate outline-none focus-visible:underline"
        >
          {item.title || item.name}
        </Link>

        {item.ships && (
          <span className="text-[10px] font-mono text-zinc-500 truncate shrink-0 max-w-[45%] text-right">
            {item.ships}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SolPageGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const rawCategories = useMemo(() => getSolCatalogMergedCategories(), []);

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

    return rawCategories
      .map((cat) => {
        const matchingItems = cat.items.filter((item) => {
          const matchesQuery =
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.slug.toLowerCase().includes(q) ||
            (item.ships && item.ships.toLowerCase().includes(q));

          return Boolean(matchesQuery);
        });

        if (matchingItems.length === 0) return null;
        return {
          id: cat.id,
          name: cat.name,
          items: matchingItems,
        };
      })
      .filter((cat): cat is SolResolvedCategory => cat !== null);
  }, [rawCategories, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10" suppressHydrationWarning>
      {/* header stack */}
      <div className="flex flex-col gap-3 items-center text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-runde">
          Solana Components
        </h1>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
          Curated Solana components and composite application blocks for dApp engineering.
        </p>

        {/* search filter with collapsible/expandable width */}
        <div
          className={cn(
            "group/search relative mt-2 h-10 transition-all duration-300 ease-out",
            searchQuery
              ? "w-full max-w-md"
              : "w-48 sm:w-56 hover:w-full hover:max-w-md focus-within:w-full focus-within:max-w-md"
          )}
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors group-focus-within/search:text-sky-500" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Solana components (Press / or ⌘K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-9 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div role="separator" aria-orientation="horizontal" className="h-px w-full bg-zinc-200 dark:bg-white/10" />

      {/* category sections */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {filteredCategories.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-500 dark:text-zinc-400">
            No items match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredCategories.map((cat, index) => (
            <React.Fragment key={cat.id}>
              {index > 0 && (
                <div
                  role="separator"
                  aria-orientation="horizontal"
                  className="h-px w-full bg-zinc-200 dark:bg-white/10"
                />
              )}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase font-runde">
                    {cat.name} ({cat.items.length})
                  </h2>
                  <span className="text-[11px] font-mono text-zinc-500">
                    [{cat.items.length}]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {cat.items.map((item) => (
                    <CatalogCard
                      key={`${cat.id}-${item.slug}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
