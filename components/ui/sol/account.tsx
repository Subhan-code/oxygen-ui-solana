"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  Check,
  Copy,
  ChevronDown,
  ShieldCheck,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

// 1. WalletButton
export interface WalletButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  connected?: boolean;
  connecting?: boolean;
  address?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function WalletButton({
  className,
  connected = false,
  connecting = false,
  address,
  onConnect,
  onDisconnect,
  ...props
}: WalletButtonProps) {
  const truncated = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : "";

  return (
    <motion.button
      data-slot="wallet-button"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={springTransition}
      onClick={connected ? onDisconnect : onConnect}
      disabled={connecting}
      className={cn(
        "relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 py-2.5 text-sm font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 disabled:opacity-50 select-none shadow-lg cursor-pointer",
        connected
          ? "bg-[#121215] text-white border border-white/15 hover:bg-[#1a1a20] backdrop-blur-xl shadow-black/50"
          : "bg-white text-zinc-950 font-bold border border-white/80 hover:bg-zinc-100 shadow-white/10",
        className
      )}
      {...(props as any)}
    >
      <div className="relative flex items-center justify-center">
        <Wallet className="h-4 w-4" />
        {connected && (
          <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
        )}
      </div>
      <motion.span
        key={connecting ? "connecting" : connected ? "connected" : "disconnected"}
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        {connecting
          ? "Connecting..."
          : connected
            ? truncated || "Connected"
            : "Connect Wallet"}
      </motion.span>
    </motion.button>
  );
}

// 2. WalletModal
export interface WalletOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
  installed?: boolean;
  popular?: boolean;
}

export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets?: WalletOption[];
  onSelectWallet?: (walletId: string) => void;
  className?: string;
}

export function WalletModal({
  isOpen,
  onClose,
  wallets = [
    { id: "phantom", name: "Phantom", installed: true, popular: true },
    { id: "solflare", name: "Solflare", installed: true, popular: true },
    { id: "backpack", name: "Backpack", installed: false },
    { id: "glow", name: "Glow", installed: false },
  ],
  onSelectWallet,
  className,
}: WalletModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div data-slot="wallet-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={springTransition}
            className={cn(
              "relative z-10 w-full max-w-sm rounded-3xl border border-white/15 bg-[#121215] p-6 shadow-2xl backdrop-blur-2xl text-white",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-400" />
                  Connect Wallet
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Choose your Solana wallet</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {wallets.map((w) => (
                <motion.button
                  key={w.id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                  onClick={() => {
                    onSelectWallet?.(w.id);
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10 group-hover:bg-white/15 transition-colors">
                      {w.icon || <Wallet className="h-4 w-4" />}
                    </div>
                    <div>
                      <span className="font-bold text-zinc-100 text-sm block group-hover:text-white">{w.name}</span>
                      {w.popular && (
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Popular</span>
                      )}
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                    w.installed
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-400 border-white/5"
                  }`}>
                    {w.installed ? "Detected" : "Install"}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 3. AccountAvatar
export interface AccountAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  address?: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function AccountAvatar({
  className,
  address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  avatarUrl,
  size = "md",
  ...props
}: AccountAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <motion.div
      data-slot="account-avatar"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#18181c] font-bold text-white shadow-xl cursor-pointer ring-1 ring-white/10",
        sizeClasses[size],
        className
      )}
      {...(props as any)}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={address}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-mono text-zinc-200">{address.slice(0, 2).toUpperCase()}</span>
      )}
    </motion.div>
  );
}

// 4. AccountAddress
export interface AccountAddressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  copyable?: boolean;
  truncate?: boolean;
}

export function AccountAddress({
  className,
  address,
  copyable = true,
  truncate = true,
  ...props
}: AccountAddressProps) {
  const [copied, setCopied] = React.useState(false);
  const displayAddress = truncate
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : address;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-slot="account-address"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#121215] px-3 py-1.5 text-xs font-mono tracking-tight text-zinc-300 backdrop-blur-xl shadow-sm",
        className
      )}
      {...props}
    >
      <span className="text-zinc-200">{displayAddress}</span>
      {copyable && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-0.5"
          title={copied ? "Copied!" : "Copy address"}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={springTransition}
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={springTransition}
              >
                <Copy className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  );
}

// 5. AccountBalance
export interface AccountBalanceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  solBalance: number;
  usdBalance?: number;
  symbol?: string;
  hideBalance?: boolean;
}

export function AccountBalance({
  className,
  solBalance,
  usdBalance,
  symbol = "SOL",
  hideBalance = false,
  ...props
}: AccountBalanceProps) {
  return (
    <div
      data-slot="account-balance"
      className={cn(
        "flex flex-col gap-1 rounded-3xl border border-white/12 bg-[#121215] p-5 backdrop-blur-2xl shadow-2xl text-white",
        className
      )}
      {...props}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Total Balance</span>
      <div className="flex items-baseline gap-2">
        <motion.span
          key={hideBalance ? "hidden" : solBalance}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-3xl font-extrabold tracking-tight text-white font-sans"
        >
          {hideBalance
            ? "••••••••"
            : solBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}{" "}
          {!hideBalance && <span className="text-zinc-400 text-xl font-bold">{symbol}</span>}
        </motion.span>
      </div>
      {usdBalance !== undefined && !hideBalance && (
        <span className="text-xs text-zinc-400 font-medium">
          ≈ ${usdBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
        </span>
      )}
    </div>
  );
}

// 6. IdentityBadge
export interface IdentityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  domain?: string;
  verified?: boolean;
  snsName?: string;
}

export function IdentityBadge({
  className,
  domain,
  verified = true,
  snsName,
  ...props
}: IdentityBadgeProps) {
  return (
    <div
      data-slot="identity-badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 backdrop-blur-xl shadow-sm select-none",
        className
      )}
      {...props}
    >
      {verified && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springTransition}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
        </motion.span>
      )}
      <span>{domain || snsName || "Verified Domain"}</span>
    </div>
  );
}

// 7. AccountSwitcher
export interface AccountOption {
  address: string;
  label?: string;
  balance?: string;
}

export interface AccountSwitcherProps {
  accounts: AccountOption[];
  activeAddress: string;
  onSelect: (address: string) => void;
  className?: string;
}

export function AccountSwitcher({
  accounts,
  activeAddress,
  onSelect,
  className,
}: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const active = accounts.find((a) => a.address === activeAddress) || accounts[0];

  return (
    <div data-slot="account-switcher" className={cn("relative inline-block", className)}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-[#121215] px-4 py-2 text-xs font-semibold text-zinc-200 backdrop-blur-2xl hover:bg-[#18181c] transition-colors shadow-lg cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-zinc-400" />
          <span>
            {active?.label || `${active?.address.slice(0, 4)}...${active?.address.slice(-4)}`}
          </span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={springTransition}
            className="absolute right-0 mt-2 z-50 w-60 rounded-2xl border border-white/15 bg-[#121215] p-1.5 shadow-2xl backdrop-blur-2xl"
          >
            {accounts.map((acc) => (
              <motion.button
                key={acc.address}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(acc.address);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer",
                  acc.address === activeAddress
                    ? "bg-white/10 text-white font-bold border border-white/15"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{acc.label || `${acc.address.slice(0, 4)}...${acc.address.slice(-4)}`}</span>
                {acc.balance && <span className="text-zinc-400 font-mono text-[11px]">{acc.balance}</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 8. ConnectedAccountCard
export interface ConnectedAccountCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  domain?: string;
  solBalance: number;
  network?: string;
  onDisconnect?: () => void;
}

export function ConnectedAccountCard({
  className,
  address,
  domain = "oxygen.sol",
  solBalance,
  network = "Mainnet-Beta",
  onDisconnect,
  ...props
}: ConnectedAccountCardProps) {
  return (
    <motion.div
      data-slot="connected-account-card"
      whileHover={{ y: -2 }}
      transition={springTransition}
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-white/12 bg-[#121215] p-6 shadow-2xl backdrop-blur-2xl text-white",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AccountAvatar address={address} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">{domain}</span>
              <IdentityBadge domain={domain} />
            </div>
            <AccountAddress address={address} />
          </div>
        </div>
        {onDisconnect && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDisconnect}
            className="rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-rose-400 transition-colors cursor-pointer"
            title="Disconnect"
          >
            <LogOut className="h-4 w-4" />
          </motion.button>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Balance</span>
          <p className="text-xl font-extrabold text-white">{solBalance} SOL</p>
        </div>
        <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-200">
          {network}
        </span>
      </div>
    </motion.div>
  );
}

