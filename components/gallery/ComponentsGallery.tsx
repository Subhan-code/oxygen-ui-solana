"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentItem } from "@/lib/components";
import { GROUP_TAXONOMY, type GroupInfo } from "@/lib/groups";
import ComponentCard from "./ComponentCard";
import { cn } from "@/lib/utils";



export interface ComponentsGalleryProps {
  items: ComponentItem[];
}

type ViewMode = "group" | "grid";
type OrderMode = "default" | "newest";

function GalleryCategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: {
  categories: { id: string; name: string; count: number }[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-5xl py-1">
      <div className="flex items-center justify-center gap-1.5 flex-wrap p-1 select-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-150 whitespace-nowrap cursor-pointer",
                isSelected
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              {isSelected && !reduceMotion && (
                <motion.span
                  layoutId="gallery-category-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 rounded-xl bg-zinc-200/90 dark:bg-white/15 border border-zinc-300/80 dark:border-white/15 shadow-xs"
                />
              )}
              {isSelected && reduceMotion && (
                <span className="absolute inset-0 rounded-xl bg-zinc-200/90 dark:bg-white/15 border border-zinc-300/80 dark:border-white/15 shadow-xs" />
              )}
              <span className="relative z-10">{cat.name}</span>
              <span
                className={cn(
                  "relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors",
                  isSelected
                    ? "bg-zinc-300/90 dark:bg-white/25 text-zinc-900 dark:text-white font-bold"
                    : "bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400"
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default function ComponentsGallery({ items }: ComponentsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("group");
  const [orderMode, setOrderMode] = useState<OrderMode>("default");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  // Keyboard shortcut listener (Cmd+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && document.activeElement?.tagName !== "INPUT")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter items by search query and category
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.group && item.group.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "all" ||
        item.group?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Sort items
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

  // Group items by taxonomy
  const groupedSections = useMemo(() => {
    if (viewMode !== "group") return [];

    const itemMap = new Map<string, ComponentItem[]>();
    for (const item of sortedItems) {
      const gName = item.group || "Other";
      if (!itemMap.has(gName)) itemMap.set(gName, []);
      itemMap.get(gName)!.push(item);
    }

    const sections: { group: GroupInfo; items: ComponentItem[] }[] = [];
    for (const groupInfo of GROUP_TAXONOMY) {
      const groupItems = itemMap.get(groupInfo.name) || [];
      if (groupItems.length > 0) {
        sections.push({ group: groupInfo, items: groupItems });
      }
    }

    const handledGroups = new Set(GROUP_TAXONOMY.map((g) => g.name));
    for (const [gName, gItems] of itemMap.entries()) {
      if (!handledGroups.has(gName) && gItems.length > 0) {
        sections.push({
          group: {
            name: gName,
            description: "General primitives and interactive components.",
            slugs: [],
          },
          items: gItems,
        });
      }
    }

    return sections;
  }, [sortedItems, viewMode]);

  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Components", count: items.length },
      ...GROUP_TAXONOMY.map((g) => ({
        id: g.name.toLowerCase(),
        name: g.name,
        count: items.filter((it) => it.group === g.name).length,
      })).filter((c) => c.count > 0),
    ];
  }, [items]);

  return (
    <div className="w-full relative space-y-6" suppressHydrationWarning>
      {/* Controls Area */}
      <div className="w-full flex flex-col gap-3 py-2 bg-transparent">
        {/* Top Controls Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="relative w-full sm:w-80 lg:w-96 hover:sm:w-96 hover:lg:w-[420px] focus-within:sm:w-96 focus-within:lg:w-[420px] shrink-0 transition-all duration-300 ease-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
              id="components-search-input"
              name="components-search-input"
              type="search"
              autoComplete="off"
              suppressHydrationWarning
              placeholder="Search 180+ components by name or group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-9 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border border-black/10 dark:border-white/10 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 dark:focus:ring-[#0A84FF]/30 transition-all duration-300"
            />
          </div>

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
                      isSelected
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="gallery-view-mode-pill"
                        transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 rounded-lg bg-white dark:bg-white/15 border border-black/5 dark:border-white/10 shadow-2xs"
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {mode === "group" ? "Taxonomy" : "Flat Grid"}
                    </span>
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
                      isSelected
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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

        {/* Category Filter Pills & Tags Bar */}
        <div className="w-full pt-1 flex justify-center">
          <GalleryCategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>




      {/* Component Gallery Grid / Sections */}
      <div className="flex flex-col space-y-16 pb-24">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 dark:border-white/10 py-16 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-lg mb-3 shadow-2xs">
              🔍
            </div>
            <h3 className="font-bold text-sm text-foreground">No components matched your filter</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              Try adjusting your search query or reset category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              Reset Filters
            </button>
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

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map((item) => (
                  <ComponentCard key={item.href} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedItems.map((item) => (
              <ComponentCard key={item.href} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

