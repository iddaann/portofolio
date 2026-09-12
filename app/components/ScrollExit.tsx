"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollExit({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <motion.div ref={ref} style={{ y, scale, opacity }}>
      {children}
    </motion.div>
  );
}