"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// How far (px) the goo may bulge outside a button; must match --goo-reach in globals.css.
const REACH = 20;

// Intro swirl, as in the original gooey button: the blob orbits the button once, angle 4 → 11.5
// rad at 0.03 rad per 16ms (≈4s).
const SWIRL_FROM = 4;
const SWIRL_TO = 11.5;
const SWIRL_RAD_PER_MS = 0.03 / 16;

const gooButton = (target: EventTarget | null) => (target as Element | null)?.closest?.<HTMLElement>(".goo-button");

// The SVG filter behind every .goo-button, plus the pointer tracking that drives it: one
// page-wide listener feeds each button the cursor position (as a percentage of its ::before box,
// which extends REACH px past each edge) so the hover blob follows the mouse. Each button also
// plays the intro swirl once, the first time it's fully on screen. Render once, in the root layout.
export function GooFilter() {
  const pathname = usePathname();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = gooButton(e.target);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--goo-x", String(((e.clientX - r.left + REACH) / (r.width + REACH * 2)) * 100));
      el.style.setProperty("--goo-y", String(((e.clientY - r.top + REACH) / (r.height + REACH * 2)) * 100));
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Re-run per page: the layout (and this component) persists across client-side navigation.
  useEffect(() => {
    const running = new Map<HTMLElement, number>();

    const stop = (el: HTMLElement) => {
      cancelAnimationFrame(running.get(el) ?? 0);
      running.delete(el);
      el.style.removeProperty("--goo-a");
    };

    const swirl = (el: HTMLElement) => {
      el.style.setProperty("--goo-a", "100%");
      const start = performance.now();
      const tick = (now: number) => {
        const angle = SWIRL_FROM + (now - start) * SWIRL_RAD_PER_MS;
        if (angle > SWIRL_TO) return stop(el);
        el.style.setProperty("--goo-x", String(((Math.cos(angle) + 2) / 3.6) * 100));
        el.style.setProperty("--goo-y", String(((Math.sin(angle) + 2) / 3.6) * 100));
        running.set(el, requestAnimationFrame(tick));
      };
      running.set(el, requestAnimationFrame(tick));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          swirl(entry.target as HTMLElement);
        }
      },
      { threshold: 0.9 },
    );
    document.querySelectorAll<HTMLElement>(".goo-button").forEach((el) => observer.observe(el));

    // Hovering takes over from the intro immediately.
    const onOver = (e: PointerEvent) => {
      const el = gooButton(e.target);
      if (el && running.has(el)) stop(el);
    };
    document.addEventListener("pointerover", onOver);

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerover", onOver);
      running.forEach((_, el) => stop(el));
    };
  }, [pathname]);

  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 1" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="-5 11" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
