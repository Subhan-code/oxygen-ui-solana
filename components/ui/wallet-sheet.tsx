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
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/75 backdrop-blur-xs duration-200",
        className,
      )}
      {...props}
    />
  );
}

interface SheetContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  side?: "right" | "left" | "top" | "bottom" | "modal";
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const isModal = side === "modal";

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "bg-zinc-950 text-zinc-100 data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-2xl duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-zinc-800",
          isModal
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-3xl border p-0 data-[state=closed]:scale-95 data-[state=open]:scale-100 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            : side === "bottom"
            ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t p-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
            : "inset-y-0 right-0 h-full w-full sm:w-[400px] border-l p-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer z-10">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("animate-pulse rounded-md bg-zinc-800/80", className)} {...props} />
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
  src,
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
          "rounded-full inline-flex items-center justify-center font-bold bg-zinc-800 text-zinc-300 border border-zinc-700",
          className,
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
          "rounded-full block object-cover w-full h-full border border-zinc-800",
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
    <span className={cn("inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-full shadow-2xs", className)}>
      <span className="font-mono text-xs font-medium text-zinc-300">
        {displayed}
      </span>
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Copy address"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-emerald-400" />
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
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="View in explorer"
        >
          <ExternalLinkIcon className="size-3.5" />
        </a>
      )}
    </span>
  );
};

interface WalletSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "drawer" | "modal";
  side?: "right" | "left" | "top" | "bottom";
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
  open,
  onOpenChange,
  variant = "drawer",
  side = "right",
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
  const effectiveSide = variant === "modal" ? "modal" : side;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs border border-zinc-800 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <WalletIcon className="size-4 text-sky-400" />
            <span>{address ? truncateAddress(address) : "Connect Wallet"}</span>
          </button>
        )}
      </SheetTrigger>
      <SheetContent side={effectiveSide} data-slot="wallet-sheet" className={cn("flex flex-col p-0 gap-0 overflow-hidden", className)}>
        {/* Header: address + copy */}
        {address && (
          <div className="flex items-center justify-center pt-6 pb-2 px-6">
            <AddressDisplay address={address} />
          </div>
        )}

        {/* Balance hero */}
        {balance && (
          <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-2">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
              {balance}
            </span>
            {(balanceChange || balanceChangePercent) && (
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {balanceChange && (
                  <span
                    className={cn(
                      isNegative(balanceChange)
                        ? "text-red-400"
                        : "text-emerald-400 font-semibold",
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
                        : "text-emerald-400 font-semibold",
                    )}
                  >
                    ({balanceChangePercent})
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action buttons row */}
        {actions.length > 0 && (
          <div className="flex items-center justify-center gap-3.5 px-6 pb-5">
            {actions.map((action) => (
              <button
                type="button"
                key={action.label}
                className="flex flex-col items-center gap-1.5 outline-none group cursor-pointer"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 group-hover:bg-zinc-800 border border-zinc-800 text-zinc-200 group-hover:text-white transition-all shadow-xs">
                  {action.icon}
                </span>
                <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Token list */}
        {tokens && tokens.length > 0 && (
          <div className="flex flex-col flex-1 overflow-y-auto border-t border-zinc-800/80">
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Tokens</span>
              <span className="text-xs font-mono text-zinc-500">{tokens.length} assets</span>
            </div>
            <div className="flex flex-col divide-y divide-zinc-800/40">
              {tokens.map((token) => {
                const changeNegative = token.change
                  ? isNegative(token.change)
                  : false;

                return (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between px-6 py-3 hover:bg-zinc-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <TokenIcon
                        src={token.icon}
                        alt={token.symbol}
                        width={36}
                        height={36}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-100">
                          {token.name}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {token.balance} {token.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-zinc-100 font-mono">{token.value}</span>
                      {token.change && (
                        <span
                          className={cn(
                            "text-xs font-mono",
                            changeNegative
                              ? "text-red-400"
                              : "text-emerald-400",
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
        {children && <div className="mt-auto p-4 border-t border-zinc-800">{children}</div>}
      </SheetContent>
    </Sheet>
  );
};

export type { AddressDisplayProps, TokenIconProps, WalletSheetProps };
export { AddressDisplay, TokenIcon, WalletSheet, Sheet, SheetTrigger, SheetContent, SheetOverlay };
