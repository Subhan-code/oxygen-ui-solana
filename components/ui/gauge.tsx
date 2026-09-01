"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

const MAX_OVERFLOW = 50;

function decay(value: number, max: number): number {
  if (max === 0) return 0;
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

export type SliderCornerRadius = "full" | "2xl" | "xl" | "lg" | "md" | "sm" | "none";

const CORNER_RADIUS_MAP: Record<SliderCornerRadius, { track: string; fill: string }> = {
  full: { track: "rounded-full", fill: "rounded-full" },
  "2xl": { track: "rounded-2xl", fill: "rounded-xl" },
  xl: { track: "rounded-xl", fill: "rounded-lg" },
  lg: { track: "rounded-lg", fill: "rounded-md" },
  md: { track: "rounded-md", fill: "rounded-sm" },
  sm: { track: "rounded-sm", fill: "rounded-xs" },
  none: { track: "rounded-none", fill: "rounded-none" },
};

export interface ElasticSliderProps {
  defaultValue?: number;
  value?: number;
  onValueChange?: (val: number) => void;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  cornerRadius?: SliderCornerRadius;
  activeFillColor?: string;
  trackColor?: string;
  height?: number;
}

export const ElasticSlider: React.FC<ElasticSliderProps> = ({
  defaultValue = 50,
  value: controlledValue,
  onValueChange,
  startingValue = 0,
  maxValue = 100,
  className = "",
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>,
  cornerRadius = "xl",
  activeFillColor = "bg-white",
  trackColor = "bg-neutral-200 dark:bg-neutral-800/90",
  height = 16,
}) => {
  return (
    <div className={cn("relative flex flex-col items-center justify-center gap-2 w-full max-w-full sm:max-w-xs select-none", className)}>
      <Slider
        defaultValue={defaultValue}
        value={controlledValue}
        onValueChange={onValueChange}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        cornerRadius={cornerRadius}
        activeFillColor={activeFillColor}
        trackColor={trackColor}
        height={height}
      />
    </div>
  );
};

interface SliderProps {
  defaultValue: number;
  value?: number;
  onValueChange?: (val: number) => void;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  cornerRadius: SliderCornerRadius;
  activeFillColor: string;
  trackColor: string;
  height: number;
}

const Slider: React.FC<SliderProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
  cornerRadius,
  activeFillColor,
  trackColor,
  height,
}) => {
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const rectRef = useRef<{ left: number; width: number } | null>(null);

  const [region, setRegion] = useState<"left" | "middle" | "right">("middle");
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useMotionValueEvent(clientX, "change", (latest: number) => {
    if (sliderRef.current) {
      const rect = rectRef.current || sliderRef.current.getBoundingClientRect();
      const left = rect.left;
      const right = left + rect.width;
      let newValue: number;
      if (latest < left) {
        setRegion("left");
        newValue = left - latest;
      } else if (latest > right) {
        setRegion("right");
        newValue = latest - right;
      } else {
        setRegion("middle");
        newValue = 0;
      }
      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const updateValueFromPointer = (clientXPos: number) => {
    if (!sliderRef.current) return;
    if (!rectRef.current) {
      const b = sliderRef.current.getBoundingClientRect();
      rectRef.current = { left: b.left, width: b.width };
    }
    const { left, width } = rectRef.current;
    if (width <= 0) return;

    let newValue = startingValue + ((clientXPos - left) / width) * (maxValue - startingValue);
    if (isStepped) {
      newValue = Math.round(newValue / stepSize) * stepSize;
    }
    newValue = Math.min(Math.max(newValue, startingValue), maxValue);
    setInternalValue(newValue);
    onValueChange?.(newValue);
    clientX.jump(clientXPos);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    if (sliderRef.current) {
      const b = sliderRef.current.getBoundingClientRect();
      rectRef.current = { left: b.left, width: b.width };
    }
    updateValueFromPointer(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      updateValueFromPointer(e.clientX);
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    rectRef.current = null;
    animate(overflow, 0, { type: "spring", bounce: 0.5 });
  };

  const getRangePercentage = (): number => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  };

  const radiusStyles = CORNER_RADIUS_MAP[cornerRadius] || CORNER_RADIUS_MAP.xl;

  return (
    <div className="relative flex flex-col items-center w-full">
      <motion.div
        onHoverStart={() => animate(scale, 1.12)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.12)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.12], [0.85, 1]),
        }}
        className="flex w-full touch-none select-none items-center justify-center gap-2 sm:gap-3"
      >
        <motion.div
          animate={{
            scale: region === "left" ? [1, 1.3, 1] : 1,
            transition: { duration: 0.2 },
          }}
          style={{
            x: useTransform(() => (region === "left" ? -overflow.get() / scale.get() : 0)),
          }}
          className="text-neutral-500 dark:text-neutral-400 font-semibold text-xs sm:text-sm select-none"
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center py-2 sm:py-2.5 active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const width = rectRef.current?.width || sliderRef.current.getBoundingClientRect().width;
                  return width > 0 ? 1 + overflow.get() / width : 1;
                }
                return 1;
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.85]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const left = rectRef.current?.left || sliderRef.current.getBoundingClientRect().left;
                  const width = rectRef.current?.width || sliderRef.current.getBoundingClientRect().width;
                  return clientX.get() < left + width / 2 ? "right" : "left";
                }
                return "center";
              }),
              height: useTransform(scale, [1, 1.12], [height, height + 4]),
            }}
            className="flex flex-grow"
          >
            {/* Custom rounded corner track */}
            <div
              className={cn(
                "relative h-full flex-grow overflow-hidden border border-neutral-300/60 dark:border-neutral-700/60 p-0.5 shadow-inner transition-colors",
                radiusStyles.track,
                trackColor
              )}
            >
              {/* Custom active area fill */}
              <div
                className={cn(
                  "h-full shadow-xs",
                  radiusStyles.fill,
                  activeFillColor.startsWith("#") || activeFillColor.startsWith("rgb") || activeFillColor.startsWith("hsl")
                    ? ""
                    : activeFillColor
                )}
                style={{
                  width: `${getRangePercentage()}%`,
                  backgroundColor:
                    activeFillColor.startsWith("#") || activeFillColor.startsWith("rgb") || activeFillColor.startsWith("hsl")
                      ? activeFillColor
                      : undefined,
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === "right" ? [1, 1.3, 1] : 1,
            transition: { duration: 0.2 },
          }}
          style={{
            x: useTransform(() => (region === "right" ? overflow.get() / scale.get() : 0)),
          }}
          className="text-neutral-500 dark:text-neutral-400 font-semibold text-xs sm:text-sm select-none"
        >
          {rightIcon}
        </motion.div>
      </motion.div>

      <p className="mt-0.5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-neutral-600 dark:text-neutral-300">
        {Math.round(value)}%
      </p>
    </div>
  );
};

export type GaugeOrientation = "arc" | "linear";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  orientation?: GaugeOrientation;
  totalNotches?: number;
  spacing?: number;
  centerValue?: number;
  defaultLabel?: string;
  prefix?: string;
  suffix?: string;
  activeGradient?: [string, string];
  inactiveFillOpacity?: number;
  activeFillOpacity?: number;
  notchCornerRadius?: number;
  interactive?: boolean;
  textOffsetY?: number;
  notchRadius?: number;
  notchLength?: number;
  startAngle?: number;
  endAngle?: number;
  arcCenterX?: number;
  arcCenterY?: number;
  cardWidth?: number | string;
  cardHeight?: number | string;
  sliderCornerRadius?: SliderCornerRadius;
  sliderFillColor?: string;
  sliderTrackColor?: string;
  sliderHeight?: number;
}

export function Gauge({
  value: controlledValue = 66,
  orientation = "arc",
  totalNotches = 31,
  spacing = 25,
  centerValue = 428000,
  defaultLabel = "ARR run rate",
  prefix = "$",
  suffix = "",
  activeGradient = ["#3b82f6", "#06b6d4"],
  inactiveFillOpacity = 0.25,
  activeFillOpacity = 1,
  interactive = true,
  textOffsetY = 100,
  notchRadius = 130,
  notchLength = 28,
  startAngle = 163,
  endAngle = 379,
  arcCenterX,
  arcCenterY = 130,
  cardWidth = 473,
  cardHeight,
  sliderCornerRadius = "xl",
  sliderFillColor = "bg-white",
  sliderTrackColor = "bg-neutral-200 dark:bg-neutral-800/90",
  sliderHeight = 16,
  style,
  className,
  ...props
}: GaugeProps) {
  const [internalValue, setInternalValue] = useState(controlledValue);
  const activeValue = interactive ? internalValue : controlledValue;

  const width = 360;
  const height = orientation === "arc" ? 185 : 70;
  const centerX = arcCenterX ?? (width / 2);
  const centerY = arcCenterY ?? (orientation === "arc" ? 130 : height / 2);

  const activeNotches = Math.round((activeValue / 100) * totalNotches);

  const transition: Transition = {
    type: "spring",
    stiffness: 350,
    damping: 25,
  };

  const notches = useMemo(() => {
    if (orientation === "arc") {
      const totalAngle = endAngle - startAngle;
      const availableAngle = totalAngle * (1 - spacing / 100);
      const notchAngle = totalNotches > 0 ? availableAngle / totalNotches : 0;
      const gapAngle =
        totalNotches > 1
          ? (totalAngle * (spacing / 100)) / (totalNotches - 1)
          : 0;

      const outerRadius = notchRadius;
      const innerRadius = outerRadius - notchLength;

      return Array.from({ length: totalNotches }).map((_, i) => {
        const angle = startAngle + i * (notchAngle + gapAngle) + notchAngle / 2;
        const rad = (angle * Math.PI) / 180;
        const halfWidth = ((notchAngle * 0.8) * Math.PI) / 180 / 2;

        const x1 = centerX + Math.cos(rad - halfWidth) * outerRadius;
        const y1 = centerY + Math.sin(rad - halfWidth) * outerRadius;
        const x2 = centerX + Math.cos(rad + halfWidth) * outerRadius;
        const y2 = centerY + Math.sin(rad + halfWidth) * outerRadius;
        const x3 = centerX + Math.cos(rad + halfWidth) * innerRadius;
        const y3 = centerY + Math.sin(rad + halfWidth) * innerRadius;
        const x4 = centerX + Math.cos(rad - halfWidth) * innerRadius;
        const y4 = centerY + Math.sin(rad - halfWidth) * innerRadius;

        const d = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;
        return { index: i, d, isActive: i < activeNotches };
      });
    } else {
      const availableWidth = width - 40;
      const slotWidth = availableWidth / totalNotches;
      const notchWidth = slotWidth * 0.75;
      const notchH = notchLength * 0.85;

      return Array.from({ length: totalNotches }).map((_, i) => {
        const x = 20 + i * slotWidth;
        const y = centerY - notchH / 2;
        const d = `M ${x} ${y} h ${notchWidth} v ${notchH} h ${-notchWidth} Z`;
        return { index: i, d, isActive: i < activeNotches };
      });
    }
  }, [
    orientation,
    totalNotches,
    spacing,
    activeNotches,
    centerX,
    centerY,
    width,
    notchRadius,
    notchLength,
    startAngle,
    endAngle,
  ]);

  const displayStat = (centerValue * (activeValue / 100)).toLocaleString(
    "en-US",
    { maximumFractionDigits: 0 }
  );

  const topRatioPercent = (textOffsetY / height) * 100;

  return (
    <div
      data-slot="gauge"
      style={{
        width: typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
        height: typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
        ...style,
      }}
      className={cn(
        "relative flex flex-col items-center justify-between p-3.5 sm:p-5 md:p-6 w-full max-w-full mx-auto select-none rounded-3xl border border-neutral-200/80 bg-white/95 dark:border-neutral-800/80 dark:bg-neutral-950/95 shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 gap-1.5 sm:gap-2",
        className
      )}
      {...props}
    >
      {/* Compact Ratio-preserving Gauge Graphic & Statistic Wrapper */}
      <div className={cn("relative flex w-full max-w-full items-center justify-center", orientation === "arc" ? "aspect-[360/185]" : "aspect-[360/70]")}>
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          {/* Inactive track notches */}
          {notches.map((n) => (
            <path
              key={`bg-${n.index}`}
              d={n.d}
              className="fill-neutral-300 dark:fill-neutral-700 transition-colors"
              fillOpacity={inactiveFillOpacity}
            />
          ))}

          {/* Active notches */}
          {notches
            .filter((n) => n.isActive)
            .map((n) => (
              <motion.path
                key={`act-${n.index}`}
                d={n.d}
                fill={activeGradient[0] || "#3b82f6"}
                fillOpacity={activeFillOpacity}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...transition, delay: n.index * 0.008 }}
              />
            ))}
        </svg>

        {/* Centered statistic overlay scaling with device ratio */}
        {orientation === "arc" && (
          <div
            style={{ top: `${topRatioPercent}%` }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none gap-0.5 w-full px-4"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white tabular-nums drop-shadow-xs leading-none">
              {prefix}
              {displayStat}
              {suffix}
            </span>
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 uppercase">
              {defaultLabel}
            </span>
          </div>
        )}
      </div>

      {/* Statistic bar for linear orientation */}
      {orientation === "linear" && (
        <div className="flex items-center justify-between w-full px-2 mt-1 mb-0.5">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {defaultLabel}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white tabular-nums">
            {prefix}
            {displayStat}
            {suffix}
          </span>
        </div>
      )}

      {/* Tight Responsive Rectangular Elastic Slider Scrubber */}
      {interactive ? (
        <div className="w-full flex flex-col items-center gap-1.5 mt-1 pt-2 sm:pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
          <ElasticSlider
            value={activeValue}
            onValueChange={(val) => setInternalValue(val)}
            startingValue={0}
            maxValue={100}
            cornerRadius={sliderCornerRadius}
            activeFillColor={sliderFillColor}
            trackColor={sliderTrackColor}
            height={sliderHeight}
            className="w-full max-w-full sm:max-w-xs"
          />
        </div>
      ) : null}
    </div>
  );
}

export default Gauge;
