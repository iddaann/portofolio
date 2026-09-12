"use client";

import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";

const projects = [
  { index: "01", title: "KindMateCare", stack: "Laravel · Sanctum · Reverb", description: "Platform layanan kesehatan berbasis Laravel. Berperan sebagai backend developer: migrations, models, controllers, auth, hingga WebSocket real-time.", image: "/images/projects/kindmatecare.png" },
  { index: "02", title: "Sellora", stack: "Flutter · Golang · Gin · MySQL", description: "Aplikasi pencatatan bisnis pribadi full-stack dengan arsitektur feature-first dan Riverpod di sisi frontend, Repository pattern di backend.", image: "/images/projects/sellora.png" },
  { index: "03", title: "Our Journey Gallery", stack: "Next.js · Prisma · Better Auth · Cloudinary", description: "Galeri kenangan privat untuk pasangan, lengkap dengan peta lokasi interaktif dan upload media.", image: "/images/projects/journey-gallery.png" },
  { index: "04", title: "FiltraLens", stack: "HTML · CSS · JS · Canvas API", description: "Studio filter foto berbasis browser dengan 12 preset filter piksel-demi-piksel, dikerjakan bersama tim untuk tugas Pengolahan Citra Digital.", image: "/images/projects/filtralens.png" },
  { index: "05", title: "IoT Monitoring Dashboard", stack: "Golang · MQTT · WebSocket · MySQL", description: "Dashboard monitoring IoT real-time, dibangun selama internship di Telkom Corporate University Center.", image: "/images/projects/iot-dashboard.png" },
];

export default function Works() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            02 — Selected Works
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} position={i} />
          ))}
        </div>
      </div>
    </section>
  );
}