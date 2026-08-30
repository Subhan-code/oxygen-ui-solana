"use client";

import { Tooltip } from "recharts";
import { format } from "date-fns";

type Payload = { name: string; value: number; color: string };

function TooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  let dateLabel = label;
  if (label) {
    const d = new Date(label);
    if (!isNaN(d.getTime())) dateLabel = format(d, "dd MMM yyyy");
  }

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md text-xs">
      {dateLabel && (
        <p className="mb-1.5 font-medium text-muted-foreground">{dateLabel}</p>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-muted-foreground">
              {entry.name.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="ml-auto font-semibold tabular-nums text-foreground">
              {entry.value.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartTooltip() {
  return (
    <Tooltip
      cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content={TooltipContent as any}
    />
  );
}
