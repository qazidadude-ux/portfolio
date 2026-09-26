"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type UseScrollOptions } from "framer-motion";

type Mode = "through" | "top" | "enter";

// Scroll ranges (framer-motion offsets) and the y values across them, per mode:
//   through: element crosses the viewport; moves from +d to -d (positive d = faster than the page)
//   top:     element starts at the top of the page; drifts from 0 to d as it scrolls away
//   enter:   element enters from below and settles; moves from d to 0 by the time it's fully in view
const MODES: Record<Mode, { offset: NonNullable<UseScrollOptions["offset"]>; range: (d: number) => [number, number] }> = {
  through: { offset: ["start end", "end start"], range: (d) => [d, -d] },
  top: { offset: ["start start", "end start"], range: (d) => [0, d] },
  enter: { offset: ["start end", "end end"], range: (d) => [d, 0] },
};

// Moves its children vertically as the page scrolls. framer-motion measures the element by its
// layout offsets, so the transform applied here doesn't feed back into the measurement.
export function Parallax({
  children,
  distance = 40,
  mode = "through",
  className,
}: {
  children: ReactNode;
  /** Pixels of travel; see MODES for how it's applied. */
  distance?: number;
  mode?: Mode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { offset, range } = MODES[mode];
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], range(distance));

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Fills its (positioned) parent and slides a fill-mode image inside it as the frame crosses the
// viewport, like looking through a window. The moving layer is taller than the frame by `shift`
// px on each side, so no gap ever shows at the edges.
export function ParallaxImage({ children, shift = 40 }: { children: ReactNode; shift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-shift, shift]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, top: -shift, bottom: -shift }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}
