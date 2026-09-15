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

function lerp(
  a: number,
  b: number,
  amount: number
) {
  return a + (b - a) * amount;
}

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

  const ctx = canvas.getContext("2d");

  if (!ctx) return [];

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  ctx.fillStyle = "#ffffff";

  ctx.font = `900 ${fontSize}px Arial`;

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
    Randomize titik supaya bintang
    tidak terlihat terlalu teratur.
  */

  for (
    let i = points.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
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
      Scroll
    */

    let targetScroll =
      window.scrollY;

    let smoothScroll =
      window.scrollY;

    /*
      Mouse
    */

    let targetMouseX = 0;
    let targetMouseY = 0;

    let smoothMouseX = 0;
    let smoothMouseY = 0;

    /*
      Formation

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
      dpr = Math.min(
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

      for (
        let i = 0;
        i < STAR_COUNT;
        i++
      ) {
        /*
          Random scattered position
        */

        const scatteredX =
          Math.random() * width;

        const scatteredY =
          Math.random() * height;

        /*
          ========================
          HERO 13 POSITION
          ========================
        */

        const heroPoint =
          heroPoints.length > 0
            ? heroPoints[
                i %
                  heroPoints.length
              ]
            : null;

        const heroX = heroPoint
          ? (HERO_BOX.left / 100) *
              width +
            heroPoint.x *
              ((HERO_BOX.width /
                100) *
                width)
          : scatteredX;

        const heroY = heroPoint
          ? (HERO_BOX.top / 100) *
              height +
            heroPoint.y *
              ((HERO_BOX.height /
                100) *
                height)
          : scatteredY;

        /*
          ========================
          GALAXY POSITION
          ========================
        */

        /*
          Radius menggunakan power
          supaya pusat lebih padat.
        */

        const galaxyRadius =
          Math.pow(
            Math.random(),
            0.72
          );

        /*
          4 spiral arms.
        */

        const armCount = 4;

        const arm =
          Math.floor(
            Math.random() *
              armCount
          );

        /*
          Jarak antar arm.
        */

        const armOffset =
          (arm / armCount) *
          Math.PI *
          2;

        /*
          Ini yang membuat bentuknya
          benar-benar spiral.

          Semakin jauh dari pusat,
          sudut semakin bergeser.
        */

        const spiralTwist =
          galaxyRadius * 5.2;

        /*
          Sedikit random supaya
          tidak terlihat seperti
          spiral matematika sempurna.
        */

        const spread =
          (Math.random() - 0.5) *
          (0.35 +
            galaxyRadius * 0.8);

        /*
          FINAL ANGLE

          Ini menggantikan finalAngle
          yang menyebabkan error tadi.
        */

        const galaxyAngle =
          armOffset +
          spiralTwist +
          spread;

        /*
          Ukuran galaxy
        */

        const galaxyWidth =
          Math.min(
            width * 0.82,
            1100
          );

        const galaxyHeight =
          Math.min(
            height * 0.58,
            650
          );

        /*
          Sedikit vertical noise.
        */

        const verticalNoise =
          (Math.random() - 0.5) *
          20 *
          galaxyRadius;

        /*
          Posisi final galaxy.
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

        const bright =
          Math.random() < 0.035;

        const size =
          galaxyRadius < 0.2
            ? Math.random() * 1.5 +
              0.45
            : Math.random() < 0.9
              ? Math.random() * 0.9 +
                0.3
              : Math.random() * 1.5 +
                0.7;

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
        Smooth scroll
      */

      smoothScroll +=
        (targetScroll -
          smoothScroll) *
        0.055;

      /*
        Smooth mouse
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
        Smooth transition.
      */

      currentFormation +=
        (targetFormation -
          currentFormation) *
        0.035;

      /*
        ========================
        BACKGROUND
        ========================
      */

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

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
            Math.random() *
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
          Twinkle
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
          SCATTERED
          ↕
          13
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
          13
          ↕
          GALAXY
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
          GALAXY
        */

        else {
          targetX =
            star.galaxyX;

          targetY =
            star.galaxyY;
        }

        /*
          Smooth position.
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
            Bintang dekat core
            sedikit lebih cepat.
          */

          const orbitSpeed =
            0.055 -
            star.galaxyRadius *
              0.025;

          /*
            Rotasi.
          */

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
          SIZE
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
          OPACITY
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
          ======================
          GLOW
          ======================
        */

        if (star.bright) {
          ctx.shadowBlur = 15;

          ctx.shadowColor =
            `rgba(220,235,255,${
              alpha * 0.9
            })`;
        } else {
          ctx.shadowBlur =
            4 + size * 5;

          ctx.shadowColor =
            `rgba(180,215,255,${
              alpha * 0.55
            })`;
        }

        /*
          Draw star.
        */

        ctx.beginPath();

        ctx.fillStyle =
          `rgba(225,235,255,${alpha})`;

        ctx.arc(
          x,
          y,
          size,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /*
          Bright star memiliki
          titik inti yang lebih putih.
        */

        if (
          star.bright &&
          currentFormation >
            1.1
        ) {
          ctx.shadowBlur = 0;

          ctx.beginPath();

          ctx.fillStyle =
            `rgba(255,255,255,${
              alpha * 0.9
            })`;

          ctx.arc(
            x,
            y,
            size * 0.45,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;

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