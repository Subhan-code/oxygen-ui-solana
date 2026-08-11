"use client";

import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function InputClearDissolve() {
  const [value, setValue] = useState("Search components...");
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = () => {
    setIsClearing(true);
    setTimeout(() => {
      setValue("");
      setIsClearing(false);
    }, 400);
  };

  return (
    <div className="flex h-[200px] w-full items-center justify-center p-4">
      <div
        className={`t-clear relative flex h-11 w-full max-w-sm items-center rounded-xl border border-zinc-200 bg-white px-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 ${
          value ? "has-value" : ""
        } ${isClearing ? "is-clearing" : ""}`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          className="w-full bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100 placeholder:text-zinc-400"
        />
        <div className="t-clear-mirror text-sm text-zinc-900 dark:text-zinc-100" aria-hidden="true">
          {value}
        </div>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="t-clear-btn ml-2 rounded-full p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            aria-label="Clear input"
          >
            <Cross1Icon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <style jsx>{`
        .t-clear {
          position: relative;
          overflow: hidden;
        }
        .t-clear-mirror {
          position: absolute;
          left: 14px;
          display: flex;
          align-items: center;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
          opacity: 0;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t-clear.has-value .t-clear-mirror {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .t-clear.is-clearing .t-clear-mirror {
          opacity: 0;
          transform: translateY(-12px);
          filter: blur(2px);
        }
        .t-clear.has-value > input,
        .t-clear.is-clearing > input {
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
