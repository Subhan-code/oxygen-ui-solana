"use client";

import {
  ArrowDownUpIcon,
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  ChevronUpIcon,
  PencilIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SortDirection = "asc" | "desc" | null;

interface DetailRow {
  label: string;
  value: string;
  className?: string;
}

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
    <div className={cn("flex flex-col gap-4 border rounded-lg p-4", className)}>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">
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

type OrderFormDetail = DetailRow;

interface OrderFormProps {
  title?: string;
  description?: string;
  entryPrice?: number;
  details?: OrderFormDetail[];
  onSubmit?: (values: {
    tpPrice: string;
    tpPercent: string;
    slPrice: string;
    slPercent: string;
  }) => void;
  className?: string;
}

const OrderForm = ({
  title = "Edit TP/SL",
  description = "Adjust the parameters on your order",
  entryPrice,
  details,
  onSubmit,
  className,
}: OrderFormProps) => {
  const [tpPrice, setTpPrice] = React.useState("");
  const [tpPercent, setTpPercent] = React.useState("");
  const [slPrice, setSlPrice] = React.useState("");
  const [slPercent, setSlPercent] = React.useState("");

  const entryNum = entryPrice ?? 0;

  const handleTpPriceChange = (value: string) => {
    setTpPrice(value);
    if (entryNum > 0) {
      const priceNum = Number.parseFloat(value);
      if (!Number.isNaN(priceNum)) {
        setTpPercent((((priceNum - entryNum) / entryNum) * 100).toFixed(2));
      } else {
        setTpPercent("");
      }
    }
  };

  const handleTpPercentChange = (value: string) => {
    setTpPercent(value);
    if (entryNum > 0) {
      const pctNum = Number.parseFloat(value);
      if (!Number.isNaN(pctNum)) {
        setTpPrice((entryNum * (1 + pctNum / 100)).toFixed(2));
      } else {
        setTpPrice("");
      }
    }
  };

  const handleSlPriceChange = (value: string) => {
    setSlPrice(value);
    if (entryNum > 0) {
      const priceNum = Number.parseFloat(value);
      if (!Number.isNaN(priceNum)) {
        setSlPercent((((entryNum - priceNum) / entryNum) * 100).toFixed(2));
      } else {
        setSlPercent("");
      }
    }
  };

  const handleSlPercentChange = (value: string) => {
    setSlPercent(value);
    if (entryNum > 0) {
      const pctNum = Number.parseFloat(value);
      if (!Number.isNaN(pctNum)) {
        setSlPrice((entryNum * (1 - pctNum / 100)).toFixed(2));
      } else {
        setSlPrice("");
      }
    }
  };

  const handleClearTp = () => {
    setTpPrice("");
    setTpPercent("");
  };

  const handleClearSl = () => {
    setSlPrice("");
    setSlPercent("");
  };

  const handleSubmit = () => {
    onSubmit?.({ tpPrice, tpPercent, slPrice, slPercent });
  };

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {details && details.length > 0 && (
          <>
            <div className="flex flex-col gap-2">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className={cn("text-sm font-medium", detail.className)}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            <Separator />
          </>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-500">
              Take Profit
            </span>
            {(tpPrice || tpPercent) && (
              <button
                type="button"
                onClick={handleClearTp}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <NumericFormat
              value={tpPrice}
              onValueChange={(values) => handleTpPriceChange(values.value)}
              thousandSeparator=","
              decimalSeparator="."
              allowNegative={false}
              placeholder="TP Price"
              inputMode="decimal"
              customInput={Input}
              className="text-sm"
            />
            <NumericFormat
              value={tpPercent}
              onValueChange={(values) => handleTpPercentChange(values.value)}
              decimalSeparator="."
              allowNegative={false}
              placeholder="Gain"
              suffix=" %"
              inputMode="decimal"
              customInput={Input}
              className="text-sm"
            />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-400">Stop Loss</span>
            {(slPrice || slPercent) && (
              <button
                type="button"
                onClick={handleClearSl}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <NumericFormat
              value={slPrice}
              onValueChange={(values) => handleSlPriceChange(values.value)}
              thousandSeparator=","
              decimalSeparator="."
              allowNegative={false}
              placeholder="SL Price"
              inputMode="decimal"
              customInput={Input}
              className="text-sm"
            />
            <NumericFormat
              value={slPercent}
              onValueChange={(values) => handleSlPercentChange(values.value)}
              decimalSeparator="."
              allowNegative={false}
              placeholder="Loss"
              suffix=" %"
              inputMode="decimal"
              customInput={Input}
              className="text-sm"
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          Confirm TP / SL
        </Button>
      </CardContent>
    </Card>
  );
};

interface PositionTablePosition {
  symbol: string;
  icon: string;
  side: "long" | "short";
  size: string;
  value: string;
  leverage: string;
  entryPrice: string;
  markPrice: string;
  liquidationPrice?: string;
  pnl: string;
  pnlPercent?: string;
  pnlTrend?: "up" | "down";
}

interface PositionTableProps {
  positions: PositionTablePosition[];
  onEditTpSl?: (
    position: PositionTablePosition,
    values: {
      tpPrice: string;
      tpPercent: string;
      slPrice: string;
      slPercent: string;
    },
  ) => void;
  onClosePosition?: (position: PositionTablePosition) => void;
  className?: string;
}

const SORT_KEYS = [
  "side",
  "symbol",
  "size",
  "value",
  "entryPrice",
  "markPrice",
  "leverage",
  "pnl",
] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SortableHeader = ({
  label,
  sortKey,
  activeSortKey,
  sortDirection,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  activeSortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
  className?: string;
}) => {
  const isActive = activeSortKey === sortKey;
  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {isActive && sortDirection === "asc" && (
          <ChevronUpIcon className="size-3.5" />
        )}
        {isActive && sortDirection === "desc" && (
          <ChevronDownIcon className="size-3.5" />
        )}
      </button>
    </TableHead>
  );
};

const PositionTable = ({
  positions,
  onEditTpSl,
  onClosePosition,
  className,
}: PositionTableProps) => {
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (key: SortKey) => {
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
    const indices = positions.map((_, i) => i);
    if (!sortKey || !sortDirection) return indices;

    return indices.sort((a, b) => {
      const posA = positions[a];
      const posB = positions[b];
      let result: number;
      switch (sortKey) {
        case "side":
          result = posA.side.localeCompare(posB.side);
          break;
        case "symbol":
          result = posA.symbol.localeCompare(posB.symbol);
          break;
        case "size":
          result = compareValues(posA.size, posB.size);
          break;
        case "value":
          result = compareValues(posA.value, posB.value);
          break;
        case "entryPrice":
          result = compareValues(posA.entryPrice, posB.entryPrice);
          break;
        case "markPrice":
          result = compareValues(posA.markPrice, posB.markPrice);
          break;
        case "leverage":
          result = compareValues(posA.leverage, posB.leverage);
          break;
        case "pnl":
          result = compareValues(posA.pnl, posB.pnl);
          break;
        default:
          result = 0;
      }
      return sortDirection === "desc" ? -result : result;
    });
  }, [positions, sortKey, sortDirection]);

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <SortableHeader
            label="Type"
            sortKey="side"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            className="w-[80px]"
          />
          <SortableHeader
            label="Asset"
            sortKey="symbol"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="Size"
            sortKey="size"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="Value"
            sortKey="value"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="Entry"
            sortKey="entryPrice"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="Mark"
            sortKey="markPrice"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="Leverage"
            sortKey="leverage"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <SortableHeader
            label="P&L"
            sortKey="pnl"
            activeSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableHead className="w-[60px] text-muted-foreground">
            TP/SL
          </TableHead>
          <TableHead className="w-[60px] text-muted-foreground">
            Close
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedIndices.map((originalIndex) => {
          const position = positions[originalIndex];
          const pnlTrend =
            position.pnlTrend ??
            (position.pnl.trim().startsWith("-") ? "down" : "up");

          return (
            <TableRow
              key={`${position.symbol}-${position.side}-${originalIndex}`}
            >
              <TableCell className="w-[80px]">
                <span
                  className={cn(
                    "text-xs font-medium uppercase",
                    position.side === "long"
                      ? "text-emerald-500"
                      : "text-red-400",
                  )}
                >
                  {position.side}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TokenIcon
                    src={position.icon}
                    alt={position.symbol}
                    width={20}
                    height={20}
                  />
                  <span className="font-medium">{position.symbol}</span>
                </div>
              </TableCell>
              <TableCell>{position.size}</TableCell>
              <TableCell>{position.value}</TableCell>
              <TableCell>{position.entryPrice}</TableCell>
              <TableCell>{position.markPrice}</TableCell>
              <TableCell>{position.leverage}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "text-sm font-medium",
                    pnlTrend === "up" ? "text-emerald-500" : "text-red-400",
                  )}
                >
                  {position.pnl}
                  {position.pnlPercent && ` (${position.pnlPercent})`}
                </span>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <PencilIcon className="size-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="p-0 border-none bg-transparent shadow-none sm:max-w-sm"
                  >
                    <DialogTitle className="sr-only">
                      Edit TP/SL for {position.symbol}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Set take profit and stop loss for this position
                    </DialogDescription>
                    <OrderForm
                      entryPrice={Number.parseFloat(
                        position.entryPrice.replace(/[$,]/g, ""),
                      )}
                      details={[
                        { label: "Size", value: position.size },
                        { label: "Entry Price", value: position.entryPrice },
                        { label: "Mark Price", value: position.markPrice },
                        ...(position.liquidationPrice
                          ? [
                              {
                                label: "Liquidation Price",
                                value: position.liquidationPrice,
                              },
                            ]
                          : []),
                        { label: "P&L", value: position.pnl },
                      ]}
                      onSubmit={
                        onEditTpSl
                          ? (values) => onEditTpSl(position, values)
                          : undefined
                      }
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <XIcon className="size-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex items-center justify-center p-8 sm:max-w-md">
                    <DialogTitle className="sr-only">
                      Close {position.symbol} position
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Close this position
                    </DialogDescription>
                    <ActionBox
                      tokens={[
                        { icon: position.icon, symbol: position.symbol },
                      ]}
                      defaultToken={position.symbol}
                      label={`Close ${position.side.toUpperCase()} ${position.symbol}`}
                      details={[
                        { label: "Size", value: position.size },
                        { label: "Entry Price", value: position.entryPrice },
                        { label: "Mark Price", value: position.markPrice },
                        { label: "P&L", value: position.pnl },
                      ]}
                      submitLabel="Close Position"
                      onSubmit={
                        onClosePosition
                          ? () => onClosePosition(position)
                          : undefined
                      }
                      className="border-none p-0"
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export type {
  ActionBoxProps,
  OrderFormProps,
  PositionTablePosition,
  PositionTableProps,
  TokenIconProps,
};
export { ActionBox, OrderForm, PositionTable, TokenIcon };
