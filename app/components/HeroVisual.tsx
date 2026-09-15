"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, delay: 0.15, ease: "easeOut" },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroVisual() {
  const { loaded } = useLoading();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.85, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.1, 0.06, 0]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-0 top-0 z-[5] h-[100svh] w-[62vw] max-w-[280px] md:h-[150vh] md:w-[55vw] md:max-w-[900px]"
    >
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
        className="absolute left-1/2 top-[8%] z-[1] h-[65%] w-[85%] -translate-x-1/2 rounded-full bg-blue-500/[0.1] blur-[70px] md:blur-[140px]"
      />

      <motion.div
        variants={photoVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
        className="absolute inset-0 z-10"
      >
        <Image
          src="/images/idan.png"
          alt="Muhamad Ramdhani Fathul Muttaqin"
          fill
          priority
          sizes="(max-width: 767px) 62vw, 55vw"
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );
}