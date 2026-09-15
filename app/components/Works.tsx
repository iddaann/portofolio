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
  { index: "01", title: "KindMateCare", category: "WEB", stack: "Laravel · Sanctum · Reverb", description: "Platform layanan kesehatan berbasis Laravel. Berperan di sisi backend mulai dari migrations, models, controllers, authentication, sampai fitur WebSocket real-time.", role: "Backend development" },
  { index: "02", title: "Sellora", category: "MOBILE", stack: "Flutter · Golang · Gin · MySQL", description: "Aplikasi pencatatan bisnis pribadi full-stack dengan pendekatan feature-first dan Riverpod di frontend, serta Repository pattern di backend.", role: "Full-stack development" },
  { index: "03", title: "Our Journey Gallery", category: "WEB", stack: "Next.js · Prisma · Better Auth · Cloudinary", description: "Galeri kenangan privat dengan peta lokasi interaktif dan kemampuan upload media untuk menyimpan perjalanan dalam satu ruang personal.", role: "Web development" },
  { index: "04", title: "FiltraLens", category: "WEB", stack: "HTML · CSS · JavaScript · Canvas API", description: "Studio filter foto berbasis browser yang memproses gambar secara langsung menggunakan Canvas API dan eksplorasi manipulasi piksel.", role: "Frontend development" },
  { index: "05", title: "IoT Monitoring Dashboard", category: "IOT", stack: "Golang · MQTT · WebSocket · MySQL", description: "Dashboard monitoring perangkat IoT real-time yang dibangun selama internship di Telkom Corporate University Center.", role: "IoT & backend development" },
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

  const move = (nextDirection: number) => {
    setActiveIndex((current) => (current + nextDirection + projects.length) % projects.length);
  };

  const selectProject = (index: number) => setActiveIndex(index);
  const activeProject = projects[activeIndex];

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[110px] sm:h-[520px] sm:w-[520px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs sm:tracking-[0.35em]">02 — Selected Works</span>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl md:mt-5 md:text-6xl">
              Things I&apos;ve built while learning by doing.
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-6 text-white/35 sm:text-sm">
            No screenshots. Just the ideas, systems, and technologies behind each build.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.018] p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-4 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_32%),radial-gradient(circle_at_85%_90%,rgba(96,165,250,0.055),transparent_28%)]" />

          <div className="relative flex h-[500px] items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/[0.06] bg-black/20 [perspective:1200px] sm:h-[530px] sm:rounded-[1.5rem] md:h-[570px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] sm:h-[280px] sm:w-[280px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025] sm:h-[430px] sm:w-[430px]" />

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
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute left-1/2 w-[calc(100%-70px)] max-w-[760px] -translate-x-1/2 text-left sm:w-[min(760px,78vw)] ${isActive ? "z-30 cursor-default" : isAdjacent ? "z-20 cursor-pointer" : "z-10 pointer-events-none"}`}
                >
                  <div className={`relative min-h-[360px] overflow-hidden rounded-[1.35rem] border p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:min-h-[390px] sm:rounded-[1.8rem] sm:p-7 md:min-h-[420px] md:p-11 ${isActive ? "border-white/[0.14] bg-[#090c13]/90" : "border-white/[0.08] bg-[#090c13]/55"}`}>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.075),transparent_28%),radial-gradient(circle_at_12%_88%,rgba(148,163,184,0.035),transparent_30%)]" />
                    <div className="pointer-events-none absolute -right-3 -top-5 select-none font-[family-name:var(--font-anton)] text-[6rem] leading-none text-white/[0.035] sm:-right-5 sm:-top-12 sm:text-[10rem] md:text-[13rem]">{project.index}</div>

                    <div className="relative flex items-center justify-between gap-3">
                      <span className="font-mono text-[8px] tracking-[0.18em] text-white/30 sm:text-[10px] sm:tracking-[0.22em]">PROJECT {project.index}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[8px] tracking-[0.15em] text-white/40 sm:px-3 sm:text-[9px] sm:tracking-[0.18em]">{project.category}</span>
                    </div>

                    <div className="relative mt-12 sm:mt-16 md:mt-20">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25 sm:text-[9px] sm:tracking-[0.25em]">{project.role}</p>
                      <h3 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.055em] text-white sm:mt-4 sm:text-4xl md:text-6xl">{project.title}</h3>
                      <p className="mt-4 max-w-2xl text-xs leading-6 text-white/45 sm:mt-6 sm:text-sm sm:leading-7 md:text-base">{project.description}</p>
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-4 sm:mt-9 sm:gap-2 sm:pt-5">
                      {project.stack.split(" · ").map((tech) => (
                        <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-white/35 sm:px-3 sm:py-1.5 sm:text-[9px] sm:tracking-[0.13em]">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <button type="button" aria-label="Previous project" onClick={() => move(-1)} className="absolute left-2 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-sm text-white/55 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white sm:left-4 sm:h-11 sm:w-11 sm:text-base md:left-7">←</button>
            <button type="button" aria-label="Next project" onClick={() => move(1)} className="absolute right-2 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-sm text-white/55 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white sm:right-4 sm:h-11 sm:w-11 sm:text-base md:right-7">→</button>

            <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/45 px-2.5 py-2 backdrop-blur-xl sm:bottom-5 sm:gap-2 sm:px-3">
              {projects.map((project, index) => (
                <button key={project.title} type="button" aria-label={`Go to ${project.title}`} onClick={() => selectProject(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-7 bg-white/80 sm:w-9" : "w-1.5 bg-white/15 hover:bg-white/35"}`} />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-between px-1 pb-0 pt-4 sm:px-2 sm:pt-5 md:px-4">
            <span className="font-mono text-[7px] tracking-[0.14em] text-white/25 sm:text-[9px] sm:tracking-[0.18em]">SWIPE / SELECT</span>
            <span className="font-mono text-[8px] tracking-[0.16em] text-white/25 sm:text-[9px] sm:tracking-[0.18em]">{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
