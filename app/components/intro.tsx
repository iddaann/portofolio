"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Label bergerak lebih ringan
  const labelY = useTransform(
    scrollYProgress,
    [0, 1],
    [60, -60]
  );

  // Heading bergerak lebih jauh
  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  );

  // Description paling lambat → depth
  const descY = useTransform(
    scrollYProgress,
    [0, 1],
    [140, -140]
  );

  // Sedikit scale ketika section bergerak melewati viewport
  const headingScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 0.96]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        z-20
        -mt-16
        flex
        min-h-[100vh]
        items-center
        px-6
        py-24
        md:-mt-24
        md:px-16
        md:py-32
        lg:px-24
      "
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* SECTION LABEL */}
        <motion.div
          style={{ y: labelY }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            01 — Introduction
          </span>
        </motion.div>

        {/* MAIN STATEMENT */}
        <motion.h2
          style={{
            y: headingY,
            scale: headingScale,
          }}
          initial={{
            opacity: 0,
            y: 80,
            filter: "blur(14px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-3xl
            text-left
            text-3xl
            font-medium
            leading-[1.08]
            tracking-[-0.04em]
            text-white
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          "
        >
          I build digital experiences
          <span className="text-white/30">
            {" "}
            that combine
          </span>{" "}
          technology, creativity, and purpose.
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.div
          style={{ y: descY }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 max-w-xl text-left"
        >
          <p className="text-base leading-8 text-white/50 md:text-lg">
            I&apos;m Muhamad Ramdhani Fathul Muttaqin, an Informatics student
            who enjoys turning ideas into useful digital products through
            software development and technology.
          </p>
        </motion.div>

        {/* SUBTLE CONTINUATION LINE */}
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-20
            h-px
            w-24
            origin-left
            bg-white/20
          "
        />

      </div>
    </section>
  );
}