"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

      {/* NAME - BACKGROUND LAYER */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: "blur(15px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <h1
          className="
            select-none
            text-center
            font-medium
            uppercase
            leading-[0.78]
            tracking-[-0.055em]
            text-white/[0.92]
            text-[clamp(3.5rem,10vw,10rem)]
          "
        >
          MUHAMAD
          <br />
          RAMDHANI
          <br />
          FATHUL
          <br />
          MUTTAQIN
        </h1>
      </motion.div>

      {/* GLOW BEHIND PERSON */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="
          absolute
          bottom-[5%]
          left-1/2
          z-[1]
          h-[550px]
          w-[400px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.08]
          blur-[120px]
        "
      />

      {/* PERSON - FOREGROUND */}
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-0
          left-1/2
          z-10
          w-[min(72vw,520px)]
          -translate-x-1/2
        "
      >
        <Image
          src="/images/idan.png"
          alt="Muhamad Ramdhani Fathul Muttaqin"
          width={1024}
          height={1536}
          priority
          className="h-auto w-full object-contain"
        />
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 1,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
        "
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll
        </span>

        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-8 w-px bg-white/40"
        />
      </motion.div>

    </section>
  );
}