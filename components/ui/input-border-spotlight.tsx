"use client";

import React, { useRef, useState } from "react";

export default function InputBorderSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!isFocused) {
      setOpacity(0);
    }
  };

  return (
    <div className="flex h-[200px] w-full items-center justify-center p-4">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white p-[1.5px] shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.5), transparent 80%)`,
          }}
        />
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Hover or focus for spotlight border..."
          className="relative w-full rounded-[10px] bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
}
