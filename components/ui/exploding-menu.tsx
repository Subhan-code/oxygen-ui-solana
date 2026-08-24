"use client";

import React, { useState } from "react";
import {
  HeartIcon,
  DownloadIcon,
  DrawingPinIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import useLongPress from "@/lib/hooks/useLongPress";
import useIsTouchDevice from "@/lib/hooks/useIsTouchDevice";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  {
    icon: <HeartIcon className="h-4 w-4 text-white" />,
    label: "Like Solana Token",
    onClick: () => console.log("like"),
  },
  {
    icon: <DownloadIcon className="h-4 w-4 text-white" />,
    label: "Download Keypair",
    onClick: () => console.log("download"),
  },
  {
    icon: <DrawingPinIcon className="h-4 w-4 text-white" />,
    label: "Pin Wallet Address",
    onClick: () => console.log("pin"),
  },
  {
    icon: <PlusIcon className="h-4 w-4 text-white" />,
    label: "Add to Watchlist",
    onClick: () => console.log("add"),
  },
];

const mapRange = (
  inputLower: number,
  inputUpper: number,
  outputLower: number,
  outputUpper: number
) => {
  const INPUT_RANGE = inputUpper - inputLower;
  const OUTPUT_RANGE = outputUpper - outputLower;

  return (value: number) =>
    outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
};

function ExplodingMenuItem({
  item,
  index,
}: {
  item: typeof MENU_ITEMS[0];
  index: number;
}) {
  const DISTANCE_INCREMENT = 14;
  const x = useSpring(useMotionValue(0), { mass: 0.005, stiffness: 100 });
  const y = useSpring(useMotionValue(0), { mass: 0.005, stiffness: 100 });
  const distance = `${index * DISTANCE_INCREMENT}%`;

  const setTransform = (
    itemEl: HTMLElement & EventTarget,
    event: React.PointerEvent,
    motionX: MotionValue,
    motionY: MotionValue
  ) => {
    const bounds = itemEl.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);

    motionX.set(xRange * 3);
    motionY.set(yRange * 3);
  };

  return (
    <motion.li
      key={item.label}
      style={{
        offsetDistance: distance,
        position: "absolute",
        offsetRotate: "0deg",
        left: 16,
        top: 16,
        x,
        y,
      }}
      whileHover={{ scale: 1.2 }}
      initial={{
        opacity: 0,
        scale: 0.5,
        offsetPath: `path("M 0 0 m 0 0 a 9.6 9.6 90 1 0 0 0 a 9.6 9.6 90 1 0 0 0")`,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        offsetPath: `path("M 0 0 m -0 -48 a 48 48 180 1 0 0 96 a 48 48 180 1 0 -0 -96")`,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        offsetPath: `path("M 0 0 m 0 0 a 9.6 9.6 90 1 0 0 0 a 9.6 9.6 90 1 0 0 0")`,
      }}
      onPointerMove={(event) => {
        const itemEl = event.currentTarget;
        setTransform(itemEl, event, x, y);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ duration: 0.2, delay: index * 0.02, ease: "easeInOut" }}
    >
      <motion.button
        type="button"
        onClick={item.onClick}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-purple-600 shadow-lg text-white hover:bg-purple-500 active:scale-95"
      >
        {item.icon}
      </motion.button>
    </motion.li>
  );
}

export function ExplodingMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const mouseXValue = useMotionValue(0);
  const mouseYValue = useMotionValue(0);
  const isTouchDevice = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onLongPress = () => {
    x.set(mouseXValue.get());
    y.set(mouseYValue.get());

    setIsOpen(true);
  };

  const longPressHandlers = useLongPress({
    onLongPress,
    onCancel: () => setIsOpen(false),
    delay: 0,
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseXValue.set(event.clientX - rect.left - 18);
    mouseYValue.set(event.clientY - rect.top - 18);
  };

  return (
    <div
      data-slot="exploding-menu"
      className={cn(
        "relative flex h-[360px] w-full max-w-sm flex-col items-center justify-center rounded-3xl bg-zinc-950 p-4 select-none active:cursor-move",
        className
      )}
      onTouchEnd={longPressHandlers.onTouchEnd}
      onMouseUp={longPressHandlers.onMouseUp}
    >
      {isTouchDevice ? (
        <p className="py-2 text-center text-xs text-zinc-400 font-mono">
          This component is optimized for mouse hover/hold.
        </p>
      ) : null}
      <div
        className="relative z-0 h-64 w-64 select-none rounded-2xl overflow-hidden shadow-xl border border-zinc-800"
        onMouseMove={handleMouseMove}
        onTouchStart={longPressHandlers.onTouchStart}
        onMouseDown={longPressHandlers.onMouseDown}
      >
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
          alt="Solana Web3 Hub"
          className="pointer-events-none h-full w-full select-none rounded-2xl object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center pointer-events-none">
          <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-bold text-white border border-white/20 backdrop-blur-md">
            Click & Hold to Explode Menu 🚀
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute left-0 top-0"
              style={{
                x,
                y,
              }}
            >
              <ul className="relative">
                <li
                  className="absolute h-8 w-8 rounded-full border-4 border-purple-500/50"
                  style={{
                    transformOrigin: "center",
                    left: 0,
                    top: 0,
                  }}
                />
                {MENU_ITEMS.map((item, index) => {
                  return (
                    <ExplodingMenuItem item={item} index={index} key={index} />
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExplodingMenu;
