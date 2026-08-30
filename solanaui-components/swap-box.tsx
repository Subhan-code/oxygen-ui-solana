"use client";

import {
  ArrowDownUpIcon,
  Check,
  ChevronsUpDown,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DetailRow {
  label: string;
  value: string;
  className?: string;
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

interface TokenInputProps {
  tokens: { icon: string; symbol: string }[];
  defaultToken?: string;
  balance?: string;
  value?: string;
  usdValue?: string;
  onValueChange?: (value: string) => void;
  onTokenSelect?: (token: { icon: string; symbol: string }) => void;
  className?: string;
}

const TokenInput = ({
  tokens,
  defaultToken,
  balance,
  value,
  usdValue,
  onValueChange,
  onTokenSelect,
  className,
}: TokenInputProps) => {
  const [internalValue, setInternalValue] = React.useState(value ?? "");
  const currentValue = value ?? internalValue;

  const handleValueChange = (values: { value: string }) => {
    setInternalValue(values.value);
    onValueChange?.(values.value);
  };

  const handleQuickAmount = (fraction: number) => {
    if (!balance) return;
    const numericBalance = Number.parseFloat(balance.replace(/,/g, ""));
    if (Number.isNaN(numericBalance)) return;
    const newValue = (numericBalance * fraction).toString();
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border p-4 rounded-lg w-full",
        className,
      )}
    >
      {balance && (
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <WalletIcon className="size-3.5" />
            {balance}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2 rounded-sm"
              onClick={() => handleQuickAmount(0.5)}
            >
              Half
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2 rounded-sm"
              onClick={() => handleQuickAmount(1)}
            >
              Max
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 w-full">
        <TokenCombobox
          tokens={tokens}
          defaultValue={defaultToken}
          onSelect={onTokenSelect}
        />
        <div className="flex flex-col flex-1 min-w-0 items-end">
          <NumericFormat
            value={currentValue}
            onValueChange={handleValueChange}
            thousandSeparator=","
            decimalSeparator="."
            allowNegative={false}
            placeholder="0"
            inputMode="decimal"
            customInput={Input}
            className="text-right bg-transparent pr-1 dark:bg-transparent shadow-none border-none focus:ring-0 focus-visible:ring-0 w-full md:text-xl"
          />
          {usdValue && (
            <span className="text-xs text-muted-foreground pr-1">
              {usdValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

type SwapBoxDetail = DetailRow;

interface SwapBoxProps {
  tokens: { icon: string; symbol: string }[];
  defaultFromToken?: string;
  defaultToToken?: string;
  fromBalance?: string;
  toBalance?: string;
  fromLabel?: string;
  toLabel?: string;
  details?: SwapBoxDetail[];
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
}

const SwapBox = ({
  tokens,
  defaultFromToken,
  defaultToToken,
  fromBalance,
  toBalance,
  fromLabel = "Sell",
  toLabel = "Buy",
  details,
  submitLabel = "Swap",
  onSubmit,
  className,
}: SwapBoxProps) => {
  const [fromToken, setFromToken] = React.useState(defaultFromToken);
  const [toToken, setToToken] = React.useState(defaultToToken);
  const [fromBal, setFromBal] = React.useState(fromBalance);
  const [toBal, setToBal] = React.useState(toBalance);

  const handleFlip = () => {
    const prevFrom = fromToken;
    const prevTo = toToken;
    const prevFromBal = fromBal;
    const prevToBal = toBal;
    setFromToken(prevTo);
    setToToken(prevFrom);
    setFromBal(prevToBal);
    setToBal(prevFromBal);
  };

  return (
    <div className={cn("flex flex-col border rounded-lg p-5", className)}>
      <div className="w-full flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {fromLabel}
        </span>
        <TokenInput
          key={`from-${fromToken}`}
          tokens={tokens}
          defaultToken={fromToken}
          balance={fromBal}
          onTokenSelect={(token) => setFromToken(token.symbol)}
        />
      </div>
      <div className="flex items-center justify-center pt-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full size-9 bg-background border-2"
          onClick={handleFlip}
        >
          <ArrowDownUpIcon className="size-4" />
        </Button>
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {toLabel}
        </span>
        <TokenInput
          key={`to-${toToken}`}
          tokens={tokens}
          defaultToken={toToken}
          balance={toBal}
          onTokenSelect={(token) => setToToken(token.symbol)}
        />
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {details && details.length > 0 && (
          <div className="flex flex-col gap-1.5 text-sm">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between">
                <span className="text-muted-foreground">{detail.label}</span>
                <span className={detail.className}>{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        <Button className="w-full" size="lg" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export type { DetailRow, SwapBoxDetail, SwapBoxProps, TokenInputProps };
export { SwapBox, TokenInput };
