import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

interface TrendBadgeProps extends React.ComponentProps<"span"> {
  trend?: "up" | "down";
  children?: React.ReactNode;
}

const TrendBadge = ({
  trend = "up",
  children,
  className,
  ...props
}: TrendBadgeProps) => {
  const isUp = trend === "up";
  const Icon = isUp ? TrendingUpIcon : TrendingDownIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isUp
          ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/25"
          : "bg-red-400/15 text-red-400 border-red-400/25",
        className,
      )}
      {...props}
    >
      <Icon className="size-3" />
      {children && <span className="text-xs">{children}</span>}
    </span>
  );
};

export type { TrendBadgeProps };
export { TrendBadge };
