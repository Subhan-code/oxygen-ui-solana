"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";
import { motion } from "motion/react";

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

const ProximityScaleItem = memo(function ProximityScaleItem({
  component,
  index,
  isActive,
  onNavigate,
  activeRef,
}: {
  component: (typeof components)[number];
  index: number;
  isActive: boolean;
  onNavigate?: () => void;
  activeRef?: React.RefObject<HTMLAnchorElement | null>;
}) {
  const localRef = useRef<HTMLAnchorElement | null>(null);
  const numStr = String(index + 1).padStart(2, "0");

  const setRefs = useCallback(
    (node: HTMLAnchorElement | null) => {
      localRef.current = node;
      if (isActive && activeRef) {
        (activeRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
      }
    },
    [isActive, activeRef]
  );

  return (
    <Link
      ref={setRefs}
      href={component.href}
      prefetch={true}
      onClick={onNavigate}
      title={`${numStr} ${component.name}`}
      className="group relative flex items-center min-w-0 max-w-full my-0.5"
    >
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
        className={`relative flex w-full items-center justify-between rounded-xl px-3 py-1.5 transition-colors cursor-pointer ${
          isActive
            ? "bg-sky-500/15 border border-sky-500/30 text-white font-semibold shadow-sm backdrop-blur-md"
            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5 font-medium"
        }`}
      >
        <span className="relative z-10 truncate text-sm tracking-tight flex items-center">
          <span
            className={`font-mono text-xs mr-2 transition-colors ${
              isActive
                ? "text-sky-400 font-bold"
                : "text-zinc-500 group-hover:text-zinc-300 font-normal"
            }`}
          >
            {numStr}
          </span>
          <span className={isActive ? "text-white font-semibold" : ""}>
            {component.name}
          </span>
        </span>
      </motion.div>
    </Link>
  );
});

const SidebarList = ({
  onNavigate,
  isOpen,
}: {
  onNavigate?: () => void;
  isOpen?: boolean;
}) => {
  const pathname = usePathname();
  const [sortMode, setSortMode] = useState<"id" | "group">("id");
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (isOpen && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [isOpen, pathname]);

  const displayList = useMemo(() => {
    if (sortMode === "group") {
      return [...components].sort((a, b) => {
        const catA = a.category || "General";
        const catB = b.category || "General";
        if (catA !== catB) {
          return catA.localeCompare(catB);
        }
        return components.indexOf(a) - components.indexOf(b);
      });
    }
    return components;
  }, [sortMode]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of components) {
      const cat = c.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="relative flex h-fit flex-col gap-0.5 pt-[16vh] pb-16 w-full px-3 select-none text-sm tracking-tight font-sans">
      {/* Segmented Filter Control */}
      <div className="mb-3 px-1">
        <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSortMode("id")}
            className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
              sortMode === "id"
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sorted by Id
          </button>
          <button
            type="button"
            onClick={() => setSortMode("group")}
            className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
              sortMode === "group"
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sorted by Group
          </button>
        </div>
      </div>

      {/* Component items with category headers */}
      {displayList.map((component, idx) => {
        const originalIndex = components.findIndex(
          (c) => c.href === component.href
        );
        const isActive = pathname === component.href;
        const prevCategory = idx > 0 ? displayList[idx - 1].category : null;
        const isNewCategory =
          sortMode === "group" &&
          component.category &&
          component.category !== prevCategory;

        const count = isNewCategory ? categoryCounts[component.category || "General"] : 0;

        return (
          <React.Fragment key={component.href}>
            {isNewCategory && (
              <div className={`px-3 pt-3 pb-1 ${idx > 0 ? "mt-3 border-t border-white/5" : ""}`}>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 inline-flex items-baseline gap-1">
                  <span>{component.category}</span>
                  <sup className="text-[10px] font-mono font-extrabold text-sky-400/90">
                    [{count}]
                  </sup>
                </span>
              </div>
            )}
            <ProximityScaleItem
              component={component}
              index={originalIndex}
              isActive={isActive}
              onNavigate={onNavigate}
              activeRef={activeRef}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarList;
