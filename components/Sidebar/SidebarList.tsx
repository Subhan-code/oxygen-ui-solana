"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";
import { ArrowUpDown } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";

const RADIUS = 45;
const BASE_WIDTH = 32;
const MAX_WIDTH = 64;

function ProximityItem({
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

  const width = useSpring(targetWidth, {
    stiffness: 350,
    damping: 30,
    mass: 0.6,
  });

  return (
    <Link
      ref={ref}
      href={component.href}
      onClick={onNavigate}
      className="group relative flex h-4.5 cursor-pointer items-center gap-2.5"
    >
      <motion.span
        className={`inline-block h-[1.5px] rounded-full transition-colors duration-150 ${
          isActive
            ? "bg-sky-500"
            : "bg-muted-foreground/30 group-hover:bg-sky-500"
        }`}
        style={{
          width,
          transformOrigin: "left center",
        }}
      />
      <span
        className={`whitespace-nowrap transition-all ease-out font-mono text-[11px] ${
          isActive
            ? "text-sky-500 font-semibold opacity-100"
            : "opacity-50 text-foreground/80 group-hover:text-sky-500 group-hover:opacity-100"
        }`}
      >
        {numStr} {component.name}
      </span>
    </Link>
  );
}

const SidebarList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const [sortedReverse, setSortedReverse] = useState(false);
  const mouseY = useMotionValue(Infinity);

  const displayList = sortedReverse ? [...components].reverse() : components;

  return (
    <div
      className="relative flex flex-col gap-0.5 pb-8 pt-1 w-full select-none text-xs"
      onPointerMove={(e) => mouseY.set(e.clientY)}
      onPointerLeave={() => mouseY.set(Infinity)}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setSortedReverse((v) => !v)}
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer text-xs font-mono"
        >
          <span>{sortedReverse ? "Sorted Desc" : "Sorted by Id"}</span>
          <ArrowUpDown className="h-3.5 w-3.5 opacity-70" />
        </button>
        <span className="text-[11px] font-mono text-muted-foreground/60">
          {components.length} components
        </span>
      </div>

      {displayList.map((component) => {
        const originalIndex = components.findIndex(
          (c) => c.href === component.href
        );
        const isActive = pathname === component.href;

        return (
          <ProximityItem
            key={component.href}
            component={component}
            index={originalIndex}
            isActive={isActive}
            mouseY={mouseY}
            onNavigate={onNavigate}
          />
        );
      })}
    </div>
  );
};

export default SidebarList;
