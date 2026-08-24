"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useId,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface SmoothTabsContextValue {
  value: string;
  select: (value: string) => void;
  direction: number;
  contentOffsetX: number;
  layoutId: string;
}

const SmoothTabsContext = createContext<SmoothTabsContextValue | null>(null);

export function useSmoothTabsContext() {
  const ctx = useContext(SmoothTabsContext);
  if (!ctx) {
    throw new Error("useSmoothTabsContext must be used within <SmoothTabs />");
  }
  return {
    value: ctx.value,
    select: ctx.select,
  };
}

export interface SmoothTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  contentOffsetX?: number;
  children?: ReactNode;
}

export function SmoothTabs({
  defaultValue = "",
  value: propValue,
  onValueChange,
  contentOffsetX = 50,
  children,
  className,
  ...props
}: SmoothTabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [direction, setDirection] = useState(0);
  const prevValueRef = useRef(internalValue);
  const layoutId = useId();

  const isControlled = propValue !== undefined;
  const activeValue = isControlled ? propValue : internalValue;

  const select = (nextValue: string) => {
    if (nextValue === activeValue) return;
    setDirection(nextValue > activeValue ? 1 : -1);
    prevValueRef.current = activeValue;
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <SmoothTabsContext.Provider
      value={{
        value: activeValue,
        select,
        direction,
        contentOffsetX,
        layoutId,
      }}
    >
      <LayoutGroup id={layoutId}>
        <div
          data-slot="smooth-tabs"
          className={cn("flex flex-col w-full select-none", className)}
          {...props}
        >
          {children}
        </div>
      </LayoutGroup>
    </SmoothTabsContext.Provider>
  );
}

export function SmoothTabsList({
  ariaLabel,
  children,
  className,
}: {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl border border-neutral-200 bg-neutral-100 p-1.5 dark:border-neutral-800 dark:bg-neutral-900 shadow-xs",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SmoothTabsTab({
  value,
  children,
  className,
}: {
  value: string;
  children?: ReactNode;
  className?: string;
}) {
  const ctx = useContext(SmoothTabsContext);
  if (!ctx) return null;

  const isSelected = ctx.value === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      onClick={() => ctx.select(value)}
      className={cn(
        "relative rounded-xl px-4 py-2 text-xs font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none",
        isSelected
          ? "text-neutral-900 dark:text-neutral-100"
          : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200",
        className
      )}
    >
      {isSelected ? (
        <motion.div
          layoutId={`smooth-tab-pill-${ctx.layoutId}`}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 32,
          }}
          className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-neutral-800"
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function SmoothTabsPanels({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const ctx = useContext(SmoothTabsContext);
  if (!ctx) return null;

  let activeChild: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && (child.props as { value?: string }).value === ctx.value) {
      activeChild = (child.props as { children?: ReactNode }).children;
    }
  });

  const tabVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d * ctx.contentOffsetX,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (d: number) => ({
      opacity: 0,
      x: -d * ctx.contentOffsetX,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className={cn("relative overflow-hidden mt-4 w-full", className)}>
      <AnimatePresence mode="popLayout" custom={ctx.direction} initial={false}>
        <motion.div
          key={ctx.value}
          role="tabpanel"
          custom={ctx.direction}
          variants={tabVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 28,
          }}
          className="w-full"
        >
          {activeChild}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function SmoothTabsPanel({
  children,
}: {
  value: string;
  children?: ReactNode;
  className?: string;
}) {
  return <>{children}</>;
}
