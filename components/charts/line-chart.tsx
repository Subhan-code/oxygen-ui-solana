"use client";

import * as React from "react";
import {
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Line as RechartsLine,
  type LineProps,
} from "recharts";
import { cn } from "@/lib/utils";

interface LineChartProps {
  data: Record<string, unknown>[];
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  children?: React.ReactNode;
}

export default function LineChart({
  data,
  margin = { top: 8, right: 16, bottom: 32, left: 16 },
  className,
  children,
}: LineChartProps) {
  return (
    <div className={cn("aspect-2/1 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={margin}>
          {children}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Line(props: LineProps) {
  return (
    <RechartsLine
      type="monotone"
      dot={false}
      activeDot={{ r: 4, strokeWidth: 0 }}
      {...props}
    />
  );
}
