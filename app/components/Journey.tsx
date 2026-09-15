"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const milestones = [
  {
    step: "01",
    title: "Memulai Informatika",
    description:
      "Mengambil studi Informatika di Universitas Siliwangi dan mulai memperkuat dasar pemrograman serta pengembangan perangkat lunak.",
    tag: "FOUNDATION",
  },
  {
    step: "02",
    title: "Magang di Telkom Corporate University Center",
    description:
      "Membangun dashboard monitoring IoT real-time menggunakan Golang, MQTT, WebSocket, dan MySQL.",
    tag: "REAL SYSTEMS",
  },
  {
    step: "03",
    title: "Membangun Proyek Mandiri",
    description:
      "Mengembangkan berbagai proyek full-stack seperti KindMateCare, Sellora, dan Our Journey Gallery untuk belajar melalui implementasi langsung.",
    tag: "BUILDING",
  },
  {
    step: "04",
    title: "Karya Akademik & Kompetisi",
    description:
      "Mengerjakan proyek akademik dan tim seperti FiltraLens sekaligus mengeksplorasi bidang kreatif melalui kompetisi infografis.",
    tag: "EXPLORING",
  },
  {
    step: "05",
    title: "Sekarang",
    description:
      "Terus membangun, mencoba teknologi baru, dan menyusun portfolio ini sebagai dokumentasi dari proses belajar yang masih berjalan.",
    tag: "STILL BUILDING",
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-[130px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">04 — Journey</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
              A path that keeps moving.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/35">
            Tidak selalu lurus. Setiap project menjadi satu titik yang membawa saya ke hal berikutnya.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.015] px-5 py-10 backdrop-blur-2xl md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.045),transparent_25%),radial-gradient(circle_at_80%_75%,rgba(148,163,184,0.035),transparent_28%)]" />

          <div className="relative">
            <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/[0.07] md:left-1/2 md:-translate-x-1/2" />
            <motion.div
              style={{ height: pathProgress }}
              className="absolute left-[15px] top-0 w-px origin-top bg-white/35 md:left-1/2 md:-translate-x-1/2"
            />
            <motion.div
              style={{ top: glowY }}
              className="absolute left-[15px] z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)] md:left-1/2"
            />

            <div className="space-y-16 md:space-y-24">
              {milestones.map((item, i) => {
                const left = i % 2 === 0;

                return (
                  <motion.article
                    key={item.step}
                    initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative grid grid-cols-[30px_1fr] gap-5 md:grid-cols-2 md:gap-16"
                  >
                    <div className="hidden md:block" />
                    <div className={`${left ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-2 md:row-start-1"} pl-0`}>
                      <span className="font-mono text-[9px] tracking-[0.25em] text-white/25">{item.step}</span>
                      <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">{item.title}</h3>
                      <p className={`mt-4 max-w-md text-sm leading-7 text-white/40 md:text-base ${left ? "md:ml-auto" : ""}`}>
                        {item.description}
                      </p>
                      <span className={`mt-5 inline-flex rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] tracking-[0.18em] text-white/25 ${left ? "md:mr-0" : ""}`}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute left-[15px] top-1.5 z-20 md:left-1/2 md:-translate-x-1/2">
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        className="relative h-3.5 w-3.5 rounded-full border border-white/35 bg-[#05070c]"
                      >
                        <span className="absolute inset-[3px] rounded-full bg-white/75" />
                        <span className="absolute -inset-2 rounded-full border border-white/[0.05]" />
                      </motion.div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="relative mt-16 flex items-center justify-between border-t border-white/[0.07] pt-5 md:mt-20">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/20">START — KEEP MOVING</span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/20">CURRENT POSITION — 05</span>
          </div>
        </div>
      </div>
    </section>
  );
}
