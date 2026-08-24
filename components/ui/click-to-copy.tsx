"use client";

import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/lib/use-click-outside";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

export interface ClickToCopyProps {
  copyText: string;
  label?: string;
  confirmation?: string;
}

export function ClickToCopy({
  copyText,
  label = "Hover the button",
  confirmation = "✨ Copied ✨",
}: ClickToCopyProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [mobileClicked, setMobileClicked] = useState(false);

  const isMobile = useMediaQuery("(pointer: coarse)");

  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(buttonRef, () => {
    if (mobileClicked) setMobileClicked(false);
  });

  useEffect(() => {
    async function copyEmail() {
      try {
        await navigator.clipboard.writeText(copyText);
      } catch (err) {
        console.error("Failed to copy email:", err);
        const textarea = document.createElement("textarea");
        textarea.value = copyText;
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand("copy");
        } catch (execErr) {
          console.error("Fallback copy method failed:", execErr);
        }
        document.body.removeChild(textarea);
      }
    }

    if (hasClicked || mobileClicked) {
      copyEmail();
    }
  }, [hasClicked, isMobile, mobileClicked, copyText]);

  return (
    <div
      data-slot="click-to-copy"
      className="flex flex-col items-center gap-3 font-mono [--ease-custom:cubic-bezier(0.215,0.61,0.355,1)]"
    >
      <div className="relative w-full overflow-hidden whitespace-nowrap text-center text-sm [&>div]:transition-transform [&>div]:duration-500 [&>div]:ease-[--ease-custom]">
        <div
          className={cn("h-full w-full", {
            "-translate-y-full": isHovered,
            "-translate-y-[200%]": isHovered && hasClicked,
            "mobile:-translate-y-full": mobileClicked,
          })}
        >
          {label}
        </div>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full translate-y-full mobile:hidden",
            {
              "translate-y-0": isHovered,
              "-translate-y-full": isHovered && hasClicked,
            }
          )}
        >
          Click to copy
        </div>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full mobile:translate-y-full translate-y-[200%]",
            {
              "translate-y-full": isHovered && !hasClicked,
              "translate-y-0": (isHovered && hasClicked) || mobileClicked,
            }
          )}
        >
          {confirmation}
        </div>
      </div>
      <button
        ref={buttonRef}
        type="button"
        onPointerEnter={() => !isMobile && setIsHovered(true)}
        onPointerLeave={() => {
          if (!isMobile) {
            setIsHovered(false);
            setHasClicked(false);
          }
        }}
        onPointerDown={() => !isMobile && setHasClicked(true)}
        onClick={() => isMobile && setMobileClicked(true)}
        aria-label={label}
        className="group cursor-copy rounded-2xl bg-neutral-100 px-8 py-5 text-xl transition-colors duration-200 ease-[--ease-custom] hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 select-none"
      >
        <div className="transition-transform duration-500 ease-[--ease-custom] group-active:scale-[97%]">
          <div className="transition-transform duration-500 ease-[--ease-custom] group-hover:scale-[97%]">
            {copyText}
          </div>
        </div>
      </button>
    </div>
  );
}
