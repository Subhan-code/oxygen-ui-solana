"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, Search, WalletIcon } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
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
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-2xl border border-black/10 dark:border-white/10 bg-popover/90 backdrop-blur-2xl p-4 text-popover-foreground shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-150 ease-[var(--ease-out-expo)]",
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
      "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight transition-[transform,background-color,opacity] duration-140 ease-[cubic-bezier(0.16,1,0.3,1)]",
      "cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
      "h-10 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90",
      className
    )}
    {...props}
  />
);

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
);

const Separator = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("shrink-0 bg-border/60 h-[1px] w-full", className)} {...props} />
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
    "loading"
  );

  if (status === "error") {
    const fontSize = typeof width === "number" ? width * 0.35 : "1rem";
    return (
      <div
        className={cn(
          "rounded-full inline-flex items-center justify-center font-medium text-muted-foreground bg-muted",
          className
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
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
          className="flex items-center gap-2 rounded-2xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 px-3 py-2 text-sm font-bold tracking-tight text-foreground transition-all duration-140 cursor-pointer active:scale-[0.97] outline-none"
        >
          {selectedToken && (
            <TokenIcon
              src={selectedToken.icon}
              alt={selectedToken.symbol}
              width={22}
              height={22}
            />
          )}
          <span>{selectedToken ? selectedToken.symbol : "Select"}</span>
          <ChevronsUpDown className="size-3.5 opacity-50 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-56" align="start">
        <div className="flex items-center gap-2 px-2 pb-2 border-b border-border/60">
          <Search className="size-3.5 opacity-50" />
          <input
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-48 overflow-y-auto pt-1 space-y-0.5">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              type="button"
              onClick={() => handleSelect(token)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <TokenIcon src={token.icon} alt={token.symbol} width={18} height={18} />
                <span>{token.symbol}</span>
              </div>
              {selectedToken?.symbol === token.symbol && (
                <Check className="size-3 text-primary" />
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

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-3.5 border border-black/5 dark:border-white/5",
        className
      )}
    >
      {balance && (
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <WalletIcon className="size-3.5" />
            {balance}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickAmount(0.5)}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-muted-foreground hover:text-foreground transition-all active:scale-[0.96] cursor-pointer"
            >
              Half
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(1)}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-muted-foreground hover:text-foreground transition-all active:scale-[0.96] cursor-pointer"
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
            className="text-right bg-transparent pr-1 shadow-none border-none focus:ring-0 focus:outline-hidden w-full text-xl sm:text-2xl font-bold tracking-tight text-foreground"
          />
          {usdValue && (
            <span className="text-xs font-medium text-muted-foreground pr-1 mt-0.5">
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
        "relative flex flex-col gap-4 rounded-3xl border border-black/10 dark:border-white/12",
        "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-5 shadow-lg select-none",
        className
      )}
    >
      {label && (
        <span className="text-xs font-bold tracking-tight text-muted-foreground uppercase">
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
                <span className="text-muted-foreground">{detail.label}</span>
                <span className={cn("font-semibold text-foreground", detail.className)}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      <Button className="w-full h-11 text-[15px] font-bold shadow-md rounded-2xl" size="lg" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
};

export type { ActionBoxDetail, ActionBoxProps, DetailRow, TokenInputProps };
export { ActionBox, TokenInput };
export default ActionBox;
