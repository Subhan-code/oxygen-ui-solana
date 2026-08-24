"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

export type TextRollProps = {
  initialText: string;
  rollingText: string;
  isRolling: boolean;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
  scrollLeft: number;
};

export function TextRoll({
  initialText,
  rollingText,
  isRolling,
  getEnterDelay = (i) => i * 0.045,
  getExitDelay = (i) => i * 0.045,
  className,
  transition = { duration: 0.45, ease: [0.645, 0.045, 0.355, 1] },
  onAnimationComplete,
  variants,
  scrollLeft = 0,
}: TextRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 0, opacity: 1, filter: "blur(0px)" },
      animate: { rotateX: 90, opacity: 0, filter: "blur(1px)" },
    },
    exit: {
      initial: { rotateX: 90, opacity: 0, filter: "blur(1px)" },
      animate: { rotateX: 0, opacity: 1, filter: "blur(0px)" },
    },
  } as const;

  const maxLength = Math.max(initialText.length, rollingText.length);
  const initialLetters = initialText.padEnd(maxLength, " ").split("");
  const rollingLetters = rollingText.padEnd(maxLength, " ").split("");

  return (
    <motion.span
      style={{
        transform: `translateX(-${scrollLeft}px)`,
        transition: "transform 0s",
        whiteSpace: "nowrap",
      }}
      className={className}
    >
      {initialLetters.map((_, i) => {
        const initialLetter = initialLetters[i];
        const rollingLetter = rollingLetters[i];

        return (
          <span
            key={i}
            className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
              initial={false}
              animate={
                isRolling
                  ? variants?.enter?.animate ?? defaultVariants.enter.animate
                  : variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              transition={{
                ...transition,
                delay: getEnterDelay(i),
              }}
            >
              {initialLetter === " " ? "\u00A0" : initialLetter}
            </motion.span>
            <motion.span
              className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_125%]"
              initial={false}
              animate={
                isRolling
                  ? variants?.exit?.animate ?? defaultVariants.exit.animate
                  : variants?.exit?.initial ?? defaultVariants.exit.initial
              }
              transition={{
                ...transition,
                delay: getExitDelay(i),
              }}
              onAnimationComplete={
                initialLetters.length === i + 1 ? onAnimationComplete : undefined
              }
            >
              {rollingLetter === " " ? "\u00A0" : rollingLetter}
            </motion.span>
            <span className="invisible">
              {initialLetter === " " ? "\u00A0" : initialLetter}
            </span>
          </span>
        );
      })}
      <span className="sr-only">{isRolling ? rollingText : initialText}</span>
    </motion.span>
  );
}

export function EyeIcon({
  open,
  size = 20,
  className,
}: {
  open: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("select-none flex items-center justify-center", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          initial={false}
          animate={{
            scale: open ? 1 : 0.75,
            opacity: open ? 1 : 0.6,
          }}
          transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
        />
        <motion.line
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          initial={false}
          animate={{
            pathLength: open ? 0 : 1,
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        />
      </svg>
    </div>
  );
}

export function PasswordInput({
  defaultValue = "password",
}: {
  defaultValue?: string;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [scrollLeft, setScrollLeft] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputId = "password-input";
  const toggleButtonId = "password-toggle";

  const syncScroll = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      if (inputRef.current) {
        setScrollLeft(inputRef.current.scrollLeft);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    syncScroll();
  };

  const handleMouseDown = useCallback(() => {
    containerRef.current?.setAttribute("data-mouse-focus", "true");
  }, []);

  const handleBlur = useCallback(() => {
    containerRef.current?.removeAttribute("data-mouse-focus");
  }, []);

  return (
    <div
      data-slot="password-input"
      className="flex flex-col justify-center w-full max-w-64 mx-auto"
    >
      <div className="mb-0.5">
        <label
          htmlFor={inputId}
          className="font-medium text-sm text-neutral-800 dark:text-neutral-100"
        >
          Password
        </label>
        <span
          aria-hidden="true"
          className="text-sm text-neutral-500 dark:text-neutral-300 ml-0.5"
        >
          *
        </span>
        <span className="sr-only">(required)</span>
      </div>
      <div ref={containerRef} className="w-full max-w-64 relative">
        <input
          ref={inputRef}
          value={value}
          required
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          type="password"
          id={inputId}
          aria-label="Password"
          placeholder="Password"
          aria-describedby={toggleButtonId}
          onChange={handleChange}
          onSelect={syncScroll}
          onKeyUp={syncScroll}
          onClick={syncScroll}
          onMouseDown={handleMouseDown}
          onBlur={handleBlur}
          className="flex h-12 w-full rounded-[14px] bg-neutral-100 dark:bg-neutral-800 tabular-nums font-mono text-transparent caret-neutral-800 dark:caret-neutral-100 pl-4 py-2 pr-12 text-[16px] transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none [&:focus-visible:not([data-mouse-focus]_&)]:ring-2 [&:focus-visible:not([data-mouse-focus]_&)]:ring-neutral-500"
        />
        <div
          aria-hidden
          className="font-mono tabular-nums absolute inset-0 pl-4 py-2 pr-12 text-[16px] flex items-center pointer-events-none text-neutral-900 dark:text-neutral-100"
        >
          <div className="overflow-hidden w-full flex">
            <TextRoll
              className="whitespace-nowrap w-full leading-none"
              initialText={value}
              rollingText={value
                .split("")
                .map(() => "•")
                .join("")}
              isRolling={!isPasswordVisible}
              scrollLeft={scrollLeft}
            />
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          <motion.button
            type="button"
            aria-label={!isPasswordVisible ? "Show password" : "Hide password"}
            id={toggleButtonId}
            aria-controls={inputId}
            aria-pressed={isPasswordVisible}
            className={cn(
              "size-7 flex justify-center items-center rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500",
              {
                "text-neutral-600 dark:text-neutral-400": !isPasswordVisible,
                "text-neutral-900 dark:text-neutral-100": isPasswordVisible,
              }
            )}
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", bounce: 0 }}
          >
            <EyeIcon open={isPasswordVisible} size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
