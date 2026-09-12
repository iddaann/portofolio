"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

type Project = {
  index: string;
  title: string;
  stack: string;
  description: string;
  image: string;
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
  const cardY = useTransform(scrollYProgress, [0, 1], [70 * direction, -70 * direction]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 120, scale: 0.88, rotate: direction * -2, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, delay: (position % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-white/[0.06] to-transparent">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.2]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-white md:text-2xl">
            {project.title}
          </h3>
          <span className="text-xs text-white/30">{project.index}</span>
        </div>
        <p className="text-sm leading-6 text-white/50">{project.description}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/30">{project.stack}</p>
      </div>
    </motion.div>
  );
}