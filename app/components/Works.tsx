"use client";

import { motion } from "motion/react";
import { useState } from "react";

type Project = {
  index: string;
  title: string;
  category: string;
  stack: string;
  description: string;
  role: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "KindMateCare",
    category: "WEB",
    stack: "Laravel · Sanctum · Reverb",
    description:
      "Platform layanan kesehatan berbasis Laravel. Berperan di sisi backend mulai dari migrations, models, controllers, authentication, sampai fitur WebSocket real-time.",
    role: "Backend development",
  },
  {
    index: "02",
    title: "Sellora",
    category: "MOBILE",
    stack: "Flutter · Golang · Gin · MySQL",
    description:
      "Aplikasi pencatatan bisnis pribadi full-stack dengan pendekatan feature-first dan Riverpod di frontend, serta Repository pattern di backend.",
    role: "Full-stack development",
  },
  {
    index: "03",
    title: "Our Journey Gallery",
    category: "WEB",
    stack: "Next.js · Prisma · Better Auth · Cloudinary",
    description:
      "Galeri kenangan privat dengan peta lokasi interaktif dan kemampuan upload media untuk menyimpan perjalanan dalam satu ruang personal.",
    role: "Web development",
  },
  {
    index: "04",
    title: "FiltraLens",
    category: "WEB",
    stack: "HTML · CSS · JavaScript · Canvas API",
    description:
      "Studio filter foto berbasis browser yang memproses gambar secara langsung menggunakan Canvas API dan eksplorasi manipulasi piksel.",
    role: "Frontend development",
  },
  {
    index: "05",
    title: "IoT Monitoring Dashboard",
    category: "IOT",
    stack: "Golang · MQTT · WebSocket · MySQL",
    description:
      "Dashboard monitoring perangkat IoT real-time yang dibangun selama internship di Telkom Corporate University Center.",
    role: "IoT & backend development",
  },
];

function getOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const half = Math.floor(projects.length / 2);

  if (offset > half) offset -= projects.length;
  if (offset < -half) offset += projects.length;

  return offset;
}

export default function Works() {
  const [activeIndex, setActiveIndex] = useState(4);
  const [direction, setDirection] = useState(1);

  const move = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + projects.length) % projects.length);
  };

  const selectProject = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">02 — Selected Works</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
              Things I&apos;ve built while learning by doing.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/35">
            No screenshots. Just the ideas, systems, and technologies behind each build.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.018] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_32%),radial-gradient(circle_at_85%_90%,rgba(96,165,250,0.055),transparent_28%)]" />

          <div className="relative flex h-[560px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-black/20 [perspective:1200px] md:h-[570px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] shadow-[0_0_100px_rgba(255,255,255,0.025)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

            {projects.map((project, index) => {
              const offset = getOffset(index, activeIndex);
              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const x = offset === 0 ? "0%" : offset < 0 ? "-63%" : "63%";

              return (
                <motion.button
                  key={project.title}
                  type="button"
                  aria-label={`Select ${project.title}`}
                  onClick={() => !isActive && selectProject(index)}
                  initial={false}
                  animate={{
                    x,
                    scale: isActive ? 1 : isAdjacent ? 0.78 : 0.62,
                    opacity: isActive ? 1 : isAdjacent ? 0.3 : 0,
                    filter: isActive ? "blur(0px)" : isAdjacent ? "blur(4px)" : "blur(10px)",
                    rotateY: offset === 0 ? 0 : offset < 0 ? 7 : -7,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute left-1/2 w-[min(760px,78vw)] -translate-x-1/2 text-left ${
                    isActive ? "z-30 cursor-default" : isAdjacent ? "z-20 cursor-pointer" : "z-10 pointer-events-none"
                  }`}
                >
                  <div
                    className={`relative min-h-[390px] overflow-hidden rounded-[1.8rem] border p-7 shadow-[0_35px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-colors md:min-h-[420px] md:p-11 ${
                      isActive
                        ? "border-white/[0.14] bg-[#090c13]/90"
                        : "border-white/[0.08] bg-[#090c13]/55"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.075),transparent_28%),radial-gradient(circle_at_12%_88%,rgba(148,163,184,0.035),transparent_30%)]" />

                    <div className="pointer-events-none absolute -right-5 -top-12 select-none font-[family-name:var(--font-anton)] text-[10rem] leading-none text-white/[0.035] md:text-[13rem]">
                      {project.index}
                    </div>

                    <div className="relative flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">PROJECT {project.index}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-white/40">
                        {project.category}
                      </span>
                    </div>

                    <div className="relative mt-16 md:mt-20">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">{project.role}</p>
                      <h3 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.055em] text-white md:text-6xl">
                        {project.title}
                      </h3>
                      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
                        {project.description}
                      </p>
                    </div>

                    <div className="relative mt-9 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                      {project.stack.split(" · ").map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-white/35"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <button
              type="button"
              aria-label="Previous project"
              onClick={() => move(-1)}
              className="absolute left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/45 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:left-7"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => move(1)}
              className="absolute right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/45 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:right-7"
            >
              →
            </button>

            <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.08] bg-black/35 px-3 py-2 backdrop-blur-xl">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`Go to ${project.title}`}
                  onClick={() => selectProject(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex ? "w-9 bg-white/80" : "w-1.5 bg-white/15 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-between px-2 pb-1 pt-5 md:px-4">
            <span className="font-mono text-[9px] tracking-[0.18em] text-white/25">
              DRAG THROUGH IDEAS / {activeProject.category}
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-white/25">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
