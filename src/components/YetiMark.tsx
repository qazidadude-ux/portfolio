"use client";

import { useEffect, useRef } from "react";

// Brandcave's yeti (top half) shown inline before the company name in the hero title. The head
// tilts and leans toward the cursor while the body stays put; the face also shifts a touch further,
// so it reads as the yeti turning to look. Mouse only; elsewhere it's a still picture.
//
// The fur is one shape in the artwork, so the head is cut out with clip-paths: one copy of the body
// art clipped to everything below the neck, another clipped to the head (reaching a little past the
// neck so no gap opens as it tilts), with the face layer riding on the head. Coordinates are % of
// the 644 × 405 artwork.
const HEAD_CLIP = "polygon(15.5% 0%, 54.5% 0%, 54.5% 50.5%, 15.5% 50.5%)"; // x 100–351, y 0–205
const BODY_CLIP = "polygon(0% 0%, 15.5% 0%, 15.5% 47%, 54.5% 47%, 54.5% 0%, 100% 0%, 100% 100%, 0% 100%)"; // all but y < 190 over the head
const PIVOT = "35% 49%"; // the neck

const MAX_TILT = 8; // degrees
const MAX_LEAN = 2; // % the head slides toward the cursor
const MAX_LOOK = 1.5; // % the face slides on top of that
const REACH = 400; // px from the head at which the motion is full
const EASE = 0.12; // per-frame catch-up toward the target

export function YetiMark({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const head = headRef.current;
    const face = faceRef.current;
    if (!root || !head || !face || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      // The head sits at about 35% across and 25% down the picture.
      const r = root.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width * 0.35);
      const dy = e.clientY - (r.top + r.height * 0.25);
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(dist / REACH, 1);
      target.x = (dx / dist) * k; // -1…1
      target.y = (dy / dist) * k;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      now.x += (target.x - now.x) * EASE;
      now.y += (target.y - now.y) * EASE;
      head.style.transform = `translate(${(now.x * MAX_LEAN).toFixed(2)}%, ${(now.y * MAX_LEAN).toFixed(2)}%) rotate(${(now.x * MAX_TILT).toFixed(2)}deg)`;
      face.style.transform = `translate(${(now.x * MAX_LOOK).toFixed(2)}%, ${(now.y * MAX_LOOK).toFixed(2)}%)`;
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };

    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={rootRef} aria-hidden className={`relative inline-block aspect-[644/405] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG layers */}
      <img
        src="/brandcave-yeti-body.svg"
        alt=""
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: BODY_CLIP }}
        draggable={false}
      />
      <span
        ref={headRef}
        className="absolute inset-0 will-change-transform"
        style={{ clipPath: HEAD_CLIP, transformOrigin: PIVOT }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG layers */}
        <img src="/brandcave-yeti-body.svg" alt="" className="absolute inset-0 h-full w-full" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG layers */}
        <img
          ref={faceRef}
          src="/brandcave-yeti-face.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
          draggable={false}
        />
      </span>
    </span>
  );
}
