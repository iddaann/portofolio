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

  galaxyAngle: number;
  galaxyRadius: number;

  size: number;
  opacity: number;
  depth: number;
  bright: boolean;

  glowSize: number;
  glowOpacity: number;
  starColor: string;

  twinkleSpeed: number;
  twinkleOffset: number;

  driftX: number;
  driftY: number;
}

const STAR_COUNT = 500;
const HERO_STAR_COUNT = 300;

const HERO_BOX = {
  left: 30,
  top: 28,
  width: 40,
  height: 40,
};

/*
  ============================
  LERP
  ============================
*/

function lerp(
  a: number,
  b: number,
  amount: number
) {
  return a + (b - a) * amount;
}

/*
  ============================
  SAMPLE TEXT
  ============================
*/

function sampleTextPoints(
  text: string,
  width: number,
  height: number,
  fontSize: number,
  count: number
) {
  const canvas =
    document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) return [];

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  ctx.fillStyle = "#ffffff";

  ctx.font =
    `900 ${fontSize}px Arial`;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    text,
    width / 2,
    height / 2
  );

  const imageData =
    ctx.getImageData(
      0,
      0,
      width,
      height
    );

  const points: {
    x: number;
    y: number;
  }[] = [];

  /*
    Ambil titik pixel
    yang membentuk angka.
  */

  for (
    let y = 0;
    y < height;
    y += 3
  ) {
    for (
      let x = 0;
      x < width;
      x += 3
    ) {
      const alpha =
        imageData.data[
          (y * width + x) * 4 + 3
        ];

      if (alpha > 120) {
        points.push({
          x: x / width,
          y: y / height,
        });
      }
    }
  }

  /*
    Acak titik agar distribusi
    bintang tidak terlalu kaku.
  */

  for (
    let i = points.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [points[i], points[j]] = [
      points[j],
      points[i],
    ];
  }

  return points.slice(
    0,
    count
  );
}

/*
  ============================
  STAR BACKGROUND
  ============================
*/

export default function StarBackground() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    /*
      ==========================
      SCROLL
      ==========================
    */

    let targetScroll =
      window.scrollY;

    let smoothScroll =
      window.scrollY;

    /*
      ==========================
      MOUSE
      ==========================
    */

    let targetMouseX = 0;
    let targetMouseY = 0;

    let smoothMouseX = 0;
    let smoothMouseY = 0;

    /*
      ==========================
      FORMATION
      ==========================

      0 = scattered
      1 = 13
      2 = galaxy
    */

    let currentFormation = 1;
    let targetFormation = 1;

    const stars: Star[] = [];

    let galaxyVisible = false;

    /*
      ==========================
      RESIZE
      ==========================
    */

    const resize = () => {
      dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    /*
      ==========================
      CREATE STARS
      ==========================
    */

    const createStars = () => {
      stars.length = 0;

      /*
        ========================
        HERO 13
        ========================
      */

      const heroPoints =
        width >= 768
          ? sampleTextPoints(
              "13",
              500,
              300,
              210,
              HERO_STAR_COUNT
            )
          : [];

      /*
        ========================
        CREATE EACH STAR
        ========================
      */

      for (
        let i = 0;
        i < STAR_COUNT;
        i++
      ) {
        /*
          ----------------------
          SCATTERED POSITION
          ----------------------
        */

        const scatteredX =
          Math.random() * width;

        const scatteredY =
          Math.random() * height;

        /*
          ----------------------
          HERO 13 POSITION
          ----------------------
        */

        const heroPoint =
          heroPoints.length > 0
            ? heroPoints[
                i %
                  heroPoints.length
              ]
            : null;

        const heroX =
          heroPoint
            ? (HERO_BOX.left / 100) *
                width +
              heroPoint.x *
                ((HERO_BOX.width / 100) *
                  width)
            : scatteredX;

        const heroY =
          heroPoint
            ? (HERO_BOX.top / 100) *
                height +
              heroPoint.y *
                ((HERO_BOX.height / 100) *
                  height)
            : scatteredY;

        /*
          ----------------------
          GALAXY RADIUS
          ----------------------

          Radius lebih banyak
          berkumpul di bagian
          dalam galaxy.
        */

        const galaxyRadius =
          Math.pow(
            Math.random(),
            1.15
          );

        /*
          ----------------------
          SPIRAL ARMS
          ----------------------
        */

        const armCount = 4;

        const arm =
          Math.floor(
            Math.random() *
              armCount
          );

        const armOffset =
          (arm / armCount) *
          Math.PI *
          2;

        /*
          Semakin jauh dari pusat,
          semakin besar perubahan
          sudut spiral.
        */

        const spiralTurns =
          Math.PI * 2.8;

        const spiralTwist =
          galaxyRadius *
          spiralTurns;

        /*
          Noise supaya spiral
          tidak terlihat terlalu
          sempurna.
        */

        const spread =
          (Math.random() - 0.5) *
          (0.12 +
            galaxyRadius * 0.8);

        /*
          Sudut final.
        */

        const galaxyAngle =
          armOffset +
          spiralTwist +
          spread;

        /*
          ----------------------
          GALAXY SIZE
          ----------------------
        */

        const galaxyWidth =
          Math.min(
            width * 0.95,
            1350
          );

        const galaxyHeight =
          Math.min(
            height * 0.52,
            620
          );

        /*
          Sedikit vertical noise.
        */

        const verticalNoise =
          (Math.random() - 0.5) *
          20 *
          galaxyRadius;

        /*
          ----------------------
          GALAXY POSITION
          ----------------------
        */

        const galaxyX =
          width / 2 +
          Math.cos(
            galaxyAngle
          ) *
            galaxyRadius *
            galaxyWidth *
            0.5;

        const galaxyY =
          height / 2 +
          Math.sin(
            galaxyAngle
          ) *
            galaxyRadius *
            galaxyHeight *
            0.5 +
          verticalNoise;

        /*
          ========================
          STAR PROPERTIES
          ========================
        */

        /*
          Sebagian kecil bintang
          dibuat sangat terang.
        */

        const bright =
          Math.random() < 0.055;

        /*
          Ukuran bintang.

          Mayoritas kecil,
          sebagian medium,
          sedikit besar.
        */

        const size =
          Math.random() < 0.08
            ? Math.random() * 1.8 + 1.2
            : Math.random() * 0.9 + 0.35;

        /*
          Glow setiap bintang.
        */

        const glowSize =
          Math.random() * 5 + 3;

        const glowOpacity =
          Math.random() * 0.35 + 0.2;

        /*
          Warna cahaya.
        */

        const starColors = [
          "225,235,255",
          "255,255,255",
          "190,215,255",
          "210,220,255",
          "235,240,255",
        ];

        const starColor =
          starColors[
            Math.floor(
              Math.random() *
                starColors.length
            )
          ];

        /*
          Simpan bintang.
        */

        stars.push({
          x: heroX,
          y: heroY,

          scatteredX,
          scatteredY,

          heroX,
          heroY,

          galaxyX,
          galaxyY,

          galaxyAngle,
          galaxyRadius,

          size,

          opacity:
            Math.random() * 0.5 +
            0.25,

          depth:
            Math.random(),

          bright,

          glowSize,
          glowOpacity,
          starColor,

          twinkleSpeed:
            Math.random() * 0.8 +
            0.2,

          twinkleOffset:
            Math.random() *
            Math.PI *
            2,

          driftX:
            (Math.random() - 0.5) *
            0.03,

          driftY:
            (Math.random() - 0.5) *
            0.02,
        });
      }
    };

    /*
      ==========================
      EVENTS
      ==========================
    */

    const handleResize = () => {
      resize();
      createStars();
    };

    const handleScroll = () => {
      targetScroll =
        window.scrollY;
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (
        width === 0 ||
        height === 0
      ) {
        return;
      }

      targetMouseX =
        event.clientX / width -
        0.5;

      targetMouseY =
        event.clientY / height -
        0.5;
    };

    /*
      ==========================
      GALAXY MARKER
      ==========================
    */

    const marker =
      document.getElementById(
        "idan-marker"
      );

    let observer:
      | IntersectionObserver
      | undefined;

    if (marker) {
      observer =
        new IntersectionObserver(
          ([entry]) => {
            galaxyVisible =
              entry.isIntersecting;
          },
          {
            threshold: 0.25,
          }
        );

      observer.observe(marker);
    }

    /*
      ==========================
      RENDER
      ==========================
    */

    const render = (
      time: number
    ) => {
      const seconds =
        time * 0.001;

      /*
        ========================
        SMOOTH SCROLL
        ========================
      */

      smoothScroll +=
        (targetScroll -
          smoothScroll) *
        0.055;

      /*
        ========================
        SMOOTH MOUSE
        ========================
      */

      smoothMouseX +=
        (targetMouseX -
          smoothMouseX) *
        0.025;

      smoothMouseY +=
        (targetMouseY -
          smoothMouseY) *
        0.025;

      /*
        ========================
        DETERMINE FORMATION
        ========================
      */

      if (galaxyVisible) {
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
        Smooth transition
        antar formation.
      */

      currentFormation +=
        (targetFormation -
          currentFormation) *
        0.035;

      /*
        ========================
        CLEAR BACKGROUND
        ========================
      */

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
        Base background.
      */

      ctx.fillStyle =
        "#03040a";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
        ========================
        SPACE ATMOSPHERE
        ========================
      */

      const atmosphere =
        ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          width * 0.7
        );

      atmosphere.addColorStop(
        0,
        "rgba(45,80,160,0.075)"
      );

      atmosphere.addColorStop(
        0.45,
        "rgba(30,50,120,0.03)"
      );

      atmosphere.addColorStop(
        1,
        "rgba(3,4,10,0)"
      );

      ctx.fillStyle =
        atmosphere;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
        ========================
        GALACTIC CORE
        ========================
      */

      if (
        currentFormation >
        1.15
      ) {
        const strength =
          Math.min(
            (currentFormation -
              1.15) /
              0.85,
            1
          );

        const core =
          ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            width * 0.24
          );

        core.addColorStop(
          0,
          `rgba(255,255,255,${
            0.18 * strength
          })`
        );

        core.addColorStop(
          0.12,
          `rgba(200,220,255,${
            0.1 * strength
          })`
        );

        core.addColorStop(
          0.35,
          `rgba(100,140,230,${
            0.04 * strength
          })`
        );

        core.addColorStop(
          1,
          "rgba(3,4,10,0)"
        );

        ctx.fillStyle =
          core;

        ctx.fillRect(
          0,
          0,
          width,
          height
        );
      }

      /*
        ========================
        GALAXY DUST
        ========================
      */

      if (
        currentFormation >
        1.25
      ) {
        const dustStrength =
          Math.min(
            (currentFormation -
              1.25) /
              0.75,
            1
          );

        /*
          Gunakan deterministic
          pseudo-random berdasarkan
          index supaya dust tidak
          berkedip setiap frame.
        */

        for (
          let i = 0;
          i < 140;
          i++
        ) {
          const angle =
            (i / 140) *
              Math.PI *
              2 +
            seconds * 0.012;

          const radius =
            0.15 +
            ((i * 37) % 100) /
              100 *
              0.8;

          const dustX =
            width / 2 +
            Math.cos(angle) *
              radius *
              width *
              0.38;

          const dustY =
            height / 2 +
            Math.sin(angle) *
              radius *
              height *
              0.25;

          ctx.beginPath();

          ctx.fillStyle =
            `rgba(160,190,230,${
              0.018 *
              dustStrength
            })`;

          ctx.arc(
            dustX,
            dustY,
            1,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      /*
        ========================
        STARS
        ========================
      */

      for (
        const star of stars
      ) {
        /*
          ======================
          TWINKLE
          ======================
        */

        const twinkle =
          Math.sin(
            seconds *
              star.twinkleSpeed +
              star.twinkleOffset
          ) *
            0.5 +
          0.5;

        /*
          ======================
          TARGET POSITION
          ======================
        */

        let targetX =
          star.scatteredX;

        let targetY =
          star.scatteredY;

        /*
          ======================
          SCATTERED → 13
          ======================
        */

        if (
          currentFormation <
          1
        ) {
          const progress =
            currentFormation;

          targetX = lerp(
            star.scatteredX,
            star.heroX,
            progress
          );

          targetY = lerp(
            star.scatteredY,
            star.heroY,
            progress
          );
        }

        /*
          ======================
          13 → GALAXY
          ======================
        */

        else if (
          currentFormation <
          2
        ) {
          const progress =
            currentFormation - 1;

          targetX = lerp(
            star.heroX,
            star.galaxyX,
            progress
          );

          targetY = lerp(
            star.heroY,
            star.galaxyY,
            progress
          );
        }

        /*
          ======================
          GALAXY
          ======================
        */

        else {
          targetX =
            star.galaxyX;

          targetY =
            star.galaxyY;
        }

        /*
          ======================
          SMOOTH POSITION
          ======================
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
          ======================
          GALAXY ORBIT
          ======================
        */

        let finalX =
          star.x;

        let finalY =
          star.y;

        if (
          currentFormation >
          1.35
        ) {
          const orbitProgress =
            Math.min(
              currentFormation -
                1.35,
              1
            );

          /*
            Bintang lebih dekat
            dengan pusat bergerak
            sedikit lebih cepat.
          */

          const orbitSpeed =
            0.055 -
            star.galaxyRadius *
              0.025;

          const rotation =
            seconds *
            orbitSpeed;

          const centerX =
            width / 2;

          const centerY =
            height / 2;

          /*
            Posisi relatif terhadap
            pusat galaxy.
          */

          const dx =
            star.galaxyX -
            centerX;

          const dy =
            star.galaxyY -
            centerY;

          /*
            Rotasi 2D.
          */

          const cos =
            Math.cos(rotation);

          const sin =
            Math.sin(rotation);

          const rotatedX =
            dx * cos -
            dy * sin;

          const rotatedY =
            dx * sin +
            dy * cos;

          const orbitX =
            centerX +
            rotatedX;

          const orbitY =
            centerY +
            rotatedY;

          finalX = lerp(
            star.x,
            orbitX,
            orbitProgress
          );

          finalY = lerp(
            star.y,
            orbitY,
            orbitProgress
          );
        }

        /*
          ======================
          MOUSE PARALLAX
          ======================
        */

        const depth =
          0.25 +
          star.depth * 0.75;

        const mouseOffsetX =
          smoothMouseX *
          14 *
          depth;

        const mouseOffsetY =
          smoothMouseY *
          10 *
          depth;

        /*
          ======================
          SUBTLE DRIFT
          ======================
        */

        const driftX =
          Math.sin(
            seconds * 0.15 +
              star.twinkleOffset
          ) *
          star.driftX *
          100;

        const driftY =
          Math.cos(
            seconds * 0.12 +
              star.twinkleOffset
          ) *
          star.driftY *
          100;

        /*
          FINAL POSITION
        */

        const x =
          finalX +
          mouseOffsetX +
          driftX;

        const y =
          finalY +
          mouseOffsetY +
          driftY;

        /*
          ======================
          STAR SIZE
          ======================
        */

        const size =
          star.size *
          (0.75 +
            star.depth * 0.5) *
          (star.bright
            ? 1.8
            : 1);

        /*
          ======================
          STAR OPACITY
          ======================
        */

        const alpha =
          Math.min(
            star.opacity *
              (0.68 +
                twinkle * 0.32),
            1
          );

        /*
          ============================
          STAR GLOW
          ============================
        */

        /*
          SEMUA bintang mendapatkan
          radial glow.
        */

        const glowRadius =
          size *
          star.glowSize *
          (star.bright
            ? 1.5
            : 1);

        const glow =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            glowRadius
          );

        /*
          Pusat glow.
        */

        glow.addColorStop(
          0,
          `rgba(${star.starColor},${
            alpha *
            star.glowOpacity *
            (star.bright
              ? 1.5
              : 1)
          })`
        );

        /*
          Inner glow.
        */

        glow.addColorStop(
          0.08,
          `rgba(${star.starColor},${
            alpha *
            star.glowOpacity *
            0.8
          })`
        );

        /*
          Mid glow.
        */

        glow.addColorStop(
          0.25,
          `rgba(${star.starColor},${
            alpha *
            star.glowOpacity *
            0.35
          })`
        );

        /*
          Outer glow.
        */

        glow.addColorStop(
          0.55,
          `rgba(${star.starColor},${
            alpha *
            star.glowOpacity *
            0.08
          })`
        );

        /*
          Fade completely.
        */

        glow.addColorStop(
          1,
          `rgba(${star.starColor},0)`
        );

        /*
          Draw glow.
        */

        ctx.beginPath();

        ctx.fillStyle =
          glow;

        ctx.arc(
          x,
          y,
          glowRadius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /*
          ============================
          STAR CORE
          ============================
        */

        /*
          Core kecil.

          Mayoritas bintang dibuat
          sangat kecil supaya tidak
          terlihat seperti bola.
        */

        const coreSize =
          star.bright
            ? Math.max(
                size * 0.55,
                1.1
              )
            : Math.max(
                size * 0.32,
                0.35
              );

        ctx.beginPath();

        ctx.fillStyle =
          `rgba(255,255,255,${
            Math.min(
              alpha *
                (star.bright
                  ? 1.25
                  : 1),
              1
            )
          })`;

        ctx.arc(
          x,
          y,
          coreSize,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /*
          ============================
          BRIGHT STAR RAYS
          ============================
        */

        /*
          Hanya sebagian kecil
          bintang yang mendapatkan
          efek cross-ray.
        */

        if (star.bright) {
          const ray =
            size * 4.5;

          const rayAlpha =
            alpha * 0.22;

          ctx.strokeStyle =
            `rgba(225,235,255,${rayAlpha})`;

          ctx.lineWidth = 0.5;

          /*
            Vertical ray.
          */

          ctx.beginPath();

          ctx.moveTo(
            x,
            y - ray
          );

          ctx.lineTo(
            x,
            y + ray
          );

          ctx.stroke();

          /*
            Horizontal ray.
          */

          ctx.beginPath();

          ctx.moveTo(
            x - ray,
            y
          );

          ctx.lineTo(
            x + ray,
            y
          );

          ctx.stroke();
        }
      }

      /*
        ========================
        NEXT FRAME
        ========================
      */

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    /*
      ==========================
      INITIALIZE
      ==========================
    */

    resize();

    createStars();

    /*
      ==========================
      EVENT LISTENERS
      ==========================
    */

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

    /*
      ==========================
      START ANIMATION
      ==========================
    */

    animationFrame =
      requestAnimationFrame(
        render
      );

    /*
      ==========================
      CLEANUP
      ==========================
    */

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