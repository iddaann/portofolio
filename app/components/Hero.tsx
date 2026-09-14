"use client";

import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const nameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "blur(15px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1,
    },
  },
};

export default function Hero() {
  const { loaded } = useLoading();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Nama perlahan naik dan menghilang
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.8, 0]);

  // Sedikit bergerak lebih lambat dari nama → efek depth
  const nameBlur = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    ["blur(0px)", "blur(2px)", "blur(10px)"]
  );

  // Scroll indicator menghilang lebih cepat
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [1, 0.5, 0]
  );

  return (
    <section
      ref={ref}
      className="relative z-20 h-[100vh] w-full overflow-hidden px-6 md:px-16 lg:px-24"
    >
      {/* NAME */}
      <motion.div
        variants={nameVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{
          y: nameY,
          scale: nameScale,
          opacity: nameOpacity,
          filter: nameBlur,
        }}
        className="absolute left-6 top-[34%] max-w-[55vw] text-left md:left-16 md:top-[18%] md:max-w-[38vw] lg:left-24"
      >
        <h1
          className="
            select-none
            font-[family-name:var(--font-anton)]
            uppercase
            leading-[1.1]
            tracking-[-0.01em]
            text-white
            text-[clamp(1.75rem,7vw,4.75rem)]
          "
        >
          <span className="block md:hidden">
            MUHAMAD
            <br />
            RAMDHANI
            <br />
            FATHUL
            <br />
            MUTTAQIN
          </span>

          <span className="hidden md:block">
            MUHAMAD RAMDHANI
            <br />
            FATHUL MUTTAQIN
          </span>
        </h1>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        variants={scrollVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
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