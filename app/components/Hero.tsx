"use client";

import { motion, Variants } from "motion/react";
import { useLoading } from "../context/LoadingContext";

const nameVariants: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
  },
};

const scrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.6, duration: 1 } },
};

export default function Hero() {
  const { loaded } = useLoading();

  return (
    <section className="relative z-20 h-[70vh] w-full px-6 md:h-[75vh] md:px-16 lg:px-24">

      <motion.div
  variants={nameVariants}
  initial="hidden"
  animate={loaded ? "visible" : "hidden"}
  className="absolute left-6 top-[22%] max-w-[55vw] text-left md:left-16 md:top-[18%] md:max-w-[38vw] lg:left-24"
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
    {/* MOBILE: 4 baris, 1 kata per baris */}
    <span className="block md:hidden">
      MUHAMAD
      <br />
      RAMDHANI
      <br />
      FATHUL
      <br />
      MUTTAQIN
    </span>

    {/* DESKTOP: 2 baris, 2 kata per baris */}
    <span className="hidden md:block">
      MUHAMAD RAMDHANI
      <br />
      FATHUL MUTTAQIN
    </span>
  </h1>
</motion.div>

      <motion.div
        variants={scrollVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-white/40"
        />
      </motion.div>

    </section>
  );
}