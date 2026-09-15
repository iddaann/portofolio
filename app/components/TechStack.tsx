"use client";

import { motion } from "motion/react";
import { useState } from "react";

type Stack = { name: string; category: string; description: string; projects: string[] };

const stacks: Stack[] = [
  { name: "Golang", category: "Backend", description: "Bahasa yang paling sering saya gunakan untuk membangun backend dan sistem real-time.", projects: ["Sellora", "IoT Monitoring Dashboard"] },
  { name: "Laravel", category: "Backend", description: "Framework PHP yang saya gunakan untuk membangun backend KindMateCare.", projects: ["KindMateCare"] },
  { name: "MySQL", category: "Database", description: "Database relasional yang saya gunakan untuk menyimpan dan mengelola data aplikasi.", projects: ["KindMateCare", "Sellora", "IoT Monitoring Dashboard"] },
  { name: "Next.js", category: "Frontend", description: "Framework React yang saya gunakan untuk membangun web app dan portfolio ini.", projects: ["Our Journey Gallery", "Portfolio"] },
  { name: "JavaScript / TypeScript", category: "Language", description: "Bahasa utama untuk berbagai kebutuhan frontend dan interaksi web.", projects: ["FiltraLens", "Our Journey Gallery", "Portfolio"] },
  { name: "Flutter", category: "Mobile", description: "Teknologi yang saya gunakan untuk membangun sisi mobile Sellora.", projects: ["Sellora"] },
  { name: "MQTT", category: "Realtime", description: "Protokol komunikasi yang saya gunakan untuk menerima telemetry perangkat IoT.", projects: ["IoT Monitoring Dashboard"] },
  { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS untuk membangun interface yang cepat dan konsisten.", projects: ["KindMateCare", "Portfolio"] },
];

const connections: Record<string, string[]> = {
  Golang: ["MySQL", "MQTT", "Flutter"], Laravel: ["MySQL", "Tailwind CSS"], "Next.js": ["JavaScript / TypeScript", "Tailwind CSS"], MQTT: ["Golang"], Flutter: ["Golang"], "JavaScript / TypeScript": ["Next.js", "Tailwind CSS"], MySQL: ["Golang", "Laravel"], "Tailwind CSS": ["Next.js", "Laravel"],
};

export default function TechStack() {
  const [active, setActive] = useState("Golang");
  const current = stacks.find((item) => item.name === active) ?? stacks[0];
  const related = new Set(connections[active] ?? []);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[110px] sm:h-[560px] sm:w-[560px]" />
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="mb-9 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs sm:tracking-[0.35em]">03 — Tech Ecosystem</span>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl md:mt-5 md:text-6xl">Tools I use to turn ideas into working systems.</h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-white/35 sm:text-sm">Bukan sekadar daftar skill. Pilih teknologi untuk melihat bagaimana saya menggunakannya dalam project nyata.</p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_360px]">
          <div className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.018] p-3 backdrop-blur-2xl sm:min-h-[520px] sm:rounded-[2rem] sm:p-5 md:min-h-[570px] md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.055),transparent_34%)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] sm:h-[260px] sm:w-[260px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025] sm:h-[410px] sm:w-[410px]" />

            <div className="relative grid min-h-[375px] grid-cols-2 gap-2.5 sm:min-h-[450px] sm:grid-cols-4 sm:gap-3 lg:grid-cols-3 lg:min-h-[500px]">
              {stacks.map((item, index) => {
                const isActive = item.name === active;
                const isRelated = related.has(item.name);
                return (
                  <motion.button key={item.name} type="button" onClick={() => setActive(item.name)} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className={`group relative flex min-h-[88px] flex-col justify-between overflow-hidden rounded-xl border p-3 text-left transition-all duration-500 sm:min-h-[120px] sm:rounded-2xl sm:p-4 ${isActive ? "border-white/25 bg-white/[0.09] shadow-[0_20px_70px_rgba(0,0,0,0.3)]" : isRelated ? "border-white/[0.14] bg-white/[0.045]" : "border-white/[0.07] bg-white/[0.018] opacity-55 hover:border-white/[0.15] hover:bg-white/[0.045] hover:opacity-100"}`}>
                    <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25 sm:text-[8px] sm:tracking-[0.18em]">0{index + 1}</span>
                    <div><span className="block text-xs font-medium tracking-[-0.02em] text-white/85 sm:text-sm md:text-base">{item.name}</span><span className="mt-1 block text-[8px] uppercase tracking-[0.13em] text-white/25 sm:text-[9px] sm:tracking-[0.16em]">{item.category}</span></div>
                    {isActive && <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.8)] sm:right-3 sm:top-3" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 font-mono text-[7px] tracking-[0.18em] text-white/25 backdrop-blur-xl sm:bottom-5 sm:px-4 sm:py-2 sm:text-[8px] sm:tracking-[0.2em]">SELECT A NODE</div>
          </div>

          <motion.div key={active} initial={{ opacity: 0, x: 15, filter: "blur(5px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#080b12]/75 p-5 backdrop-blur-2xl sm:min-h-[460px] sm:rounded-[2rem] sm:p-7 md:min-h-[570px] md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.035] blur-3xl" />
            <div>
              <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] tracking-[0.18em] text-white/25 sm:text-[9px] sm:tracking-[0.22em]">ACTIVE NODE</span><span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-white/35 sm:px-3 sm:text-[8px] sm:tracking-[0.18em]">{current.category}</span></div>
              <h3 className="mt-10 text-3xl font-medium tracking-[-0.05em] text-white sm:mt-16 sm:text-4xl">{current.name}</h3>
              <p className="mt-4 text-xs leading-6 text-white/40 sm:mt-5 sm:text-sm sm:leading-7">{current.description}</p>
            </div>
            <div className="mt-8"><span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 sm:text-[9px] sm:tracking-[0.2em]">Connected projects</span><div className="mt-3 space-y-2 sm:mt-4">{current.projects.map((project) => <div key={project} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 sm:px-4 sm:py-3"><span className="text-xs text-white/65 sm:text-sm">{project}</span><span className="text-white/20">↗</span></div>)}</div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
