// Motion tokens — single source of truth for animations across the site.
// Referenced by src/components/motion/* and all homepage sections.

export const EASE = {
  outQuart: [0.25, 1, 0.5, 1],
  outQuint: [0.22, 1, 0.36, 1],
  outExpo:  [0.16, 1, 0.3, 1],
} as const;

export const MOTION = {
  feedback: { duration: 0.15, ease: EASE.outQuart },
  state:    { duration: 0.22, ease: EASE.outQuart },
  enter:    { duration: 0.60, ease: EASE.outQuart },
  hero:     { duration: 0.80, ease: EASE.outExpo  },
  exit:     { duration: 0.45, ease: EASE.outQuart },
  stagger:      0.08,
  heroStagger:  0.09,
} as const;

// Hero choreography offsets in seconds (matches HOMEPAGE-REDESIGN.md §Motion System)
export const HERO_DELAY = {
  eyebrow:      0.00,
  h1:           0.09,
  sub:          0.26,
  primaryCTA:   0.40,
  secondaryCTA: 0.47,
  trust:        0.56,
  visual:       0.18,
} as const;

export type EaseKey = keyof typeof EASE;
export type MotionKey = keyof typeof MOTION;
