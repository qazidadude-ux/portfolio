"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * A horizontal, drag-to-scroll carousel built on native overflow-x scrolling
 * (with snap), plus a lightweight pointer-drag handler so it also feels
 * natural with a mouse on desktop. Touch scrolling on mobile just works
 * because it's native scroll underneath.
 */
export function DragCarousel({ children, className }: { children: ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ isDown: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    state.current = { isDown: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !state.current.isDown) return;
    const dx = e.clientX - state.current.startX;
    el.scrollLeft = state.current.startScroll - dx;
  };

  const endDrag = () => {
    state.current.isDown = false;
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 cursor-grab active:cursor-grabbing ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
