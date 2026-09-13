"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const glowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};

const photoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroVisual() {
  const { loaded } = useLoading();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Foto bergerak sedikit ke bawah ketika kamera scroll
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Foto sedikit membesar
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Foto perlahan menghilang
  const photoOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.85, 0]
  );

  // Glow bergerak dan berubah ukuran
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0.1, 0.06, 0]
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-0 top-0 z-[5] h-[100vh] w-[52vw] max-w-[260px] md:h-[150vh] md:w-[55vw] md:max-w-[900px]"
    >
      {/* ATMOSPHERIC GLOW */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{
          y: glowY,
          scale: glowScale,
          opacity: glowOpacity,
        }}
        className="
          absolute
          left-1/2
          top-[8%]
          z-[1]
          h-[65%]
          w-[85%]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.1]
          blur-[140px]
        "
      />

      {/* PHOTO */}
      <motion.div
        variants={photoVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{
          y: photoY,
          scale: photoScale,
          opacity: photoOpacity,
        }}
        className="absolute inset-0 z-10"
      >
        <Image
          src="/images/idan.png"
          alt="Muhamad Ramdhani Fathul Muttaqin"
          fill
          priority
          className="object-cover object-top"
        />

        {/* Fade ke background */}
        {/* <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#03040a]" /> */}

        {/* Sedikit fade di sisi kiri supaya menyatu dengan typography */}
        {/* <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#03040a] to-transparent md:w-48" /> */}
      </motion.div>
    </div>
  );
}