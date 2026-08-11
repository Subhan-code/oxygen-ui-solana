"use client";

import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function ModalTransition() {
  const [modalState, setModalState] = useState<"closed" | "is-open" | "is-closing">("closed");

  const openModal = () => {
    setModalState("is-open");
  };

  const closeModal = () => {
    setModalState("is-closing");
    setTimeout(() => {
      setModalState("closed");
    }, 150);
  };

  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center p-4">
      <button
        type="button"
        onClick={openModal}
        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
      >
        Open Modal
      </button>

      {modalState !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className={`t-modal ${modalState} w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900`}>
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Transitions.dev Modal
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Cross1Icon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Smooth scale and fade cubic-bezier modal transition with reduced motion support.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .t-modal {
          --modal-open-dur: 250ms;
          --modal-close-dur: 150ms;
          --modal-scale: 0.96;
          --modal-scale-close: 0.96;
          --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
          transform: scale(var(--modal-scale));
          opacity: 0;
          pointer-events: none;
          transition:
            transform var(--modal-open-dur) var(--modal-ease),
            opacity var(--modal-open-dur) var(--modal-ease);
          will-change: transform, opacity;
        }
        .t-modal.is-open {
          transform: scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        .t-modal.is-closing {
          transform: scale(var(--modal-scale-close));
          opacity: 0;
          pointer-events: none;
          transition:
            transform var(--modal-close-dur) var(--modal-ease),
            opacity var(--modal-close-dur) var(--modal-ease);
        }
        @media (prefers-reduced-motion: reduce) {
          .t-modal {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
