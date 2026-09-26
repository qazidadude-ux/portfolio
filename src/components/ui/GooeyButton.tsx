"use client";

import type { PointerEvent, ReactNode } from "react";

// How far (px) the goo may bulge outside the button; must match --goo-reach in globals.css.
const REACH = 20;

type GooeyButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

// Brand-colored pill whose fill is blurred and re-sharpened by the #goo SVG filter (see GooFilter);
// on hover a lighter blob follows the pointer and melts out of the edge. Styles: .goo-button in
// globals.css.
export function GooeyButton({ href, children, variant = "primary", external, className = "" }: GooeyButtonProps) {
  // Pointer position as a percentage of the ::before box, which extends REACH px past each edge.
  const trackPointer = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--goo-x", String(((e.clientX - r.left + REACH) / (r.width + REACH * 2)) * 100));
    e.currentTarget.style.setProperty("--goo-y", String(((e.clientY - r.top + REACH) / (r.height + REACH * 2)) * 100));
  };

  return (
    <a
      href={href}
      onPointerMove={trackPointer}
      className={`goo-button ${variant === "secondary" ? "goo-button--secondary" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

// The SVG filter every GooeyButton references. Render once per page (the root layout does).
export function GooFilter() {
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
