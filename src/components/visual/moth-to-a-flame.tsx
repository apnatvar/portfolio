"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

type MothsToFlameProps = {
  className?: string;
  population?: number;
  lightRadius?: number;
  lightColor?: string;
  background?: string;
  mothColor?: string;
  mothMaxRadius?: number;
  attraction?: number;
  drag?: number;
  orbitLight?: boolean;
};

type Moth = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  fading: boolean;
};

const MothsToFlame: React.FC<MothsToFlameProps> = ({
  className,
  population = 70,
  lightRadius = 180,
  lightColor = "rgb(22,163,74)",
  background = "#111",
  mothColor = "rgba(0,0,0,0.85)",
  mothMaxRadius = 5.5,
  attraction = 0.345,
  drag = 0.8,
  orbitLight = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const dprRef = useRef<number>(1);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);

  const mothsRef = useRef<Moth[]>([]);
  const targetPopulationRef = useRef<number>(population);

  const lightBaseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lightPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lightRadiusRef = useRef<number>(lightRadius);
  const lightPulseRef = useRef<number>(0);
  const orbitAngleRef = useRef<number>(0);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));

    dprRef.current = dpr;
    wRef.current = cssW;
    hRef.current = cssH;

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;

    lightBaseRef.current.x = cssW / 2;
    lightBaseRef.current.y = cssH / 2;
    lightPosRef.current.x = lightBaseRef.current.x;
    lightPosRef.current.y = lightBaseRef.current.y;
  };

  const spawnMoth = () => {
    const w = wRef.current;
    const h = hRef.current;

    const edge = Math.floor(gsap.utils.random(0, 3, 1));
    let x = 0;
    let y = 0;

    if (edge === 0) {
      x = gsap.utils.random(0, w);
      y = -10;
    } else if (edge === 1) {
      x = w + 10;
      y = gsap.utils.random(0, h);
    } else if (edge === 2) {
      x = gsap.utils.random(0, w);
      y = h + 10;
    } else {
      x = -10;
      y = gsap.utils.random(0, h);
    }

    const speed = gsap.utils.random(0.3, 1.2);
    const angle = gsap.utils.random(0, Math.PI * 2);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const r = gsap.utils.random(1.1, mothMaxRadius);
    mothsRef.current.push({ x, y, vx, vy, r, alpha: 1, fading: false });
  };

  const ensurePopulation = () => {
    const target = targetPopulationRef.current;
    const current = mothsRef.current.length;
    if (current < target) {
      const deficit = target - current;
      for (let i = 0; i < deficit; i++) spawnMoth();
    }
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement || canvas);

    const pulseTl = gsap.timeline({ repeat: -1, yoyo: true });
    pulseTl.to(lightPulseRef, {
      current: 1,
      duration: 2.4,
      ease: "sine.inOut",
    });

    const orbitTween = orbitLight
      ? gsap.to(orbitAngleRef, {
          current: Math.PI * 2,
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
          modifiers: {
            current: (v) => {
              const num = parseFloat(v);
              return (num % (Math.PI * 2)).toString();
            },
          },
        })
      : null;

    mothsRef.current = [];
    ensurePopulation();

    const ticker = gsap.ticker;
    const tick = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const w = wRef.current;
      const h = hRef.current;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const base = lightBaseRef.current;
      let lx = base.x;
      let ly = base.y;

      if (orbitLight) {
        const a = orbitAngleRef.current as unknown as number;
        const orbitRadius = Math.min(w, h) * 0.06;
        lx = base.x + Math.cos(a) * orbitRadius;
        ly = base.y + Math.sin(a * 0.8) * orbitRadius * 0.7;
      }

      lightPosRef.current.x = lx;
      lightPosRef.current.y = ly;

      const pulse = lightPulseRef.current;
      const L = lightRadiusRef.current;
      const radius = L * (0.9 + 0.18 * pulse);
      const innerRadius = radius * 0.6;

      const grad = ctx.createRadialGradient(
        lx,
        ly,
        radius * 0.15,
        lx,
        ly,
        radius
      );
      grad.addColorStop(0, lightColor);
      grad.addColorStop(1, "rgb(22,163,74,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(lx, ly, radius, 0, 360);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      const moths = mothsRef.current;
      for (let i = moths.length - 1; i >= 0; i--) {
        const m = moths[i];

        const dx = lx - m.x;
        const dy = ly - m.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const ux = dx / dist;
        const uy = dy / dist;

        const strength = attraction * Math.min(dist / 120, 1.6);
        m.vx += ux * strength;
        m.vy += uy * strength;

        m.vx *= drag;
        m.vy *= drag;

        m.x += m.vx;
        m.y += m.vy;

        if (!m.fading && dist < innerRadius) {
          m.fading = true;
          gsap.to(m, {
            alpha: 0,
            duration: gsap.utils.random(0.35, 0.8),
            ease: "power2.out",
            onComplete: () => {
              const idx = mothsRef.current.indexOf(m);
              if (idx !== -1) mothsRef.current.splice(idx, 1);
              spawnMoth();
            },
          });
        }

        if (m.x < -50 || m.x > w + 50 || m.y < -50 || m.y > h + 50) {
          moths.splice(i, 1);
          spawnMoth();
          continue;
        }
        if (m.alpha > 0) {
          ctx.globalAlpha = m.alpha;
          ctx.fillStyle = mothColor;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      ensurePopulation();
    };

    ticker.add(tick);

    return () => {
      ticker.remove(tick);
      pulseTl.kill();
      orbitTween?.kill();
      ro.disconnect();
      mothsRef.current.forEach((m) => gsap.killTweensOf(m));
      mothsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    background,
    lightColor,
    orbitLight,
    attraction,
    drag,
    mothColor,
    mothMaxRadius,
  ]);

  useLayoutEffect(() => {
    targetPopulationRef.current = population;
  }, [population]);

  useLayoutEffect(() => {
    lightRadiusRef.current = lightRadius;
  }, [lightRadius]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        touchAction: "none",
      }}
      aria-label="Moths to a flame animation"
      role="img"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default MothsToFlame;
