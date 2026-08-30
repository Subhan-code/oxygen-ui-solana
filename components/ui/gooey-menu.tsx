"use client";

import React, { useId } from "react";
import { PlusIcon, GearIcon, HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export type GooeyMenuProps = React.HTMLAttributes<HTMLDivElement>;

export function GooeyMenu({ className, ...props }: GooeyMenuProps) {
  const uid = useId().replace(/:/g, "");
  const toggleId = `gooey-menu-toggle-${uid}`;
  const filterId = `gooey-menu-filter-${uid}`;

  return (
    <div
      data-slot="gooey-menu"
      className={cn(
        "relative h-[300px] w-full max-w-sm mx-auto overflow-hidden rounded-3xl bg-zinc-950 p-6 select-none",
        className,
      )}
      {...props}
    >
      <nav
        className="menu"
        style={
          {
            filter: `url(#${filterId})`,
            width: "100%",
            height: "100%",
          } as React.CSSProperties
        }
      >
        <input
          type="checkbox"
          className="peer hidden"
          name={toggleId}
          id={toggleId}
        />
        <label
          className="absolute bottom-6 right-6 z-10 flex h-14 w-14 scale-125 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl border border-zinc-800 transition-transform duration-300 ease-[var(--ease-out-expo)] peer-checked:rotate-135 peer-checked:scale-100 motion-reduce:transition-none dark:bg-white dark:text-zinc-950"
          htmlFor={toggleId}
        >
          <PlusIcon className="h-5 w-5 text-white dark:text-zinc-950" />
        </label>
        <button
          type="button"
          className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg cursor-pointer transition-transform duration-300 ease-[var(--ease-out-expo)] peer-checked:translate-y-[-75px] motion-reduce:peer-checked:translate-y-0"
        >
          <GearIcon className="h-5 w-5 text-white" />
        </button>
        <button
          type="button"
          className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg cursor-pointer transition-transform duration-300 ease-[var(--ease-out-expo)] peer-checked:translate-y-[-145px] motion-reduce:peer-checked:translate-y-0"
        >
          <HeartIcon className="h-5 w-5 text-white" />
        </button>
      </nav>
      <svg
        className="absolute h-0 w-0"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default GooeyMenu;
