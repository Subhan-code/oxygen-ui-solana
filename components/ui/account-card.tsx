"use client";

import React, { useState } from "react";
import { ExternalLinkIcon, Eye, EyeOff, Wallet, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { AddressDisplay } from "./address-display";

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
}

const springButton = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.6,
};

export const AccountCard = React.forwardRef<HTMLDivElement, AccountCardProps>(
  (
    {
      address = "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
      snsDomain = "solanadev.sol",
      avatarUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      tier = "OG Holder",
      isVerified = true,
      balanceSol = 142.85,
      balanceUsd = "$27,855.75",
      hideBalanceByDefault = false,
      onBalanceToggle,
      className,
      ...props
    },
    ref
  ) => {
    const [isHidden, setIsHidden] = useState(hideBalanceByDefault);
    const shouldReduceMotion = useReducedMotion();

    const handleToggleBalance = () => {
      const next = !isHidden;
      setIsHidden(next);
      onBalanceToggle?.(next);
    };

    return (
      <div
        ref={ref}
        data-slot="account-card"
        className={cn(
          "relative flex flex-col gap-4 p-5 rounded-3xl w-full max-w-sm",
          "bg-white/75 dark:bg-[#1c1c1e]/85 backdrop-blur-2xl backdrop-saturate-150",
          "border border-black/[0.08] dark:border-white/[0.12] shadow-xl select-none",
          "transition-[box-shadow,border-color] duration-200 hover:shadow-2xl",
          className
        )}
        suppressHydrationWarning
        {...props}
      >
        {/* Header: Avatar, Identity, External Link */}
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={snsDomain}
                className="size-12 rounded-2xl object-cover ring-2 ring-sky-500/40 shadow-xs"
                loading="lazy"
              />
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-sky-500 text-white flex items-center justify-center ring-2 ring-background text-[10px] font-bold shadow-xs">
                  ✓
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-bold text-foreground tracking-tight truncate">
                  {snsDomain}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-2xs">
                  {tier}
                </span>
              </div>
              <AddressDisplay address={address} className="text-xs text-muted-foreground mt-0.5" />
            </div>
          </div>

          <motion.a
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springButton}
            href={`https://solscan.io/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 shrink-0"
            title="Open in Solscan"
          >
            <ExternalLinkIcon className="size-4" />
          </motion.a>
        </div>

        {/* Balance Reveal Section */}
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Wallet className="size-3.5 text-sky-500" />
              <span>Wallet Balance</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <AnimatePresence mode="wait" initial={false}>
                {isHidden ? (
                  <motion.span
                    key="hidden-balance"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="font-mono text-xl font-bold tracking-tight text-foreground"
                  >
                    •••••••• <span className="text-xs font-semibold text-muted-foreground">SOL</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="revealed-balance"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="font-mono text-xl font-bold tracking-tight text-foreground"
                  >
                    {balanceSol.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">SOL</span>
                  </motion.span>
                )}
              </AnimatePresence>
              {!isHidden && (
                <span className="text-xs font-mono font-medium text-muted-foreground">
                  ({balanceUsd})
                </span>
              )}
            </div>
          </div>

          {/* Toggle Eye Button */}
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springButton}
            onClick={handleToggleBalance}
            aria-label={isHidden ? "Reveal wallet balance" : "Hide wallet balance"}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
          >
            {isHidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </motion.button>
        </div>
      </div>
    );
  }
);

AccountCard.displayName = "AccountCard";

export default AccountCard;
