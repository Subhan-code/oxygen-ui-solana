"use client";

import { formatDistanceToNow } from "date-fns";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
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
          "rounded-full inline-flex items-center justify-center font-medium text-muted-foreground bg-muted",
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
        alt={alt}
        className={cn(
          "rounded-full block object-cover w-full h-full shadow-xs",
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
    value?: string;
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
        className={cn("text-center py-8 text-xs font-medium text-muted-foreground", className)}
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
        "flex flex-col rounded-3xl border border-black/10 dark:border-white/12",
        "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-2 shadow-md select-none",
        className
      )}
      suppressHydrationWarning
      {...props}
    >
      {items.map((item, i) => (
        <motion.div
          key={`${item.title}-${i}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            ...springRow,
            delay: shouldReduceMotion ? 0 : i * 0.04,
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.01, backgroundColor: "rgba(0,0,0,0.03)" }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className={cn(
            "flex items-center gap-3.5 py-3 px-3 rounded-2xl cursor-pointer transition-colors duration-140",
            i < items.length - 1 && "border-b border-black/5 dark:border-white/5"
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
            <span className="text-[13.5px] font-bold text-foreground tracking-tight truncate">
              {item.title}
            </span>
            {item.description && (
              <span className="text-xs text-muted-foreground truncate mt-0.5">
                {item.description}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end shrink-0">
            {item.value && (
              <span className="text-xs font-bold text-foreground font-mono tracking-tight">
                {item.value}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground/80 mt-0.5 font-medium" suppressHydrationWarning>
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export type { ActivityFeedProps, TokenIconProps };
export { ActivityFeed, TokenIcon };
export default ActivityFeed;
