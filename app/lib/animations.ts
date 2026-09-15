export const EASE = [0.22, 1, 0.36, 1] as const;

export const TRANSITION = {
  reveal: { duration: 0.9, ease: EASE },
  revealSlow: { duration: 1.05, ease: EASE },
  cinematic: { duration: 1.4, ease: EASE },
};

export const viewportOnce = {
  once: true,
  amount: 0.25,
} as const;

export const viewportStandard = {
  once: true,
  amount: 0.35,
} as const;
