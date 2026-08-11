"use client";

import React, { useRef, useState } from "react";

const MagneticBackgroundTab = ({
  item,
}: {
  item: { id: number; text: string };
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [hoverPosition, setHoverPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;

    setHoverPosition({ x, y, opacity: 1 });
  };

  const onMouseOut = () => {
    setHoverPosition({ x: 0, y: 0, opacity: 0 });
  };

  return (
    <button
      ref={ref}
      className="relative flex h-9 items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseOut}
      type="button"
    >
      <span className="relative z-10 px-4 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
        {item.text}
      </span>
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full rounded-[4px] bg-zinc-200/80 transition-opacity dark:bg-zinc-800/80"
        aria-hidden="true"
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity,
        }}
      />
    </button>
  );
};

const defaultTabs = [
  { id: 1, text: "Home" },
  { id: 2, text: "Blog" },
  { id: 3, text: "Projects" },
];

export default function MagneticBackgroundTabs() {
  return (
    <div className="flex flex-row items-center gap-1">
      {defaultTabs.map((item) => (
        <MagneticBackgroundTab key={item.id} item={item} />
      ))}
    </div>
  );
}
