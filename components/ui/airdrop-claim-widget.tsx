"use client";

import React, { useState } from "react";
import { Gift, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AirdropClaimWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  airdropTitle?: string;
  claimableAmount?: string;
  tokenSymbol?: string;
  isEligible?: boolean;
  isClaimed?: boolean;
  onClaim?: () => void;
}

const springButton = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.6,
};

export const AirdropClaimWidget = React.forwardRef<HTMLDivElement, AirdropClaimWidgetProps>(
  (
    {
      airdropTitle = "Oxygen UI Protocol Governance Airdrop",
      claimableAmount = "2,500.00",
      tokenSymbol = "OXY",
      isEligible = true,
      isClaimed = false,
      onClaim,
      className,
      ...props
    },
    ref
  ) => {
    const [claiming, setClaiming] = useState(false);
    const [claimedState, setClaimedState] = useState(isClaimed);
    const shouldReduceMotion = useReducedMotion();

    const handleClaim = () => {
      setClaiming(true);
      setTimeout(() => {
        setClaiming(false);
        setClaimedState(true);
        onClaim?.();
      }, 1200);
    };

    return (
      <div
        ref={ref}
        data-slot="airdrop-claim-widget"
        className={cn(
          "relative flex flex-col rounded-3xl border border-black/10 dark:border-white/12",
          "bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-5 shadow-xl text-left select-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-2xs">
            <Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm tracking-tight text-foreground truncate">{airdropTitle}</h3>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-3 w-3" /> Merkle Proof Verified
            </span>
          </div>
        </div>

        <div className="my-4 rounded-2xl bg-black/[0.03] dark:bg-black/40 p-4 border border-black/5 dark:border-white/5 text-center">
          <span className="text-xs text-muted-foreground font-mono block">Your Allocation</span>
          <h2 className="font-mono text-3xl font-extrabold text-foreground mt-1 tracking-tight">
            {claimableAmount} <span className="text-purple-600 dark:text-purple-400 text-xl">{tokenSymbol}</span>
          </h2>
        </div>

        {claimedState ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" /> Airdrop Tokens Claimed
          </div>
        ) : isEligible ? (
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={springButton}
            onClick={handleClaim}
            disabled={claiming}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3 text-sm font-bold text-white shadow-md shadow-purple-500/25 hover:bg-purple-500 transition-colors cursor-pointer disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40"
          >
            <AnimatePresence mode="wait" initial={false}>
              {claiming ? (
                <motion.span
                  key="claiming"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" /> Claiming...
                </motion.span>
              ) : (
                <motion.span
                  key="claim"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center gap-2"
                >
                  Claim Allocation <ArrowRight className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ) : (
          <div className="rounded-2xl bg-black/5 dark:bg-white/5 py-3 text-center text-xs font-mono text-muted-foreground border border-black/5 dark:border-white/5">
            Connected Wallet Ineligible
          </div>
        )}
      </div>
    );
  }
);

AirdropClaimWidget.displayName = "AirdropClaimWidget";

export default AirdropClaimWidget;
