"use client";

import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

interface PositionCardProps extends React.ComponentProps<typeof Card> {
  symbol: string;
  icon: string;
  amount: string;
  value: string;
  apy?: string;
  trend?: "up" | "down";
  children?: React.ReactNode;
}

const PositionCard = ({
  symbol,
  icon,
  amount,
  value,
  apy,
  trend = "up",
  children,
  className,
  ...props
}: PositionCardProps) => {
  return (
    <Card className={cn("p-4 w-full gap-3", className)} {...props}>
      <CardContent className="flex items-center justify-between p-0 pb-2">
        <div className="flex items-center gap-3">
          <TokenIcon src={icon} alt={symbol} width={48} height={48} />
          <div className="flex flex-col">
            <span className="text-xl font-medium">{symbol}</span>
            {apy && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" ? "text-emerald-500" : "text-red-400",
                )}
              >
                {apy} APY
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-medium">{amount}</span>
          <span className="text-sm text-muted-foreground">{value}</span>
        </div>
      </CardContent>

      {children && <CardFooter className="p-0">{children}</CardFooter>}
    </Card>
  );
};

export type { PositionCardProps, TokenIconProps };
export { PositionCard, TokenIcon };
