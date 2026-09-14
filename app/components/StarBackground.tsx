"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;

  scatteredX: number;
  scatteredY: number;

  heroX: number;
  heroY: number;

  idanX: number;
  idanY: number;

  size: number;
  opacity: number;
  depth: number;

  twinkleSpeed: number;
  twinkleOffset: number;

  driftX: number;
  driftY: number;
}

const STAR_COUNT = 420;
const FORMATION_COUNT = 300;

const HERO_BOX = {
  left: 30,
  top: 28,
  width: 40,
  height: 40,
};

const IDAN_BOX = {
  left: 8,
  top: 30,
  width: 84,
  height: 40,
};

function sampleTextPoints(
  text: string,
  width: number,
  height: number,
  fontSize: number,
  count: number
) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return [];

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#fff";
  ctx.font = `900 ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, width / 2, height / 2);

  const image = ctx.getImageData(0, 0, width, height);
  const points: { x: number; y: number }[] = [];

  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const alpha = image.data[(y * width + x) * 4 + 3];

      if (alpha > 120) {
        points.push({
          x: x / width,
          y: y / height,
        });
      }
    }
  }

  // Acak supaya distribusi bintang lebih natural
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [points[i], points[j]] = [points[j], points[i]];
  }

  return points.slice(0, count);
}

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let targetScroll = window.scrollY;
    let smoothScroll = window.scrollY;

    let targetMouseX = 0;
    let targetMouseY = 0;

    let smoothMouseX = 0;
    let smoothMouseY = 0;

    let targetFormation = 0;
    let currentFormation = 0;

    /*
      0 = scattered
      1 = 13
      2 = IDAN
    */

    const stars: Star[] = [];

    let idanVisible = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      stars.length = 0;

      const heroPoints =
        width >= 768
          ? sampleTextPoints(
              "13",
              500,
              300,
              210,
              FORMATION_COUNT
            )
          : [];

      const idanPoints = sampleTextPoints(
        "IDAN",
        1000,
        300,
        230,
        FORMATION_COUNT
      );

      for (let i = 0; i < STAR_COUNT; i++) {
        const scatteredX = Math.random() * width;
        const scatteredY = Math.random() * height;

        const heroPoint =
          heroPoints[i % Math.max(heroPoints.length, 1)];

        const idanPoint =
          idanPoints[i % Math.max(idanPoints.length, 1)];

        const heroX = heroPoint
          ? HERO_BOX.left / 100 * width +
            heroPoint.x * (HERO_BOX.width / 100 * width)
          : scatteredX;

        const heroY = heroPoint
          ? HERO_BOX.top / 100 * height +
            heroPoint.y * (HERO_BOX.height / 100 * height)
          : scatteredY;

        const idanX = idanPoint
          ? IDAN_BOX.left / 100 * width +
            idanPoint.x * (IDAN_BOX.width / 100 * width)
          : scatteredX;

        const idanY = idanPoint
          ? IDAN_BOX.top / 100 * height +
            idanPoint.y * (IDAN_BOX.height / 100 * height)
          : scatteredY;

        stars.push({
          x: scatteredX,
          y: scatteredY,

          scatteredX,
          scatteredY,

          heroX,
          heroY,

          idanX,
          idanY,

          size:
            Math.random() < 0.88
              ? Math.random() * 1 + 0.35
              : Math.random() * 1.6 + 0.8,

          opacity:
            Math.random() * 0.5 + 0.25,

          depth: Math.random(),

          twinkleSpeed:
            Math.random() * 0.8 + 0.2,

          twinkleOffset:
            Math.random() * Math.PI * 2,

          driftX:
            (Math.random() - 0.5) * 0.035,

          driftY:
            (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const handleResize = () => {
      resize();
      createStars();
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetMouseX =
        event.clientX / width - 0.5;

      targetMouseY =
        event.clientY / height - 0.5;
    };

    /*
      Deteksi section IDAN
    */
    const observeIdan = () => {
      const marker =
        document.getElementById("idan-marker");

      if (!marker) return;

      const observer =
        new IntersectionObserver(
          ([entry]) => {
            idanVisible = entry.isIntersecting;
          },
          {
            threshold: 0.35,
          }
        );

      observer.observe(marker);

      return observer;
    };

    const observer = observeIdan();

    const render = (time: number) => {
      const seconds = time * 0.001;

      /*
        Smooth scroll
      */
      smoothScroll +=
        (targetScroll - smoothScroll) * 0.055;

      /*
        Smooth mouse
      */
      smoothMouseX +=
        (targetMouseX - smoothMouseX) * 0.025;

      smoothMouseY +=
        (targetMouseY - smoothMouseY) * 0.025;

      /*
        Tentukan mode
      */

      if (idanVisible) {
        targetFormation = 2;
      } else if (
        window.scrollY <
        window.innerHeight * 0.65
      ) {
        targetFormation = 1;
      } else {
        targetFormation = 0;
      }

      /*
        Smooth transition antar mode
      */
      currentFormation +=
        (targetFormation - currentFormation) *
        0.035;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
        Background
      */
      ctx.fillStyle = "#03040a";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
        Atmosphere
      */
      const centerGradient =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.45,
          0,
          width * 0.5,
          height * 0.45,
          width * 0.65
        );

      centerGradient.addColorStop(
        0,
        "rgba(35, 70, 140, 0.055)"
      );

      centerGradient.addColorStop(
        1,
        "rgba(3, 4, 10, 0)"
      );

      ctx.fillStyle = centerGradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
        Render stars
      */
      for (const star of stars) {
        const twinkle =
          Math.sin(
            seconds *
              star.twinkleSpeed +
              star.twinkleOffset
          ) *
            0.5 +
          0.5;

        /*
          Tentukan posisi target
        */

        let targetX = star.scatteredX;
        let targetY = star.scatteredY;

        if (
          currentFormation > 0 &&
          currentFormation < 1
        ) {
          targetX = lerp(
            star.scatteredX,
            star.heroX,
            currentFormation
          );

          targetY = lerp(
            star.scatteredY,
            star.heroY,
            currentFormation
          );
        }

        /*
          13 -> scattered
        */
        else if (
          currentFormation >= 1 &&
          currentFormation < 2
        ) {
          const progress =
            currentFormation - 1;

          targetX = lerp(
            star.heroX,
            star.idanX,
            progress
          );

          targetY = lerp(
            star.heroY,
            star.idanY,
            progress
          );
        }

        /*
          IDAN
        */
        else if (currentFormation >= 2) {
          targetX = star.idanX;
          targetY = star.idanY;
        }

        /*
          Kalau sedang kembali dari IDAN
        */
        if (
          targetFormation === 0 &&
          currentFormation > 0
        ) {
          const reverseProgress =
            currentFormation;

          targetX = lerp(
            star.scatteredX,
            star.heroX,
            reverseProgress
          );

          targetY = lerp(
            star.scatteredY,
            star.heroY,
            reverseProgress
          );
        }

        /*
          Smooth movement
        */
        star.x = lerp(
          star.x,
          targetX,
          0.075
        );

        star.y = lerp(
          star.y,
          targetY,
          0.075
        );

        /*
          Mouse parallax
        */
        const depth =
          0.25 + star.depth * 0.75;

        const mouseOffsetX =
          smoothMouseX *
          12 *
          depth;

        const mouseOffsetY =
          smoothMouseY *
          9 *
          depth;

        /*
          Subtle movement
        */
        const driftX =
          Math.sin(
            seconds *
              0.15 +
              star.twinkleOffset
          ) *
          star.driftX *
          100;

        const driftY =
          Math.cos(
            seconds *
              0.12 +
              star.twinkleOffset
          ) *
          star.driftY *
          100;

        const x =
          star.x +
          mouseOffsetX +
          driftX;

        const y =
          star.y +
          mouseOffsetY +
          driftY;

        /*
          Twinkle
        */
        const alpha =
          star.opacity *
          (0.72 + twinkle * 0.28);

        const size =
          star.size *
          (0.75 + star.depth * 0.45);

        /*
          Glow untuk bintang besar
        */
        if (size > 1.15) {
          ctx.shadowBlur = 8;

          ctx.shadowColor =
            `rgba(170, 205, 255, ${
              alpha * 0.4
            })`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();

        ctx.fillStyle =
          `rgba(225, 235, 255, ${alpha})`;

        ctx.arc(
          x,
          y,
          size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(render);
    };

    resize();
    createStars();

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    animationFrame =
      requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      observer?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        h-full
        w-full
      "
    />
  );
}