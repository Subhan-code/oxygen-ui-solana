"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export interface TransactionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  success?: boolean;
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
}

export function TransactionButton({
  className,
  loading = false,
  success = false,
  label = "Confirm Transaction",
  loadingLabel = "Processing...",
  successLabel = "Confirmed",
  disabled,
  children,
  ...props
}: TransactionButtonProps) {
  return (
    <motion.button
      data-slot="transaction-button"
      whileTap={{ scale: 0.97 }}
      transition={springTransition}
      disabled={loading || success || disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl py-3 px-5 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60 shadow-xl",
        success
          ? "bg-emerald-500 text-zinc-950 shadow-emerald-500/20"
          : loading
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 shadow-emerald-500/25 hover:brightness-110",
        className
      )}
      {...(props as any)}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springTransition}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
            <span>{loadingLabel}</span>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={springTransition}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-zinc-950" />
            <span>{successLabel}</span>
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            {children || label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export type TxState = "pending" | "confirmed" | "failed";

export interface TransactionStatusProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: TxState;
}

export function TransactionStatus({
  className,
  status,
  ...props
}: TransactionStatusProps) {
  const styles: Record<TxState, { bg: string; text: string; icon: React.ReactNode }> = {
    pending: {
      bg: "border-amber-500/20 bg-amber-500/10 text-amber-400",
      text: "Pending",
      icon: <Clock className="h-3.5 w-3.5 animate-pulse" />,
    },
    confirmed: {
      bg: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      text: "Confirmed",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    failed: {
      bg: "border-rose-500/20 bg-rose-500/10 text-rose-400",
      text: "Failed",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
  };

  return (
    <motion.div
      data-slot="transaction-status"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springTransition}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold capitalize backdrop-blur-md",
        styles[status].bg,
        className
      )}
      {...(props as any)}
    >
      {styles[status].icon}
      <span>{styles[status].text}</span>
    </motion.div>
  );
}

export interface TransactionToastProps {
  status: TxState;
  title: string;
  message?: string;
  signature?: string;
  onClose?: () => void;
  className?: string;
}

export function TransactionToast({
  status,
  title,
  message,
  signature,
  onClose,
  className,
}: TransactionToastProps) {
  return (
    <motion.div
      data-slot="transaction-toast"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={springTransition}
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/90 p-4 shadow-2xl backdrop-blur-xl",
        className
      )}
    >
      <div className="mt-0.5">
        {status === "confirmed" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
        {status === "pending" && <Loader2 className="h-5 w-5 animate-spin text-amber-400" />}
        {status === "failed" && <XCircle className="h-5 w-5 text-rose-400" />}
      </div>
      <div className="flex-1 space-y-1">
        <h5 className="font-bold text-white text-xs tracking-tight">{title}</h5>
        {message && <p className="text-[11px] text-zinc-400 leading-relaxed">{message}</p>}
        {signature && (
          <ExplorerLink signature={signature} className="mt-1" />
        )}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-zinc-500 hover:text-white text-xs">
          ✕
        </button>
      )}
    </motion.div>
  );
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  recipient?: string;
  amount?: string;
  fee?: string;
  loading?: boolean;
  className?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Review Transaction",
  recipient,
  amount,
  fee = "0.000005 SOL",
  loading = false,
  className,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div data-slot="confirmation-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={springTransition}
            className={cn(
              "relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl space-y-4",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
            <div className="space-y-2 rounded-xl border border-white/5 bg-zinc-900/60 p-4 text-xs">
              {recipient && (
                <div className="flex justify-between text-zinc-400">
                  <span>Recipient:</span>
                  <span className="font-mono text-zinc-200 truncate max-w-[200px]">{recipient}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between text-zinc-400">
                  <span>Amount:</span>
                  <span className="font-bold text-emerald-400">{amount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400 border-t border-white/5 pt-2">
                <span>Estimated Fee:</span>
                <span className="text-zinc-300 font-semibold">{fee}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 bg-zinc-900 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </motion.button>
              <TransactionButton loading={loading} onClick={onConfirm} className="flex-1">
                Confirm
              </TransactionButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export interface TransactionDetailsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "slot"> {
  signature: string;
  slot?: number;
  fee?: string;
  recentBlockhash?: string;
}

export function TransactionDetails({
  className,
  signature,
  slot = 289410293,
  fee = "0.000005 SOL",
  recentBlockhash,
  ...props
}: TransactionDetailsProps) {
  return (
    <motion.div
      data-slot="transaction-details"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className={cn(
        "rounded-2xl border border-white/10 bg-zinc-950/80 p-5 space-y-3 text-xs backdrop-blur-xl shadow-xl",
        className
      )}
      {...(props as any)}
    >
      <h4 className="font-bold text-white text-sm tracking-tight">Transaction Details</h4>
      <div className="space-y-2 border-t border-white/5 pt-3">
        <div className="flex justify-between">
          <span className="text-zinc-500 font-medium">Signature:</span>
          <SignatureDisplay signature={signature} />
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 font-medium">Slot:</span>
          <span className="font-mono text-zinc-300">{slot.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 font-medium">Network Fee:</span>
          <span className="text-emerald-400 font-bold">{fee}</span>
        </div>
        {recentBlockhash && (
          <div className="flex justify-between">
            <span className="text-zinc-500 font-medium">Recent Blockhash:</span>
            <span className="font-mono text-zinc-400 truncate max-w-[150px]">
              {recentBlockhash}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export interface TransactionItemData {
  id: string;
  type: "send" | "receive" | "swap";
  amount: string;
  timestamp: string;
  status: TxState;
  signature?: string;
}

export interface TransactionHistoryProps {
  transactions: TransactionItemData[];
  className?: string;
}

export function TransactionHistory({
  transactions,
  className,
}: TransactionHistoryProps) {
  return (
    <div
      data-slot="transaction-history"
      className={cn("flex flex-col gap-2", className)}
    >
      {transactions.map((tx, idx) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: idx * 0.03 }}
        >
          <TransactionRow {...tx} />
        </motion.div>
      ))}
    </div>
  );
}

export interface TransactionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "send" | "receive" | "swap";
  amount: string;
  timestamp: string;
  status: TxState;
}

export function TransactionRow({
  className,
  type,
  amount,
  timestamp,
  status,
  ...props
}: TransactionRowProps) {
  const icons = {
    send: <ArrowUpRight className="h-4 w-4 text-rose-400" />,
    receive: <ArrowDownLeft className="h-4 w-4 text-emerald-400" />,
    swap: <RefreshCw className="h-4 w-4 text-amber-400" />,
  };

  return (
    <motion.div
      data-slot="transaction-row"
      whileTap={{ scale: 0.99 }}
      transition={springTransition}
      className={cn(
        "flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/60 p-3.5 text-xs transition-colors hover:border-white/10 cursor-pointer backdrop-blur-md",
        className
      )}
      {...(props as any)}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
          {icons[type]}
        </div>
        <div>
          <span className="font-bold text-white capitalize">{type}</span>
          <p className="text-[10px] text-zinc-500 font-medium">{timestamp}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
        <span className="font-bold text-white tracking-tight">{amount}</span>
        <TransactionStatus status={status} />
      </div>
    </motion.div>
  );
}

export interface SignatureDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  signature: string;
}

export function SignatureDisplay({
  className,
  signature,
  ...props
}: SignatureDisplayProps) {
  const [copied, setCopied] = React.useState(false);
  const truncated = `${signature.slice(0, 6)}...${signature.slice(-6)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-slot="signature-display"
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 tracking-tight",
        className
      )}
      {...props}
    >
      <span>{truncated}</span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleCopy}
        className="text-zinc-500 hover:text-white transition-colors"
        title="Copy signature"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={springTransition}
            >
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={springTransition}
            >
              <Copy className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export interface ExplorerLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  signature: string;
  label?: string;
}

export function ExplorerLink({
  className,
  signature,
  label = "View on Solscan",
  ...props
}: ExplorerLinkProps) {
  return (
    <motion.a
      data-slot="explorer-link"
      whileTap={{ scale: 0.96 }}
      transition={springTransition}
      href={`https://solscan.io/tx/${signature}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline",
        className
      )}
      {...(props as any)}
    >
      <span>{label}</span>
      <ExternalLink className="h-3 w-3" />
    </motion.a>
  );
}

export interface FeeDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  feeSol: number;
  priorityFeeSol?: number;
}

export function FeeDisplay({
  className,
  feeSol,
  priorityFeeSol = 0.0001,
  ...props
}: FeeDisplayProps) {
  const total = feeSol + priorityFeeSol;

  return (
    <div
      data-slot="fee-display"
      className={cn(
        "flex items-center justify-between rounded-xl border border-white/10 bg-zinc-950/80 p-3 text-xs backdrop-blur-md",
        className
      )}
      {...props}
    >
      <span className="text-zinc-400 font-medium">Estimated Network Fee</span>
      <div className="text-right">
        <motion.span
          key={total}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="font-extrabold text-white"
        >
          {total.toFixed(6)} SOL
        </motion.span>
        {priorityFeeSol > 0 && (
          <p className="text-[10px] text-emerald-400 font-semibold">Includes Priority Fee</p>
        )}
      </div>
    </div>
  );
}

export interface PriorityFeeSelectorProps {
  selectedPreset: "none" | "low" | "medium" | "high";
  onSelect: (preset: "none" | "low" | "medium" | "high") => void;
  className?: string;
}

export function PriorityFeeSelector({
  selectedPreset,
  onSelect,
  className,
}: PriorityFeeSelectorProps) {
  const presets = [
    { id: "none", label: "Default" },
    { id: "low", label: "Fast" },
    { id: "medium", label: "Turbo" },
    { id: "high", label: "Ultra" },
  ] as const;

  return (
    <div
      data-slot="priority-fee-selector"
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 backdrop-blur-xl shadow-xl",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-300">Priority Fee</span>
        <Zap className="h-4 w-4 text-amber-400" />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {presets.map((p) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            onClick={() => onSelect(p.id)}
            className={cn(
              "rounded-xl py-2 text-xs font-bold transition-all relative",
              selectedPreset === p.id
                ? "bg-emerald-500 text-zinc-950 shadow-md"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            )}
          >
            {p.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export interface TransactionStep {
  title: string;
  status: "complete" | "current" | "upcoming";
}

export interface TransactionProgressProps {
  steps: TransactionStep[];
  className?: string;
}

export function TransactionProgress({
  steps,
  className,
}: TransactionProgressProps) {
  return (
    <div
      data-slot="transaction-progress"
      className={cn("flex flex-col gap-3", className)}
    >
      {steps.map((step, idx) => (
        <div key={step.title} className="flex items-center gap-3 text-xs">
          <motion.div
            animate={{ scale: step.status === "current" ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1.5, repeat: step.status === "current" ? Infinity : 0 }}
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-extrabold",
              step.status === "complete"
                ? "bg-emerald-500 text-zinc-950"
                : step.status === "current"
                  ? "border-2 border-emerald-500 text-emerald-400 bg-emerald-500/10"
                  : "bg-zinc-900 text-zinc-600"
            )}
          >
            {step.status === "complete" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <span>{idx + 1}</span>
            )}
          </motion.div>
          <span
            className={cn(
              "font-semibold tracking-tight",
              step.status === "upcoming" ? "text-zinc-500" : "text-white"
            )}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}

