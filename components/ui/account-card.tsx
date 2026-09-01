"use client";

import React, { useState } from "react";
import NumberFlow from "@number-flow/react";
import { ExternalLinkIcon, Eye, EyeOff, Wallet } from "lucide-react";
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
      avatarUrl = "/account-pfp.jpg",
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
    const [isShimmering, setIsShimmering] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleToggleBalance = () => {
      const next = !isHidden;
      if (!next) {
        // Revealing: Trigger shimmer skeleton sweep first
        setIsShimmering(true);
        setTimeout(() => {
          setIsShimmering(false);
          setIsHidden(false);
        }, 280);
      } else {
        setIsHidden(true);
      }
      onBalanceToggle?.(next);
    };

    return (
      <div
        ref={ref}
        data-slot="account-card"
        className={cn(
          "relative flex flex-col gap-4 p-5 rounded-2xl w-full max-w-sm select-none font-sans",
          "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100",
          "border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-xl",
          "transition-all duration-200 hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700",
          className
        )}
        suppressHydrationWarning
        {...props}
      >
        {/* Header: Avatar, Identity, External Link */}
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={snsDomain}
                className="size-11 rounded-xl object-cover ring-2 ring-sky-500/40 shadow-xs"
                loading="lazy"
              />
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-sky-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-950 text-[9px] font-bold shadow-xs">
                  ✓
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                  {snsDomain}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-2xs">
                  {tier}
                </span>
              </div>
              <AddressDisplay address={address} className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5" />
            </div>
          </div>

          <motion.a
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={springButton}
            href={`https://solscan.io/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 shrink-0 border border-zinc-200/60 dark:border-zinc-800/80 cursor-pointer"
            title="Open in Solscan"
          >
            <ExternalLinkIcon className="size-4" />
          </motion.a>
        </div>

        {/* Balance Reveal Section with Shimmer Skeleton Sweep + NumberFlow Animation */}
        <div className="relative overflow-hidden flex items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <Wallet className="size-3.5 text-sky-500" />
              <span>Wallet Balance</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1 min-h-[28px]">
              <AnimatePresence mode="wait" initial={false}>
                {isShimmering ? (
                  <motion.div
                    key="shimmer-skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-6 w-28 rounded-md bg-zinc-300/80 dark:bg-zinc-700/80 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-400/40 to-transparent" />
                    </div>
                  </motion.div>
                ) : isHidden ? (
                  <motion.span
                    key="hidden-balance"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="font-mono text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
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
                    className="flex items-baseline gap-2"
                  >
                    <NumberFlow
                      value={balanceSol}
                      suffix=" SOL"
                      format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      className="font-mono text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
                    />
                    {/* Letter-by-Letter Staggered Reveal for USD Value */}
                    <motion.span
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.03 } },
                      }}
                      className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 inline-flex"
                    >
                      {balanceUsd.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          variants={{
                            hidden: { opacity: 0, y: 4, filter: "blur(2px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Toggle Eye Button */}
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={springButton}
            onClick={handleToggleBalance}
            aria-label={isHidden ? "Reveal wallet balance" : "Hide wallet balance"}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
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
