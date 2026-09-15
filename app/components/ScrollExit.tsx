"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type TransitionStyle = "lift" | "soft" | "zoom" | "drift" | "fade";

type TransitionConfig = {
  y: [number, number];
  scale: [number, number];
  opacity: [number, number];
};

const TRANSITIONS: Record<TransitionStyle, TransitionConfig> = {
  lift: { y: [0, -80], scale: [1, 0.94], opacity: [1, 0.5] },
  soft: { y: [0, -45], scale: [1, 0.97], opacity: [1, 0.62] },
  zoom: { y: [0, -35], scale: [1, 0.92], opacity: [1, 0.48] },
  drift: { y: [0, -65], scale: [1, 0.98], opacity: [1, 0.56] },
  fade: { y: [0, -20], scale: [1, 0.99], opacity: [1, 0.42] },
};

export default function ScrollExit({ children, style = "lift" }: { children: ReactNode; style?: TransitionStyle }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const config = TRANSITIONS[style];

  const y = useTransform(scrollYProgress, [0, 1], config.y);
  const scale = useTransform(scrollYProgress, [0, 1], config.scale);
  const opacity = useTransform(scrollYProgress, [0, 1], config.opacity);

  return (
    <motion.div ref={ref} className="relative" style={shouldReduceMotion ? undefined : { y, scale, opacity }}>
      {children}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
    </motion.div>
  );
}
