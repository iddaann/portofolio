"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Project = {
  index: string;
  title: string;
  category: string;
  stack: string;
  description: string;
};

const accents: Record<string, string> = {
  WEB: "WEB",
  MOBILE: "MOBILE",
  BACKEND: "BACKEND",
  IOT: "IOT",
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
  const cardY = useTransform(scrollYProgress, [0, 1], [18 * direction, -18 * direction]);

  return (
    <motion.div
      ref={ref}
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (position % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.035]"
    >
      <div className="relative h-44 overflow-hidden border-b border-white/[0.07] bg-[#070910]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.07),transparent_30%)] opacity-60 transition-transform duration-700 group-hover:scale-110" />
        <span className="pointer-events-none absolute -right-2 -top-7 select-none font-[family-name:var(--font-anton)] text-[8rem] leading-none text-white/[0.045] transition-transform duration-700 group-hover:-translate-x-2 group-hover:scale-105">
          {project.index}
        </span>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-white/45 backdrop-blur-sm">
            {accents[project.category] ?? project.category}
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] text-white/25">0{position + 1}</span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <h3 className="text-2xl font-medium tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-1">
            {project.title}
          </h3>
          <span className="mt-1 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60">↗</span>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-white/40 transition-colors duration-500 group-hover:text-white/50">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/[0.07] pt-4">
          {project.stack.split(" · ").map((tech) => (
            <span key={tech} className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
