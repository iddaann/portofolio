"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const projects = [
  { index: "01", title: "KindMateCare", category: "WEB", stack: "Laravel · Sanctum · Reverb", description: "Platform layanan kesehatan berbasis Laravel. Berperan sebagai backend developer: migrations, models, controllers, auth, hingga WebSocket real-time." },
  { index: "02", title: "Sellora", category: "MOBILE", stack: "Flutter · Golang · Gin · MySQL", description: "Aplikasi pencatatan bisnis pribadi full-stack dengan arsitektur feature-first dan Riverpod di frontend, serta Repository pattern di backend." },
  { index: "03", title: "Our Journey Gallery", category: "WEB", stack: "Next.js · Prisma · Better Auth · Cloudinary", description: "Galeri kenangan privat dengan peta lokasi interaktif dan upload media." },
  { index: "04", title: "FiltraLens", category: "WEB", stack: "HTML · CSS · JS · Canvas API", description: "Studio filter foto berbasis browser dengan 12 preset filter piksel-demi-piksel." },
  { index: "05", title: "IoT Monitoring Dashboard", category: "IOT", stack: "Golang · MQTT · WebSocket · MySQL", description: "Dashboard monitoring IoT real-time yang dibangun selama internship di Telkom Corporate University Center." },
];

const filters = ["ALL", "WEB", "MOBILE", "BACKEND", "IOT"];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(4);

  const filteredProjects = useMemo(
    () => activeFilter === "ALL" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  const current = filteredProjects[activeIndex % filteredProjects.length] ?? filteredProjects[0];

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + filteredProjects.length) % filteredProjects.length);
  };

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">02 — Selected Works</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">Things I&apos;ve built while learning by doing.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/35">No screenshots. Just the ideas, systems, and technologies behind each build.</p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => selectFilter(filter)} className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${activeFilter === filter ? "border-white/30 bg-white text-black" : "border-white/10 bg-white/[0.02] text-white/35 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/70"}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.025] p-3 shadow-2xl backdrop-blur-2xl md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_10%_100%,rgba(96,165,250,0.07),transparent_30%)]" />

          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-black/20 px-3 py-10 backdrop-blur-xl md:min-h-[500px] md:px-10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div key={`${activeFilter}-${current.index}`} initial={{ opacity: 0, y: 20, scale: 0.97, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(8px)" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-3xl">
                <div className="rounded-[1.75rem] border border-white/[0.13] bg-[#080b12]/75 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-12">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">PROJECT {current.index}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-white/40">{current.category}</span>
                  </div>

                  <div className="mt-14 md:mt-20">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">Selected build</p>
                    <h3 className="max-w-2xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">{current.title}</h3>
                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 md:text-base">{current.description}</p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                    {current.stack.split(" · ").map((tech) => (
                      <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-white/35">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button type="button" aria-label="Previous project" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:left-6">←</button>
            <button type="button" aria-label="Next project" onClick={() => move(1)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:right-6">→</button>
          </div>

          <div className="relative flex items-center justify-between gap-5 px-2 pb-2 pt-5 md:px-4 md:pt-6">
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              {filteredProjects.map((project, index) => (
                <button key={project.title} type="button" aria-label={`Go to ${project.title}`} onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex % filteredProjects.length ? "w-10 bg-white/80" : "w-2 bg-white/15 hover:bg-white/30"}`} />
              ))}
            </div>
            <span className="shrink-0 font-mono text-[9px] tracking-[0.18em] text-white/25">{String((activeIndex % filteredProjects.length) + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
