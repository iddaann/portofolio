"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Comet {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
}

export default function ShootingStars() {
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const mobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMin = mobile ? 10000 : 6000;
    const intervalRange = mobile ? 9000 : 9000;

    if (reducedMotion) return;

    const spawn = () => {
      if (!mounted || document.hidden) {
        if (mounted) timeoutId = setTimeout(spawn, intervalMin);
        return;
      }

      const id = Date.now();
      const comet: Comet = {
        id,
        top: Math.random() * 35,
        left: Math.random() * 55 + 15,
        length: mobile ? Math.random() * 80 + 70 : Math.random() * 120 + 90,
        duration: mobile ? Math.random() * 0.45 + 1.05 : Math.random() * 0.6 + 1,
      };

      setComets((prev) => [...prev.slice(-1), comet]);

      setTimeout(() => {
        if (mounted) {
          setComets((prev) => prev.filter((item) => item.id !== id));
        }
      }, comet.duration * 1000 + 200);

      timeoutId = setTimeout(spawn, Math.random() * intervalRange + intervalMin);
    };

    timeoutId = setTimeout(spawn, mobile ? 6500 : 4000);

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[9] overflow-hidden">
      <AnimatePresence>
        {comets.map((comet) => (
          <motion.span
            key={comet.id}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: -comet.length * 1.3,
              y: comet.length * 1.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: comet.duration, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: `${comet.top}%`,
              left: `${comet.left}%`,
              width: comet.length,
              height: 2,
              borderRadius: 9999,
              transform: "rotate(215deg)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
              boxShadow: "0 0 8px rgba(147,197,253,0.6)",
              willChange: "transform, opacity",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}