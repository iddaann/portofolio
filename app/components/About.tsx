"use client";

import { motion } from "motion/react";

const identities = [
  {
    word: "CURIOUS",
    description: "I like understanding how things work, not just knowing how to use them.",
  },
  {
    word: "BUILDER",
    description: "I learn faster when an idea becomes something real, testable, and usable.",
  },
  {
    word: "EXPLORER",
    description: "From backend systems and IoT to mobile and web, I enjoy exploring different ways to build.",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-6 sm:py-36 md:py-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl md:h-96 md:w-96" />
        <div className="absolute left-[8%] top-[28%] hidden h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:block" />
        <div className="absolute bottom-[22%] right-[8%] hidden h-px w-40 bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-center justify-between sm:mb-14"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 sm:text-xs sm:tracking-[0.35em]">07 — About</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-white/20 sm:block">Identity / Mindset</span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/35 sm:text-sm sm:tracking-[0.35em]"
          >
            Beyond the code
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 45, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.6rem,8vw,7.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.065em] text-white"
          >
            I don&apos;t just
            <br />
            learn technology.
            <br />
            <span className="text-white/25">I build to understand.</span>
          </motion.h2>
        </div>

        <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-white/40" />
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/20">HOW I WORK</span>
            </div>
            <p className="text-sm leading-7 text-white/50 sm:text-base">
              Most of what I know comes from curiosity, experiments, mistakes, and projects that pushed me to figure things out on my own.
            </p>
          </motion.div>

          <div className="border-t border-white/10">
            {identities.map((identity, index) => (
              <motion.div
                key={identity.word}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-4 sm:py-8"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-white/25">0{index + 1}</span>
                  <span className="text-2xl font-medium tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{identity.word}</span>
                </div>
                <p className="max-w-lg text-sm leading-6 text-white/40 transition-colors duration-500 group-hover:text-white/65">{identity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="mt-16 origin-left border-t border-dashed border-white/10 sm:mt-20"
        />
      </div>
    </section>
  );
}
