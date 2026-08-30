"use client";

import { useEffect, useRef } from "react";
import { bindFullscreenQuad, createProgram, hexToRgb } from "@/lib/webgl";
import { cn } from "@/lib/utils";

const RESOLUTION_SCALE = 0.5;
const TIME_OFFSET_FLAME = 18;

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const GLSL_COMMON = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform float u_dark;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
`;

const FRAG_FLAME = `${GLSL_COMMON}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.18;

  float x = uv.x + 0.05 * sin(uv.y * 3.2 + t * 0.6);
  float a = fbm(vec2(x * 2.6, uv.y * 1.6 - t));
  float b = fbm(vec2(x * 5.3 + 4.2, uv.y * 2.9 - t * 1.5));
  float f = a * 0.72 + b * 0.34;
  float e = clamp(f * 2.4 - uv.y * 2.3, 0.0, 1.0);
  float alpha = 0.3 * smoothstep(0.06, 0.5, e) + 0.7 * smoothstep(0.5, 0.96, e);

  gl_FragColor = vec4(u_color * alpha, alpha);
}
`;

const FRAG_FIELD = `${GLSL_COMMON}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  float t = u_time * 0.065;

  vec2 q = vec2(fbm(p * 1.35 + t), fbm(p * 1.35 + 18.2 - t * 0.7));
  float n = fbm(p * 2.05 + q * 1.2 + t * 0.35);

  float ridge = smoothstep(0.26, 0.74, n);
  float bloom = smoothstep(0.58, 0.96, n);

  vec3 ink = u_color;
  vec3 deep = mix(u_color, vec3(0.18, 0.1, 0.62), 0.5);
  vec3 col = mix(ink * 0.32, deep, ridge);
  col = mix(col, ink, bloom * 0.7);

  float vignette = 1.0 - 0.5 * dot(uv - 0.5, uv - 0.5) * 2.6;
  float alpha = mix(0.12, 0.4, ridge) * clamp(vignette, 0.35, 1.0);
  alpha *= mix(0.5, 1.0, u_dark);

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

export default function FluidWave({
  color = "#0066FF",
  variant = "flame",
  className,
}: {
  color?: string;
  variant?: "flame" | "field";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const frag = variant === "field" ? FRAG_FIELD : FRAG_FLAME;
    const compiled = createProgram(gl, VERT, frag);
    if (!compiled) return;

    gl.useProgram(compiled.program);
    const quad = bindFullscreenQuad(gl, compiled.program, "a_pos");

    const uResolution = gl.getUniformLocation(compiled.program, "u_resolution");
    const uTime = gl.getUniformLocation(compiled.program, "u_time");
    const uDark = gl.getUniformLocation(compiled.program, "u_dark");
    gl.uniform3f(
      gl.getUniformLocation(compiled.program, "u_color"),
      ...hexToRgb(color),
    );

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = media.matches;
    const startedAt = performance.now();
    const elapsed = () => (performance.now() - startedAt) / 1000;
    const timeOffset = variant === "flame" ? TIME_OFFSET_FLAME : 4;

    let frame = 0;

    const setDark = () => {
      gl.uniform1f(
        uDark,
        document.documentElement.classList.contains("dark") ? 1 : 0,
      );
    };

    const draw = () => {
      setDark();
      gl.uniform1f(uTime, timeOffset + (reduceMotion ? 0 : elapsed()));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (frame || reduceMotion) return;
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RESOLUTION_SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * RESOLUTION_SCALE));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
      draw();
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else pause();
    });
    visibilityObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onMotionChange = () => {
      reduceMotion = media.matches;
      if (reduceMotion) {
        pause();
        draw();
      } else {
        play();
      }
    };
    media.addEventListener("change", onMotionChange);

    return () => {
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      media.removeEventListener("change", onMotionChange);
      gl.deleteBuffer(quad);
      compiled.dispose();
    };
  }, [color, variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
