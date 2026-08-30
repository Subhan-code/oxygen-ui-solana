"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Sparkles, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppleStoreCardProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  imageUrl?: string;
  iconUrl?: string;
  actionText?: string;
  onAction?: () => void;
}

const springCard = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.7,
};

export function AppleStoreCard({
  badge = "FEATURED DAPP",
  title = "Jupiter Perps V2",
  subtitle = "Zero-Slippage Solana Trading",
  description = "Trade SOL, BTC, and ETH with up to 100x leverage directly from Phantom.",
  fullDescription = "Experience ultra-low latency derivatives execution powered by Jupiter Liquidity Pool (JLP). Benefit from automated position health monitoring, real-time oracle price feeds, zero price impact swaps, and instant yield payouts directly to your wallet.",
  imageUrl = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
  iconUrl = "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?q=80&w=200&auto=format&fit=crop",
  actionText = "Open DApp",
  onAction,
  className,
  ...props
}: AppleStoreCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      data-slot="apple-store-card"
      className={cn("relative flex items-center justify-center select-none", className)}
      {...props}
    >
      {/* Collapsed Card */}
      {!isOpen && (
        <motion.div
          layoutId={`apple-card-container-${title}`}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={springCard}
          onClick={() => setIsOpen(true)}
          className="relative flex h-[380px] w-full max-w-[320px] flex-col overflow-hidden rounded-[28px] border border-black/10 dark:border-white/12 bg-white dark:bg-[#1c1c1e] shadow-xl transition-shadow hover:shadow-2xl cursor-pointer outline-none"
        >
          {/* Hero Background Image */}
          <motion.div layoutId={`apple-card-image-${title}`} className="relative h-[220px] w-full overflow-hidden">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                {badge}
              </span>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <motion.h3
                layoutId={`apple-card-title-${title}`}
                className="text-2xl font-black text-white tracking-tight leading-none"
              >
                {title}
              </motion.h3>
              <p className="text-xs font-semibold text-white/80 mt-1">{subtitle}</p>
            </div>
          </motion.div>

          {/* Footer Info Row */}
          <motion.div
            layoutId={`apple-card-footer-${title}`}
            className="flex flex-1 items-center justify-between p-4 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <img src={iconUrl} alt={title} className="size-11 rounded-xl object-cover shadow-xs border border-black/10 dark:border-white/10" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate">{title}</span>
                <span className="text-[11px] text-muted-foreground truncate">{description}</span>
              </div>
            </div>
            <button
              type="button"
              className="ml-2 flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition-colors shrink-0"
            >
              Get
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Expanded Shared Layout Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={cardRef}
                layoutId={`apple-card-container-${title}`}
                transition={springCard}
                className="relative flex h-[85vh] max-h-[640px] w-full max-w-lg flex-col overflow-hidden rounded-[36px] border border-black/10 dark:border-white/15 bg-white dark:bg-[#1c1c1e] shadow-2xl"
              >
                {/* Dismiss X Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>

                {/* Hero Header */}
                <motion.div layoutId={`apple-card-image-${title}`} className="relative h-[300px] w-full shrink-0 overflow-hidden">
                  <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider border border-white/20">
                      {badge}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-6 right-6">
                    <motion.h3
                      layoutId={`apple-card-title-${title}`}
                      className="text-3xl font-black text-white tracking-tight"
                    >
                      {title}
                    </motion.h3>
                    <p className="text-sm font-semibold text-white/80 mt-1">{subtitle}</p>
                  </div>
                </motion.div>

                {/* Action Bar */}
                <motion.div
                  layoutId={`apple-card-footer-${title}`}
                  className="flex items-center justify-between p-5 border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3.5">
                    <img src={iconUrl} alt={title} className="size-12 rounded-2xl object-cover shadow-sm border border-black/10 dark:border-white/10" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{title}</h4>
                      <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onAction}
                    className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    <span>{actionText}</span>
                    <ExternalLink className="size-3.5" />
                  </button>
                </motion.div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed text-muted-foreground">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-blue-500 uppercase tracking-wider">
                    <ShieldCheck className="size-4" /> Verified Web3 Integration
                  </div>
                  <p className="mb-4 text-foreground font-medium">{description}</p>
                  <p>{fullDescription}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppleStoreCard;
