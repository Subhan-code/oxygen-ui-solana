"use client";

import { useRef, useCallback } from "react";

export interface LongPressOptions {
  onLongPress: () => void;
  onCancel?: () => void;
  delay?: number;
}

export default function useLongPress({
  onLongPress,
  onCancel,
  delay = 300,
}: LongPressOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      onLongPress();
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onCancel?.();
  }, [onCancel]);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
}
