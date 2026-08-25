"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Activity,
  Wifi,
  WifiOff,
  AlertTriangle,
  Wallet,
  ChevronDown,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export type ClusterName = "mainnet-beta" | "devnet" | "testnet" | "localnet";

// 9. NetworkBadge
export interface NetworkBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cluster?: ClusterName;
  interactive?: boolean;
}

export function NetworkBadge({
  className,
  cluster = "mainnet-beta",
  interactive = false,
  ...props
}: NetworkBadgeProps) {
  const clusterStyles: Record<ClusterName, string> = {
    "mainnet-beta":
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    devnet: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    testnet: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    localnet: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  };

  const displayNames: Record<ClusterName, string> = {
    "mainnet-beta": "Mainnet",
    devnet: "Devnet",
    testnet: "Testnet",
    localnet: "Localnet",
  };

  const content = (
    <div
      data-slot="network-badge"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight backdrop-blur-xl transition-all shadow-sm select-none",
        clusterStyles[cluster],
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75"
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span>{displayNames[cluster]}</span>
    </div>
  );

  if (interactive) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={springTransition} className="inline-block cursor-pointer">
        {content}
      </motion.div>
    );
  }

  return content;
}

// 10. NetworkSwitcher
export interface NetworkSwitcherProps {
  activeCluster: ClusterName;
  onClusterChange: (cluster: ClusterName) => void;
  className?: string;
}

export function NetworkSwitcher({
  activeCluster,
  onClusterChange,
  className,
}: NetworkSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const clusters: ClusterName[] = [
    "mainnet-beta",
    "devnet",
    "testnet",
    "localnet",
  ];

  return (
    <div data-slot="network-switcher" className={cn("relative inline-block", className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={springTransition}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-2xl border border-white/12 bg-[#121215] px-3.5 py-2 text-xs font-semibold text-zinc-200 backdrop-blur-2xl hover:bg-[#18181c] transition-colors shadow-lg cursor-pointer"
      >
        <Globe className="h-4 w-4 text-zinc-400" />
        <NetworkBadge cluster={activeCluster} />
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={springTransition}
            className="absolute right-0 mt-2 z-50 w-48 rounded-2xl border border-white/15 bg-[#121215] p-1.5 shadow-2xl backdrop-blur-2xl text-white"
          >
            {clusters.map((c) => (
              <motion.button
                key={c}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                onClick={() => {
                  onClusterChange(c);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold capitalize transition-colors cursor-pointer",
                  c === activeCluster
                    ? "bg-white/10 text-white border border-white/15 font-bold"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{c.replace("-beta", "")}</span>
                {c === activeCluster && (
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 11. ConnectionStatus
export interface ConnectionStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status?: "online" | "offline" | "reconnecting";
}

export function ConnectionStatus({
  className,
  status = "online",
  ...props
}: ConnectionStatusProps) {
  const isOnline = status === "online";
  const isReconnecting = status === "reconnecting";

  return (
    <motion.div
      data-slot="connection-status"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-tight backdrop-blur-xl shadow-sm select-none",
        isOnline
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : isReconnecting
            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
            : "border-rose-500/30 bg-rose-500/10 text-rose-400",
        className
      )}
      {...(props as any)}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <motion.span
          animate={{ scale: isReconnecting ? [1, 1.8, 1] : 1, opacity: isReconnecting ? [0.6, 0, 0.6] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75"
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {isOnline ? (
        <Wifi className="h-3.5 w-3.5" />
      ) : isReconnecting ? (
        <Activity className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <WifiOff className="h-3.5 w-3.5" />
      )}
      <span className="capitalize">{status}</span>
    </motion.div>
  );
}

// 12. RpcHealthIndicator
export interface RpcHealthIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pingMs?: number;
  tps?: number;
  status?: "optimal" | "degraded" | "down";
}

export function RpcHealthIndicator({
  className,
  pingMs = 24,
  tps = 2950,
  status = "optimal",
  ...props
}: RpcHealthIndicatorProps) {
  const statusColor =
    status === "optimal"
      ? "bg-emerald-400 shadow-emerald-400/50"
      : status === "degraded"
        ? "bg-amber-400 shadow-amber-400/50"
        : "bg-rose-400 shadow-rose-400/50";

  return (
    <motion.div
      data-slot="rpc-health-indicator"
      whileHover={{ scale: 1.01, y: -1 }}
      transition={springTransition}
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-white/12 bg-[#121215] px-4.5 py-3 text-xs backdrop-blur-2xl shadow-xl select-none text-white",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("h-2 w-2 rounded-full shadow-sm", statusColor)} />
        <span className="font-bold text-zinc-100 capitalize">
          RPC {status}
        </span>
      </div>
      <div className="flex items-center gap-3.5 border-l border-white/10 pl-3.5 text-zinc-400 font-mono text-[11px]">
        <span>
          Latency: <strong className="text-zinc-200 font-bold">{pingMs}ms</strong>
        </span>
        <span>
          TPS: <strong className="text-white font-bold">{tps.toLocaleString()}</strong>
        </span>
      </div>
    </motion.div>
  );
}

// 13. ClusterBanner
export interface ClusterBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  expectedCluster?: string;
  currentCluster?: string;
  onSwitch?: () => void;
  onDismiss?: () => void;
}

export function ClusterBanner({
  className,
  expectedCluster = "Mainnet-Beta",
  currentCluster = "Devnet",
  onSwitch,
  onDismiss,
  ...props
}: ClusterBannerProps) {
  return (
    <motion.div
      data-slot="cluster-banner"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={springTransition}
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4.5 py-3.5 text-xs text-amber-200 backdrop-blur-2xl shadow-xl",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <span className="leading-relaxed">
          Connected to <strong className="text-amber-300 font-bold">{currentCluster}</strong>. Application expects <strong className="text-amber-300 font-bold">{expectedCluster}</strong>.
        </span>
      </div>
      {onSwitch && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          onClick={onSwitch}
          className="shrink-0 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
        >
          Switch Network
        </motion.button>
      )}
    </motion.div>
  );
}

// 14. WalletNotConnected
export interface WalletNotConnectedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onConnect?: () => void;
}

export function WalletNotConnected({
  className,
  onConnect,
  ...props
}: WalletNotConnectedProps) {
  return (
    <motion.div
      data-slot="wallet-not-connected"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 bg-[#121215]/80 p-8 text-center backdrop-blur-2xl shadow-xl text-white",
        className
      )}
      {...(props as any)}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10 shadow-md">
        <Wallet className="h-7 w-7" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="font-bold text-white text-base tracking-tight">Wallet Not Connected</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Connect your Solana wallet to view portfolio balances, tokens, transactions, and dApp interactions.
        </p>
      </div>
      {onConnect && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={springTransition}
          onClick={onConnect}
          className="mt-1 rounded-2xl bg-white px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-lg cursor-pointer"
        >
          Connect Wallet
        </motion.button>
      )}
    </motion.div>
  );
}

