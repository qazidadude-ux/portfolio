"use client";

import { useEffect } from "react";

// How far (px) the goo may bulge outside a button; must match --goo-reach in globals.css.
const REACH = 20;

// The SVG filter behind every .goo-button, plus one page-wide pointer listener that feeds each
// button the cursor position (as a percentage of its ::before box, which extends REACH px past
// each edge) so the hover blob follows the mouse. Render once, in the root layout.
export function GooFilter() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".goo-button");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--goo-x", String(((e.clientX - r.left + REACH) / (r.width + REACH * 2)) * 100));
      el.style.setProperty("--goo-y", String(((e.clientY - r.top + REACH) / (r.height + REACH * 2)) * 100));
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

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
