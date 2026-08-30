// Shared motion tokens. Curves from animations.dev; CSS mirrors live in globals.css.
export const EASE_OUT = [0.19, 1, 0.22, 1] as const;
export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
export const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const;
export const EASE_IN_OUT_CUBIC = [0.645, 0.045, 0.355, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const EASE_OUT_CSS = "cubic-bezier(0.19, 1, 0.22, 1)";
export const EASE_OUT_QUAD_CSS = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
export const EASE_SMOOTH_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_VAUL_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Standard animation durations in seconds. */
export const DURATION_MICRO = 0.2;
export const DURATION_NORMAL = 0.3;
export const DURATION_PAGE = 0.5;

export const SPRING_UI = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

export const SPRING_ALIVE = {
  type: "spring" as const,
  duration: 0.5,
  bounce: 0.2,
};

export const SPRING_PRESS = {
  type: "spring" as const,
  duration: 0.15,
  bounce: 0,
};

export const SPRING_SWAP = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

/** Overlay panel entrances: modals and sheets summoned by pointer. */
export const SPRING_PANEL = {
  type: "spring" as const,
  stiffness: 420,
  damping: 40,
  mass: 0.5,
};

/** Shared-layout glides: pills, indicators and panels morphing between positions. */
export const SPRING_LAYOUT = {
  type: "spring" as const,
  stiffness: 480,
  damping: 32,
  mass: 0.7,
};

/** Interactive card hover lifts with gentle spring recovery. */
export const SPRING_CARD = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
  mass: 0.75,
};

/** Cursor-follow physics for decorative mouse tracking. */
export const SPRING_MOUSE = {
  stiffness: 200,
  damping: 15,
  mass: 0.3,
};

/** Dragged handles and fills. */
export const SPRING_GLIDE = {
  stiffness: 700,
  damping: 50,
  mass: 0.5,
};
