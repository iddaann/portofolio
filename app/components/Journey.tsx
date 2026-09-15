"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const milestones = [
  { step: "01", title: "Starting with SIJA", description: "My first serious step into technology came through Software, Networking, and Application Information Systems at SMK Bina Putera Nusantara. I started with web development, cloud computing, and IoT.", tag: "FOUNDATION" },
  { step: "02", title: "Working with real systems", description: "During a six-month internship at Telkom Corporate University Center, I worked on an IoT monitoring system using Golang, MQTT, WebSocket, and MySQL.", tag: "REAL SYSTEMS" },
  { step: "03", title: "Choosing Informatics", description: "I continued my journey as an Informatics student at Universitas Siliwangi, strengthening my foundations while learning through projects instead of only theory.", tag: "NEXT STEP" },
  { step: "04", title: "Building across the stack", description: "From backend services and databases to web and mobile interfaces, I keep building projects such as KindMateCare, Sellora, Our Journey Gallery, and FiltraLens to understand different parts of software development.", tag: "BUILDING" },
  { step: "05", title: "Still becoming", description: "I'm still learning, still experimenting, and still figuring out where technology can take me. For now, the goal is simple: keep building better things and understand more deeply how they work.", tag: "STILL BUILDING" },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const pathProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-[100px] md:h-[620px] md:w-[620px] md:blur-[130px]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="mb-10 flex flex-col gap-4 sm:mb-12 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div><span className="text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs sm:tracking-[0.35em]">04 — Journey</span><h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl md:mt-5 md:text-6xl">From learning to building real things.</h2></div>
          <p className="max-w-sm text-xs leading-5 text-white/35 sm:text-sm sm:leading-6">A path shaped by curiosity, real projects, and a lot of learning by doing.</p>
        </motion.div>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.015] px-4 py-8 backdrop-blur-2xl sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.045),transparent_25%),radial-gradient(circle_at_80%_75%,rgba(148,163,184,0.035),transparent_28%)]" />
          <div className="relative">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/[0.07] md:left-1/2 md:-translate-x-1/2" />
            <motion.div style={{ height: pathProgress }} className="absolute left-[15px] top-0 w-px origin-top bg-white/35 md:left-1/2 md:-translate-x-1/2" />
            <motion.div style={{ top: glowY }} className="absolute left-[15px] z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)] md:left-1/2" />
            <div className="space-y-12 sm:space-y-16 md:space-y-24">
              {milestones.map((item, i) => { const left = i % 2 === 0; return <motion.article key={item.step} initial={{ opacity: 0, y: 35, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative grid grid-cols-[30px_minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-16">
                <div className="hidden md:block" />
                <div className={`${left ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-2 md:row-start-1"} col-start-2 row-start-1 min-w-0 pl-0`}><span className="font-mono text-[8px] tracking-[0.25em] text-white/25 sm:text-[9px]">{item.step}</span><h3 className="mt-2 text-xl font-medium leading-tight tracking-[-0.035em] text-white sm:mt-3 sm:text-2xl md:text-3xl">{item.title}</h3><p className={`mt-3 max-w-md text-xs leading-6 text-white/40 sm:mt-4 sm:text-sm sm:leading-7 md:text-base ${left ? "md:ml-auto" : ""}`}>{item.description}</p><span className={`mt-4 inline-flex max-w-full rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[7px] tracking-[0.15em] text-white/25 sm:mt-5 sm:px-3 sm:text-[8px] sm:tracking-[0.18em] ${left ? "md:mr-0" : ""}`}>{item.tag}</span></div>
                <div className="absolute left-[15px] top-1.5 z-20 md:left-1/2 md:-translate-x-1/2"><motion.div whileHover={{ scale: 1.25 }} className="relative h-3.5 w-3.5 rounded-full border border-white/35 bg-[#05070c]"><span className="absolute inset-[3px] rounded-full bg-white/75" /><span className="absolute -inset-2 rounded-full border border-white/[0.05]" /></motion.div></div>
              </motion.article>; })}
            </div>
          </div>
          <div className="relative mt-12 flex flex-col gap-2 border-t border-white/[0.07] pt-5 sm:mt-16 sm:flex-row sm:items-center sm:justify-between md:mt-20"><span className="font-mono text-[7px] tracking-[0.18em] text-white/20 sm:text-[8px] sm:tracking-[0.2em]">START — KEEP MOVING</span><span className="font-mono text-[7px] tracking-[0.18em] text-white/20 sm:text-[8px] sm:tracking-[0.2em]">CURRENT POSITION — 05</span></div>
        </div>
      </div>
    </section>
  );
}
