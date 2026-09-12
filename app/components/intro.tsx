"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const labelY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const headingY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const descY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section ref={ref} className="relative z-20 -mt-16 flex min-h-[85vh] items-center px-6 py-16 md:-mt-24 md:py-20">
      <div className="mx-auto w-full max-w-6xl">

        <motion.div style={{ y: labelY }} className="mb-8">
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            01 — Introduction
          </span>
        </motion.div>

        <motion.h2
  style={{ y: headingY }}
  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
  className="
    max-w-2xl
    text-left
    text-3xl
    font-medium
    leading-[1.1]
    tracking-[-0.04em]
    text-white
    sm:text-4xl
    md:max-w-3xl
    md:text-5xl
    lg:text-6xl
  "
>
  I build digital experiences
  <span className="text-white/30"> <br/>that combine </span>
  technology, creativity, and purpose.
</motion.h2>

        <motion.div
  style={{ y: descY }}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
  className="mt-14 max-w-xl text-left"
>
  <p className="text-base leading-8 text-white/50 md:text-lg">
    I&apos;m Muhamad Ramdhani Fathul Muttaqin, an Informatics student
    who enjoys turning ideas into useful digital products through
    software development and technology.
  </p>
</motion.div>

      </div>
    </section>
  );
}