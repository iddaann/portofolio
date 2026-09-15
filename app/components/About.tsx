"use client";

import { motion } from "motion/react";

const identities = [
  {
    word: "CURIOUS",
    description:
      "I like understanding how things work, not just knowing how to use them.",
  },
  {
    word: "BUILDER",
    description:
      "I learn faster when an idea becomes something real, testable, and usable.",
  },
  {
    word: "EXPLORER",
    description:
      "From backend systems and IoT to mobile and web, I enjoy exploring different ways to build.",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden px-6 py-36 sm:py-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute left-[8%] top-[28%] h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-[22%] right-[8%] h-px w-40 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-center justify-between"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/35">
            07 — About
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-white/20 sm:block">
            Identity / Mindset
          </span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35 sm:text-sm"
          >
            Beyond the code
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.8rem,8vw,7.5rem)] font-medium uppercase leading-[0.88] tracking-[-0.065em] text-white"
          >
            I don&apos;t just
            <br />
            learn technology.
            <br />
            <span className="text-white/30">I build to understand.</span>
          </motion.h2>
        </div>

        <div className="mt-24 grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm"
          >
            <div className="mb-5 h-px w-12 bg-white/40" />
            <p className="text-sm leading-7 text-white/50 sm:text-base">
              Most of what I know comes from curiosity, experiments, mistakes,
              and projects that pushed me to figure things out on my own.
            </p>
          </motion.div>

          <div className="border-t border-white/10">
            {identities.map((identity, index) => (
              <motion.div
                key={identity.word}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[180px_1fr] sm:items-center sm:py-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-white/25">
                    0{index + 1}
                  </span>
                  <span className="text-2xl font-medium tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {identity.word}
                  </span>
                </div>
                <p className="max-w-lg text-sm leading-6 text-white/40 transition-colors duration-500 group-hover:text-white/65">
                  {identity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="mt-20 origin-left border-t border-dashed border-white/10"
        />
      </div>
    </section>
  );
}
