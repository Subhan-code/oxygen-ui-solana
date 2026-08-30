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

interface StatCardProps extends React.ComponentProps<"div"> {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

const StatCard = ({
  label,
  value,
  change,
  trend = "up",
  icon,
  className,
  ...props
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-xs p-4 gap-2 flex flex-col justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {change && <TrendBadge trend={trend}>{change}</TrendBadge>}
      </div>
    </div>
  );
};

export type { StatCardProps, TrendBadgeProps };
export { StatCard, TrendBadge };
