"use client";

import { PlusIcon, GearIcon, HeartIcon, Share1Icon, PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function GooeyMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-[350px] w-full items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          filter: "url(#gooey-filter)",
        }}
      >
        <button
          type="button"
          aria-label="Gear action"
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-500 dark:bg-zinc-100 dark:text-zinc-900 ${
            isOpen ? "-translate-y-16 scale-100 opacity-100" : "translate-y-0 scale-75 opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <GearIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Heart action"
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-500 dark:bg-zinc-100 dark:text-zinc-900 ${
            isOpen ? "-translate-x-16 scale-100 opacity-100" : "translate-x-0 scale-75 opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <HeartIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Share action"
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-500 dark:bg-zinc-100 dark:text-zinc-900 ${
            isOpen ? "translate-x-16 scale-100 opacity-100" : "translate-x-0 scale-75 opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Share1Icon className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Profile action"
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-500 dark:bg-zinc-100 dark:text-zinc-900 ${
            isOpen ? "translate-y-16 scale-100 opacity-100" : "translate-y-0 scale-75 opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <PersonIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform duration-300 dark:bg-zinc-100 dark:text-zinc-900 ${
            isOpen ? "rotate-45 scale-105" : "rotate-0 scale-100"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
