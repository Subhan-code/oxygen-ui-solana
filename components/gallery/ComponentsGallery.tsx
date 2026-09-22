"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import type { ComponentItem } from "@/lib/components";
import { GROUP_TAXONOMY } from "@/lib/groups";
import ComponentCard from "./ComponentCard";
import { cn } from "@/lib/utils";

export interface ComponentsGalleryProps {
  items: ComponentItem[];
}

type ViewMode = "group" | "grid";
type OrderMode = "default" | "newest";

export default function ComponentsGallery({ items }: ComponentsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("group");
  const [orderMode, setOrderMode] = useState<OrderMode>("default");
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.group && item.group.toLowerCase().includes(q))
      );
    });
  }, [items, searchQuery]);

  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    return list.sort((a, b) => {
      const idA = parseInt(a.id, 10) || 0;
      const idB = parseInt(b.id, 10) || 0;
      if (orderMode === "newest") {
        if (viewMode === "group") {
          const groupCompare = (a.group || "").localeCompare(b.group || "");
          if (groupCompare !== 0) return groupCompare;
          return idB - idA;
        }
        return idB - idA;
      }
      if (viewMode === "group") {
        const groupCompare = (a.group || "").localeCompare(b.group || "");
        if (groupCompare !== 0) return groupCompare;
        return idA - idB;
      }
      return idA - idB;
    });
  }, [filteredItems, viewMode, orderMode]);

  const groupedSections = useMemo(() => {
    if (viewMode !== "group") return [];
    const itemMap = new Map<string, ComponentItem[]>();
    for (const item of sortedItems) {
      const gName = item.group || "Other";
      if (!itemMap.has(gName)) itemMap.set(gName, []);
      itemMap.get(gName)!.push(item);
    }
    const sections: { group: (typeof GROUP_TAXONOMY)[0]; items: ComponentItem[] }[] = [];
    for (const groupInfo of GROUP_TAXONOMY) {
      const groupItems = itemMap.get(groupInfo.name) || [];
      if (groupItems.length > 0) sections.push({ group: groupInfo, items: groupItems });
    }
    const handledGroups = new Set(GROUP_TAXONOMY.map((g) => g.name));
    for (const [gName, gItems] of itemMap.entries()) {
      if (!handledGroups.has(gName) && gItems.length > 0) {
        sections.push({
          group: { name: gName, description: "General primitives and interactive components.", slugs: [] },
          items: gItems,
        });
      }
    }
    return sections;
  }, [sortedItems, viewMode]);

  const isSearching = searchQuery.trim().length > 0;

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
            id="blocks-search-input"
            name="blocks-search-input"
            type="text"
            autoComplete="off"
            suppressHydrationWarning
            placeholder="Search blocks by name or group..."
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

        {/* View toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center h-9 p-1 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 shadow-2xs">
            {(["group", "grid"] as const).map((mode) => {
              const isSelected = viewMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "relative px-3.5 h-full text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer select-none flex items-center justify-center",
                    isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gallery-view-mode-pill"
                      transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                      className="absolute inset-0 rounded-lg bg-white dark:bg-white/15 border border-black/5 dark:border-white/10 shadow-2xs"
                    />
                  )}
                  <span className="relative z-10 capitalize">{mode === "group" ? "Taxonomy" : "Flat Grid"}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center h-9 p-1 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 shadow-2xs">
            {(["default", "newest"] as const).map((order) => {
              const isSelected = orderMode === order;
              return (
                <button
                  key={order}
                  type="button"
                  onClick={() => setOrderMode(order)}
                  className={cn(
                    "relative px-3.5 h-full text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer select-none flex items-center justify-center",
                    isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gallery-order-mode-pill"
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
      </div>

      {/* Gallery */}
      <div className="flex flex-col space-y-16 pb-24">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 dark:border-white/10 py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/30 gap-4">
            <div className="size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-2xs">
              💡
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-foreground">Have a block in mind?</h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                No results for <span className="font-semibold text-foreground">&ldquo;{searchQuery}&rdquo;</span> — if you need it built, pin me on X.
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
                href="https://x.com/intent/tweet?text=Hey%20%40uxdotsol%20can%20you%20add%20this%20block%20to%20Oxygen%20UI%3F"
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
        ) : viewMode === "group" && groupedSections.length > 0 ? (
          groupedSections.map(({ group, items: groupItems }) => (
            <section
              key={group.name}
              id={group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200/80 dark:border-white/10 pb-3 text-left">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl font-runde flex items-baseline">
                    {group.name}
                    <sup className="ml-1 text-xs sm:text-sm font-mono font-normal text-zinc-400 dark:text-zinc-500 tracking-normal select-none">
                      [{groupItems.length}]
                    </sup>
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map((item) => (
                  <ComponentCard key={item.href} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedItems.map((item) => (
              <ComponentCard key={item.href} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
