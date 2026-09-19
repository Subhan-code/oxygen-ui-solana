"use client";

import React, { useState } from "react";
import NumberFlow from "@number-flow/react";
import {
  ArrowDownToLine,
  ArrowUp,
  Check,
  Copy,
  CreditCard,
  ExternalLink,
  Eye,
  EyeOff,
  Repeat,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AccountCardProps extends React.HTMLAttributes<HTMLDivElement> {
  address?: string;
  snsDomain?: string;
  avatarUrl?: string;
  tier?: string;
  isVerified?: boolean;
  balanceSol?: number;
  balanceUsd?: string;
  hideBalanceByDefault?: boolean;
  onBalanceToggle?: (hidden: boolean) => void;
  onSend?: () => void;
  onDeposit?: () => void;
  onSwap?: () => void;
  onBuy?: () => void;
}

const springButton = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.6,
};

function formatShortAddress(address: string) {
  if (address.length <= 11) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const AccountCard = React.forwardRef<HTMLDivElement, AccountCardProps>(
  (
    {
      address = "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
      snsDomain = "solanadev.sol",
      avatarUrl = "/account-pfp.jpg",
      tier,
      isVerified,
      balanceSol = 142.85,
      balanceUsd = "$27,855.75",
      hideBalanceByDefault = false,
      onBalanceToggle,
      onSend,
      onDeposit,
      onSwap,
      onBuy,
      className,
      ...props
    },
    ref
  ) => {
    const [isHidden, setIsHidden] = useState(hideBalanceByDefault);
    const [isShimmering, setIsShimmering] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleToggleBalance = () => {
      const next = !isHidden;
      if (!next) {
        setIsShimmering(true);
        setTimeout(() => {
          setIsShimmering(false);
          setIsHidden(false);
        }, 250);
      } else {
        setIsHidden(true);
      }
      onBalanceToggle?.(next);
    };

    const handleCopyAddress = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 1600);
      } catch {
        // ignore
      }
    };

    const actionItems = [
      { key: "send", label: "Send", icon: ArrowUp, onClick: onSend },
      { key: "deposit", label: "Deposit", icon: ArrowDownToLine, onClick: onDeposit },
      { key: "swap", label: "Swap", icon: Repeat, onClick: onSwap },
      { key: "buy", label: "Buy", icon: CreditCard, onClick: onBuy },
    ];

    return (
      <div
        ref={ref}
        data-slot="account-card"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
        className={cn(
          "group relative flex flex-col gap-5 p-5 sm:p-6 rounded-[32px] w-full max-w-sm select-none font-sans overflow-hidden",
          "bg-white dark:bg-black text-zinc-900 dark:text-white",
          "border border-black/[0.08] dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/90",
          "transition-all duration-300 hover:shadow-2xl hover:border-black/15 dark:hover:border-white/20",
          className
        )}
        suppressHydrationWarning
        {...props}
      >
        {/* Header: Avatar, Identity, Solscan Link */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={snsDomain}
                className="size-12 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-zinc-800"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-runde text-[15px] font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                {snsDomain}
              </span>
              <motion.button
                type="button"
                onClick={handleCopyAddress}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                className="group/addr mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg border border-black/5 bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-500 transition-colors hover:border-black/10 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-sky-500/40"
                title="Click to copy address"
              >
                <span>{formatShortAddress(address)}</span>
                {copiedAddress ? (
                  <Check className="size-3 text-emerald-400" />
                ) : (
                  <Copy className="size-3 text-zinc-400 transition-colors group-hover/addr:text-zinc-200" />
                )}
              </motion.button>
            </div>
          </div>

          <motion.a
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            transition={springButton}
            href={`https://solscan.io/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-9 items-center justify-center rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-[#0a0a0a] dark:hover:bg-[#141414] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 shrink-0 border border-black/5 dark:border-white/10 cursor-pointer"
            title="Open in Solscan"
          >
            <ExternalLink className="size-4" />
          </motion.a>
        </div>

        {/* Balance Section */}
        <div className="relative overflow-hidden flex items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 z-10">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium font-runde">
              <Wallet className="size-3.5 text-sky-500 dark:text-sky-400" />
              <span>Wallet Balance</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1.5 min-h-[28px]">
              <AnimatePresence mode="wait" initial={false}>
                {isShimmering ? (
                  <motion.div
                    key="shimmer-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-6 w-28 rounded-md bg-zinc-300/80 dark:bg-zinc-800 animate-pulse" />
                  </motion.div>
                ) : isHidden ? (
                  <motion.span
                    key="hidden-balance"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="font-runde text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white"
                  >
                    •••••••• <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">SOL</span>
                  </motion.span>
                ) : (
                  <motion.div
                    key="revealed-balance"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-baseline gap-2 flex-wrap"
                  >
                    <NumberFlow
                      value={balanceSol}
                      suffix=" SOL"
                      format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      className="font-runde text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white"
                    />
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      ≈ {balanceUsd}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Toggle Eye Button */}
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            transition={springButton}
            onClick={handleToggleBalance}
            aria-label={isHidden ? "Reveal wallet balance" : "Hide wallet balance"}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-zinc-200/80 hover:bg-zinc-200 dark:bg-[#141416] dark:hover:bg-[#1f1f23] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 border border-black/5 dark:border-white/5"
          >
            {isHidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </motion.button>
        </div>

        {/* Quick Action Row */}
        <div className="grid grid-cols-4 gap-2.5 pt-0.5 z-10">
          {actionItems.map(({ key, label, icon: Icon, onClick }) => (
            <motion.button
              key={key}
              type="button"
              onClick={onClick}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-zinc-100/80 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 py-3 px-2 text-zinc-700 dark:text-zinc-200 transition-colors hover:bg-zinc-200/90 dark:hover:bg-[#141414] hover:text-zinc-950 dark:hover:text-white cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
            >
              <Icon className="size-4.5 text-sky-500 dark:text-sky-400" />
              <span className="font-runde text-[11px] font-semibold tracking-tight">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
);

AccountCard.displayName = "AccountCard";

export default AccountCard;
