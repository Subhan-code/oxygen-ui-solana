"use client";

import { CartesianGrid } from "recharts";

interface GridProps {
  horizontal?: boolean;
  vertical?: boolean;
}

export default function Grid({ horizontal = false, vertical = false }: GridProps) {
  return (
    <CartesianGrid
      horizontal={horizontal}
      vertical={vertical}
      strokeDasharray="3 3"
      stroke="var(--border)"
    />
  );
}
