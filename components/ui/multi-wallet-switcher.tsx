"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Plus, Shield, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DerivedWallet {
  id: string;
  name: string;
  address: string;
  balanceSol: number;
  isHardware?: boolean;
}

export interface MultiWalletSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
  wallets?: DerivedWallet[];
  activeId?: string;
  onSelectWallet?: (wallet: DerivedWallet) => void;
  onAddAccount?: () => void;
}

const DEFAULT_DERIVED_WALLETS: DerivedWallet[] = [
  { id: "w-1", name: "Main Trading", address: "7xKX...gAsU", balanceSol: 42.15 },
  {
    id: "w-2",
    name: "NFT Vault",
    address: "3Fz9...kL2m",
    balanceSol: 128.4,
    isHardware: true,
  },
  { id: "w-3", name: "DeFi Yield", address: "9pQr...vX8s", balanceSol: 15.8 },
];

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export function MultiWalletSwitcher({
  wallets = DEFAULT_DERIVED_WALLETS,
  activeId = "w-1",
  onSelectWallet,
  onAddAccount,
  className,
  ...props
}: MultiWalletSwitcherProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const activeWallet = wallets.find((w) => w.id === activeId) || wallets[0];

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-block text-left w-full max-w-xs",
        className,
      )}
      data-slot="multi-wallet-switcher"
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-3 shadow-xl backdrop-blur-xl motion-safe:transition-[border-color,transform] motion-safe:duration-150 hover:border-black/20 dark:hover:border-white/20 motion-safe:active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white border border-black/5 dark:border-white/10">
            <Wallet className="h-4 w-4 text-sky-500 dark:text-sky-400" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-runde font-bold text-sm text-zinc-900 dark:text-white">
                {activeWallet.name}
              </span>
              {activeWallet.isHardware && (
                <Shield className="h-3 w-3 text-amber-500 dark:text-amber-400" />
              )}
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {activeWallet.address} • {activeWallet.balanceSol} SOL
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-400 motion-safe:transition-transform motion-safe:duration-150",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="wallet-switcher-menu"
            role="listbox"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }
            }
            transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: "top center", borderRadius: 16 }}
            className="absolute left-0 mt-2 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-2 shadow-2xl backdrop-blur-2xl z-50 text-zinc-900 dark:text-white"
          >
            <div className="px-3 py-1.5 font-runde text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              Derived Sub-Accounts
            </div>

            <div className="space-y-1 my-1">
              {wallets.map((w) => {
                const isSelected = w.id === activeWallet.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectWallet?.(w);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left motion-safe:transition-colors motion-safe:duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 cursor-pointer",
                      isSelected
                        ? "bg-zinc-100 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white border border-black/5 dark:border-white/10"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-[#121214] hover:text-zinc-900 dark:hover:text-white",
                    )}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 font-runde font-bold text-xs">
                        <span>{w.name}</span>
                        {w.isHardware && (
                          <span className="text-[10px] bg-amber-500/10 text-amber-500 dark:text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/20 font-sans">
                            Ledger
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        {w.address} • {w.balanceSol} SOL
                      </span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-sky-500 dark:text-sky-400" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                onAddAccount?.();
                setOpen(false);
              }}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/10 dark:border-white/10 py-2 font-runde text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20 hover:text-zinc-900 dark:hover:text-zinc-200 motion-safe:transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Derive New Account
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
