"use client";

import {
  CheckCircle2Icon,
  ExternalLinkIcon,
  Loader2Icon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { toast, Toaster as Sonner, type ToasterProps } from "sonner";

export interface TxnToastProps {
  title?: string;
  description?: string;
  signature?: string;
  status?: "pending" | "confirmed" | "error";
  explorerUrl?: string;
}

const statusConfig = {
  pending: {
    icon: <Loader2Icon className="size-4 animate-spin text-zinc-400" />,
    defaultTitle: "Transaction pending",
    defaultDescription: "Waiting for confirmation...",
  },
  confirmed: {
    icon: <CheckCircle2Icon className="size-4 text-emerald-500" />,
    defaultTitle: "Transaction confirmed",
    defaultDescription: "Your transaction was successful.",
  },
  error: {
    icon: <XCircleIcon className="size-4 text-red-400" />,
    defaultTitle: "Transaction failed",
    defaultDescription: "Something went wrong. Please try again.",
  },
};

const truncateSignature = (sig: string) => {
  if (sig.length <= 12) return sig;
  return `${sig.slice(0, 6)}...${sig.slice(-4)}`;
};

const renderToast = (props: TxnToastProps, toastId: string | number) => {
  const {
    title,
    description,
    signature,
    status = "confirmed",
    explorerUrl,
  } = props;
  const config = statusConfig[status];
  const resolvedExplorerUrl =
    explorerUrl ??
    (signature ? `https://solscan.io/tx/${signature}` : undefined);

  return (
    <div className="flex gap-3 w-[356px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xl text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="mt-0.5 shrink-0">{config.icon}</div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-bold tracking-tight">
          {title ?? config.defaultTitle}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {description ?? config.defaultDescription}
        </span>
        {resolvedExplorerUrl && (
          <a
            href={resolvedExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-500 hover:underline transition-colors mt-0.5"
          >
            {signature ? truncateSignature(signature) : "View transaction"}
            <ExternalLinkIcon className="size-3" />
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={() => toast.dismiss(toastId)}
        className="shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  );
};

const txnToast = (props: TxnToastProps) => {
  const status = props.status ?? "confirmed";

  return toast.custom((id) => renderToast(props, id), {
    duration: status === "pending" ? Infinity : 5000,
  });
};

txnToast.update = (id: string | number, props: TxnToastProps) => {
  const status = props.status ?? "confirmed";

  toast.custom((toastId) => renderToast(props, toastId), {
    id,
    duration: status === "pending" ? Infinity : 5000,
  });
};

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { toast };
export { txnToast, txnToast as showTxnToast };

