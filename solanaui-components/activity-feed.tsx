"use client";

import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
    "loading",
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full bg-muted inline-flex items-center justify-center font-medium text-muted-foreground",
          className,
        )}
        style={{ width, height, fontSize }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative inline-block" style={{ width, height }}>
      {status === "loading" && (
        <Skeleton
          className={cn("rounded-full absolute inset-0", className)}
          style={{ width, height }}
        />
      )}
      <img
        alt={alt}
        className={cn(
          "rounded-full block",
          status === "loading" && "opacity-0",
          className,
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

interface ActivityFeedProps {
  items: {
    icon?: string;
    title: string;
    description?: string;
    timestamp: Date;
    value?: string;
  }[];
  className?: string;
}

const ActivityFeed = ({ items, className }: ActivityFeedProps) => {
  if (items.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        No recent activity
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <div
          key={`${item.title}-${i}`}
          className={cn(
            "flex items-center gap-3 py-3 px-1",
            i < items.length - 1 && "border-b",
          )}
        >
          {item.icon && (
            <TokenIcon
              src={item.icon}
              alt={item.title}
              width={32}
              height={32}
            />
          )}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{item.title}</span>
            {item.description && (
              <span className="text-xs text-muted-foreground truncate">
                {item.description}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end shrink-0">
            {item.value && (
              <span className="text-sm font-medium">{item.value}</span>
            )}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export type { ActivityFeedProps, TokenIconProps };
export { ActivityFeed, TokenIcon };
