export type MotionStyle = "fluid" | "measured" | "geometric" | "cinematic" | "organic";

type Bezier = [number, number, number, number];

export const ease = {
  out: [0.22, 1, 0.36, 1] as Bezier,
  inOut: [0.65, 0, 0.35, 1] as Bezier,
  expo: [0.16, 1, 0.3, 1] as Bezier,
  sine: [0.37, 0, 0.63, 1] as Bezier,
  step: [0.83, 0, 0.17, 1] as Bezier,
};

export interface MotionTokens {
  ease: Bezier;
  duration: number;
  stagger: number;
  /** Scroll parallax travel in px for layered imagery. */
  parallax: number;
  /** clip-path start state for image reveals. */
  clipFrom: string;
  clipTo: string;
  /** Additional scale the image settles from while revealing. */
  scaleFrom: number;
}

/**
 * Each story shares the same reveal vocabulary but with its own rhythm:
 * Tidal rises like water, Nordic slides like a plank, Casa opens from the
 * centre of a tile, Monaco drops like a curtain, Botanical unfurls from a corner.
 */
export const motionTokens: Record<MotionStyle, MotionTokens> = {
  fluid: {
    ease: [0.33, 0.9, 0.4, 1],
    duration: 1.6,
    stagger: 0.12,
    parallax: 70,
    clipFrom: "inset(100% 0% 0% 0%)",
    clipTo: "inset(0% 0% 0% 0%)",
    scaleFrom: 1.08,
  },
  measured: {
    ease: ease.inOut,
    duration: 1.1,
    stagger: 0.08,
    parallax: 28,
    clipFrom: "inset(0% 100% 0% 0%)",
    clipTo: "inset(0% 0% 0% 0%)",
    scaleFrom: 1.02,
  },
  geometric: {
    ease: ease.step,
    duration: 1,
    stagger: 0.06,
    parallax: 40,
    clipFrom: "inset(50% 50% 50% 50%)",
    clipTo: "inset(0% 0% 0% 0%)",
    scaleFrom: 1.04,
  },
  cinematic: {
    ease: ease.expo,
    duration: 1.9,
    stagger: 0.16,
    parallax: 90,
    clipFrom: "inset(0% 0% 100% 0%)",
    clipTo: "inset(0% 0% 0% 0%)",
    scaleFrom: 1.18,
  },
  organic: {
    ease: [0.25, 1, 0.5, 1],
    duration: 1.5,
    stagger: 0.1,
    parallax: 50,
    clipFrom: "inset(0% 0% 100% 100% round 50%)",
    clipTo: "inset(0% 0% 0% 0% round 0%)",
    scaleFrom: 1.06,
  },
};
