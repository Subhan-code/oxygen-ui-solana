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
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-150 ease-[var(--ease-out-expo)]",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}


import { Check, ChevronsUpDown, Search, WalletIcon } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";


import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <SliderPrimitive.Range className="absolute h-full bg-sky-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-sky-500 bg-white ring-offset-white transition-transform active:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 shadow-md cursor-grab active:cursor-grabbing" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;



const Button = ({ className, size, variant, ...props }: React.ComponentProps<"button"> & { size?: string; variant?: string }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium motion-safe:transition-[transform,background-color,color] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-quad)] motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 disabled:pointer-events-none disabled:opacity-50 h-11 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props} />
);


const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
);


const Separator = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("shrink-0 bg-border h-[1px] w-full", className)} {...props} />
);

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
  const [search, setSearch] = React.useState("");

  const activeToken = tokens.find(
    (token) => token.symbol.toLowerCase() === value.toLowerCase(),
  );

  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(search.toLowerCase()),
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

const TradeInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md bg-transparent text-sm shadow-none outline-hidden focus:outline-hidden border-none",
        className,
      )}
      {...props}
    />
  ),
);
TradeInput.displayName = "TradeInput";

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
            customInput={TradeInput}
            className="text-right bg-transparent pr-1 shadow-none border-none focus:ring-0 focus:outline-hidden w-full md:text-xl"
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
        <label className="text-muted-foreground text-sm font-medium leading-none">Leverage</label>
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
