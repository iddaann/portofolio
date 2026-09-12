"use client";

import { motion } from "motion/react";

const links = [
  { label: "Email", value: "idanmrfm0@gmail.com", href: "mailto:idanmrfm0@gmail.com" },
  { label: "GitHub", value: "github.com/iddaann", href: "https://github.com/iddaann" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/Idan", href: "https://www.linkedin.com/in/muhammad-ramdhani-fathul-muttaqin-214495368/" },
];

export default function Contact() {
  return (
    <section className="relative flex min-h-[80vh] flex-col justify-center px-6 py-32">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            06 — Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl"
        >
          Let&apos;s build something together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-sm leading-7 text-white/50 md:text-base"
        >
          Open to freelance work, collaboration, or just a chat about
          backend architecture and web development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          {links.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  {item.label}
                </span>
                <span>{item.value}</span>
              </a>
            );
          })}
        </motion.div>

        <div className="mt-16 text-xs text-white/20">
          © {new Date().getFullYear()} Muhamad Ramdhani Fathul Muttaqin
        </div>
      </div>
    </section>
  );
}