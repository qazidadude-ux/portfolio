"use client";

import { useEffect, useRef } from "react";

// Neon trail behind the pointer, after threejs-toys' neonCursor but drawn on a 2D canvas (no three.js).
// A chain of points eases after the pointer; it is drawn as a thin glowing stroke that tapers from
// RADIUS2 at the head to RADIUS1 at the tail, cut off after MAX_TRAIL px. Brand blue while still,
// lime while moving.
// After a moment of stillness the head drifts in a slow loop around the pointer ("sleep").
// Mouse only.
const CURVE_POINTS = 80;
const CURVE_LERP = 0.5;
const RADIUS1 = 2; // stroke width at the tail (px)
const RADIUS2 = 4; // stroke width at the head (px)
const MAX_TRAIL = 192; // longest visible trail (px)
const CURSOR_SIZE = 12; // white dot that replaces the system cursor (px)
const VELOCITY_THRESHOLD = 10; // px per frame at which the colour is fully lime
const SLEEP_RADIUS = { x: 100, y: 100 };
const SLEEP_TIME_COEF = { x: 0.0025, y: 0.0025 };
const SLEEP_AFTER_MS = 1200;

const STILL = [0x00, 0x27, 0xdc]; // primary #0027DC
const MOVING = [0xc7, 0xff, 0x84]; // secondary #C7FF84

const mix = (t: number) => STILL.map((c, i) => Math.round(c + (MOVING[i] - c) * t)).join(",");

export function NeonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;
    // Mouse only. Deliberately not gated on prefers-reduced-motion: the trail only moves with the
    // pointer, and the owner wants it shown even with the OS animation effects switched off.
    if (!matchMedia("(pointer: fine)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pointer = { x: w / 2, y: h / 2 };
    let seen = false;
    let lastMove = 0;
    let sleepStart = 0;
    let sleepBlend = 0;
    let speed = 0;
    const prev = { ...pointer };
    const pts = Array.from({ length: CURVE_POINTS }, () => ({ ...pointer }));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      // The dot follows the pointer straight away (no wait for the next frame).
      dot.style.transform = `translate3d(${pointer.x - CURSOR_SIZE / 2}px, ${pointer.y - CURSOR_SIZE / 2}px, 0)`;
      dot.style.opacity = "1";
      lastMove = performance.now();
      if (!seen) {
        seen = true;
        prev.x = pointer.x;
        prev.y = pointer.y;
        for (const p of pts) Object.assign(p, pointer);
      }
    };

    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      if (!seen) return;

      // Colour follows the pointer's own speed, smoothed so it fades rather than flickers.
      const moved = Math.hypot(pointer.x - prev.x, pointer.y - prev.y);
      prev.x = pointer.x;
      prev.y = pointer.y;
      speed += (moved - speed) * 0.12;
      const t = Math.min(speed / VELOCITY_THRESHOLD, 1);

      // Sleep: once still, ease the head onto a slow loop around the pointer.
      const asleep = now - lastMove > SLEEP_AFTER_MS;
      if (asleep && sleepBlend === 0) sleepStart = now;
      sleepBlend += ((asleep ? 1 : 0) - sleepBlend) * 0.03;
      if (sleepBlend < 0.001) sleepBlend = 0;
      const st = now - sleepStart;
      const head = {
        x: pointer.x + Math.sin(st * SLEEP_TIME_COEF.x) * SLEEP_RADIUS.x * sleepBlend,
        y: pointer.y + Math.sin(st * SLEEP_TIME_COEF.y * 2) * SLEEP_RADIUS.y * 0.5 * sleepBlend,
      };

      // Each point eases toward the one ahead of it.
      pts[0].x += (head.x - pts[0].x) * CURVE_LERP;
      pts[0].y += (head.y - pts[0].y) * CURVE_LERP;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * CURVE_LERP;
        pts[i].y += (pts[i - 1].y - pts[i].y) * CURVE_LERP;
      }

      // Only the first MAX_TRAIL px of the chain are drawn: walk it from the head and cut the last
      // segment short where the length runs out.
      const trail = [pts[0]];
      let run = 0;
      for (let i = 1; i < pts.length && run < MAX_TRAIL; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const seg = Math.hypot(b.x - a.x, b.y - a.y);
        if (run + seg > MAX_TRAIL) {
          const k = (MAX_TRAIL - run) / seg;
          trail.push({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
          break;
        }
        run += seg;
        trail.push(b);
      }

      // Thin glowing stroke as continuous paths (per-segment strokes bead at the joints): the whole
      // trail at RADIUS1, then its front half again at RADIUS2, both fading from head to tail.
      const rgb = mix(t);
      const tail = trail[trail.length - 1];
      const fade = ctx.createLinearGradient(trail[0].x, trail[0].y, tail.x, tail.y);
      fade.addColorStop(0, `rgba(${rgb},1)`);
      fade.addColorStop(1, `rgba(${rgb},0)`);
      const path = (n: number) => {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < n; i++) ctx.lineTo(trail[i].x, trail[i].y);
      };
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = fade;
      ctx.shadowColor = `rgba(${rgb},0.9)`;
      ctx.shadowBlur = 10;
      path(trail.length);
      ctx.lineWidth = RADIUS1;
      ctx.stroke();
      path(Math.ceil(trail.length / 2));
      ctx.lineWidth = RADIUS2;
      ctx.stroke();
      // Head dot, so a still pointer still shows a point of light.
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, RADIUS2 / 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Hide the dot while the pointer is outside the window.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) dot.style.opacity = "0";
    };
    const onOver = () => {
      if (seen) dot.style.opacity = "1";
    };

    document.documentElement.classList.add("neon-cursor");
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerover", onOver);
    addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("neon-cursor");
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerover", onOver);
      removeEventListener("resize", resize);
    };
  }, []);

  // Both above the page but never in the way of clicks. The dot is the cursor itself (the system
  // one is hidden, see .neon-cursor in globals.css): white with mix-blend-difference, so it reads
  // white on dark and turns black over white.
  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998] h-screen w-screen" />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[#fff] opacity-0 mix-blend-difference"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
      />
    </>
  );
}
