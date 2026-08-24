"use client";

import React, { useState } from "react";

type Ripple = {
  x: number;
  y: number;
  size: number;
  id: number;
};

export default function ButtonRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <button
        type="button"
        className="relative overflow-hidden rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white shadow-lg transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
        onClick={createRipple}
      >
        <span>Authorize Transaction</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={() => removeRipple(ripple.id)}
            className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple dark:bg-zinc-900/30"
            style={{
              width: ripple.size,
              height: ripple.size,
              top: ripple.y,
              left: ripple.x,
            }}
          />
        ))}
      </button>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 600ms linear forwards;
        }
      `}</style>
    </div>
  );
}
