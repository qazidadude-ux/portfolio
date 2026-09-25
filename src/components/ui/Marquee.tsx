import type { ReactNode } from "react";

type MarqueeProps = {
  /** List items for one copy of the strip. Each copy must be wider than the viewport. */
  children: ReactNode;
  /** Seconds for one copy to scroll past; higher is slower. */
  seconds?: number;
  /** Scroll left to right instead of right to left. */
  reverse?: boolean;
  /** Classes for the clipping viewport (sizing, mask, padding). */
  className?: string;
  /** Classes for each copy. Include a trailing padding equal to the gap so the loop is seamless. */
  rowClassName?: string;
};

// Infinite strip: the track holds two identical copies and slides by half its width (see
// .animate-marquee), pausing while hovered.
export function Marquee({ children, seconds = 25, reverse = false, className = "", rowClassName = "" }: MarqueeProps) {
  return (
    <div className={`relative min-w-0 overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <ul className={`flex shrink-0 items-center ${rowClassName}`}>{children}</ul>
        <ul aria-hidden className={`flex shrink-0 items-center ${rowClassName}`}>
          {children}
        </ul>
      </div>
    </div>
  );
}
