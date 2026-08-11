"use client";

import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  CaretSortIcon,
  Cross1Icon,
  HeartIcon,
  LockClosedIcon,
  MagicWandIcon,
  MobileIcon,
  PlusIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import { useState } from "react";

const EXPANDED_HEIGHT = 520;
const COLLAPSED_HEIGHT = 300;
const TOGGLE_HEIGHT_THRESHOLD = (EXPANDED_HEIGHT + COLLAPSED_HEIGHT) / 2;

const CaretSortIconMotion = motion(CaretSortIcon);

export const UnderlayActionSheet = () => {
  const [hasOutline, setHasOutline] = useState(true);
  const contentHeight = useMotionValue(EXPANDED_HEIGHT);
  const contentAnimationControls = useAnimation();
  const heightTransitionSettings = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as const,
  };
  const contentScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0.92]
  );
  const contentRoundedCorners = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [0, 20]
  );
  const contentPaddingTop = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [50, 0]
  );
  const actionAreaHeight = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [70, 20]
  );
  const actionButtonSize = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [24, 4]
  );
  const actionIconScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0]
  );
  const sheetShadowIntensity = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [
      "0 0px 0px 0px rgb(0 0 0 / 0), 0 0px 0px 0px rgb(0 0 0 / 0)",
      "0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    ]
  );

  const onDragAdjustHeight = (_event: unknown, info: { delta: { y: number } }) => {
    const newHeight = contentHeight.get() + info.delta.y;

    if (newHeight > COLLAPSED_HEIGHT && newHeight <= EXPANDED_HEIGHT) {
      contentHeight.set(newHeight);
    }
  };

  const onDragEndAdjustHeight = async () => {
    if (
      contentHeight.get() === COLLAPSED_HEIGHT ||
      contentHeight.get() === EXPANDED_HEIGHT
    ) {
      return;
    }

    const finalHeight =
      contentHeight.get() < TOGGLE_HEIGHT_THRESHOLD
        ? COLLAPSED_HEIGHT
        : EXPANDED_HEIGHT;
    await contentAnimationControls.start({
      height: finalHeight,
      transition: heightTransitionSettings,
    });
  };

  const openSheet = () => {
    if (contentHeight.get() === COLLAPSED_HEIGHT) {
      return;
    }

    contentAnimationControls.start({
      height: COLLAPSED_HEIGHT,
      transition: heightTransitionSettings,
    });
  };

  const closeSheet = () => {
    contentAnimationControls.start({
      height: EXPANDED_HEIGHT,
      transition: heightTransitionSettings,
    });
  };

  const toggleOutline = () => {
    setHasOutline(!hasOutline);
  };

  return (
    <div className="relative flex w-full items-center justify-center p-4">
      <div className="absolute left-4 top-2 z-20">
        <button
          onClick={toggleOutline}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95"
          title="Toggle phone frame"
        >
          <MobileIcon className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
        </button>
      </div>

      <div
        className="relative mx-auto w-full max-w-[320px] overflow-hidden bg-zinc-100 text-zinc-900 shadow-2xl transition-all dark:bg-zinc-900 dark:text-zinc-100"
        style={{
          height: EXPANDED_HEIGHT,
          outline: hasOutline ? "10px solid #18181b" : "none",
          borderRadius: hasOutline ? "44px" : "16px",
        }}
      >
        <div>
          <motion.div
            className="relative overflow-hidden bg-white dark:bg-zinc-950"
            style={{
              height: contentHeight,
              scale: contentScale,
              borderRadius: contentRoundedCorners,
              boxShadow: sheetShadowIntensity,
            }}
            animate={contentAnimationControls}
          >
            <motion.div
              className="flex h-full flex-col space-y-2 overflow-y-auto px-4 pb-14"
              style={{
                scrollbarWidth: "none",
                paddingTop: contentPaddingTop,
              }}
            >
              <div className="pb-2 pt-3">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60"
                  alt="Artistic abstract artwork"
                  className="h-28 w-full rounded-xl object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                Digital Echoes: Dreams & Empathy
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                In the labyrinth of the digital age, where hearts intertwine with bytes and thoughts echo in silence.
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Conversations flowed like rivers of consciousness, bridging the synthetic and organic.
              </p>
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"
              style={{
                height: actionAreaHeight,
              }}
              animate={contentAnimationControls}
            >
              <motion.div
                drag="y"
                dragConstraints={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={onDragAdjustHeight}
                onDragEnd={onDragEndAdjustHeight}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                whileDrag={{ cursor: "grabbing" }}
                className="flex h-[80%] w-full items-center justify-center cursor-grab"
              >
                <motion.button
                  onClick={openSheet}
                  className="z-10 flex items-center justify-center rounded-lg bg-zinc-200 px-2 text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  style={{
                    height: actionButtonSize,
                  }}
                  animate={contentAnimationControls}
                >
                  <CaretSortIconMotion
                    className="h-4 w-4"
                    style={{
                      scaleY: actionIconScale,
                    }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div className="flex flex-col space-y-2 px-3 pt-1">
          <div className="flex items-center space-x-2 pb-3 pt-2">
            <div className="flex-1">
              <button className="rounded-full bg-zinc-200 p-1 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Actions
            </div>
            <div className="flex flex-1 justify-end" onClick={closeSheet}>
              <button className="rounded-full bg-zinc-200 p-1 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                <Cross1Icon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-zinc-200/70 p-3 text-xs dark:bg-zinc-800/70">
              <HeartIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span className="text-zinc-700 dark:text-zinc-300">Like</span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-zinc-200/70 p-3 text-xs dark:bg-zinc-800/70">
              <Share1Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span className="text-zinc-700 dark:text-zinc-300">Share</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2 rounded-xl bg-zinc-200/70 p-2.5 text-xs dark:bg-zinc-800/70">
              <MagicWandIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span className="text-zinc-700 dark:text-zinc-300">Regenerate</span>
            </div>
            <div className="flex items-center space-x-2 rounded-xl bg-zinc-200/70 p-2.5 text-xs dark:bg-zinc-800/70">
              <LockClosedIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span className="text-zinc-700 dark:text-zinc-300">Lock</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderlayActionSheet;
