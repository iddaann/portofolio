"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

type TransitionStyle = "lift" | "soft" | "zoom" | "drift" | "fade";

export default function ScrollExit({
  children,
  style = "lift",
}: {
  children: ReactNode;
  style?: TransitionStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const transforms = {
    lift: {
      y: useTransform(scrollYProgress, [0, 1], [0, -80]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 0.94]),
      opacity: useTransform(scrollYProgress, [0, 1], [1, 0.5]),
    },
    soft: {
      y: useTransform(scrollYProgress, [0, 1], [0, -45]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 0.97]),
      opacity: useTransform(scrollYProgress, [0, 1], [1, 0.62]),
    },
    zoom: {
      y: useTransform(scrollYProgress, [0, 1], [0, -35]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 0.92]),
      opacity: useTransform(scrollYProgress, [0, 1], [1, 0.48]),
    },
    drift: {
      y: useTransform(scrollYProgress, [0, 1], [0, -65]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 0.98]),
      opacity: useTransform(scrollYProgress, [0, 1], [1, 0.56]),
    },
    fade: {
      y: useTransform(scrollYProgress, [0, 1], [0, -20]),
      scale: useTransform(scrollYProgress, [0, 1], [1, 0.99]),
      opacity: useTransform(scrollYProgress, [0, 1], [1, 0.42]),
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={shouldReduceMotion ? undefined : transforms[style]}
    >
      {children}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
    </motion.div>
  );
}
