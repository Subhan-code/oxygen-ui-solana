"use client";

import React, { useState } from "react";
import { QrCode, ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SolanaPayButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  amountUsd?: number;
  label?: string;
  merchantName?: string;
  onPay?: () => void;
}

const springButton = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
  mass: 0.6,
};

export function SolanaPayButton({
  amountUsd = 49.99,
  label = "Pay with Solana Pay",
  merchantName = "Oxygen Store",
  onPay,
  className,
  ...props
}: SolanaPayButtonProps) {
  const [success, setSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPay?.();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    props.onClick?.(e);
  };

  return (
    <motion.button
      whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={springButton}
      onClick={handleClick}
      data-slot="solana-pay-button"
      className={cn(
        "group relative flex w-full max-w-sm items-center justify-between overflow-hidden rounded-2xl p-4 font-semibold text-white shadow-xl transition-colors cursor-pointer outline-none",
        success ? "bg-emerald-600 shadow-emerald-500/25" : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 z-10">
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md shadow-2xs">
          {success ? <Check className="size-5 text-white stroke-[3]" /> : <QrCode className="size-5 text-white" />}
        </div>
        <div className="text-left">
          <span className="font-bold text-sm block tracking-tight">{success ? "Payment Confirmed!" : label}</span>
          <span className="text-[11px] text-white/80 font-normal">{merchantName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-sm font-bold z-10">
        <span>${amountUsd.toFixed(2)}</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.button>
  );
}

export default SolanaPayButton;
