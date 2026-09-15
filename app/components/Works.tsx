"use client";

import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";

const projects = [
  { index: "01", title: "KindMateCare", category: "WEB", stack: "Laravel · Sanctum · Reverb", description: "Platform layanan kesehatan berbasis Laravel. Berperan sebagai backend developer: migrations, models, controllers, auth, hingga WebSocket real-time." },
  { index: "02", title: "Sellora", category: "MOBILE", stack: "Flutter · Golang · Gin · MySQL", description: "Aplikasi pencatatan bisnis pribadi full-stack dengan arsitektur feature-first dan Riverpod di sisi frontend, Repository pattern di backend." },
  { index: "03", title: "Our Journey Gallery", category: "WEB", stack: "Next.js · Prisma · Better Auth · Cloudinary", description: "Galeri kenangan privat dengan peta lokasi interaktif dan upload media." },
  { index: "04", title: "FiltraLens", category: "WEB", stack: "HTML · CSS · JS · Canvas API", description: "Studio filter foto berbasis browser dengan 12 preset filter piksel-demi-piksel." },
];

function FeaturedVisual() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070a12] p-5 md:min-h-[420px] md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(96,165,250,0.16),transparent_32%),radial-gradient(circle_at_20%_90%,rgba(139,92,246,0.12),transparent_35%)]" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/[0.04]" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/[0.04]" />

      <div className="relative h-full min-h-[290px] rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm md:p-5">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">system online</span>
          </div>
          <span className="font-mono text-[10px] text-white/30">MQTT / REALTIME</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["ROOM TEMP", "24.8°C"],
            ["POWER", "1.42 kW"],
            ["SERVER", "31.2°C"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
              <p className="font-mono text-[9px] tracking-[0.18em] text-white/30">{label}</p>
              <p className="mt-2 text-lg font-medium tracking-tight text-white/85">{value}</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-white/50" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.18em] text-white/30">LIVE TELEMETRY</span>
              <span className="font-mono text-[9px] text-emerald-400/70">● LIVE</span>
            </div>
            <div className="flex h-24 items-end gap-1.5 opacity-70">
              {[32, 48, 38, 66, 54, 72, 62, 82, 58, 74, 88, 67, 78, 91, 72, 84].map((height, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-white/30" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <span className="font-mono text-[9px] tracking-[0.18em] text-white/30">DEVICES</span>
            <div className="mt-3 space-y-2">
              {["TEMP", "RADON", "SMART", "POWER"].map((device) => (
                <div key={device} className="flex items-center justify-between text-[10px] text-white/45">
                  <span>{device}</span><span className="text-emerald-400/70">ONLINE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">02 — Selected Works</span>
            <h2 className="mt-5 max-w-xl text-4xl font-medium tracking-[-0.04em] text-white md:text-6xl">
              Things I&apos;ve built while learning by doing.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/35">
            From real-time IoT systems to mobile and web products, each project is a different experiment.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025]"
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <FeaturedVisual />
            <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">FEATURED PROJECT / 05</span>
                  <span className="rounded-full border border-emerald-400/20 px-3 py-1 font-mono text-[9px] tracking-[0.16em] text-emerald-400/70">INTERNSHIP</span>
                </div>
                <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                  IoT Monitoring Dashboard
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">
                  Dashboard monitoring IoT real-time yang dibangun selama internship di Telkom Corporate University Center. Menghubungkan data perangkat dengan backend Golang, MQTT, WebSocket, dan MySQL.
                </p>
              </div>

              <div className="mt-10">
                <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/25">Golang · MQTT · WebSocket · MySQL</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60 transition-colors group-hover:border-white/20 group-hover:text-white/80">
                    Realtime monitoring <span>↗</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="my-14 flex flex-wrap items-center gap-3 border-y border-white/[0.07] py-5">
          {['ALL', 'WEB', 'MOBILE', 'BACKEND', 'IOT'].map((filter, i) => (
            <span
              key={filter}
              className={`cursor-default rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${i === 0 ? 'border-white/20 bg-white text-black' : 'border-white/10 text-white/35 hover:border-white/20 hover:text-white/70'}`}
            >
              {filter}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} position={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
