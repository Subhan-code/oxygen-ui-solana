"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ExternalLink, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  installed?: boolean;
  popular?: boolean;
}

export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet?: (walletId: string) => void;
  className?: string;
}

const DEFAULT_WALLETS: WalletOption[] = [
  {
    id: "phantom",
    name: "Phantom",
    icon: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg",
    installed: true,
    popular: true,
  },
  {
    id: "solflare",
    name: "Solflare",
    icon: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg",
    installed: true,
    popular: true,
  },
  {
    id: "backpack",
    name: "Backpack",
    icon: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/backpack.svg",
    installed: true,
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/ledger.svg",
    installed: false,
  },
];

const PANEL_SPRING = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function WalletModal({
  isOpen,
  onClose,
  onSelectWallet,
  className,
}: WalletModalProps) {
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="wallet-modal"
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            className,
          )}
          data-slot="wallet-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.16 : 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <button
            type="button"
            aria-label="Close wallet modal"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              reduceMotion
                ? { duration: 0.16, ease: [0.19, 1, 0.22, 1] }
                : PANEL_SPRING
            }
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-xl"
            style={{ borderRadius: 24 }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div>
                <h3
                  id="wallet-modal-title"
                  className="text-lg font-semibold text-white"
                >
                  Connect a Wallet
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your preferred Solana provider
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white motion-safe:transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-5 space-y-2.5">
              {DEFAULT_WALLETS.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => {
                    onSelectWallet?.(wallet.id);
                    onClose();
                  }}
                  className="group relative flex w-full items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] hover:border-purple-500/50 hover:bg-purple-500/5 motion-safe:active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={wallet.icon}
                      alt=""
                      className="h-9 w-9 rounded-xl p-1 bg-zinc-900 border border-zinc-800"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-zinc-100 group-hover:text-white">
                          {wallet.name}
                        </span>
                        {wallet.popular && (
                          <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400 border border-purple-500/20">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {wallet.installed ? "Detected" : "Not Installed"}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-purple-400" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Secure
                Solana RPC
              </span>
              <a
                href="https://solana.com/wallets"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-purple-400 hover:underline"
              >
                More wallets <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
