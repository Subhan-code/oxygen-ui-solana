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
    icon: <HeartIcon className="h-4 w-4 text-zinc-950 dark:text-white" />,
    label: "Like",
    onClick: () => console.log("like"),
  },
  {
    icon: <DownloadIcon className="h-4 w-4 text-zinc-950 dark:text-white" />,
    label: "Download",
    onClick: () => console.log("download"),
  },
  {
    icon: <DrawingPinIcon className="h-4 w-4 text-zinc-950 dark:text-white" />,
    label: "Pin",
    onClick: () => console.log("pin"),
  },
  {
    icon: <PlusIcon className="h-4 w-4 text-zinc-950 dark:text-white" />,
    label: "Plus",
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
  item: (typeof MENU_ITEMS)[0];
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
      whileHover={{ scale: 1.15 }}
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
        className="flex h-8 w-8 cursor-move items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 shadow-md active:scale-95"
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
        "relative flex h-[400px] w-full flex-col items-center justify-center select-none active:cursor-move",
        className
      )}
      onTouchEnd={longPressHandlers.onTouchEnd}
      onMouseUp={longPressHandlers.onMouseUp}
    >
      {isTouchDevice ? (
        <p className="py-6 text-center text-sm text-zinc-500">
          This component is not made for touch devices.
        </p>
      ) : null}
      <div
        className="relative z-0 h-80 w-80 select-none rounded-[12px] overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800"
        onMouseMove={handleMouseMove}
        onTouchStart={longPressHandlers.onTouchStart}
        onMouseDown={longPressHandlers.onMouseDown}
      >
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"
          alt="monks doing ambient music"
          className="pointer-events-none h-full w-full select-none rounded-[12px] object-cover"
        />
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
                  className="absolute h-8 w-8 rounded-full border-4 border-neutral-200/50"
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
