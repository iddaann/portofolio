"use client";

import { motion } from "motion/react";

const links = [
  { label: "Email", value: "idanmrfm0@gmail.com", href: "mailto:idanmrfm0@gmail.com" },
  { label: "GitHub", value: "github.com/iddaann", href: "https://github.com/iddaann" },
  { label: "LinkedIn", value: "linkedin.com/in/muhammad-ramdhani-fathul-muttaqin", href: "https://www.linkedin.com/in/muhammad-ramdhani-fathul-muttaqin-214495368/" },
];

export default function Contact() {
  return (
    <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden px-5 py-24 sm:px-6 sm:py-32 md:min-h-[90vh]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl md:h-[28rem] md:w-[28rem]" /><div className="absolute left-[12%] top-[24%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_18px_4px_rgba(255,255,255,0.18)]" /><div className="absolute right-[16%] top-[34%] h-1.5 w-1.5 rounded-full bg-white/50 shadow-[0_0_20px_5px_rgba(255,255,255,0.16)]" /><div className="absolute left-[22%] bottom-[22%] h-1 w-1 rounded-full bg-white/40" /><div className="absolute right-[28%] bottom-[18%] h-1 w-1 rounded-full bg-white/50" /><div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" /></div>
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="mb-9 sm:mb-10"><span className="text-[10px] uppercase tracking-[0.3em] text-white/35 sm:text-xs sm:tracking-[0.35em]">08 — Contact</span></motion.div>
        <div className="max-w-5xl">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, delay: 0.05 }} className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-xs sm:tracking-[0.3em]">Open to ideas, conversations, and things worth building.</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 50, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} className="text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">Let&apos;s build<br />something <span className="text-white/25">meaningful.</span></motion.h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.85, delay: 0.18 }} className="mt-9 flex flex-col gap-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/45 md:text-base">Whether it&apos;s a software project, a technical idea, or simply a conversation about technology, I&apos;m always interested in learning and building with others.</p>
          <a href="mailto:idanmrfm0@gmail.com" className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm text-white backdrop-blur-sm transition-all duration-500 hover:border-white/35 hover:bg-white/[0.07]"><span>Start a conversation</span><span className="transition-transform duration-500 group-hover:translate-x-1">↗</span></a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.3 }} className="mt-20 border-t border-white/10 pt-7 sm:mt-24 sm:pt-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">{links.map((item) => { const isExternal = item.href.startsWith("http"); return <a key={item.label} href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="group w-fit max-w-full break-all text-sm text-white/45 transition-colors duration-300 hover:text-white"><span className="mr-2 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:text-[10px] sm:tracking-[0.22em]">{item.label}</span><span className="relative">{item.value}<span className="absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-500 group-hover:w-full" /></span></a>; })}</div><a href="/cv.pdf" download className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 hover:text-white sm:text-xs"><span>View CV</span><span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span></a></div>
        </motion.div>
        <div className="mt-10 flex flex-col gap-2 text-[9px] uppercase tracking-[0.22em] text-white/20 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-[10px] sm:tracking-[0.25em]"><span>© {new Date().getFullYear()} Muhamad Ramdhani Fathul Muttaqin</span><span>Keep building. Keep learning.</span></div>
      </div>
    </section>
  );
}
