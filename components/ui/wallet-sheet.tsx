"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowUpIcon,
  CheckIcon,
  CopyIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  QrCodeIcon,
  RepeatIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const Button = ({ className, size, variant, ...props }: React.ComponentProps<"button"> & { size?: string; variant?: string }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium motion-safe:transition-[transform,background-color,color] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-quad)] motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 disabled:pointer-events-none disabled:opacity-50 h-11 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props} />
);

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-200 ease-[var(--ease-out-expo)]",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg origin-right data-[state=closed]:duration-200 data-[state=open]:duration-[270ms] ease-[var(--ease-vaul)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-3 right-3 flex size-11 items-center justify-center rounded-full opacity-70 motion-safe:transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

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

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  truncateChars?: [number, number];
  copyable?: boolean;
  explorerUrl?: string;
  className?: string;
}

const formatAddress = (
  address: string,
  truncate: boolean,
  chars: [number, number],
) => {
  if (!truncate || address.length <= chars[0] + chars[1] + 3) return address;
  return `${address.slice(0, chars[0])}...${address.slice(-chars[1])}`;
};

const AddressDisplay = ({
  address,
  truncate = true,
  truncateChars = [4, 4],
  copyable = true,
  explorerUrl,
  className,
}: AddressDisplayProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy address to clipboard");
    }
  };

  const displayed = formatAddress(address, truncate, truncateChars);
  const fullUrl = explorerUrl
    ? `${explorerUrl.replace(/\/+$/, "")}/${address}`
    : undefined;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="font-mono text-sm text-muted-foreground">
        {displayed}
      </span>
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Copy address"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-emerald-500" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      )}
      {fullUrl && (
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="View in explorer"
        >
          <ExternalLinkIcon className="size-3.5" />
        </a>
      )}
    </span>
  );
};

interface WalletSheetProps {
  address?: string;
  balance?: string;
  balanceChange?: string;
  balanceChangePercent?: string;
  tokens?: {
    icon: string;
    name: string;
    symbol: string;
    balance: string;
    value: string;
    change?: string;
  }[];
  actions?: {
    label: string;
    icon?: React.ReactNode;
  }[];
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
}

const DEFAULT_ACTIONS = [
  { label: "Send", icon: <ArrowUpIcon className="size-4" /> },
  { label: "Swap", icon: <RepeatIcon className="size-4" /> },
  { label: "Receive", icon: <QrCodeIcon className="size-4" /> },
  { label: "Buy", icon: <DollarSignIcon className="size-4" /> },
];

const truncateAddress = (address: string) => {
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const isNegative = (value: string) => {
  return value.trim().startsWith("-");
};

const WalletSheet = ({
  address,
  balance,
  balanceChange,
  balanceChangePercent,
  tokens,
  actions = DEFAULT_ACTIONS,
  children,
  trigger,
  className,
}: WalletSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-2">
            <WalletIcon className="size-4" />
            {address ? truncateAddress(address) : "Connect"}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent data-slot="wallet-sheet" className={cn("flex flex-col p-0 gap-0", className)}>
        {/* Header: address + copy */}
        {address && (
          <div className="flex items-center justify-center pt-6 pb-2 px-6">
            <AddressDisplay address={address} />
          </div>
        )}

        {/* Balance hero */}
        {balance && (
          <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-2">
            <span className="text-4xl font-semibold tracking-tight">
              {balance}
            </span>
            {(balanceChange || balanceChangePercent) && (
              <div className="flex items-center gap-1.5 text-sm">
                {balanceChange && (
                  <span
                    className={cn(
                      isNegative(balanceChange)
                        ? "text-red-400"
                        : "text-emerald-500",
                    )}
                  >
                    {balanceChange}
                  </span>
                )}
                {balanceChangePercent && (
                  <span
                    className={cn(
                      isNegative(balanceChangePercent)
                        ? "text-red-400"
                        : "text-emerald-500",
                    )}
                  >
                    {balanceChangePercent}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action buttons row */}
        {actions.length > 0 && (
          <div className="flex items-center justify-center gap-4 px-6 pb-5">
            {actions.map((action) => (
              <button
                type="button"
                key={action.label}
                className="flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 rounded-xl motion-safe:active:scale-[0.97]"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-muted">
                  {action.icon}
                </span>
                <span className="text-xs text-muted-foreground">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Token list */}
        {tokens && tokens.length > 0 && (
          <div className="flex flex-col flex-1 overflow-auto border-t">
            <span className="text-sm font-medium px-6 pt-4 pb-2">Tokens</span>
            <div className="flex flex-col">
              {tokens.map((token) => {
                const changeNegative = token.change
                  ? isNegative(token.change)
                  : false;

                return (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <TokenIcon
                        src={token.icon}
                        alt={token.symbol}
                        width={36}
                        height={36}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {token.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {token.balance} {token.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">{token.value}</span>
                      {token.change && (
                        <span
                          className={cn(
                            "text-xs",
                            changeNegative
                              ? "text-red-400"
                              : "text-emerald-500",
                          )}
                        >
                          {token.change}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Consumer-provided footer content (e.g. disconnect button) */}
        {children && <div className="mt-auto p-4 border-t">{children}</div>}
      </SheetContent>
    </Sheet>
  );
};

export type { AddressDisplayProps, TokenIconProps, WalletSheetProps };
export { AddressDisplay, TokenIcon, WalletSheet };
