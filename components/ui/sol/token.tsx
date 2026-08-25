"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Coins,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export interface TokenAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function TokenAvatar({
  className,
  symbol = "SOL",
  logoUrl,
  size = "md",
  ...props
}: TokenAvatarProps) {
  const sizeMap = {
    sm: "h-8 w-8 text-[10px]",
    md: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
  };

  return (
    <motion.div
      data-slot="token-avatar"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#18181c] font-bold text-white shadow-xl cursor-pointer ring-1 ring-white/10 select-none",
        sizeMap[size],
        className
      )}
      {...(props as any)}
    >
      {logoUrl ? (
        <img src={logoUrl} alt={symbol} className="h-full w-full object-cover" />
      ) : (
        <span className="font-mono text-zinc-200">{symbol.slice(0, 3).toUpperCase()}</span>
      )}
    </motion.div>
  );
}

export interface TokenAmountProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  symbol: string;
  fiatValue?: number;
  precision?: number;
}

export function TokenAmount({
  className,
  amount,
  symbol,
  fiatValue,
  precision = 4,
  ...props
}: TokenAmountProps) {
  return (
    <div
      data-slot="token-amount"
      className={cn("inline-flex flex-col", className)}
      {...props}
    >
      <motion.span
        key={amount}
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="font-bold text-white tracking-tight"
      >
        {amount.toLocaleString(undefined, { maximumFractionDigits: precision })}{" "}
        <span className="text-emerald-400 font-semibold">{symbol}</span>
      </motion.span>
      {fiatValue !== undefined && (
        <span className="text-xs text-zinc-400 font-medium">
          ${fiatValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      )}
    </div>
  );
}

export interface TokenPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  change24h?: number;
}

export function TokenPrice({
  className,
  price,
  change24h,
  ...props
}: TokenPriceProps) {
  const isPositive = (change24h ?? 0) >= 0;

  return (
    <div
      data-slot="token-price"
      className={cn("inline-flex items-baseline gap-2", className)}
      {...props}
    >
      <span className="text-base font-extrabold text-white tracking-tight">
        ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
      {change24h !== undefined && (
        <motion.span
          key={change24h}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className={cn(
            "inline-flex items-center text-xs font-bold",
            isPositive ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {isPositive ? (
            <TrendingUp className="mr-0.5 h-3 w-3" />
          ) : (
            <TrendingDown className="mr-0.5 h-3 w-3" />
          )}
          {isPositive ? "+" : ""}
          {change24h.toFixed(2)}%
        </motion.span>
      )}
    </div>
  );
}

export interface TokenCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h?: number;
  logoUrl?: string;
}

export function TokenCard({
  className,
  name,
  symbol,
  balance,
  price,
  change24h,
  logoUrl,
  ...props
}: TokenCardProps) {
  return (
    <motion.div
      data-slot="token-card"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
      className={cn(
        "flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-xl backdrop-blur-xl cursor-pointer hover:border-emerald-500/30 transition-colors",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-3">
        <TokenAvatar symbol={symbol} logoUrl={logoUrl} size="md" />
        <div>
          <h4 className="font-bold text-white text-sm tracking-tight">{name}</h4>
          <span className="text-xs text-zinc-400 font-medium">{symbol}</span>
        </div>
      </div>
      <div className="text-right">
        <TokenAmount amount={balance} symbol={symbol} />
        <TokenPrice price={price} change24h={change24h} className="text-xs mt-0.5" />
      </div>
    </motion.div>
  );
}

export interface AssetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
}

export function AssetCard({
  className,
  title,
  subtitle,
  imageUrl,
  badge,
  ...props
}: AssetCardProps) {
  return (
    <motion.div
      data-slot="asset-card"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-3 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 cursor-pointer",
        className
      )}
      {...(props as any)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-900">
        {imageUrl ? (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={springTransition}
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            <Coins className="h-10 w-10" />
          </div>
        )}
        {badge && (
          <span className="absolute top-2 right-2 rounded-full border border-emerald-500/20 bg-zinc-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 px-1">
        <h5 className="font-bold text-white text-sm truncate tracking-tight">{title}</h5>
        {subtitle && <p className="text-xs text-zinc-400 truncate">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

export interface TokenItem {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  logoUrl?: string;
}

export interface TokenListProps {
  tokens: TokenItem[];
  onSelectToken?: (token: TokenItem) => void;
  className?: string;
}

export function TokenList({ tokens, onSelectToken, className }: TokenListProps) {
  const [search, setSearch] = React.useState("");

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-slot="token-list" className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search token name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none backdrop-blur-md"
        />
      </div>
      <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
        {filtered.map((t, idx) => (
          <motion.div
            key={t.symbol}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: idx * 0.03 }}
            onClick={() => onSelectToken?.(t)}
          >
            <TokenCard
              name={t.name}
              symbol={t.symbol}
              balance={t.balance}
              price={t.price}
              logoUrl={t.logoUrl}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export interface TokenSelectProps {
  selectedToken: string;
  tokens: TokenItem[];
  onSelect: (token: TokenItem) => void;
  className?: string;
}

export function TokenSelect({
  selectedToken,
  tokens,
  onSelect,
  className,
}: TokenSelectProps) {
  const [open, setOpen] = React.useState(false);
  const active = tokens.find((t) => t.symbol === selectedToken) || tokens[0];

  return (
    <div data-slot="token-select" className={cn("relative inline-block", className)}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl hover:bg-zinc-900 transition-colors"
      >
        <TokenAvatar symbol={active?.symbol} logoUrl={active?.logoUrl} size="sm" />
        <span>{active?.symbol}</span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={springTransition}
            className="absolute left-0 mt-2 z-50 w-64 rounded-2xl border border-white/10 bg-zinc-950/90 p-3 shadow-2xl backdrop-blur-xl"
          >
            <TokenList
              tokens={tokens}
              onSelectToken={(t) => {
                onSelect(t);
                setOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface TokenMetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  symbol: string;
  totalSupply: string;
  mintAddress: string;
  decimals: number;
}

export function TokenMetadata({
  className,
  name,
  symbol,
  totalSupply,
  mintAddress,
  decimals,
  ...props
}: TokenMetadataProps) {
  return (
    <motion.div
      data-slot="token-metadata"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className={cn(
        "rounded-2xl border border-white/10 bg-zinc-950/80 p-5 space-y-3 shadow-xl backdrop-blur-xl",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-white text-base tracking-tight">{name} ({symbol})</h4>
        <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
          Decimals: {decimals}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-3">
        <div>
          <span className="text-zinc-500 font-medium">Total Supply</span>
          <p className="font-bold text-zinc-200">{totalSupply}</p>
        </div>
        <div>
          <span className="text-zinc-500 font-medium">Mint Address</span>
          <p className="font-mono text-zinc-300 truncate">{mintAddress}</p>
        </div>
      </div>
    </motion.div>
  );
}

export interface FungibleTokenRowProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  symbol: string;
  balance: number;
  price: number;
  value: number;
  logoUrl?: string;
}

export function FungibleTokenRow({
  className,
  name,
  symbol,
  balance,
  price,
  value,
  logoUrl,
  ...props
}: FungibleTokenRowProps) {
  return (
    <motion.div
      data-slot="fungible-token-row"
      whileTap={{ scale: 0.99 }}
      transition={springTransition}
      className={cn(
        "flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-xs transition-colors hover:bg-white/5 cursor-pointer backdrop-blur-md",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-3">
        <TokenAvatar symbol={symbol} logoUrl={logoUrl} size="sm" />
        <div>
          <span className="font-bold text-white">{name}</span>
          <span className="ml-2 text-zinc-500 font-semibold">{symbol}</span>
        </div>
      </div>
      <div className="flex items-center gap-6 text-right">
        <div>
          <p className="font-bold text-zinc-200">{balance}</p>
          <p className="text-[10px] text-zinc-500 font-medium">${price.toFixed(2)}</p>
        </div>
        <span className="font-extrabold text-emerald-400">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </motion.div>
  );
}

export interface NFTCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  collection: string;
  floorPriceSol: number;
  imageUrl?: string;
  rarityRank?: number;
}

export function NFTCard({
  className,
  name,
  collection,
  floorPriceSol,
  imageUrl,
  rarityRank,
  ...props
}: NFTCardProps) {
  return (
    <motion.div
      data-slot="nft-card"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-3 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 cursor-pointer",
        className
      )}
      {...(props as any)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-900">
        {imageUrl ? (
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={springTransition}
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            <Sparkles className="h-10 w-10 text-emerald-400" />
          </div>
        )}
        {rarityRank && (
          <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-extrabold text-amber-400 backdrop-blur-md">
            #{rarityRank}
          </span>
        )}
      </div>
      <div className="mt-3 px-1">
        <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400">
          {collection}
        </span>
        <h4 className="font-bold text-white text-sm truncate tracking-tight">{name}</h4>
        <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2 text-xs">
          <span className="text-zinc-500 font-medium">Floor</span>
          <span className="font-extrabold text-white">{floorPriceSol} SOL</span>
        </div>
      </div>
    </motion.div>
  );
}

