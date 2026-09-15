"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "../lib/animations";

const revealViewport = { once: true, amount: 0.25 } as const;

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const labelY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const headingY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const descY = useTransform(scrollYProgress, [0, 1], [95, -95]);
  const headingScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  return (
    <section ref={ref} className="relative z-20 flex min-h-[92svh] items-center px-5 py-24 sm:px-6 sm:py-28 md:min-h-screen md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[48px_1fr] md:gap-8">
          <motion.div style={{ y: labelY }} className="flex items-start md:justify-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/35 [writing-mode:vertical-rl] md:text-[10px]">01 — Introduction</span>
          </motion.div>

          <div>
            <motion.h2 style={{ y: headingY, scale: headingScale }} initial={{ opacity: 0, y: 60, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={revealViewport} transition={{ duration: 1.05, ease: EASE }} className="max-w-4xl text-left text-[clamp(2.15rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.055em] text-white">
              I learn by building
              <span className="text-white/25"> real things.</span>
              <br />
              From code to systems that actually work.
            </motion.h2>

            <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
              <motion.div style={{ y: descY }} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="max-w-xl">
                <p className="text-sm leading-7 text-white/45 sm:text-base sm:leading-8">I&apos;m Muhamad Ramdhani Fathul Muttaqin, an Informatics student who enjoys software development, web technologies, and learning how digital systems work from the inside out.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} className="hidden items-center gap-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 md:flex">
                <span className="h-px w-10 bg-white/15" />
                Learn / Build / Repeat
              </motion.div>
            </div>

            <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, delay: 0.35, ease: EASE }} className="mt-16 h-px w-24 origin-left bg-white/20 sm:mt-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
