"use client";

import { motion } from "motion/react";

export default function Intro() {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">

        {/* SMALL LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            01 — Introduction
          </span>
        </motion.div>

        {/* MAIN STATEMENT */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 60,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-5xl
            text-4xl
            font-medium
            leading-[1.05]
            tracking-[-0.04em]
            text-white
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          I build digital experiences
          <span className="text-white/30"> that combine </span>
          technology, creativity, and purpose.
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 flex justify-end"
        >
          <p className="max-w-xl text-base leading-8 text-white/50 md:text-lg">
            I&apos;m Muhamad Ramdhani Fathul Muttaqin, an Informatics student
            who enjoys turning ideas into useful digital products through
            software development and technology.
          </p>
        </motion.div>

      </div>
    </section>
  );
}