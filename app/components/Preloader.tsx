"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLoading } from "../context/LoadingContext";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { setLoaded } = useLoading();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = Date.now();
    const duration = 1800;

    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setLoaded(true)}>
      {loading && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#03040a]"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40"
          >
            Portfolio
          </motion.span>

          <span className="text-6xl font-medium tracking-[-0.04em] text-white md:text-8xl">
            {count}%
          </span>

          <motion.div className="mt-8 h-px w-32 overflow-hidden bg-white/10">
            <motion.div className="h-full bg-white/60" style={{ width: `${count}%` }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}