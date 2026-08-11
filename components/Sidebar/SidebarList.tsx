"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";
import { ArrowUpDown } from "lucide-react";

const SidebarList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const [sortedReverse, setSortedReverse] = useState(false);

  const displayList = sortedReverse ? [...components].reverse() : components;

  return (
    <div className="relative flex flex-col gap-2 pb-12 pt-2 w-full select-none text-xs">
      <div className="mb-4 flex items-center justify-between px-1">
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

      {displayList.map((component, idx) => {
        const originalIndex = components.findIndex(
          (c) => c.href === component.href,
        );
        const numStr = String(originalIndex + 1).padStart(2, "0");
        const isActive = pathname === component.href;

        return (
          <React.Fragment key={component.href}>
            <Link
              href={component.href}
              onClick={onNavigate}
              className="group relative flex h-6 cursor-pointer items-center gap-3"
            >
              <span
                className={`inline-block h-[1.5px] transition-all duration-200 ${
                  isActive
                    ? "bg-sky-500 w-[50px]"
                    : "bg-muted-foreground/30 group-hover:bg-sky-500 group-hover:w-[42px] w-[28px]"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-all ease-out font-mono ${
                  isActive
                    ? "text-sky-500 font-semibold opacity-100"
                    : "opacity-50 text-foreground/80 group-hover:text-sky-500 group-hover:opacity-100"
                }`}
              >
                {numStr} {component.name}
              </span>
            </Link>

            {idx < displayList.length - 1 && (
              <>
                <span className="bg-muted-foreground/15 block h-[1px] w-[28px]" />
                <span className="bg-muted-foreground/15 block h-[1px] w-[28px]" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarList;
