"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  arm: number;
  phase: number;
  speed: number;
  size: number;
  brightness: number;
  twinkle: number;
  twinkleOffset: number;
  color: [number, number, number];
  scatteredX: number;
  scatteredY: number;
  burstX: number;
  burstY: number;
}

const DESKTOP_COUNT = 2400;
const MOBILE_COUNT = 700;
const ARMS = 2;
const SPIRAL_TURNS = 1.75;
const BURST_SPEED = 0.032;
const GALAXY_BLEND_SPEED = 0.055;
const ORBIT_SPEED = 0.00018;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function randomNormal() {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v);
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexSource = `
      attribute vec3 aPosition;
      attribute float aSize;
      attribute float aAlpha;
      attribute vec3 aColor;
      varying float vAlpha;
      varying vec3 vColor;
      uniform vec2 uResolution;
      uniform float uPointScale;
      void main() {
        gl_Position = vec4(aPosition, 1.0);
        gl_PointSize = max(1.0, aSize * uPointScale * (1.0 / max(0.25, 1.0 + aPosition.z * 0.65)));
        vAlpha = aAlpha;
        vColor = aColor;
      }
    `;

    const fragmentSource = `
      precision mediump float;
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        float core = smoothstep(0.24, 0.0, d);
        float halo = smoothstep(0.5, 0.28, d) * 0.06;
        float alpha = (core * 0.96 + halo) * vAlpha;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader) || "Shader compilation failed";
        gl.deleteShader(shader);
        throw new Error(log);
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;
    const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0.011, 0.016, 0.04, 1);

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const sizeLocation = gl.getAttribLocation(program, "aSize");
    const alphaLocation = gl.getAttribLocation(program, "aAlpha");
    const colorLocation = gl.getAttribLocation(program, "aColor");
    const pointScaleLocation = gl.getUniformLocation(program, "uPointScale");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");

    const positionBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const alphaBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    if (!positionBuffer || !sizeBuffer || !alphaBuffer || !colorBuffer) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    let burstProgress = 0;
    let galaxyProgress = 0;
    let galaxyVisible = false;
    let burstStarted = false;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let finePointer = window.matchMedia("(pointer: fine)").matches;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 1.6);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const makeParticles = () => {
      const mobile = width < 768;
      const count = mobile ? MOBILE_COUNT : DESKTOP_COUNT;
      const galaxyWidth = Math.min(width * 0.92, 1500);
      const galaxyHeight = Math.min(height * 0.34, 420);
      particles = [];

      for (let i = 0; i < count; i++) {
        const random = Math.random();
        const isCore = random < 0.19;
        const radius = isCore
          ? Math.pow(Math.random(), 2.5) * 0.34
          : 0.09 + Math.pow(Math.random(), 0.72) * 0.91;
        const arm = Math.floor(Math.random() * ARMS);
        const armBase = (arm / ARMS) * Math.PI * 2;
        const theta = isCore
          ? Math.random() * Math.PI * 2
          : armBase + radius * SPIRAL_TURNS * Math.PI * 2 + randomNormal() * (0.025 + radius * 0.07);

        const armWidth = isCore ? 0 : (4 + radius * 24) * (0.45 + Math.random() * 0.75);
        const tangentOffset = isCore ? 0 : randomNormal() * (3 + radius * 10);
        const x = isCore
          ? Math.cos(theta) * radius * galaxyWidth * 0.15 + randomNormal() * 5
          : Math.cos(theta) * radius * galaxyWidth * 0.5 + randomNormal() * armWidth + tangentOffset;
        const y = isCore
          ? Math.sin(theta) * radius * galaxyHeight * 0.22 + randomNormal() * 4
          : Math.sin(theta) * radius * galaxyHeight * 0.5 + randomNormal() * armWidth * 0.48;
        const z = isCore
          ? randomNormal() * 0.06
          : randomNormal() * (0.025 + radius * 0.08);

        const gold = Math.random() < 0.025;
        const blue = Math.random() < 0.24;
        const color: [number, number, number] = gold
          ? [1.0, 0.72, 0.32]
          : blue
            ? [0.62, 0.78, 1.0]
            : [0.92 + Math.random() * 0.08, 0.94 + Math.random() * 0.06, 1.0];

        const largeStar = Math.random() < 0.065;
        particles.push({
          x,
          y,
          z,
          radius,
          arm,
          phase: Math.random() * Math.PI * 2,
          speed: ORBIT_SPEED * (0.35 + radius * 0.9) * (0.7 + Math.random() * 0.6),
          size: largeStar
            ? 1.35 + Math.random() * 1.05 + (1 - radius) * 0.18
            : 0.42 + Math.random() * 0.82 + (1 - radius) * 0.08,
          brightness: largeStar
            ? 0.62 + Math.random() * 0.3
            : 0.38 + Math.random() * 0.48,
          twinkle: 0.4 + Math.random() * 1.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          color,
          scatteredX: Math.random() * width,
          scatteredY: Math.random() * height,
          burstX: width / 2 + Math.cos(Math.random() * Math.PI * 2) * Math.min(width, height) * (mobile ? 0.04 : 0.065),
          burstY: height / 2 + Math.sin(Math.random() * Math.PI * 2) * Math.min(width, height) * (mobile ? 0.04 : 0.065),
        });
      }
    };

    const handleResize = () => {
      resize();
      makeParticles();
      burstProgress = 0;
      galaxyProgress = 0;
      burstStarted = false;
    };

    const pointerMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotion) return;
      targetMouseX = event.clientX / width - 0.5;
      targetMouseY = event.clientY / height - 0.5;
    };

    const marker = document.getElementById("idan-marker");
    const observer = marker
      ? new IntersectionObserver(([entry]) => {
          galaxyVisible = entry.isIntersecting;
        }, { threshold: 0.2 })
      : undefined;
    observer?.observe(marker as Element);

    const render = (time: number) => {
      const dt = Math.min(32, last ? time - last : 16);
      last = time;
      const seconds = time * 0.001;
      const mobile = width < 768;

      if (!burstStarted && window.scrollY < height * 1.15) {
        burstStarted = true;
      }
      if (burstStarted && burstProgress < 1) {
        burstProgress = reducedMotion ? 1 : Math.min(1, burstProgress + BURST_SPEED * (dt / 16));
      }

      const target = galaxyVisible && burstProgress >= 1 ? 1 : 0;
      galaxyProgress = reducedMotion
        ? target
        : lerp(galaxyProgress, target, 1 - Math.pow(1 - GALAXY_BLEND_SPEED, dt / 16));

      mouseX = lerp(mouseX, targetMouseX, 0.045);
      mouseY = lerp(mouseY, targetMouseY, 0.045);

      gl.clear(gl.COLOR_BUFFER_BIT);

      const positions = new Float32Array(particles.length * 3);
      const sizes = new Float32Array(particles.length);
      const alphas = new Float32Array(particles.length);
      const colors = new Float32Array(particles.length * 3);
      const burstEase = 1 - Math.pow(1 - burstProgress, 3);
      const galaxyEase = smoothstep(galaxyProgress);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const scatteredX = lerp(p.burstX, p.scatteredX, burstEase);
        const scatteredY = lerp(p.burstY, p.scatteredY, burstEase);

        const orbit = reducedMotion ? 0 : seconds * p.speed;
        const c = Math.cos(orbit);
        const s = Math.sin(orbit);
        const gx = p.x * c - p.y * s;
        const gy = p.x * s + p.y * c;
        const depth = p.z + Math.sin(seconds * 0.12 + p.phase) * 0.025;

        const tilt = 0.23;
        const projectedY = gy * Math.cos(tilt) - depth * 95 * Math.sin(tilt);
        const projectedZ = gy * Math.sin(tilt) + depth * 95 * Math.cos(tilt);
        const cameraScale = 1.0 / (1.0 + projectedZ * 0.00075);
        const perspectiveX = gx * cameraScale;
        const perspectiveY = projectedY * cameraScale;
        const zoom = 1 + galaxyEase * 0.025;

        const galaxyX = width / 2 + perspectiveX * zoom + mouseX * (8 + p.radius * 16);
        const galaxyY = height / 2 - height * 0.075 + perspectiveY * zoom + mouseY * (5 + p.radius * 10);
        const x = lerp(scatteredX, galaxyX, galaxyEase);
        const y = lerp(scatteredY, galaxyY, galaxyEase);

        positions[i * 3] = (x / width) * 2 - 1;
        positions[i * 3 + 1] = 1 - (y / height) * 2;
        positions[i * 3 + 2] = Math.max(-1, Math.min(1, projectedZ / 700));

        const twinkle = reducedMotion
          ? 1
          : 0.72 + Math.sin(seconds * p.twinkle + p.twinkleOffset) * 0.28;
        const depthBrightness = Math.max(0.65, 1 - Math.abs(projectedZ) / 900);
        sizes[i] = p.size * (0.82 + depthBrightness * 0.5) * (mobile ? 0.7 : 1);
        alphas[i] = Math.min(1, p.brightness * twinkle * depthBrightness);
        colors[i * 3] = p.color[0];
        colors[i * 3 + 1] = p.color[1];
        colors[i * 3 + 2] = p.color[2];
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(sizeLocation);
      gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(alphaLocation);
      gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(colorLocation);
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

      gl.uniform1f(pointScaleLocation, Math.min(width, height) * 0.007 * dpr);
      gl.uniform2f(resolutionLocation, width, height);
      gl.drawArrays(gl.POINTS, 0, particles.length);

      frame = requestAnimationFrame(render);
    };

    resize();
    makeParticles();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", pointerMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", pointerMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(sizeBuffer);
      gl.deleteBuffer(alphaBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
