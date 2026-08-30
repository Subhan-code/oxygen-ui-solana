"use client";

import { useState } from "react";
import { ArrowRightLeftIcon, RefreshCwIcon, Search, XIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { TokenIcon } from "./token-icon";

const Button = ({ className, size, variant, asChild, ...props }: React.ComponentProps<"button"> & { size?: string; variant?: string; asChild?: boolean }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium motion-safe:transition-[transform,background-color,color] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-quad)] motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 disabled:pointer-events-none disabled:opacity-50 h-11 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props} />
);
import { SlippageSelector } from "./slippage-selector";

export interface TokenData {
  name: string;
  symbol: string;
  icon: string;
  balance?: string;
  priceUsd?: number;
}

export const POPULAR_TOKENS: TokenData[] = [
  {
    name: "Solana",
    symbol: "SOL",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: "14.52",
    priceUsd: 243.8,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: "1,250.00",
    priceUsd: 1.0,
  },
  {
    name: "Bonk",
    symbol: "BONK",
    icon: "https://arweave.net/hQiWwqad6RiyA75YJsf-Master-Icon",
    balance: "25,400,000",
    priceUsd: 0.000034,
  },
  {
    name: "Raydium",
    symbol: "RAY",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    balance: "120.40",
    priceUsd: 5.6,
  },
];

export interface SwapWidgetProps {
  initialFromToken?: TokenData;
  initialToToken?: TokenData;
  onSwap?: (from: TokenData, to: TokenData, fromAmount: string) => void;
  className?: string;
}

export function SwapWidget({
  initialFromToken = POPULAR_TOKENS[0],
  initialToToken = POPULAR_TOKENS[1],
  onSwap,
  className,
}: SwapWidgetProps) {
  const [fromToken, setFromToken] = useState<TokenData>(initialFromToken);
  const [toToken, setToToken] = useState<TokenData>(initialToToken);
  const [fromAmount, setFromAmount] = useState<string>("1.5");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState<"from" | "to" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [flipped, setFlipped] = useState(false);

  const rate = 243.8;
  const toAmount = fromAmount
    ? (parseFloat(fromAmount) * (fromToken.symbol === "SOL" ? rate : 1 / rate)).toFixed(2)
    : "0.00";

  const handleFlip = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFlipped((value) => !value);
  };

  const handleExecuteSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      onSwap?.(fromToken, toToken, fromAmount);
    }, 1200);
  };

  const filteredTokens = POPULAR_TOKENS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      data-slot="swap-widget"
      className={cn(
        "p-5 rounded-2xl bg-card border border-black/10 dark:border-white/10 shadow-lg flex flex-col gap-3 max-w-md w-full text-foreground",
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">Swap</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 font-mono">
            Jupiter Routing
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlippageSelector value={slippage} onChange={setSlippage} />
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>You Pay</span>
          <span>Balance: {fromToken.balance || "0.00"} {fromToken.symbol}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold font-mono text-foreground focus:outline-none placeholder-muted-foreground"
            placeholder="0.00"
          />
          <button
            type="button"
            onClick={() => setSelectorTarget("from")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-foreground font-semibold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            <TokenIcon src={fromToken.icon} alt={fromToken.symbol} width={22} height={22} />
            <span>{fromToken.symbol}</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center -my-2 z-10">
        <button
          type="button"
          onClick={handleFlip}
          className="size-11 rounded-full bg-black/10 dark:bg-white/10 hover:bg-sky-500 border border-black/10 dark:border-white/10 text-muted-foreground hover:text-white flex items-center justify-center motion-safe:transition-[background-color,color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] motion-safe:active:scale-[0.97] cursor-pointer shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        >
          <ArrowRightLeftIcon
            className={cn(
              "size-3.5 rotate-90 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[var(--ease-out-expo)]",
              flipped && "rotate-[270deg]",
            )}
          />
        </button>
      </div>

      <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>You Receive</span>
          <span>Balance: {toToken.balance || "0.00"} {toToken.symbol}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-2xl font-bold font-mono text-foreground truncate">
            {toAmount}
          </div>
          <button
            type="button"
            onClick={() => setSelectorTarget("to")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-foreground font-semibold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            <TokenIcon src={toToken.icon} alt={toToken.symbol} width={22} height={22} />
            <span>{toToken.symbol}</span>
          </button>
        </div>
      </div>

      <div className="px-2 py-1.5 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>Rate: 1 {fromToken.symbol} ≈ {rate} {toToken.symbol}</span>
        <span className="text-emerald-500 font-semibold">Impact: &lt; 0.05%</span>
      </div>

      <Button
        onClick={handleExecuteSwap}
        disabled={isSwapping || !fromAmount}
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-xs cursor-pointer"
      >
        {isSwapping ? (
          <span className="inline-flex items-center gap-2">
            <RefreshCwIcon className="size-4 animate-spin" /> Swapping on Solana...
          </span>
        ) : (
          `Swap ${fromToken.symbol} for ${toToken.symbol}`
        )}
      </Button>

      <DialogPrimitive.Root open={selectorTarget !== null} onOpenChange={() => setSelectorTarget(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-150 ease-[var(--ease-out-expo)]" />
          <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-2xl border bg-card p-4 shadow-xl flex flex-col gap-3 origin-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 duration-150 ease-[var(--ease-out-expo)]">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">Select Token</span>
              <DialogPrimitive.Close className="flex size-11 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40">
                <XIcon className="size-4" />
              </DialogPrimitive.Close>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-xs">
              <Search className="size-3.5 opacity-50" />
              <input
                type="text"
                placeholder="Search by name or symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto flex flex-col gap-1">
              {filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => {
                    if (selectorTarget === "from") setFromToken(token);
                    if (selectorTarget === "to") setToToken(token);
                    setSelectorTarget(null);
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <TokenIcon src={token.icon} alt={token.symbol} width={28} height={28} />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{token.name}</span>
                      <span className="text-xs text-muted-foreground">{token.symbol}</span>
                    </div>
                  </div>
                  {token.balance && (
                    <span className="text-xs font-mono text-muted-foreground">{token.balance}</span>
                  )}
                </button>
              ))}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
