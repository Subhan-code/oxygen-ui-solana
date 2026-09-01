"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, Search, WalletIcon } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";

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
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-4 text-zinc-900 dark:text-zinc-100 shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-150 ease-out",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

const Button = ({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"button"> & { size?: string; variant?: string }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight transition-all duration-150",
      "cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-50",
      "h-11 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-md",
      className
    )}
    {...props}
  />
);

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800", className)} {...props} />
);

const Separator = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("shrink-0 bg-zinc-200 dark:bg-zinc-800 h-[1px] w-full", className)} {...props} />
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
  src,
  ...props
}: TokenIconProps) => {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading"
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full inline-flex items-center justify-center font-bold text-zinc-400 bg-zinc-200 dark:bg-zinc-800",
          className
        )}
        style={{ width, height, fontSize }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative inline-block shrink-0" style={{ width, height }}>
      {status === "loading" && (
        <Skeleton
          className={cn("rounded-full absolute inset-0", className)}
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full block object-cover w-full h-full border border-zinc-200 dark:border-zinc-800",
          status === "loading" && "opacity-0",
          className
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

const ActionInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-transparent bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
ActionInput.displayName = "ActionInput";

interface TokenItem {
  icon: string;
  symbol: string;
}

interface TokenComboboxProps {
  tokens: TokenItem[];
  defaultValue?: string;
  onSelect?: (token: TokenItem) => void;
}

const TokenCombobox = ({
  tokens,
  defaultValue,
  onSelect,
}: TokenComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState<TokenItem | undefined>(
    tokens.find((t) => t.symbol === defaultValue) || tokens[0]
  );
  const [search, setSearch] = React.useState("");

  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (token: TokenItem) => {
    setSelectedToken(token);
    onSelect?.(token);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-xl bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 px-3 py-2 text-xs font-bold tracking-tight text-zinc-900 dark:text-white transition-all cursor-pointer active:scale-95 outline-none border border-zinc-300/40 dark:border-zinc-700/40"
        >
          {selectedToken && (
            <TokenIcon
              src={selectedToken.icon}
              alt={selectedToken.symbol}
              width={20}
              height={20}
            />
          )}
          <span>{selectedToken ? selectedToken.symbol : "Select"}</span>
          <ChevronsUpDown className="size-3.5 opacity-50 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-56" align="start">
        <div className="flex items-center gap-2 px-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="size-3.5 opacity-50 text-zinc-400" />
          <input
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs outline-none w-full placeholder:text-zinc-400 text-zinc-900 dark:text-white"
          />
        </div>
        <div className="max-h-48 overflow-y-auto pt-1 space-y-0.5">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              type="button"
              onClick={() => handleSelect(token)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95 text-zinc-900 dark:text-white"
            >
              <div className="flex items-center gap-2">
                <TokenIcon src={token.icon} alt={token.symbol} width={18} height={18} />
                <span>{token.symbol}</span>
              </div>
              {selectedToken?.symbol === token.symbol && (
                <Check className="size-3 text-sky-500" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface TokenInputProps {
  tokens: TokenItem[];
  defaultToken?: string;
  balance?: string;
  onTokenSelect?: (token: TokenItem) => void;
  onAmountChange?: (value: string) => void;
  usdValue?: string;
  className?: string;
}

const TokenInput = ({
  tokens,
  defaultToken,
  balance,
  onTokenSelect,
  onAmountChange,
  usdValue,
  className,
}: TokenInputProps) => {
  const [currentValue, setCurrentValue] = React.useState("");

  const handleValueChange = (values: { value: string }) => {
    setCurrentValue(values.value);
    onAmountChange?.(values.value);
  };

  const handleQuickAmount = (multiplier: number) => {
    if (!balance) return;
    const num = parseFloat(balance.replace(/[^0-9.]/g, "")) || 0;
    const val = (num * multiplier).toFixed(2);
    setCurrentValue(val);
    onAmountChange?.(val);
  };

  const numericVal = parseFloat(currentValue) || 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 p-3.5 border border-zinc-200/80 dark:border-zinc-800/80",
        className
      )}
    >
      {balance && (
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <WalletIcon className="size-3.5 text-sky-500" />
            {balance}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickAmount(0.5)}
              className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 cursor-pointer"
            >
              Half
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(1)}
              className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 cursor-pointer"
            >
              Max
            </button>
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
            customInput={ActionInput}
            className="text-right bg-transparent pr-1 shadow-none border-none focus:ring-0 focus:outline-hidden w-full text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono"
          />
          {usdValue && (
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 pr-1 mt-0.5">
              {usdValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

type ActionBoxDetail = DetailRow;

interface ActionBoxProps {
  tokens: { icon: string; symbol: string }[];
  defaultToken?: string;
  balance?: string;
  label?: string;
  details?: ActionBoxDetail[];
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
}

const ActionBox = ({
  tokens,
  defaultToken,
  balance,
  label,
  details,
  submitLabel = "Submit",
  onSubmit,
  className,
}: ActionBoxProps) => {
  return (
    <div
      data-slot="action-box"
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950 p-5 shadow-xl select-none font-sans text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {label && (
        <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
          {label}
        </span>
      )}
      <TokenInput
        tokens={tokens}
        defaultToken={defaultToken}
        balance={balance}
      />
      {details && details.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-2 text-xs font-medium">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400">{detail.label}</span>
                <span className={cn("font-bold text-zinc-900 dark:text-white font-mono", detail.className)}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      <Button className="w-full h-11 text-xs font-bold uppercase tracking-wider shadow-md rounded-xl" size="lg" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
};

export type { ActionBoxDetail, ActionBoxProps, DetailRow, TokenInputProps };
export { ActionBox, TokenInput };
export default ActionBox;
