"use client";

import { motion } from "motion/react";

const facts = [
  { label: "Peran", value: "Backend & Full-Stack Developer" },
  { label: "Pendidikan", value: "Informatika, Universitas Siliwangi" },
  { label: "Fokus", value: "Golang, Laravel, Next.js, React" },
  { label: "Bahasa Kerja", value: "Indonesia & Inggris" },
];

export default function About() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">
              05 — About
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
          >
            Beyond the code, I&apos;m someone who enjoys learning by building.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-sm leading-7 text-white/50 md:text-base"
          >
            I like turning ideas into real, usable products — from backend
            systems and APIs to full-stack apps with clean, thoughtful
            interfaces. Most of what I know came from building things I was
            personally curious about.
          </motion.p>
        </div>

        <div className="flex flex-col divide-y divide-white/10 self-center">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center justify-between py-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-white/30">
                {fact.label}
              </span>
              <span className="text-right text-base text-white md:text-lg">
                {fact.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}