"use client";

import * as React from "react";
import { toast, Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

export type TxnToastType = "success" | "pending" | "error";

export interface TxnToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  signature?: string;
  type?: TxnToastType;
  status?: "pending" | "confirmed" | "error" | "success";
  description?: string;
  explorerUrl?: string;
  onDismiss?: () => void;
  className?: string;
}

const truncate = (sig: string) => {
  if (sig.length <= 10) return sig;
  return `${sig.slice(0, 4)}...${sig.slice(-4)}`;
};

export function TxnToast({
  title = "Transaction sent",
  signature,
  type,
  status,
  description,
  explorerUrl,
  onDismiss,
  className,
  ...props
}: TxnToastProps) {
  const resolvedType: TxnToastType =
    type ?? (status === "confirmed" ? "success" : status ?? "success");

  const solscanUrl =
    explorerUrl ?? (signature ? `https://solscan.io/tx/${signature}` : undefined);

  return (
    <div
      data-slot="txn-toast"
      role="status"
      className={cn(
        "flex items-start justify-between gap-3.5 w-full max-w-[420px] rounded-2xl border border-white/[0.1] bg-zinc-950/90 p-4 text-zinc-100 shadow-2xl backdrop-blur-xl transition-all duration-200 select-none font-sans",
        "animate-in fade-in slide-in-from-top-2 duration-200",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 min-w-0">
        {resolvedType === "pending" ? (
          <div className="size-5 shrink-0 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin mt-0.5" />
        ) : resolvedType === "success" ? (
          <div className="size-5 shrink-0 rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mt-0.5 animate-in zoom-in-75 duration-200">
            <svg
              className="size-3 stroke-[2.5]"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.5 6.5L4.5 8.5L9.5 3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div className="size-5 shrink-0 rounded-full bg-rose-400/15 border border-rose-400/40 flex items-center justify-center text-rose-400 mt-0.5 animate-in zoom-in-75 duration-200">
            <svg
              className="size-3 stroke-[2.5]"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M3 3L9 9M9 3L3 9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold tracking-tight text-white truncate">
            {title}
          </span>

          {description && (
            <span className="text-[12px] text-zinc-400 mt-0.5 line-clamp-2">
              {description}
            </span>
          )}

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 mt-1">
            {signature && (
              <span title={signature} className="truncate">
                {truncate(signature)}
              </span>
            )}
            {signature && solscanUrl && (
              <span className="text-zinc-600" aria-hidden="true">
                ·
              </span>
            )}
            {solscanUrl && (
              <a
                href={solscanUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View transaction on Solscan"
                className="text-sky-400 hover:text-sky-300 hover:underline transition-colors"
              >
                View
              </a>
            )}
          </div>
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 text-zinc-500 hover:text-zinc-200 text-sm leading-none p-1 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        >
          ×
        </button>
      )}
    </div>
  );
}

const renderToast = (props: TxnToastProps, toastId: string | number) => {
  return <TxnToast {...props} onDismiss={() => toast.dismiss(toastId)} />;
};

export const txnToast = (props: TxnToastProps) => {
  const resolvedType =
    props.type ?? (props.status === "confirmed" ? "success" : props.status ?? "success");

  return toast.custom((id) => renderToast(props, id), {
    duration: resolvedType === "pending" ? Infinity : 5000,
  });
};

txnToast.update = (id: string | number, props: TxnToastProps) => {
  const resolvedType =
    props.type ?? (props.status === "confirmed" ? "success" : props.status ?? "success");

  toast.custom((toastId) => renderToast(props, toastId), {
    id,
    duration: resolvedType === "pending" ? Infinity : 5000,
  });
};

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast bg-transparent border-0 p-0 shadow-none",
        },
      }}
      {...props}
    />
  );
};

export { toast };
export { txnToast as showTxnToast };
export default TxnToast;
