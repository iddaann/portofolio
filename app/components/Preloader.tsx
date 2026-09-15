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

    const start = performance.now();
    const duration = 1500;
    const timer = window.setInterval(() => {
      const progress = Math.min((performance.now() - start) / duration, 1);
      setCount(Math.floor(progress * 100));
    }, 50);

    const finishTimer = window.setTimeout(() => {
      setCount(100);
      setLoading(false);
      document.body.style.overflow = "";
    }, duration + 250);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setLoaded(true)}>
      {loading && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#03040a]"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40"
          >
            Portfolio
          </motion.span>

          <span className="text-6xl font-medium tracking-[-0.04em] text-white md:text-8xl">
            {count}%
          </span>

          <div className="mt-8 h-px w-32 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-white/60"
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}