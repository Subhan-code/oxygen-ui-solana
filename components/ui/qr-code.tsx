"use client";

import React, { useState, useMemo, useRef } from "react";
import QRCodePackage from "qrcode";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type TiltEffect = "gravitate" | "evade";

export interface QRCodeProps
  extends Omit<
    React.SVGAttributes<SVGSVGElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "values"
  > {
  value?: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  errorCorrectionLevel?: ErrorCorrectionLevel;
  className?: string;
  interactiveColorChange?: boolean;
  enableTilt?: boolean;
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: TiltEffect;
  spotlight?: boolean;
  showCenterLogo?: boolean;
}

interface CirclePoint {
  cx: number;
  cy: number;
}

interface QRData {
  modules: {
    size: number;
    get(row: number, col: number): boolean;
  };
}

interface GlassRipple {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface ColorTheme {
  dotColor: string;
  cardBgLight: string;
  cardBgDark: string;
  borderColor: string;
}

const QRCodeLib = QRCodePackage as unknown as {
  create(
    value: string,
    options: { errorCorrectionLevel: ErrorCorrectionLevel }
  ): QRData;
};

const COLOR_PALETTE: ColorTheme[] = [
  {
    dotColor: "currentColor",
    cardBgLight: "bg-white/90 backdrop-blur-2xl",
    cardBgDark: "dark:bg-zinc-950/90 dark:backdrop-blur-2xl",
    borderColor: "border-zinc-200/80 dark:border-zinc-800/80",
  },
  {
    dotColor: "#0066FF",
    cardBgLight: "bg-[#081528]/95 backdrop-blur-2xl text-white",
    cardBgDark: "dark:bg-[#051124]/95 dark:backdrop-blur-2xl text-white",
    borderColor: "border-[#0066FF]/40",
  },
  {
    dotColor: "#9945FF",
    cardBgLight: "bg-[#180A2E]/95 backdrop-blur-2xl text-white",
    cardBgDark: "dark:bg-[#120524]/95 dark:backdrop-blur-2xl text-white",
    borderColor: "border-[#9945FF]/40",
  },
  {
    dotColor: "#10B981",
    cardBgLight: "bg-[#062419]/95 backdrop-blur-2xl text-white",
    cardBgDark: "dark:bg-[#031710]/95 dark:backdrop-blur-2xl text-white",
    borderColor: "border-[#10B981]/40",
  },
  {
    dotColor: "#F59E0B",
    cardBgLight: "bg-[#2E1D06]/95 backdrop-blur-2xl text-white",
    cardBgDark: "dark:bg-[#1F1303]/95 dark:backdrop-blur-2xl text-white",
    borderColor: "border-[#F59E0B]/40",
  },
];

function isInFinderPattern(row: number, col: number, size: number): boolean {
  return (
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
  );
}

function isInCenterLogoZone(row: number, col: number, size: number): boolean {
  const centerStart = Math.floor(size / 2) - 3;
  const centerEnd = Math.floor(size / 2) + 3;
  return (
    row >= centerStart &&
    row <= centerEnd &&
    col >= centerStart &&
    col <= centerEnd
  );
}

export function OxygenLogoSVG({ className }: { className?: string }) {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full drop-shadow-md", className)}
    >
      <path
        d="M146.051 386.223C211.675 310.732 249.813 275.849 249.813 275.849C249.813 275.849 256.967 326.35 249.813 425.79C242.659 525.23 80.426 461.714 146.051 386.223Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M77.0924 267.43C177.237 261.147 229.975 268.512 229.975 268.512C229.975 268.512 198.736 308.958 122.35 373.52C45.9639 438.083 -23.0526 273.713 77.0924 267.43Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M115.047 139.992C189.692 206.682 221.339 249.277 221.339 249.277C221.339 249.277 170.43 255.427 70.5927 246.418C-29.2448 237.408 40.4022 73.3016 115.047 139.992Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M233.098 77.686C237.505 177.38 229.095 229.676 229.095 229.676C229.095 229.676 189.028 197.844 125.575 120.662C62.1228 43.4801 228.691 -22.008 233.098 77.686Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M360.495 117.852C292.023 190.799 248.596 221.453 248.596 221.453C248.596 221.453 243.384 170.718 254.346 71.6213C265.308 -27.4753 428.967 44.9046 360.495 117.852Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M420.889 236.415C320.576 238.896 268.159 229.536 268.159 229.536C268.159 229.536 300.926 190.304 379.733 128.686C458.539 67.0669 521.202 233.935 420.889 236.415Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M378.066 362.326C306.033 292.853 276.043 249.088 276.043 249.088C276.043 249.088 327.152 244.873 426.571 257.662C525.991 270.452 450.099 431.799 378.066 362.326Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M270.13 422.146C269.549 322.357 267.549 268.384 267.549 268.384C267.549 268.384 308.114 307.212 368.56 386.745C429.006 466.277 270.71 521.935 270.13 422.146Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="10"
      />
    </svg>
  );
}

export function QRCode({
  value = "https://x.com/intent/follow?screen_name=SubhanHQ",
  size = 268,
  fgColor: customFgColor,
  bgColor = "transparent",
  errorCorrectionLevel = "M",
  className,
  interactiveColorChange = true,
  enableTilt = true,
  tiltLimit = 20,
  scale = 1.05,
  perspective = 1000,
  effect = "evade",
  spotlight = true,
  showCenterLogo = true,
  ...props
}: QRCodeProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [colorIndex, setColorIndex] = useState(0);
  const [ripples, setRipples] = useState<GlassRipple[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);

  const currentTheme = COLOR_PALETTE[colorIndex];
  const activeFgColor = customFgColor || currentTheme.dotColor;

  // Spring physics for smooth Apple 3D card response
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 26 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(
    smoothMouseY,
    [0, 1],
    [effect === "evade" ? tiltLimit : -tiltLimit, effect === "evade" ? -tiltLimit : tiltLimit]
  );
  const rotateY = useTransform(
    smoothMouseX,
    [0, 1],
    [effect === "evade" ? -tiltLimit : tiltLimit, effect === "evade" ? tiltLimit : -tiltLimit]
  );

  const glareX = useTransform(smoothMouseX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothMouseY, [0, 1], [0, 100]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    mouseX.set(px);
    mouseY.set(py);
  };

  const handlePointerEnter = () => {
    if (enableTilt) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (enableTilt) {
      setIsHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - rippleSize / 2;
    const y = e.clientY - rect.top - rippleSize / 2;

    const nextColorIndex = (colorIndex + 1) % COLOR_PALETTE.length;

    if (interactiveColorChange && !customFgColor) {
      setColorIndex(nextColorIndex);
    }

    setLogoRotation((prev) => prev + 720);

    const newRipple: GlassRipple = {
      x,
      y,
      size: rippleSize,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev.slice(-4), newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const qrData = useMemo(() => {
    try {
      return QRCodeLib.create(value, { errorCorrectionLevel });
    } catch {
      return null;
    }
  }, [value, errorCorrectionLevel]);

  const moduleCount = qrData?.modules?.size ?? 0;
  const moduleSize = moduleCount ? size / moduleCount : 0;
  const finderSize = 7 * moduleSize;
  const innerPadding = moduleSize;
  const innerWhiteSize = 5 * moduleSize;
  const innerBlackSize = 3 * moduleSize;
  const circleRadius = moduleSize / 2.6;

  const finderPositions: [number, number][] = useMemo(
    () => [
      [0, 0],
      [0, moduleCount - 7],
      [moduleCount - 7, 0],
    ],
    [moduleCount]
  );

  const circles = useMemo(() => {
    if (!qrData || !moduleCount) return [];
    const points: CirclePoint[] = [];
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (
          qrData.modules.get(row, col) &&
          !isInFinderPattern(row, col, moduleCount) &&
          (!showCenterLogo || !isInCenterLogoZone(row, col, moduleCount))
        ) {
          points.push({
            cx: (col + 0.5) * moduleSize,
            cy: (row + 0.5) * moduleSize,
          });
        }
      }
    }
    return points;
  }, [qrData, moduleCount, moduleSize, showCenterLogo]);

  if (!qrData) return null;

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="mx-auto flex items-center justify-center p-4"
    >
      <motion.div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          enableTilt && !reduceMotion
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        whileHover={enableTilt && !reduceMotion ? { scale } : {}}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative flex items-center justify-center rounded-[3.8rem] p-3 cursor-pointer select-none will-change-transform"
      >
        <motion.div
          data-slot="qr-code"
          onClick={handleClick}
          whileTap={reduceMotion ? {} : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          className={cn(
            "relative flex items-center justify-center overflow-hidden rounded-[3.8rem] p-7 shadow-2xl border transition-all duration-300 transform-gpu ring-1 ring-white/40 dark:ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
            currentTheme.cardBgLight,
            currentTheme.cardBgDark,
            currentTheme.borderColor,
            className
          )}
        >
          {/* Floating 3D QR Matrix Grid Layer */}
          <div
            style={
              enableTilt && !reduceMotion
                ? { transform: "translateZ(24px)", transformStyle: "preserve-3d" }
                : undefined
            }
            className="transition-transform duration-200 ease-out"
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-label={`QR code for ${value}`}
              className="block text-zinc-950 transition-colors dark:text-white"
              {...props}
            >
              <rect width={size} height={size} fill={bgColor} rx="20" ry="20" />
              {finderPositions.map(([row, col]) => {
                const x = col * moduleSize;
                const y = row * moduleSize;
                return (
                  <g key={`${row}-${col}`}>
                    <rect
                      x={x}
                      y={y}
                      width={finderSize}
                      height={finderSize}
                      fill={activeFgColor}
                      rx="12"
                      ry="12"
                    />
                    <rect
                      x={x + innerPadding}
                      y={y + innerPadding}
                      width={innerWhiteSize}
                      height={innerWhiteSize}
                      className={cn(
                        colorIndex === 0
                          ? "fill-white dark:fill-zinc-950"
                          : "fill-white/10 dark:fill-black/40"
                      )}
                      rx="8"
                      ry="8"
                    />
                    <rect
                      x={x + innerPadding * 2}
                      y={y + innerPadding * 2}
                      width={innerBlackSize}
                      height={innerBlackSize}
                      fill={activeFgColor}
                      rx="4"
                      ry="4"
                    />
                  </g>
                );
              })}
              {circles.map(({ cx, cy }, index) => (
                <circle
                  key={`${cx}-${cy}-${index}`}
                  cx={cx}
                  cy={cy}
                  r={circleRadius}
                  fill={activeFgColor}
                />
              ))}
            </svg>
          </div>

          {/* Central Oxygen UI Floating 3D Logo Badge */}
          {showCenterLogo && (
            <div
              style={
                enableTilt && !reduceMotion
                  ? { transform: "translateZ(48px)", transformStyle: "preserve-3d" }
                  : undefined
              }
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-transform duration-300 ease-out"
            >
              <div
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950/95 dark:bg-zinc-950/95 p-2 shadow-2xl border border-white/40 dark:border-white/20 backdrop-blur-xl transition-transform duration-700 ease-out"
                style={{
                  transform: `rotateY(${logoRotation}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{ transform: "translateZ(6px)" }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <OxygenLogoSVG className="h-full w-full" />
                </div>
              </div>
            </div>
          )}

          {/* Apple Dynamic Specular Glare Sheen Reflection Layer */}
          {enableTilt && spotlight && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[3.8rem] transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.div
                className="absolute -inset-[100%] transition-transform duration-100 ease-out opacity-80 dark:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 35%, transparent 70%)",
                  left: useTransform(glareX, [0, 100], ["-30%", "30%"]),
                  top: useTransform(glareY, [0, 100], ["-30%", "30%"]),
                }}
              />
            </motion.div>
          )}

          {/* Framer Motion Liquid Glass Ripple Overlay */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0.05, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              className="pointer-events-none absolute rounded-full backdrop-blur-xl bg-white/30 dark:bg-white/20 border-2 border-white/60 dark:border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),0_8px_32px_rgba(0,0,0,0.35)]"
              style={{
                width: ripple.size,
                height: ripple.size,
                top: ripple.y,
                left: ripple.x,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default QRCode;
