"use client";

import { useEffect, useRef } from "react";

interface FlowFieldProps {
  scrollProgress?: number; // 0 to 1
  labTopY?: number | null; // Y pixel position of AI Lab section top edge
  calmMode?: boolean; // For inner pages
}

export function FlowField({ scrollProgress = 0, labTopY = null, calmMode = false }: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isHidden = false;
    let time = 0;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => {
      isHidden = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const lineCount = calmMode
      ? width < 768 ? 30 : 60
      : width < 768 ? 70 : 140;

    const steps = 34;
    const baseStepLen = 9;

    // Pre-generate seed positions
    const seeds = Array.from({ length: lineCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      index: i
    }));

    const drawPass = (inkColor: string, redColor: string, orangeColor: string, clipRect?: { top: number; bottom: number }) => {
      ctx.save();
      if (clipRect) {
        ctx.beginPath();
        ctx.rect(0, clipRect.top, width, clipRect.bottom - clipRect.top);
        ctx.clip();
      }

      const p = Math.max(0, Math.min(1, scrollRef.current));
      // Mode weights: Identity (0.0 -> 0.4), Work (0.4 -> 0.7), AI Lab (0.7 -> 1.0)
      let wIdentity = 1;
      let wWork = 0;
      let wLab = 0;

      if (p <= 0.4) {
        wIdentity = 1 - (p / 0.4);
        wWork = p / 0.4;
      } else if (p <= 0.75) {
        const local = (p - 0.4) / 0.35;
        wIdentity = 0;
        wWork = 1 - local;
        wLab = local;
      } else {
        wIdentity = 0;
        wWork = 0;
        wLab = 1;
      }

      ctx.lineWidth = 1;

      seeds.forEach((seed) => {
        let currX = (seed.x + time * 8) % width;
        let currY = seed.y;

        let strokeColor = inkColor;
        if (seed.index % 9 === 0) strokeColor = redColor;
        else if (seed.index % 13 === 0) strokeColor = orangeColor;

        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(currX, currY);

        for (let s = 0; s < steps; s++) {
          // 1. Identity Angle (organic sines)
          const angleIdentity =
            Math.sin(currX * 0.003 + time * 0.4) * Math.cos(currY * 0.003 + time * 0.3) * Math.PI * 2;

          // 2. Work Angle (mostly horizontal stretching)
          const angleWork = (Math.sin(currY * 0.005) * 0.2) + (Math.sin(time * 0.5) * 0.1);

          // 3. AI Lab Angle (attractor towards right-center: x: 0.75 * width, y: 0.5 * height)
          const attractorX = width * 0.72;
          const attractorY = height * 0.5;
          const dx = attractorX - currX;
          const dy = attractorY - currY;
          const angleLab = Math.atan2(dy, dx) + Math.PI * 0.3; // swirling spiral inwards

          const blendedAngle =
            angleIdentity * wIdentity +
            angleWork * wWork +
            angleLab * wLab;

          const stepLen = baseStepLen + wWork * 6;
          currX += Math.cos(blendedAngle) * stepLen;
          currY += Math.sin(blendedAngle) * stepLen;

          ctx.lineTo(currX, currY);
        }

        ctx.stroke();
      });

      ctx.restore();
    };

    const render = () => {
      if (isHidden) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const computedLabY = labTopY !== null ? labTopY : height * 2.5; // fallback
      const lightTheme = !document.documentElement.classList.contains("dark");

      const topInk = lightTheme ? "rgba(20, 17, 15, 0.18)" : "rgba(236, 228, 214, 0.18)";
      const topRed = lightTheme ? "rgba(163, 32, 26, 0.45)" : "rgba(201, 56, 46, 0.45)";
      const topOrange = lightTheme ? "rgba(217, 119, 43, 0.45)" : "rgba(229, 139, 58, 0.45)";

      // Pass 1: Upper normal section
      drawPass(topInk, topRed, topOrange, { top: 0, bottom: Math.max(0, computedLabY) });

      // Pass 2: Lower AI Lab section (Always warm white / glowing lines on dark #0c0908)
      if (computedLabY < height) {
        const labInk = "rgba(236, 228, 214, 0.25)";
        const labRed = "rgba(235, 87, 87, 0.7)";
        const labOrange = "rgba(242, 153, 74, 0.7)";
        drawPass(labInk, labRed, labOrange, { top: Math.max(0, computedLabY), bottom: height });
      }

      if (!isReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [labTopY, calmMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
