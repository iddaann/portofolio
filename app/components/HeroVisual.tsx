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
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-0 top-0 z-[5] h-[100svh] w-[72vw] max-w-[360px] sm:w-[62vw] sm:max-w-[420px] md:h-[150vh] md:w-[55vw] md:max-w-[900px]"
    >
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
        className="absolute left-1/2 top-[8%] z-[1] h-[65%] w-[85%] -translate-x-1/2 rounded-full bg-blue-500/[0.1] blur-[70px] md:blur-[140px]"
      />

      {/* Quiet technical atmosphere around the portrait */}
      <div className="absolute left-[18%] top-[18%] z-[2] h-[58%] w-[72%] rounded-[48%] border border-white/[0.07] opacity-70" />
      <motion.div
        style={{ rotate: orbitRotate }}
        className="absolute left-[8%] top-[27%] z-[2] h-[34%] w-[84%] rounded-[50%] border border-white/[0.06]"
      />

      <div className="absolute right-[8%] top-[15%] z-[20] font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px]">
        01 / Personal Profile
      </div>

      <div className="absolute bottom-[22%] left-[6%] z-[20] hidden font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:block">
        Informatics / Builder
      </div>

      <div className="absolute right-[8%] top-[31%] z-[20] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_14px_3px_rgba(255,255,255,0.2)]" />
      <div className="absolute left-[14%] bottom-[28%] z-[20] h-1 w-1 rounded-full bg-white/40" />

      <motion.div
        variants={photoVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
        className="absolute inset-0 z-10"
      >
        <div className="absolute left-1/2 top-[5%] h-[72%] w-[92%] -translate-x-1/2 overflow-hidden md:top-0 md:h-full md:w-full">
          <Image
            src="/images/idan.png"
            alt="Muhamad Ramdhani Fathul Muttaqin"
            fill
            priority
            sizes="(max-width: 639px) 72vw, (max-width: 767px) 62vw, 55vw"
            className="object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03040a]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03040a]/20 via-transparent to-[#03040a]/20" />
        </div>

        {/* Minimal portrait frame marks */}
        <div className="absolute left-[12%] top-[9%] h-7 w-7 border-l border-t border-white/20 sm:h-9 sm:w-9 md:left-[7%] md:top-[5%]" />
        <div className="absolute right-[7%] top-[9%] h-7 w-7 border-r border-t border-white/20 sm:h-9 sm:w-9 md:right-[3%] md:top-[5%]" />
        <div className="absolute bottom-[19%] left-[12%] h-7 w-7 border-b border-l border-white/10 sm:h-9 sm:w-9 md:left-[7%] md:bottom-[10%]" />
        <div className="absolute bottom-[19%] right-[7%] h-7 w-7 border-b border-r border-white/10 sm:h-9 sm:w-9 md:right-[3%] md:bottom-[10%]" />
      </motion.div>
    </div>
  );
}
