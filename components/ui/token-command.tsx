"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}


import { Check, ChevronsUpDown, Search } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const Button = ({ className, size, variant, ...props }: React.ComponentProps<"button"> & { size?: string; variant?: string }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props} />
);


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

interface TokenCommandToken {
  icon: string;
  symbol: string;
}

interface TokenCommandGroup {
  heading: string;
  tokens: TokenCommandToken[];
}

type TokenCommandProps = {
  onSelect?: (token: TokenCommandToken) => void;
  className?: string;
} & (
  | { tokens: TokenCommandToken[]; groups?: never }
  | { groups: TokenCommandGroup[]; tokens?: never }
);

const TokenCommand = ({
  tokens,
  groups,
  onSelect,
  className,
}: TokenCommandProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const allTokens = React.useMemo(() => {
    if (tokens) return tokens;
    if (groups) return groups.flatMap((g) => g.tokens);
    return [];
  }, [tokens, groups]);

  const activeToken = allTokens.find(
    (token) => token.symbol.toLowerCase() === value.toLowerCase(),
  );

  const filteredTokens = allTokens.filter((t) =>
    t.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {activeToken ? (
            <div className="flex items-center gap-2.5">
              <TokenIcon
                src={activeToken.icon}
                alt={activeToken.symbol}
                width={20}
                height={20}
              />
              {activeToken.symbol}
            </div>
          ) : (
            "Select token..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2 border-b pb-2">
          <Search className="size-4 shrink-0 opacity-50" />
          <input
            placeholder="Search token..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-hidden"
          />
        </div>
        <div className="max-h-48 overflow-y-auto flex flex-col gap-1">
          {filteredTokens.length === 0 ? (
            <span className="text-xs text-muted-foreground p-2 text-center">
              No tokens found.
            </span>
          ) : (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                type="button"
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm hover:bg-accent hover:text-accent-foreground text-left cursor-pointer"
                onClick={() => {
                  const newValue =
                    token.symbol.toLowerCase() === value.toLowerCase()
                      ? ""
                      : token.symbol;
                  setValue(newValue);
                  setOpen(false);
                  if (newValue) {
                    onSelect?.(token);
                  }
                }}
              >
                <TokenIcon
                  src={token.icon}
                  alt={token.symbol}
                  width={20}
                  height={20}
                />
                <span className="flex-1 truncate">{token.symbol}</span>
                <Check
                  className={cn(
                    "size-4 ml-auto",
                    value.toLowerCase() === token.symbol.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export type {
  TokenCommandGroup,
  TokenCommandProps,
  TokenCommandToken,
  TokenIconProps,
};
export { TokenCommand, TokenIcon };
