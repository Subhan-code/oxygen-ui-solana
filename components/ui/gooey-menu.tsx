"use client";

import React from "react";
import { PlusIcon, GearIcon, HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export type GooeyMenuProps = React.HTMLAttributes<HTMLDivElement>;

export function GooeyMenu({ className, ...props }: GooeyMenuProps) {
  return (
    <div
      data-slot="gooey-menu"
      className={cn("relative h-[300px] w-full max-w-sm mx-auto overflow-hidden rounded-3xl bg-zinc-950 p-6 select-none", className)}
      {...props}
    >
      <nav
        className="menu"
        style={
          {
            filter: "url(#gooey-menu-filter)",
            width: "100%",
            height: "100%",
            "--spring-easing":
              "linear(0, 0.88117 15.492%, 1.09261 23.232%, 1.10421 28.713%, 0.99031 49.585%,0.99995)",
          } as React.CSSProperties
        }
      >
        <input type="checkbox" className="peer hidden" name="menu" id="gooey-menu-toggle" />
        <label
          className="absolute bottom-6 right-6 z-10 flex h-14 w-14 scale-125 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl border border-zinc-800 transition-all duration-1000 ease-[var(--spring-easing)] peer-checked:rotate-135 peer-checked:scale-100 dark:bg-white dark:text-zinc-950"
          htmlFor="gooey-menu-toggle"
        >
          <PlusIcon className="h-5 w-5 text-white dark:text-zinc-950" />
        </label>
        <button
          type="button"
          className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-75px] peer-checked:duration-1000 peer-checked:ease-[var(--spring-easing)] shadow-lg cursor-pointer"
        >
          <GearIcon className="h-5 w-5 text-white" />
        </button>
        <button
          type="button"
          className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-145px] peer-checked:duration-1000 peer-checked:ease-[var(--spring-easing)] shadow-lg cursor-pointer"
        >
          <HeartIcon className="h-5 w-5 text-white" />
        </button>
      </nav>
      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey-menu-filter">
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
