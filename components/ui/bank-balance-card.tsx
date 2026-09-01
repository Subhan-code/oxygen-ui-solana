"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CardItem {
  id: string;
  cardNumber: string;
  cardType: string;
  variant: "indigo" | "purple" | "emerald" | "amber";
}

export interface BankBalanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  statusLabel?: string;
  balanceMain?: string;
  balanceCents?: string;
  cards?: CardItem[];
  onCardClick?: (card: CardItem) => void;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: "card-1",
    cardNumber: "***** 4565",
    cardType: "VISA",
    variant: "indigo",
  },
  {
    id: "card-2",
    cardNumber: "***** 9745",
    cardType: "VISA",
    variant: "purple",
  },
];

export function BankBalanceCard({
  title = "Bank Balance",
  statusLabel = "Active",
  balanceMain = "$22,564",
  balanceCents = ".34",
  cards = DEFAULT_CARDS,
  onCardClick,
  className,
  ...props
}: BankBalanceCardProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || "");

  const getVariantStyles = (variant: CardItem["variant"], isSelected: boolean) => {
    switch (variant) {
      case "indigo":
        return isSelected
          ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 border-indigo-400/40"
          : "bg-indigo-600/90 text-white/90 hover:bg-indigo-600 border-transparent";
      case "purple":
        return isSelected
          ? "bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 text-purple-950 shadow-md shadow-purple-400/20 border-purple-100/50 font-medium"
          : "bg-purple-300/90 text-purple-950/90 hover:bg-purple-300 border-transparent";
      case "emerald":
        return isSelected
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 border-emerald-400/40"
          : "bg-emerald-600/90 text-white/90 hover:bg-emerald-600 border-transparent";
      case "amber":
        return isSelected
          ? "bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 shadow-lg shadow-amber-500/30 border-amber-300/40 font-medium"
          : "bg-amber-400/90 text-amber-950/90 hover:bg-amber-400 border-transparent";
      default:
        return "bg-indigo-600 text-white";
    }
  };

  return (
    <div
      data-slot="bank-balance-card"
      className={cn(
        "relative flex w-full max-w-[340px] flex-col justify-between rounded-[32px] p-7 text-white select-none",
        "bg-[#18181b] border border-zinc-800/80 shadow-2xl shadow-black/80 backdrop-blur-xl font-sans",
        className
      )}
      {...props}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <h3 className="text-base font-semibold tracking-tight text-zinc-200">{title}</h3>
        <span className="inline-flex items-center rounded-full bg-emerald-950/80 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800/50 shadow-xs">
          {statusLabel}
        </span>
      </div>

      {/* Hero Balance */}
      <div className="mb-8">
        <div className="flex items-baseline font-bold tracking-tight leading-none text-white text-4xl sm:text-5xl font-sans">
          <span>{balanceMain}</span>
          <span className="text-zinc-500 font-medium">{balanceCents}</span>
        </div>
      </div>

      {/* Stacked Cards List */}
      <div className="flex flex-col gap-2.5">
        {cards.map((card) => {
          const isSelected = selectedCardId === card.id;

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => {
                setSelectedCardId(card.id);
                onCardClick?.(card);
              }}
              className={cn(
                "flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200 border",
                getVariantStyles(card.variant, isSelected)
              )}
            >
              <span className="font-mono text-sm font-semibold tracking-wider">
                {card.cardNumber}
              </span>
              <span className="font-sans font-black italic tracking-widest text-sm uppercase">
                {card.cardType}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default BankBalanceCard;
