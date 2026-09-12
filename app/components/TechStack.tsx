"use client";

import { motion } from "motion/react";

const stacks = [
  {
    name: "Golang",
    category: "Backend",
    description:
      "Bahasa utama untuk backend Sellora dan dashboard monitoring IoT, terbiasa dengan Gin dan REST API.",
  },
  {
    name: "PHP / Laravel",
    category: "Backend",
    description:
      "Berperan sebagai backend developer di KindMateCare — migrations, models, controllers, hingga autentikasi Sanctum.",
  },
  {
    name: "MySQL",
    category: "Database",
    description:
      "Database relasional utama yang dipakai di hampir seluruh proyek backend.",
  },
  {
    name: "JavaScript / TypeScript",
    category: "Language",
    description:
      "Bahasa inti untuk seluruh proyek frontend, termasuk portofolio ini sendiri.",
  },
  {
    name: "React",
    category: "Frontend",
    description:
      "Fondasi untuk membangun antarmuka interaktif di berbagai proyek web.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description:
      "Framework utama untuk web app seperti Our Journey Gallery dan portofolio ini.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description:
      "Styling utama di seluruh antarmuka yang saya bangun, dari layout sampai animasi.",
  },
  {
    name: "Flutter",
    category: "Mobile",
    description:
      "Frontend mobile untuk Sellora, dipadukan dengan Riverpod dan arsitektur feature-first.",
  },
];

export default function TechStack() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            03 — Tech Stack
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
                  {item.name}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {item.category}
                </span>
              </div>

              <p className="text-sm leading-6 text-white/50">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}