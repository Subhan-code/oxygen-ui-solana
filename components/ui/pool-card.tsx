"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
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
    "loading",
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full inline-flex items-center justify-center font-medium text-muted-foreground",
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
          "rounded-full block object-cover w-full h-full",
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

interface TokenIconGroupProps {
  tokens: { src: string; alt?: string }[];
  size?: number;
  overlap?: number;
  max?: number;
  className?: string;
}

const TokenIconGroup = ({
  tokens,
  size = 24,
  overlap = -10,
  max = 4,
  className,
}: TokenIconGroupProps) => {
  const visible = tokens.slice(0, max);
  const remaining = tokens.length - max;
  const hasOverlap = visible.length > 1 || remaining > 0;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((token, i) => (
        <div
          key={`${token.src}-${i}`}
          className={cn(
            "rounded-full relative leading-[0]",
            hasOverlap && "ring-2 ring-background",
          )}
          style={{
            marginLeft: i === 0 ? 0 : overlap,
            zIndex: visible.length + 1 - i,
          }}
        >
          <TokenIcon
            src={token.src}
            alt={token.alt ?? "Token"}
            width={size}
            height={size}
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className="relative flex items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background font-medium"
          style={{
            width: size,
            height: size,
            marginLeft: overlap,
            fontSize: size * 0.35,
            zIndex: visible.length + 2,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

interface SparklineChartProps {
  series: {
    time: string;
    value: number;
  }[];
  className?: string;
}

const POSITIVE_COLOR = "hsl(160 84% 39%)";
const NEGATIVE_COLOR = "hsl(0 84% 67%)";

const SparklineChart = ({ series, className }: SparklineChartProps) => {
  if (!series.length) return null;

  const minValue = Math.min(...series.map((s) => s.value));
  const maxValue = Math.max(...series.map((s) => s.value));

  const firstValue = series[0].value;
  const lastValue = series[series.length - 1].value;
  const percentChange =
    firstValue !== 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;
  const isPositive = percentChange >= 0;
  const chartColor = isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR;

  return (
    <div className={cn("relative w-full h-[60px]", className)}>
      <div className="w-full h-[60px] shrink-0 pr-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <YAxis domain={[minValue, maxValue]} hide />
            <Line
              dataKey="value"
              type="natural"
              dot={false}
              stroke={chartColor}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        className={cn(
          "absolute right-0 z-10",
          isPositive ? "top-0" : "bottom-0",
        )}
      >
        <span
          className={cn(
            "text-xs font-medium",
            isPositive ? "text-emerald-500" : "text-red-400",
          )}
        >
          {isPositive ? "+" : ""}
          {percentChange.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

interface PoolCardMetric {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

interface PoolCardProps extends React.ComponentProps<"div"> {
  tokens: { icon: string; symbol: string }[];
  name?: string;
  price?: string;
  description?: string;
  metrics?: PoolCardMetric[];
  series?: { time: string; value: number }[];
  children?: React.ReactNode;
}

const PoolCard = ({
  tokens,
  name,
  price,
  description,
  metrics,
  series,
  children,
  className,
  ...props
}: PoolCardProps) => {
  const displayName = name ?? tokens.map((t) => t.symbol).join("/");
  const iconTokens = tokens.map((t) => ({ src: t.icon, alt: t.symbol }));
  const iconSize = tokens.length > 1 ? 28 : 36;
  const iconOverlap = tokens.length > 1 ? -10 : 0;

  const highlightMetric = metrics?.find((m) => m.highlight);
  const regularMetrics = metrics?.filter((m) => !m.highlight);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-xs p-4 w-full flex flex-col gap-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 text-xl font-semibold tracking-tight">
          <div className="flex items-center gap-2">
            <TokenIconGroup
              tokens={iconTokens}
              size={iconSize}
              overlap={iconOverlap}
            />
            {displayName}
          </div>
          {price && <span>{price}</span>}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground text-left">{description}</p>
        )}
      </div>

      {highlightMetric && (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">
            {highlightMetric.label}
          </span>
          <span
            className={cn(
              "text-2xl font-bold tracking-tight",
              highlightMetric.className,
            )}
          >
            {highlightMetric.value}
          </span>
        </div>
      )}

      {regularMetrics && regularMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {regularMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                {metric.label}
              </span>
              <span className={cn("font-medium", metric.className)}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {series && series.length > 0 && (
        <div>
          <SparklineChart series={series} />
        </div>
      )}

      {children && <div>{children}</div>}
    </div>
  );
};

export type {
  PoolCardMetric,
  PoolCardProps,
  SparklineChartProps,
  TokenIconGroupProps,
  TokenIconProps,
};
export { PoolCard, SparklineChart, TokenIcon, TokenIconGroup };
