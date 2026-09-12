"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  scatteredX: number;
  scatteredY: number;
  hero13X?: number;
  hero13Y?: number;
  idanX?: number;
  idanY?: number;
  size: number;
  baseOpacity: number;
  duration: number;
  delay: number;
  parallaxFactor: number;
}

const TOTAL_STARS = 250;
const FORMATION_STAR_COUNT = 240;

const HERO_BOX = { left: 30, top: 30, width: 40, height: 36 };
const IDAN_BOX = { left: 8, top: 30, width: 84, height: 40 };

function sampleTextPoints(
  text: string,
  canvasWidth: number,
  canvasHeight: number,
  fontSize: number,
  pointCount: number
): { x: number; y: number }[] {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2 + fontSize * 0.04);

    const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const candidates: { x: number; y: number }[] = [];

    for (let y = 0; y < canvasHeight; y += 3) {
      for (let x = 0; x < canvasWidth; x += 3) {
        const alpha = data[(y * canvasWidth + x) * 4 + 3];
        if (alpha > 128) {
          candidates.push({ x: x / canvasWidth, y: y / canvasHeight });
        }
      }
    }

    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    return candidates.slice(0, pointCount);
  } catch (err) {
    console.error(`StarBackground: gagal sampling teks "${text}"`, err);
    return [];
  }
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [canForm13, setCanForm13] = useState(false);
  const [heroFormed, setHeroFormed] = useState(true);
  const [idanInView, setIdanInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const tickingRef = useRef(false);
  const prevScrollYRef = useRef(0);
  const velocityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    setCanForm13(isDesktop);

    const hero13Points = isDesktop
      ? sampleTextPoints("13", 400, 200, 170, FORMATION_STAR_COUNT)
      : [];
    const idanPoints = sampleTextPoints("IDAN", 800, 300, 220, FORMATION_STAR_COUNT);

    const generated: Star[] = Array.from({ length: TOTAL_STARS }, (_, index) => {
      const scatteredX = Math.random() * 100;
      const scatteredY = Math.random() * 100;

      const p13 = hero13Points[index];
      const pIdan = idanPoints[index];

      return {
        id: index,
        scatteredX,
        scatteredY,
        hero13X: p13 ? HERO_BOX.left + p13.x * HERO_BOX.width : undefined,
        hero13Y: p13 ? HERO_BOX.top + p13.y * HERO_BOX.height : undefined,
        idanX: pIdan ? IDAN_BOX.left + pIdan.x * IDAN_BOX.width : undefined,
        idanY: pIdan ? IDAN_BOX.top + pIdan.y * IDAN_BOX.height : undefined,
        size: Math.random() * 2 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        parallaxFactor: Math.random() * 0.06 + 0.02,
      };
    });

    setStars(generated);
    prevScrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const threshold = window.innerHeight * 0.65;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const velocity = current - prevScrollYRef.current;
        prevScrollYRef.current = current;

        setScrollY(current);
        setScrollVelocity(velocity);

        if (canForm13) {
          setHeroFormed(current < threshold);
        }

        if (velocityTimeoutRef.current) clearTimeout(velocityTimeoutRef.current);
        velocityTimeoutRef.current = setTimeout(() => setScrollVelocity(0), 150);

        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canForm13]);

  useEffect(() => {
    const el = document.getElementById("idan-marker");
    if (!el) {
      console.error("StarBackground: elemen #idan-marker tidak ditemukan");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIdanInView(entry.isIntersecting),
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mode: "hero13" | "idan" | "scatter" =
    canForm13 && heroFormed ? "hero13" : idanInView ? "idan" : "scatter";

  // Seberapa "ngebut" scroll-nya, 0 (diam) sampai 1 (sangat cepat)
  const speed = Math.min(Math.abs(scrollVelocity) / 45, 1);
  const stretch = 1 + speed * 3.5;
  const stretchOrigin = scrollVelocity >= 0 ? "top" : "bottom";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#03040a]" />

      <div className="absolute inset-0">
        {stars.map((star) => {
          let x = star.scatteredX;
          let y = star.scatteredY;

          if (mode === "hero13" && star.hero13X !== undefined) {
            x = star.hero13X;
            y = star.hero13Y!;
          } else if (mode === "idan" && star.idanX !== undefined) {
            x = star.idanX;
            y = star.idanY!;
          }

          const parallaxOffset = -(scrollY * star.parallaxFactor);

          return (
            <span
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: Math.min(star.baseOpacity * (1 + speed * 0.4), 1),
                boxShadow: `0 0 ${star.size * 5}px ${star.size * 1.5}px rgba(147,197,253,0.45)`,
                transformOrigin: stretchOrigin,
                transform: `translateY(${parallaxOffset}px) scaleY(${stretch})`,
                transitionProperty: "left, top, transform, opacity",
                transitionDuration: "1.8s, 1.8s, 0.15s, 0.15s",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${(star.id % 25) * 0.015}s, ${(star.id % 25) * 0.015}s, 0s, 0s`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}