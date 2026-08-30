"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type SortDirection = "asc" | "desc" | null;

const parseNumericValue = (value: string): number => {
  const cleaned = value.replace(/[$,%x,+]/g, "");
  const num = Number.parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
};

const isNumericString = (value: string): boolean => {
  const cleaned = value.replace(/[$,%x,+\s-]/g, "");
  return /\d/.test(cleaned);
};

const compareValues = (a: string, b: string): number => {
  if (isNumericString(a) || isNumericString(b)) {
    return parseNumericValue(a) - parseNumericValue(b);
  }
  return a.localeCompare(b);
};


const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
);


function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

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

interface PoolTableColumn {
  key: string;
  label: string;
  className?: string;
}

interface PoolTableRow {
  icons: { src: string; alt?: string }[];
  name?: string;
  data: Record<string, string>;
}

interface PoolTableProps {
  columns: PoolTableColumn[];
  rows: PoolTableRow[];
  actions?: React.ReactNode[];
  className?: string;
}

const PoolTable = ({ columns, rows, actions, className }: PoolTableProps) => {
  const showActions = actions && actions.length > 0;
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortKey(null);
      setSortDirection(null);
    }
  };

  const sortedIndices = React.useMemo(() => {
    const indices = rows.map((_, i) => i);
    if (!sortKey || !sortDirection) return indices;

    return indices.sort((a, b) => {
      let valA: string;
      let valB: string;

      if (sortKey === "__name__") {
        valA =
          rows[a].name ??
          rows[a].icons
            .map((t) => t.alt)
            .filter(Boolean)
            .join("/");
        valB =
          rows[b].name ??
          rows[b].icons
            .map((t) => t.alt)
            .filter(Boolean)
            .join("/");
      } else {
        valA = rows[a].data[sortKey] ?? "";
        valB = rows[b].data[sortKey] ?? "";
      }

      const result = compareValues(valA, valB);
      return sortDirection === "desc" ? -result : result;
    });
  }, [rows, sortKey, sortDirection]);

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              type="button"
              onClick={() => handleSort("__name__")}
              className={cn(
                "inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors",
                sortKey === "__name__"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Name
              {sortKey === "__name__" && sortDirection === "asc" && (
                <ChevronUpIcon className="size-3.5" />
              )}
              {sortKey === "__name__" && sortDirection === "desc" && (
                <ChevronDownIcon className="size-3.5" />
              )}
            </button>
          </TableHead>
          {columns.map((col) => {
            const isActive = sortKey === col.key;
            return (
              <TableHead key={col.key} className={col.className}>
                <button
                  type="button"
                  onClick={() => handleSort(col.key)}
                  className={cn(
                    "inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {col.label}
                  {isActive && sortDirection === "asc" && (
                    <ChevronUpIcon className="size-3.5" />
                  )}
                  {isActive && sortDirection === "desc" && (
                    <ChevronDownIcon className="size-3.5" />
                  )}
                </button>
              </TableHead>
            );
          })}
          {showActions && <TableHead className="text-right" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedIndices.map((originalIndex) => {
          const row = rows[originalIndex];
          const rowName =
            row.name ??
            row.icons
              .map((t) => t.alt)
              .filter(Boolean)
              .join("/");

          return (
            <TableRow
              key={`${rowName}-${row.data[columns[0]?.key] ?? originalIndex}`}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <TokenIconGroup
                    tokens={row.icons}
                    size={20}
                    overlap={row.icons.length > 1 ? -6 : 0}
                  />
                  <span className="font-medium">{rowName}</span>
                </div>
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.key} className={cn(col.className)}>
                  {row.data[col.key] ?? "-"}
                </TableCell>
              ))}
              {showActions && actions[originalIndex] && (
                <TableCell className="text-right">
                  {actions[originalIndex]}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export type {
  PoolTableColumn,
  PoolTableProps,
  PoolTableRow,
  SortDirection,
  TokenIconGroupProps,
  TokenIconProps,
};
export { PoolTable, TokenIcon, TokenIconGroup };
