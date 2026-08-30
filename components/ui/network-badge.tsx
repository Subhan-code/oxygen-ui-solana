"use client";

import { useState } from "react";
import { ChevronDownIcon, CheckCircle2Icon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface NetworkBadgeProps {
  currentNetwork?: "mainnet" | "devnet" | "testnet" | "localnet";
  onNetworkChange?: (network: "mainnet" | "devnet" | "testnet" | "localnet") => void;
  showLatency?: boolean;
  className?: string;
}

export function NetworkBadge({
  currentNetwork = "mainnet",
  onNetworkChange,
  showLatency = true,
  className,
}: NetworkBadgeProps) {
  const [open, setOpen] = useState(false);

  const configs = {
    mainnet: { name: "Mainnet-Beta", color: "bg-emerald-400", latency: "24ms" },
    devnet: { name: "Devnet", color: "bg-amber-400", latency: "42ms" },
    testnet: { name: "Testnet", color: "bg-blue-400", latency: "55ms" },
    localnet: { name: "Localnet", color: "bg-purple-400", latency: "2ms" },
  };

  return (
    <div className="relative inline-block" suppressHydrationWarning>
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-medium text-foreground cursor-pointer shadow-xs backdrop-blur-md transition-all",
          className
        )}
      >
        <span className={cn("size-2 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.6)]", configs[currentNetwork].color)} />
        <span>{configs[currentNetwork].name}</span>
        {showLatency && (
          <span className="text-[10px] font-mono text-muted-foreground bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
            {configs[currentNetwork].latency}
          </span>
        )}
        <ChevronDownIcon className="size-3 text-muted-foreground" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            className="absolute left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#141221] backdrop-blur-2xl border border-zinc-200 dark:border-white/10 shadow-xl p-1.5 z-50 flex flex-col gap-1 text-foreground"
          >
            {(Object.keys(configs) as Array<keyof typeof configs>).map((net) => (
              <button
                key={net}
                type="button"
                onClick={() => {
                  onNetworkChange?.(net);
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-xl text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", configs[net].color)} />
                  <span className={currentNetwork === net ? "font-bold text-foreground" : ""}>
                    {configs[net].name}
                  </span>
                </div>
                {currentNetwork === net && <CheckCircle2Icon className="size-3.5 text-sky-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
