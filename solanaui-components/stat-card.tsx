import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrendBadgeProps extends React.ComponentProps<typeof Badge> {
  trend?: "up" | "down";
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
    <Badge
      className={cn(
        isUp
          ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/25"
          : "bg-red-400/15 text-red-400 border-red-400/25",
        className,
      )}
      {...props}
    >
      <Icon className="size-3" />
      {children && <span className="text-xs">{children}</span>}
    </Badge>
  );
};

interface StatCardProps extends React.ComponentProps<typeof Card> {
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
    <Card className={cn("p-4 gap-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {change && <TrendBadge trend={trend}>{change}</TrendBadge>}
      </div>
    </Card>
  );
};

export type { StatCardProps, TrendBadgeProps };
export { StatCard, TrendBadge };
