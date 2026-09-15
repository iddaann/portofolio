"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  scatteredX: number;
  scatteredY: number;
  heroX: number;
  heroY: number;
  galaxyX: number;
  galaxyY: number;
  size: number;
  opacity: number;
  depth: number;
  bright: boolean;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const HERO_BOX = { left: 30, top: 28, width: 40, height: 40 };
const DESKTOP_STAR_COUNT = 420;
const MOBILE_STAR_COUNT = 190;
const HERO_STAR_COUNT = 260;

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function sampleTextPoints(text: string, width: number, height: number, fontSize: number, count: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.fillStyle = "#fff";
  ctx.font = `900 ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const points: { x: number; y: number }[] = [];

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      if (data[(y * width + x) * 4 + 3] > 120) {
        points.push({ x: x / width, y: y / height });
      }
    }
  }

  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  return points.slice(0, count);
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let lastFrame = 0;
    let pageVisible = !document.hidden;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let finePointer = window.matchMedia("(pointer: fine)").matches;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let currentFormation = 1;
    let targetFormation = 1;
    let galaxyVisible = false;

    const stars: Star[] = [];
    const starColors = ["225,235,255", "255,255,255", "190,215,255", "210,220,255"];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      stars.length = 0;
      const mobile = width < 768;
      const count = mobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT;
      const heroPoints = mobile ? [] : sampleTextPoints("13", 500, 300, 210, HERO_STAR_COUNT);
      const galaxyWidth = Math.min(width * 0.95, 1350);
      const galaxyHeight = Math.min(height * 0.52, 620);

      for (let i = 0; i < count; i++) {
        const scatteredX = Math.random() * width;
        const scatteredY = Math.random() * height;
        const heroPoint = heroPoints.length ? heroPoints[i % heroPoints.length] : null;
        const heroX = heroPoint
          ? (HERO_BOX.left / 100) * width + heroPoint.x * ((HERO_BOX.width / 100) * width)
          : scatteredX;
        const heroY = heroPoint
          ? (HERO_BOX.top / 100) * height + heroPoint.y * ((HERO_BOX.height / 100) * height)
          : scatteredY;

        const radius = Math.pow(Math.random(), 1.15);
        const arm = Math.floor(Math.random() * 4);
        const angle = (arm / 4) * Math.PI * 2 + radius * Math.PI * 2.8 + (Math.random() - 0.5) * (0.12 + radius * 0.8);
        const galaxyX = width / 2 + Math.cos(angle) * radius * galaxyWidth * 0.5;
        const galaxyY = height / 2 + Math.sin(angle) * radius * galaxyHeight * 0.5 + (Math.random() - 0.5) * 20 * radius;

        stars.push({
          x: heroX,
          y: heroY,
          scatteredX,
          scatteredY,
          heroX,
          heroY,
          galaxyX,
          galaxyY,
          size: Math.random() < 0.08 ? Math.random() * 1.6 + 1.1 : Math.random() * 0.8 + 0.4,
          opacity: Math.random() * 0.5 + 0.25,
          depth: Math.random(),
          bright: Math.random() < 0.05,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.8 + 0.2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      resize();
      createStars();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotion) return;
      targetMouseX = event.clientX / width - 0.5;
      targetMouseY = event.clientY / height - 0.5;
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        cancelAnimationFrame(raf);
        return;
      }
      lastFrame = 0;
      raf = requestAnimationFrame(render);
    };

    const marker = document.getElementById("idan-marker");
    let observer: IntersectionObserver | undefined;
    if (marker) {
      observer = new IntersectionObserver(([entry]) => {
        galaxyVisible = entry.isIntersecting;
      }, { threshold: 0.2 });
      observer.observe(marker);
    }

    const render = (time: number) => {
      if (!pageVisible) return;
      const mobile = width < 768;
      const frameInterval = reducedMotion ? 1000 / 12 : mobile ? 1000 / 30 : 1000 / 60;

      if (lastFrame && time - lastFrame < frameInterval) {
        raf = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      const seconds = time * 0.001;
      targetFormation = galaxyVisible ? 2 : window.scrollY < height * 0.65 ? 1 : 0;
      currentFormation = reducedMotion
        ? targetFormation
        : lerp(currentFormation, targetFormation, mobile ? 0.07 : 0.045);

      if (!reducedMotion) {
        smoothMouseX = lerp(smoothMouseX, targetMouseX, 0.04);
        smoothMouseY = lerp(smoothMouseY, targetMouseY, 0.04);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#03040a";
      ctx.fillRect(0, 0, width, height);

      if (!mobile) {
        const atmosphere = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
        atmosphere.addColorStop(0, "rgba(45,80,160,0.075)");
        atmosphere.addColorStop(0.45, "rgba(30,50,120,0.03)");
        atmosphere.addColorStop(1, "rgba(3,4,10,0)");
        ctx.fillStyle = atmosphere;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "source-over";

      for (const star of stars) {
        const formation = currentFormation < 1 ? currentFormation : currentFormation - 1;
        let x = currentFormation < 1
          ? lerp(star.scatteredX, star.heroX, formation)
          : lerp(star.heroX, star.galaxyX, formation);
        let y = currentFormation < 1
          ? lerp(star.scatteredY, star.heroY, formation)
          : lerp(star.heroY, star.galaxyY, formation);

        if (!reducedMotion) {
          const drift = Math.sin(seconds * star.twinkleSpeed + star.twinkleOffset) * 0.35;
          x += drift * star.depth * 4 + smoothMouseX * star.depth * 10;
          y += Math.cos(seconds * star.twinkleSpeed * 0.7 + star.twinkleOffset) * star.depth * 2 + smoothMouseY * star.depth * 8;
        }

        star.x = x;
        star.y = y;
        const twinkle = reducedMotion ? 1 : 0.75 + Math.sin(seconds * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        ctx.fillStyle = `rgba(${star.color},${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, star.bright ? star.size * 1.15 : star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    createStars();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      lastFrame = 0;
    };
    const handlePointerChange = () => {
      finePointer = pointerQuery.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);
    pointerQuery.addEventListener("change", handlePointerChange);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
      pointerQuery.removeEventListener("change", handlePointerChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}