"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  AlertCircle,
  RefreshCw,
  FolderOpen,
  WifiOff,
  Coins,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export type SkeletonCardProps = React.HTMLAttributes<HTMLDivElement>;

export function SkeletonCard({ className, ...props }: SkeletonCardProps) {
  return (
    <div
      data-slot="skeleton-card"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-white/5 bg-zinc-950/60 p-5 animate-pulse backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded bg-white/10" />
          <div className="h-3 w-1/4 rounded bg-white/5" />
        </div>
      </div>
      <div className="h-8 w-full rounded-xl bg-white/5 mt-2" />
    </div>
  );
}

export interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
}

export function SkeletonTable({
  className,
  rows = 4,
  ...props
}: SkeletonTableProps) {
  return (
    <div
      data-slot="skeleton-table"
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-white/5 bg-zinc-950/60 p-4 animate-pulse backdrop-blur-md",
        className
      )}
      {...props}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
          <div className="h-4 w-24 rounded bg-white/10" />
          <div className="h-4 w-16 rounded bg-white/10" />
          <div className="h-4 w-12 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  className,
  title = "No Data Found",
  description = "There are no records to display at this time.",
  actionLabel,
  onAction,
  ...props
}: EmptyStateProps) {
  return (
    <motion.div
      data-slot="empty-state"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-8 text-center backdrop-blur-md",
        className
      )}
      {...(props as any)}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400">
        <FolderOpen className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-white text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="mt-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  className,
  title = "Something Went Wrong",
  message = "An unhandled error occurred while completing this request.",
  onRetry,
  ...props
}: ErrorStateProps) {
  return (
    <motion.div
      data-slot="error-state"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center text-rose-300 backdrop-blur-md shadow-xl",
        className
      )}
      {...(props as any)}
    >
      <AlertCircle className="h-8 w-8 text-rose-400" />
      <div className="space-y-1">
        <h4 className="font-bold text-white text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-rose-300/80 max-w-xs leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/20 border border-rose-500/30 px-4 py-2 text-xs font-bold text-rose-200 hover:bg-rose-500/30 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export interface RpcErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  endpoint?: string;
  onSwitchEndpoint?: () => void;
}

export function RpcError({
  className,
  endpoint = "https://api.mainnet-beta.solana.com",
  onSwitchEndpoint,
  ...props
}: RpcErrorProps) {
  return (
    <motion.div
      data-slot="rpc-error"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-amber-300 backdrop-blur-md shadow-xl",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-2.5">
        <WifiOff className="h-5 w-5 text-amber-400" />
        <h4 className="font-bold text-white tracking-tight">RPC Node Failure</h4>
      </div>
      <p className="text-amber-300/80 leading-relaxed">
        Failed to fetch on-chain state from RPC node <code className="font-mono text-white">{endpoint}</code>.
      </p>
      {onSwitchEndpoint && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onSwitchEndpoint}
          className="self-start rounded-xl bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 font-bold text-amber-200 hover:bg-amber-500/30 transition-colors"
        >
          Switch RPC Endpoint
        </motion.button>
      )}
    </motion.div>
  );
}

export interface InsufficientFundsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  requiredAmount: number;
  currentAmount: number;
  symbol?: string;
}

export function InsufficientFunds({
  className,
  requiredAmount,
  currentAmount,
  symbol = "SOL",
  ...props
}: InsufficientFundsProps) {
  return (
    <motion.div
      data-slot="insufficient-funds"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md shadow-xl",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-2">
        <Coins className="h-4 w-4 text-rose-400" />
        <h5 className="font-bold text-white tracking-tight">Insufficient Balance</h5>
      </div>
      <p className="font-medium">
        Required: <strong className="text-white">{requiredAmount} {symbol}</strong> | Available: <strong className="text-white">{currentAmount} {symbol}</strong>
      </p>
    </motion.div>
  );
}

