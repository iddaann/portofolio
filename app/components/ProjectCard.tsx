"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Project = {
  index: string;
  title: string;
  stack: string;
  description: string;
};

export default function ProjectCard({
  project,
  position,
}: {
  project: Project;
  position: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const direction = position % 2 === 0 ? 1 : -1;
  const cardY = useTransform(scrollYProgress, [0, 1], [22 * direction, -22 * direction]);

  return (
    <motion.div
      ref={ref}
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 120, scale: 0.88, rotate: direction * -2, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, delay: (position % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8"
    >
      {/* ANGKA BESAR DEKORATIF, PENGGANTI GAMBAR */}
      <span className="pointer-events-none absolute -right-4 -top-6 select-none font-[family-name:var(--font-anton)] text-[7rem] leading-none text-white/[0.04]">
        {project.index}
      </span>

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-white/70 md:text-2xl">
            {project.title}
          </h3>
          <span className="text-xs text-white/30">{project.index}</span>
        </div>

        <p className="text-sm leading-6 text-white/50">{project.description}</p>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/30">
          {project.stack}
        </p>
      </div>
    </motion.div>
  );
}