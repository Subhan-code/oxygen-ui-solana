"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

interface TokenComboboxProps {
  tokens: {
    icon: string;
    symbol: string;
  }[];
  defaultValue?: string;
  onSelect?: (token: { icon: string; symbol: string }) => void;
  className?: string;
}

const TokenCombobox = ({
  tokens,
  defaultValue,
  onSelect,
  className,
}: TokenComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? "");

  const activeToken = tokens.find(
    (token) => token.symbol.toLowerCase() === value.toLowerCase(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("shrink-0 justify-between", className)}
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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search token..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.symbol}
                  value={token.symbol}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    if (newValue) {
                      const selected = tokens.find(
                        (t) =>
                          t.symbol.toLowerCase() === newValue.toLowerCase(),
                      );
                      if (selected) onSelect?.(selected);
                    }
                  }}
                >
                  <TokenIcon
                    src={token.icon}
                    alt={token.symbol}
                    width={20}
                    height={20}
                  />
                  {token.symbol}
                  <Check
                    className={cn(
                      "ml-auto",
                      value.toLowerCase() === token.symbol.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export type { TokenComboboxProps, TokenIconProps };
export { TokenCombobox, TokenIcon };
