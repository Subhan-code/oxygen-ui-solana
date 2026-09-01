"use client";

import { formatDistanceToNow } from "date-fns";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800", className)} {...props} />
);

type TokenIconProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const TokenIcon = ({
  alt = "Token",
  className = "",
  width,
  height,
  src,
  ...props
}: TokenIconProps) => {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading"
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full inline-flex items-center justify-center font-bold text-zinc-400 bg-zinc-200 dark:bg-zinc-800",
          className
        )}
        style={{ width, height, fontSize }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative inline-block shrink-0" style={{ width, height }}>
      {status === "loading" && (
        <Skeleton
          className={cn("rounded-full absolute inset-0", className)}
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full block object-cover w-full h-full border border-zinc-200 dark:border-zinc-800 shadow-xs",
          status === "loading" && "opacity-0",
          className
        )}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    icon?: string;
    title: string;
    description?: string;
    timestamp: Date;
    value?: string | number;
  }[];
}

const springRow = {
  type: "spring" as const,
  stiffness: 480,
  damping: 30,
  mass: 0.65,
};

const ActivityFeed = ({ items, className, ...props }: ActivityFeedProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <div
        className={cn("text-center py-8 text-xs font-semibold text-zinc-400", className)}
        suppressHydrationWarning
      >
        No recent activity
      </div>
    );
  }

  return (
    <div
      data-slot="activity-feed"
      className={cn(
        "flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950 p-2 shadow-xl select-none font-sans text-zinc-900 dark:text-zinc-100",
        className
      )}
      suppressHydrationWarning
      {...props}
    >
      {items.map((item, i) => {
        const isNumeric = typeof item.value === "number";

        return (
          <motion.div
            key={`${item.title}-${i}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...springRow,
              delay: shouldReduceMotion ? 0 : i * 0.04,
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className={cn(
              "flex items-center gap-3.5 py-3 px-3 rounded-xl cursor-pointer transition-colors duration-140 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80",
              i < items.length - 1 && "border-b border-zinc-100 dark:border-zinc-900"
            )}
          >
            {item.icon && (
              <TokenIcon
                src={item.icon}
                alt={item.title}
                width={34}
                height={34}
              />
            )}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                {item.title}
              </span>
              {item.description && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-medium">
                  {item.description}
                </span>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0">
              {item.value !== undefined && (
                <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono tracking-tight">
                  {isNumeric ? (
                    <NumberFlow value={item.value as number} format={{ minimumFractionDigits: 2 }} />
                  ) : (
                    item.value
                  )}
                </span>
              )}
              <span className="text-[11px] text-zinc-400 font-mono mt-0.5" suppressHydrationWarning>
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export type { ActivityFeedProps, TokenIconProps };
export { ActivityFeed, TokenIcon };
export default ActivityFeed;
