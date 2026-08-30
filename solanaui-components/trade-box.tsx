"use client";

import { Check, ChevronsUpDown, WalletIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

interface TradeButtonsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  labels?: [string, string];
  className?: string;
}

const TradeButtons = ({
  defaultValue = "long",
  value,
  onValueChange,
  labels = ["Long", "Short"],
  className,
}: TradeButtonsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleValueChange = (newValue: string) => {
    if (!newValue) return;
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      value={currentValue}
      onValueChange={handleValueChange}
      className={cn("w-full", className)}
    >
      <ToggleGroupItem
        value="long"
        aria-label={`Toggle ${labels[0]}`}
        className={cn(
          "flex-1 shrink transition-colors",
          currentValue === "long"
            ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/25 hover:bg-emerald-500/25 hover:text-emerald-500 data-[state=on]:bg-emerald-500/15 data-[state=on]:text-emerald-500"
            : "hover:bg-muted/80",
        )}
      >
        {labels[0]}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="short"
        aria-label={`Toggle ${labels[1]}`}
        className={cn(
          "flex-1 shrink transition-colors",
          currentValue === "short"
            ? "bg-red-400/15 text-red-400 border-red-400/25 hover:bg-red-400/25 hover:text-red-400 data-[state=on]:bg-red-400/15 data-[state=on]:text-red-400"
            : "hover:bg-muted/80",
        )}
      >
        {labels[1]}
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

interface LeverageSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const LeverageSlider = ({
  min,
  max,
  step,
  value,
  defaultValue,
  onValueChange,
  className,
}: LeverageSliderProps) => {
  const [displayValue, setDisplayValue] = React.useState(
    defaultValue?.[0] ?? min ?? 0,
  );

  const currentValue = value?.[0] ?? displayValue;

  const handleValueChange = (newValue: number[]) => {
    setDisplayValue(newValue[0]);
    onValueChange?.(newValue);
  };

  const handleMinClick = () => {
    if (min !== undefined) {
      handleValueChange([min]);
    }
  };

  const handleMaxClick = () => {
    if (max !== undefined) {
      handleValueChange([max]);
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <Label className="text-muted-foreground">Leverage</Label>
        <span className="font-medium">{currentValue}x</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value ?? [displayValue]}
        onValueChange={handleValueChange}
      />
      {(min !== undefined || max !== undefined) && (
        <div className="flex mt-2 text-xs text-muted-foreground">
          {min !== undefined && (
            <button
              type="button"
              onClick={handleMinClick}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {min}x
            </button>
          )}
          {max !== undefined && (
            <button
              type="button"
              onClick={handleMaxClick}
              className="ml-auto hover:text-foreground transition-colors cursor-pointer"
            >
              {max}x
            </button>
          )}
        </div>
      )}
    </div>
  );
};

type TradeBoxDetail = DetailRow;

interface TradeBoxProps {
  tokens: { icon: string; symbol: string }[];
  defaultToken?: string;
  balance?: string;
  labels?: [string, string];
  defaultSide?: string;
  leverageMin?: number;
  leverageMax?: number;
  leverageDefault?: number;
  leverageStep?: number;
  details?: TradeBoxDetail[];
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
}

const TradeBox = ({
  tokens,
  defaultToken,
  balance,
  labels = ["Long", "Short"],
  defaultSide = "long",
  leverageMin = 1,
  leverageMax = 50,
  leverageDefault = 5,
  leverageStep = 1,
  details,
  submitLabel = "Open Long",
  onSubmit,
  className,
}: TradeBoxProps) => {
  return (
    <div className={cn("flex flex-col gap-4 border rounded-lg p-4", className)}>
      <TradeButtons defaultValue={defaultSide} labels={labels} />
      <Separator />
      <div className="flex flex-col gap-2">
        <TokenInput
          tokens={tokens}
          defaultToken={defaultToken}
          balance={balance}
        />
      </div>
      <LeverageSlider
        min={leverageMin}
        max={leverageMax}
        defaultValue={[leverageDefault]}
        step={leverageStep}
      />
      {details && details.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-1.5 text-sm">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between">
                <span className="text-muted-foreground">{detail.label}</span>
                <span className={detail.className}>{detail.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <Button className="w-full" size="lg" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
};

export type {
  DetailRow,
  LeverageSliderProps,
  TokenInputProps,
  TradeBoxDetail,
  TradeBoxProps,
  TradeButtonsProps,
};
export { LeverageSlider, TokenInput, TradeBox, TradeButtons };
