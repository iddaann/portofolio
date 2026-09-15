"use client";

import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const nameVariants: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const scrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.6, duration: 0.8 } },
};

export default function Hero() {
  const { loaded } = useLoading();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.8, 0]);
  const nameBlur = useTransform(scrollYProgress, [0, 0.7, 1], ["blur(0px)", "blur(2px)", "blur(10px)"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.5, 0]);

  return (
    <section ref={ref} className="relative z-20 min-h-[620px] h-[100svh] w-full overflow-hidden px-4 sm:px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={loaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="absolute left-4 top-[15%] z-30 flex items-center gap-3 sm:left-6 md:left-16 md:top-[12%] lg:left-24"
      >
        <span className="h-px w-6 bg-white/20 sm:w-8" />
        <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/30 sm:text-[9px]">Informatics / Builder</span>
      </motion.div>

      <motion.div
        variants={nameVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ y: nameY, scale: nameScale, opacity: nameOpacity, filter: nameBlur }}
        className="absolute left-4 top-[27%] z-20 w-[82vw] max-w-[520px] text-left sm:left-6 sm:top-[30%] md:left-16 md:top-[18%] md:w-auto md:max-w-[38vw] lg:left-24"
      >
        <h1 className="select-none font-[family-name:var(--font-anton)] uppercase leading-[1.02] tracking-[-0.015em] text-white text-[clamp(2rem,10vw,4.75rem)] sm:text-[clamp(2.35rem,8vw,4.75rem)] md:leading-[1.1] md:text-[clamp(3.5rem,6vw,4.75rem)]">
          <span className="block md:hidden">MUHAMAD<br />RAMDHANI<br />FATHUL<br />MUTTAQIN</span>
          <span className="hidden md:block">MUHAMAD RAMDHANI<br />FATHUL MUTTAQIN</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4 flex max-w-[250px] items-center gap-3 sm:mt-5"
        >
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">Still learning, still building</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[15%] left-4 z-30 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 sm:block md:left-16 lg:left-24"
      >
        Software / Systems / 2026
      </motion.div>

      <motion.div
        variants={scrollVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 sm:gap-3"
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.28em] text-white/25 sm:text-[8px]">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="h-6 w-px bg-white/40 sm:h-8" />
      </motion.div>

      <div className="absolute bottom-[14%] right-4 z-30 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 sm:right-6 md:right-16 lg:right-24">01 / 08</div>
    </section>
  );
}
