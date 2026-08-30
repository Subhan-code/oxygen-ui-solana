"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Flame,
  CloudRain,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ConfettiBurstType = "cannon" | "dual" | "shower" | "fireworks" | "ring";
export type ConfettiColorTheme = "electric" | "neon" | "gold" | "pastel" | "solana";

export interface TransactionDetails {
  title?: string;
  amount?: string;
  tokenSymbol?: string;
  usdValue?: string;
  recipient?: string;
  txHash?: string;
  network?: string;
}

export interface BlueConfettiTransactionProps extends React.HTMLAttributes<HTMLDivElement> {
  autoTrigger?: boolean;
  defaultBurstType?: ConfettiBurstType;
  defaultColorTheme?: ConfettiColorTheme;
  details?: TransactionDetails;
  showControls?: boolean;
  onComplete?: () => void;
  onReset?: () => void;
}

const DEFAULT_DETAILS: TransactionDetails = {
  title: "Transaction Confirmed",
  amount: "4.85",
  tokenSymbol: "SOL",
  usdValue: "$945.75",
  recipient: "phantom.sol",
  txHash: "5Kv7mR9xP4q2tW8zN1bV6yL0e3aH5jG7kF2mC9sD8vE1",
  network: "Solana Mainnet-Beta",
};

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  shape: "rect" | "circle" | "star";
  gravity?: number;
  drag?: number;
}

const THEME_PALETTES: Record<ConfettiColorTheme, { name: string; primary: string; colors: string[] }> = {
  electric: {
    name: "Electric",
    primary: "#2563EB",
    colors: ["#2563EB", "#0066FF", "#06B6D4", "#38BDF8", "#60A5FA", "#3B82F6", "#93C5FD", "#FFFFFF"],
  },
  neon: {
    name: "Cyan",
    primary: "#00F0FF",
    colors: ["#00F0FF", "#0070F3", "#00DF8F", "#38BDF8", "#7928CA", "#50E3C2", "#FFFFFF"],
  },
  gold: {
    name: "Gold",
    primary: "#F59E0B",
    colors: ["#F59E0B", "#D97706", "#2563EB", "#1D4ED8", "#FDE68A", "#60A5FA", "#FFFFFF"],
  },
  pastel: {
    name: "Pastel",
    primary: "#A5B4FC",
    colors: ["#93C5FD", "#A5B4FC", "#C4B5FD", "#BAE6FD", "#E0E7FF", "#FBCFE8", "#FFFFFF"],
  },
  solana: {
    name: "Aurora",
    primary: "#9945FF",
    colors: ["#9945FF", "#14F195", "#00C2FF", "#2563EB", "#00E5FF", "#8B5CF6", "#FFFFFF"],
  },
};

const BURST_TYPES: { id: ConfettiBurstType; label: string; icon: React.ElementType }[] = [
  { id: "cannon", label: "Radial", icon: Sparkles },
  { id: "dual", label: "Twin", icon: Zap },
  { id: "shower", label: "Cascade", icon: CloudRain },
  { id: "fireworks", label: "Fireworks", icon: Flame },
  { id: "ring", label: "Wave", icon: Radio },
];

const springCard = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.65,
};

const springPill = {
  type: "spring" as const,
  stiffness: 500,
  damping: 32,
  mass: 0.6,
};

export function BlueConfettiTransaction({
  autoTrigger = true,
  defaultBurstType = "cannon",
  defaultColorTheme = "electric",
  details = DEFAULT_DETAILS,
  showControls = true,
  onComplete,
  onReset,
  className,
  ...props
}: BlueConfettiTransactionProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "success">(
    autoTrigger ? "success" : "idle"
  );
  const [burstType, setBurstType] = useState<ConfettiBurstType>(defaultBurstType);
  const [colorTheme, setColorTheme] = useState<ConfettiColorTheme>(defaultColorTheme);
  const [mounted, setMounted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fireConfetti = useCallback(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let originX = width / 2;
    let originY = height / 2 - 40;

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    const palette = THEME_PALETTES[colorTheme].colors;
    const newParticles: ConfettiParticle[] = [];

    const getShape = (): "rect" | "circle" | "star" => {
      const r = Math.random();
      if (r < 0.5) return "rect";
      if (r < 0.8) return "circle";
      return "star";
    };

    // 1. Radial Burst
    if (burstType === "cannon") {
      const count = 95;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 13;
        const spreadY = -Math.abs(Math.sin(angle)) * speed - 3.5;

        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed * (0.9 + Math.random() * 0.5),
          vy: spreadY,
          size: 6 + Math.random() * 6,
          color: palette[Math.floor(Math.random() * palette.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 14,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.08 + Math.random() * 0.08,
          opacity: 1,
          shape: getShape(),
          gravity: 0.24,
          drag: 0.985,
        });
      }
    }

    // 2. Dual Side Cannons
    else if (burstType === "dual") {
      const count = 110;
      for (let i = 0; i < count; i++) {
        const fromLeft = i % 2 === 0;
        const startX = fromLeft ? Math.max(20, originX - 220) : Math.min(width - 20, originX + 220);
        const startY = originY + 40;
        const angle = fromLeft
          ? (-Math.PI / 4) + (Math.random() - 0.5) * 0.6
          : (-3 * Math.PI / 4) + (Math.random() - 0.5) * 0.6;
        const speed = 10 + Math.random() * 14;

        newParticles.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 7,
          color: palette[Math.floor(Math.random() * palette.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 16,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.1,
          opacity: 1,
          shape: getShape(),
          gravity: 0.26,
          drag: 0.982,
        });
      }
    }

    // 3. Top Cascade Shower
    else if (burstType === "shower") {
      const count = 120;
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: -20 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 3,
          vy: 2 + Math.random() * 4,
          size: 5 + Math.random() * 7,
          color: palette[Math.floor(Math.random() * palette.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.05 + Math.random() * 0.06,
          opacity: 1,
          shape: getShape(),
          gravity: 0.05,
          drag: 0.995,
        });
      }
    }

    // 4. Spiral Fireworks
    else if (burstType === "fireworks") {
      const count = 100;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 16;
        newParticles.push({
          x: originX + (Math.random() - 0.5) * 40,
          y: originY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 5 + Math.random() * 6,
          color: palette[Math.floor(Math.random() * palette.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 20,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.12,
          opacity: 1,
          shape: getShape(),
          gravity: 0.22,
          drag: 0.975,
        });
      }
    }

    // 5. Sonic Wave
    else if (burstType === "ring") {
      const count = 85;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 9 + Math.random() * 4;
        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 4,
          color: palette[Math.floor(Math.random() * palette.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.08,
          opacity: 1,
          shape: getShape(),
          gravity: 0.15,
          drag: 0.985,
        });
      }
    }

    particlesRef.current = newParticles;
    const startTime = performance.now();

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity ?? 0.22;
        p.vx *= p.drag ?? 0.985;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (elapsed > 1200) {
          p.opacity -= 0.016;
        }

        if (p.opacity > 0 && p.y < height + 60 && p.x > -60 && p.x < width + 60) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.shape === "rect") {
            const scaleX = Math.cos(p.wobble);
            ctx.scale(scaleX, 1);
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
          } else if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            drawStar(0, 0, 4, p.size * 0.7, p.size * 0.3);
          }

          ctx.restore();
        }
      }

      if (alive) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [shouldReduceMotion, burstType, colorTheme]);

  useEffect(() => {
    if (autoTrigger && status === "success" && mounted) {
      const timer = setTimeout(() => {
        fireConfetti();
        onComplete?.();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [autoTrigger, status, mounted, fireConfetti, onComplete]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleStartTransaction = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      fireConfetti();
      onComplete?.();
    }, 1100);
  };

  const handleReset = () => {
    setStatus("idle");
    onReset?.();
  };

  const formattedHash = details.txHash
    ? `${details.txHash.slice(0, 6)}...${details.txHash.slice(-6)}`
    : "5Kv7...8vE1";

  return (
    <div
      data-slot="blue-confetti-transaction"
      className={cn("relative flex w-full max-w-sm flex-col items-center justify-center gap-4 select-none", className)}
      {...props}
    >
      {/* Viewport-wide Confetti Canvas via Portal */}
      {mounted &&
        createPortal(
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen"
          />,
          document.body
        )}

      {/* Main Transaction Card */}
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={springCard}
            className="flex w-full flex-col gap-4 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-6 shadow-xl text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-2xs">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground tracking-tight">Execute Transaction</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Send {details.amount} {details.tokenSymbol} ({details.usdValue}) to {details.recipient}
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              onClick={handleStartTransaction}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-tight shadow-md shadow-blue-500/25 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              Confirm & Send <ArrowRight className="size-4" />
            </motion.button>
          </motion.div>
        )}

        {status === "processing" && (
          <motion.div
            key="processing-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={springCard}
            className="flex w-full flex-col items-center gap-4 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-8 shadow-xl text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-3 border-blue-500/20 animate-ping" />
              <div className="h-14 w-14 rounded-full border-3 border-blue-500 border-t-transparent animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground tracking-tight">Processing on Solana</h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">Broadcasting blocks...</p>
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            transition={springCard}
            className="relative flex w-full flex-col gap-4.5 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-6 shadow-2xl text-foreground"
          >
            {/* Blue Halo Ripple & Animated Checkmark */}
            <div ref={iconRef} className="relative mx-auto flex h-16 w-16 items-center justify-center">
              {/* Radial glow */}
              <div className="absolute inset-0 -m-2 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={springCard}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/35 ring-4 ring-blue-500/20"
              >
                <motion.svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    initial={shouldReduceMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </motion.svg>
              </motion.div>
            </div>

            {/* Title & Amount */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <ShieldCheck className="size-3.5" /> {details.title}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground font-mono mt-0.5">
                +{details.amount} <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">{details.tokenSymbol}</span>
              </h2>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{details.usdValue}</p>
            </div>

            {/* Transaction Metrics */}
            <div className="flex flex-col gap-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-3.5 border border-black/5 dark:border-white/5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Recipient</span>
                <span className="font-bold text-foreground font-mono">{details.recipient}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Signature</span>
                <a
                  href={`https://solscan.io/tx/${details.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {formattedHash}
                  <ExternalLink className="size-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Network</span>
                <span className="text-foreground font-medium">{details.network}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                onClick={fireConfetti}
                className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:bg-blue-500 transition-colors cursor-pointer outline-none"
              >
                <Sparkles className="size-3.5" /> Fire Confetti
              </motion.button>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                onClick={handleReset}
                title="Reset simulation"
                className="flex items-center justify-center h-10 w-10 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none"
              >
                <RefreshCw className="size-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Floating Island Controls Bar */}
      {showControls && (
        <div className="flex w-full items-center justify-between gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-black/70 backdrop-blur-2xl px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.2)]">
          {/* Segmented Pattern Pills with Apple Spring */}
          <div className="flex items-center gap-0.5" role="tablist">
            {BURST_TYPES.map((bt) => {
              const Icon = bt.icon;
              const isSelected = burstType === bt.id;
              return (
                <button
                  key={bt.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  title={bt.label}
                  onClick={() => {
                    setBurstType(bt.id);
                    if (status === "success") fireConfetti();
                  }}
                  className={cn(
                    "relative flex items-center justify-center size-7 rounded-full text-xs transition-colors duration-140 cursor-pointer outline-none active:scale-[0.92]",
                    isSelected
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="confetti-burst-active-pill"
                      transition={springPill}
                      className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/15 shadow-xs"
                    />
                  )}
                  <Icon className="relative z-10 size-3.5" />
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-black/10 dark:bg-white/15 shrink-0" />

          {/* Jewel Color Dots */}
          <div className="flex items-center gap-1.5 px-0.5">
            {(Object.keys(THEME_PALETTES) as ConfettiColorTheme[]).map((theme) => {
              const isSelected = colorTheme === theme;
              const palette = THEME_PALETTES[theme];
              return (
                <button
                  key={theme}
                  type="button"
                  title={palette.name}
                  onClick={() => {
                    setColorTheme(theme);
                    if (status === "success") fireConfetti();
                  }}
                  className={cn(
                    "relative flex size-4 items-center justify-center rounded-full transition-transform duration-140 cursor-pointer outline-none active:scale-[0.85]",
                    isSelected ? "scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"
                  )}
                >
                  <span
                    className={cn(
                      "size-3 rounded-full transition-all shadow-xs",
                      isSelected && "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-black"
                    )}
                    style={{ backgroundColor: palette.primary }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlueConfettiTransaction;
