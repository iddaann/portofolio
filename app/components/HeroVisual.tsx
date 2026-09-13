"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { useLoading } from "../context/LoadingContext";

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 2, delay: 0.15, ease: "easeOut" } },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroVisual() {
  const { loaded } = useLoading();

  return (
    <div className="pointer-events-none absolute right-0 top-0 z-[5] h-[100vh] w-[52vw] max-w-[260px] md:h-[170vh] md:w-[55vw] md:max-w-[900px]">

      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        className="absolute left-1/2 top-[8%] z-[1] h-[65%] w-[85%] -translate-x-1/2 rounded-full bg-blue-500/[0.1] blur-[140px]"
      />

      <motion.div
        variants={photoVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        className="absolute inset-0 z-10"
      >
        <Image
          src="/images/idan.png"
          alt="Muhamad Ramdhani Fathul Muttaqin"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[#03040a]" />
      </motion.div>
    </div>
  );
}