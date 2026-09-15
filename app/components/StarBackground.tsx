"use client";

import { useEffect, useRef } from "react";

interface Star {
  scatteredX: number;
  scatteredY: number;
  burstX: number;
  burstY: number;
  galaxyX: number;
  galaxyY: number;
  galaxyRadius: number;
  galaxyDepth: number;
  size: number;
  opacity: number;
  depth: number;
  bright: boolean;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const DESKTOP_STAR_COUNT = 760;
const MOBILE_STAR_COUNT = 260;
const GALAXY_ROTATION_SPEED = 0.045;
const GALAXY_TILT = 0.28;
const GALAXY_VERTICAL_OFFSET = -0.08;
const GALAXY_CAMERA_ZOOM = 0.018;

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
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
    let atmosphere: CanvasGradient | null = null;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let burstProgress = 0;
    let burstStarted = false;
    let galaxyProgress = 0;
    let galaxyVisible = false;

    const stars: Star[] = [];
    const starColors = [
      "225,235,255",
      "255,255,255",
      "190,215,255",
      "210,220,255",
      "235,240,255",
      "255,220,145",
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (width >= 768) {
        atmosphere = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width * 0.7,
        );
        atmosphere.addColorStop(0, "rgba(45,80,160,0.075)");
        atmosphere.addColorStop(0.45, "rgba(30,50,120,0.03)");
        atmosphere.addColorStop(1, "rgba(3,4,10,0)");
      } else {
        atmosphere = null;
      }
    };

    const createStars = () => {
      stars.length = 0;
      const mobile = width < 768;
      const count = mobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT;

      // A wide elliptical field keeps the galaxy readable from left to right.
      const galaxyWidth = Math.min(width * 0.94, 1380);
      const galaxyHeight = Math.min(height * 0.46, 560);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const burstRadius =
          Math.pow(Math.random(), 0.7) *
          Math.min(width, height) *
          (mobile ? 0.045 : 0.065);

        // Three visual populations: a dense luminous core, curved arms, and
        // sparse outer particles. This avoids a rigid geometric spiral.
        const population = Math.random();
        let radius: number;
        let galaxyAngle: number;

        if (population < 0.22) {
          // Core: compact, dense and slightly chaotic.
          radius = Math.pow(Math.random(), 2.4) * 0.34;
          galaxyAngle = Math.random() * Math.PI * 2;
        } else if (population < 0.9) {
          // Main arms: particles sit around a curved logarithmic-like path,
          // with enough noise to keep the silhouette organic.
          radius = 0.16 + Math.pow(Math.random(), 0.82) * 0.84;
          const arm = Math.floor(Math.random() * 3);
          const armBase = (arm / 3) * Math.PI * 2;
          const curve = radius * Math.PI * 2.45;
          const widthNoise = (Math.random() - 0.5) * (0.18 + radius * 0.3);
          galaxyAngle = armBase + curve + widthNoise;
        } else {
          // Outer dust: sparse and deliberately loose, preserving black space.
          radius = 0.58 + Math.pow(Math.random(), 0.72) * 0.55;
          galaxyAngle = Math.random() * Math.PI * 2;
        }

        const core = Math.max(0, 1 - radius);
        const armWave = Math.sin(galaxyAngle * 1.5 + radius * 5.5);
        const naturalOffset = (Math.random() - 0.5) * (8 + radius * 38);
        const xRadius = radius * galaxyWidth * (0.43 + Math.random() * 0.1);
        const yRadius = radius * galaxyHeight * (0.42 + Math.random() * 0.12);

        let galaxyX = Math.cos(galaxyAngle) * xRadius;
        let galaxyY = Math.sin(galaxyAngle) * yRadius;

        // Slightly pull particles toward curved arm ridges without making
        // the arms look like four perfect mathematical lines.
        galaxyX += armWave * (6 + radius * 13) + naturalOffset * 0.45;
        galaxyY += naturalOffset + armWave * (4 + radius * 7);

        if (population < 0.22) {
          galaxyX += (Math.random() - 0.5) * 48 * core;
          galaxyY += (Math.random() - 0.5) * 32 * core;
        }

        const starSize =
          Math.random() < 0.07
            ? Math.random() * 1.65 + 1.15 + core * 0.35
            : Math.random() * 0.82 + 0.38 + core * 0.13;
        const starOpacity = Math.min(
          0.9,
          Math.random() * 0.48 + 0.28 + core * 0.18,
        );

        stars.push({
          scatteredX: Math.random() * width,
          scatteredY: Math.random() * height,
          burstX: width / 2 + Math.cos(angle) * burstRadius,
          burstY: height / 2 + Math.sin(angle) * burstRadius,
          galaxyX: width / 2 + galaxyX,
          galaxyY: height / 2 + galaxyY,
          galaxyRadius: Math.min(1, radius),
          galaxyDepth: Math.random(),
          size: starSize,
          opacity: starOpacity,
          depth: Math.random(),
          bright: Math.random() < 0.055,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.8 + 0.2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      resize();
      createStars();
      burstStarted = false;
      burstProgress = 0;
      galaxyProgress = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotion) return;
      targetMouseX = event.clientX / width - 0.5;
      targetMouseY = event.clientY / height - 0.5;
    };

    const startBurst = () => {
      if (burstStarted) return;
      burstStarted = true;
      burstProgress = reducedMotion ? 1 : 0;
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
      observer = new IntersectionObserver(
        ([entry]) => {
          galaxyVisible = entry.isIntersecting;
        },
        { threshold: 0.2 },
      );
      observer.observe(marker);
    }

    const render = (time: number) => {
      if (!pageVisible) return;

      const mobile = width < 768;
      const frameInterval = reducedMotion
        ? 1000 / 12
        : mobile
          ? 1000 / 30
          : 1000 / 60;

      if (lastFrame && time - lastFrame < frameInterval) {
        raf = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      const seconds = time * 0.001;

      if (!burstStarted && window.scrollY < height) {
        startBurst();
      }

      if (burstStarted && burstProgress < 1) {
        burstProgress = reducedMotion
          ? 1
          : Math.min(1, burstProgress + (mobile ? 0.032 : 0.027));
      }

      const galaxyTarget = galaxyVisible && burstProgress >= 1 ? 1 : 0;
      galaxyProgress = reducedMotion
        ? galaxyTarget
        : lerp(galaxyProgress, galaxyTarget, mobile ? 0.09 : 0.065);

      if (!reducedMotion) {
        smoothMouseX = lerp(smoothMouseX, targetMouseX, 0.04);
        smoothMouseY = lerp(smoothMouseY, targetMouseY, 0.04);
      }

      ctx.fillStyle = "#03040a";
      ctx.fillRect(0, 0, width, height);

      if (atmosphere) {
        ctx.fillStyle = atmosphere;
        ctx.fillRect(0, 0, width, height);
      }

      const easedBurst = 1 - Math.pow(1 - burstProgress, 3);
      const easedGalaxy = galaxyProgress * galaxyProgress * (3 - 2 * galaxyProgress);
      const cameraZoom = 1 + easedGalaxy * GALAXY_CAMERA_ZOOM;
      const galaxyCenterX = width / 2 + smoothMouseX * 8;
      const galaxyCenterY = height / 2 + height * GALAXY_VERTICAL_OFFSET + smoothMouseY * 5;

      for (const star of stars) {
        const scatteredX = lerp(star.burstX, star.scatteredX, easedBurst);
        const scatteredY = lerp(star.burstY, star.scatteredY, easedBurst);

        const offsetX = star.galaxyX - width / 2;
        const offsetY = star.galaxyY - height / 2;
        const rotation = reducedMotion
          ? 0
          : seconds *
            GALAXY_ROTATION_SPEED *
            (0.32 + star.galaxyRadius * 0.68) *
            easedGalaxy;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const orbitalX = offsetX * cos - offsetY * sin;
        const orbitalY = offsetX * sin + offsetY * cos;

        // The disk is viewed slightly from above. Outer particles flatten a
        // little more than the core, giving the galaxy a subtle 3D presence.
        const perspective = 1 - star.galaxyRadius * GALAXY_TILT;
        const projectedX = orbitalX * cameraZoom;
        const projectedY = orbitalY * perspective * cameraZoom;

        let x = lerp(scatteredX, galaxyCenterX + projectedX, easedGalaxy);
        let y = lerp(scatteredY, galaxyCenterY + projectedY, easedGalaxy);

        if (!reducedMotion) {
          const orbitalDrift =
            Math.sin(seconds * (0.18 + star.galaxyDepth * 0.16) + star.twinkleOffset) *
            star.galaxyRadius *
            0.75;
          const parallax = star.depth;
          x += orbitalDrift + smoothMouseX * parallax * 10;
          y +=
            Math.cos(seconds * 0.12 + star.twinkleOffset) *
              star.galaxyRadius *
              0.5 +
            smoothMouseY * parallax * 8;
        }

        const twinkle = reducedMotion
          ? 1
          : 0.72 +
            Math.sin(seconds * star.twinkleSpeed + star.twinkleOffset) * 0.28;
        const burstGlow = burstProgress < 1 ? 1 + (1 - burstProgress) * 1.8 : 1;
        const alpha = Math.min(1, star.opacity * twinkle * burstGlow);
        const size = star.bright ? star.size * 1.15 : star.size;

        // A second, very faint disc behind brighter stars creates bloom without
        // the expensive per-particle shadowBlur path.
        if (star.bright && galaxyProgress > 0.55) {
          ctx.fillStyle = `rgba(${star.color},${alpha * 0.08})`;
          ctx.beginPath();
          ctx.arc(x, y, size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${star.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
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
      if (reducedMotion) {
        burstProgress = 1;
        galaxyProgress = galaxyVisible ? 1 : 0;
      }
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

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
