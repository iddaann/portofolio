"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const milestones = [
  {
    step: "01",
    title: "Memulai Informatika",
    description:
      "Mengambil studi Informatika di Universitas Siliwangi, mulai mendalami dasar pemrograman dan pengembangan perangkat lunak.",
  },
  {
    step: "02",
    title: "Magang di Telkom Corporate University Center",
    description:
      "Membangun dashboard monitoring IoT real-time menggunakan Golang, MQTT, WebSocket, dan MySQL.",
  },
  {
    step: "03",
    title: "Membangun Proyek Mandiri",
    description:
      "Mengembangkan berbagai proyek full-stack: KindMateCare (Laravel), Sellora (Flutter + Golang), dan Our Journey Gallery (Next.js).",
  },
  {
    step: "04",
    title: "Karya Akademik & Kompetisi",
    description:
      "Mengerjakan tugas dan proyek tim seperti FiltraLens, serta ikut serta dalam kompetisi infografis.",
  },
  {
    step: "05",
    title: "Sekarang",
    description:
      "Terus membangun proyek baru dan menyusun portofolio ini sebagai representasi perjalanan sejauh ini.",
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative px-6 py-32">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            04 — Journey
          </span>
        </motion.div>

        <div className="relative pl-10 md:pl-14">
          {/* GARIS DASAR (statis, redup) */}
          <div className="absolute left-0 top-2 h-full w-px bg-white/10" />

          {/* GARIS TERISI (mengikuti scroll) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-2 w-px bg-white/50"
          />

          <div className="flex flex-col gap-16">
            {milestones.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* TITIK PENANDA */}
                <div className="absolute -left-10 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-white md:-left-14" />

                <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/30">
                  {item.step}
                </span>
                <h3 className="mb-2 text-2xl font-medium tracking-[-0.02em] text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-6 text-white/50 md:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}