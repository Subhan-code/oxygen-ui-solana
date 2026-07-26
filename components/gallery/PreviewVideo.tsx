"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function PreviewVideo({
  src,
  playing,
}: {
  src: string;
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion) return;

    if (playing) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [playing, reduceMotion]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="h-full w-full object-cover"
    />
  );
}
