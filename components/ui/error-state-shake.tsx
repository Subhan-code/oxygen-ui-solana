"use client";

import React, { useState } from "react";

export default function ErrorStateShake() {
  const [address, setAddress] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = address.endsWith(".sol") || address.length >= 32;
    if (!isValid || !address.trim()) {
      setIsError(true);
      setIsShaking(false);
      requestAnimationFrame(() => {
        setIsShaking(true);
      });
      setTimeout(() => {
        setIsError(false);
        setIsShaking(false);
      }, 3000);
    } else {
      setIsError(false);
      setIsShaking(false);
    }
  };

  return (
    <div className="flex h-[260px] w-full flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className={`t-input-wrap ${isError ? "is-error" : ""}`}>
          <div
            className={`t-input flex items-center rounded-xl border ${
              isError
                ? "border-red-500 bg-red-50/50 dark:border-red-500/80 dark:bg-red-950/20"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            } px-3.5 py-2.5 ${isShaking ? "is-shaking" : ""}`}
          >
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address or .sol domain..."
              className="w-full bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100 placeholder:text-zinc-400"
            />
            <button
              type="submit"
              className="ml-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900"
            >
              Verify
            </button>
          </div>
          <p className="t-error-msg mt-2 text-xs font-medium text-red-500 dark:text-red-400">
            Invalid Solana public key or SNS domain format.
          </p>
        </div>
      </form>

      <style jsx>{`
        .t-input {
          transition: border-color 150ms ease-out;
          will-change: transform;
        }
        .t-input.is-error {
          transition: border-color 280ms ease-out;
        }
        .t-error-msg {
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 280ms ease-out,
            visibility 0s linear 280ms;
        }
        .t-input-wrap.is-error .t-error-msg {
          opacity: 1;
          visibility: visible;
          transition:
            opacity 280ms ease-out,
            visibility 0s linear 0s;
        }
        .t-input.is-shaking {
          animation: t-input-shake 280ms linear;
        }
        @keyframes t-input-shake {
          0% { transform: translateX(0); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          28.57% { transform: translateX(6px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          57.14% { transform: translateX(-6px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          78.57% { transform: translateX(4px); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-input { animation: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
