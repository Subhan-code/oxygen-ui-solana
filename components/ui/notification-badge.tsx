"use client";

import React, { useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";

export default function NotificationBadge() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleBadge = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-[200px] w-full items-center justify-center p-4">
      <button
        type="button"
        onClick={toggleBadge}
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-xs transition-transform active:scale-95 dark:border-zinc-800 dark:bg-zinc-900"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
        <span className="t-badge" data-open={isOpen}>
          <span className="t-badge-dot flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-xs">
            3
          </span>
        </span>
      </button>

      <style jsx>{`
        .t-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          pointer-events: none;
          will-change: transform;
        }
        .t-badge[data-open="true"] {
          animation: t-badge-slide-in 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t-badge-dot {
          display: flex;
          transform-origin: center;
          transform: scale(1);
          opacity: 1;
          filter: blur(0);
          transition:
            transform 500ms cubic-bezier(0.34, 1.36, 0.64, 1),
            opacity 400ms cubic-bezier(0.34, 1.36, 0.64, 1),
            filter 500ms cubic-bezier(0.34, 1.36, 0.64, 1);
          will-change: transform, opacity, filter;
        }
        .t-badge[data-open="false"] .t-badge-dot {
          transform: scale(0.95);
          opacity: 0;
          filter: blur(2px);
          transition:
            transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
            opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
            filter 180ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes t-badge-slide-in {
          from { transform: translate(-8.2px, 12.4px); }
          to { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-badge, .t-badge-dot { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
