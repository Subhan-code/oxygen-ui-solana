"use client";

import React, { useState } from "react";
import { Check, Share } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface EventDate {
  month: string;
  day: string | number;
  weekday: string;
}

export interface SolanaEventCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  title?: string;
  description?: string;
  date?: EventDate;
  imageUrl?: string;
  actionText?: string;
  joinedText?: string;
  onJoin?: () => void;
  onShare?: () => void;
  shareUrl?: string;
}

export function SolanaEventCard({
  title = "The August Assembly",
  description = "New month, new mindset. Building high-throughput dApps & connecting the Solana community.",
  date = { month: "AUG", day: "08", weekday: "Fri" },
  imageUrl = "https://i.pinimg.com/736x/46/a7/ff/46a7fff0f3fc82c400a5db51732bdb35.jpg",
  actionText = "RSVP for August",
  joinedText = "Attending",
  onJoin,
  onShare,
  shareUrl,
  className,
  ...props
}: SolanaEventCardProps) {
  const reduceMotion = useReducedMotion();
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    }
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJoined((prev) => !prev);
    onJoin?.();
  };

  return (
    <motion.div
      data-slot="solana-event-card"
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative flex w-full max-w-[310px] flex-col justify-between overflow-hidden rounded-[36px] border border-blue-900/30 dark:border-white/10 bg-[#050a18] text-white shadow-2xl shadow-blue-950/50 select-none",
        className
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
      {...props}
    >
      {/* Background artwork and atmospheric lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft atmospheric gradient into deep midnight base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050a18] to-80%" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#050a18] from-40% via-[#050a18]/95 via-75% to-transparent" />
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6">
        {/* Top Header: Date badge and frosted share button */}
        <div className="flex items-start justify-between gap-3">
          {/* Calendar Badge */}
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            className="flex w-13 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-center shadow-lg shadow-black/30"
          >
            <div className="bg-[#050a18] py-1 px-2 text-[9px] font-bold tracking-widest text-white uppercase leading-none">
              {date.month}
            </div>
            <div className="px-1 pt-1.5 pb-0.5 text-lg font-bold tracking-tight text-zinc-950 leading-none">
              {date.day}
            </div>
            <div className="pb-1.5 text-[9px] font-medium tracking-wide text-zinc-500 leading-none">
              {date.weekday}
            </div>
          </motion.div>

          {/* Frosted Glass Share Button */}
          <motion.button
            type="button"
            aria-label="Share event"
            onClick={handleShare}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/20 text-white shadow-md backdrop-blur-md transition-colors hover:bg-white/30 active:bg-white/40"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Share className="h-4 w-4" />
            )}
          </motion.button>
        </div>

        {/* Bottom Details & Action */}
        <div className="mt-auto pt-10">
          {/* Event Title in editorial serif font */}
          <h3 className="font-serif text-[26px] font-normal leading-[1.18] tracking-tight text-white drop-shadow-sm">
            {title}
          </h3>

          {/* Clean Subtitle */}
          {description && (
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-200/90 font-light">
              {description}
            </p>
          )}

          {/* Primary Action Button */}
          <motion.button
            type="button"
            onClick={handleJoin}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            className={cn(
              "mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xl",
              joined
                ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/25"
                : "bg-white text-zinc-950 hover:bg-zinc-100"
            )}
          >
            {joined ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>{joinedText}</span>
              </>
            ) : (
              <span>{actionText}</span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default SolanaEventCard;
