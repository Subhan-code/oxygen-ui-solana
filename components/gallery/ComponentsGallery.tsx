"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import type { ComponentItem } from "@/lib/components";
import LiveComponentPreview from "./LiveComponentPreview";
import PreviewVideo from "./PreviewVideo";
import { cn } from "@/lib/utils";

export interface ComponentsGalleryProps {
  items: ComponentItem[];
}

function BlockCard({ item }: { item: ComponentItem }) {
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

      <span className="text-[11px] font-normal text-zinc-400 group-hover:text-zinc-200 transition-colors truncate px-0.5">
        {item.title || item.name}
      </span>
    </div>
  );
}

export default function ComponentsGallery({ items }: ComponentsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // keyboard shortcut listener
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
    const q = searchQuery.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.group && item.group.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-10" suppressHydrationWarning>
      {/* header stack */}
      <div className="flex flex-col gap-3 items-center text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-runde">
          Turnkey Solana Application Blocks
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
          Full-stack layouts ready to ship: wallet connection drawers, perpetual DEX order forms, token swap widgets, and real-time activity feeds.
        </p>

        {/* search filter */}
        <div className="relative w-full max-w-md mt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Solana blocks (Press / or ⌘K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-9 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* divider */}
      <div role="separator" aria-orientation="horizontal" className="h-px w-full bg-white/10" />

      {/* all blocks in one unified grid */}
      <div>
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-400">
            No blocks match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-12">
            {filteredItems.map((item) => (
              <BlockCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
