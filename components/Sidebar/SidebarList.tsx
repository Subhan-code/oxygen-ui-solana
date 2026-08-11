"use client";

import React, { useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";

const RADIUS = 45;
const BASE_WIDTH = 32;
const MAX_WIDTH = 55;

const ProximityScaleItem = memo(function ProximityScaleItem({
  component,
  index,
  isActive,
  mouseY,
  onNavigate,
}: {
  component: (typeof components)[number];
  index: number;
  isActive: boolean;
  mouseY: MotionValue<number>;
  onNavigate?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const numStr = String(index + 1).padStart(2, "0");

  const distance = useTransform(mouseY, (y) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return RADIUS;
    return y - (rect.top + rect.height / 2);
  });

  const targetWidth = useTransform(
    distance,
    [-RADIUS, 0, RADIUS],
    [BASE_WIDTH, MAX_WIDTH, BASE_WIDTH],
    { clamp: true }
  );

  const proxWidth = useSpring(targetWidth, {
    stiffness: 350,
    damping: 30,
    mass: 0.6,
  });

  return (
    <Link
      ref={ref}
      href={component.href}
      onClick={onNavigate}
      className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-[14px]"
    >
      <motion.span
        className={`inline-block h-[1px] transition-colors duration-150 ${
          isActive
            ? "bg-sky-500"
            : "bg-zinc-300 dark:bg-white/20 group-hover:bg-sky-500"
        }`}
        style={{
          width: isActive ? 55 : proxWidth,
        }}
      />
      <span
        className={`whitespace-nowrap transition-all ease-out ${
          isActive
            ? "text-sky-500 opacity-100 font-medium"
            : "opacity-60 text-zinc-700 dark:text-white group-hover:text-sky-500 group-hover:opacity-100"
        }`}
      >
        {numStr} {component.name}
      </span>
    </Link>
  );
});

const SidebarList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const [sortMode, setSortMode] = useState<"id" | "reverse">("id");
  const mouseY = useMotionValue(Infinity);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      mouseY.set(e.clientY);
    },
    [mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseY.set(Infinity);
  }, [mouseY]);

  const displayList =
    sortMode === "reverse" ? [...components].reverse() : components;

  return (
    <div
      className="relative flex h-fit flex-col gap-2 pb-[15vh] pt-[16vh] w-full pr-3 select-none text-[15px] tracking-tight"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Sort button */}
      <div className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setSortMode((prev) => (prev === "id" ? "reverse" : "id"))
          }
          className="flex items-center justify-center gap-2 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-white/50 dark:hover:text-white/80 text-sm cursor-pointer"
        >
          {sortMode === "id" ? "Sorted by Id" : "Sorted Desc"}
          <svg
            className={`transition-transform duration-300 ${
              sortMode === "reverse" ? "rotate-180" : "rotate-0"
            }`}
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* All Components header */}
      <div className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-[14px]">
        <span className="bg-zinc-900 dark:bg-white inline-block h-[1px] w-[32px]" />
        <span className="whitespace-nowrap transition-all ease-out opacity-100 text-zinc-900 dark:text-white font-medium">
          All Components
        </span>
      </div>

      {/* Gap lines */}
      <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
      <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />

      {/* Component items */}
      {displayList.map((component, idx) => {
        const originalIndex = components.findIndex(
          (c) => c.href === component.href
        );
        const isActive = pathname === component.href;

        return (
          <React.Fragment key={component.href}>
            <ProximityScaleItem
              component={component}
              index={originalIndex}
              isActive={isActive}
              mouseY={mouseY}
              onNavigate={onNavigate}
            />
            {idx < displayList.length - 1 && (
              <>
                <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
                <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarList;
