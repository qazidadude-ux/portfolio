"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counts every number in `value` up from 0 the first time it scrolls into view ("65%",
// "2m 40s", "2.5 / 5"); the surrounding text stays as is. Decimals keep their places.
const NUMBER = /\d+(?:\.\d+)?/g;

export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion jumps straight to the final value. Done here rather than in render: the
    // server can't know the preference, so a render-time branch would mismatch on hydration.
    const controls = animate(0, 1, { duration: reduce ? 0 : duration, ease: [0.16, 1, 0.3, 1], onUpdate: setProgress });
    return () => controls.stop();
  }, [inView, reduce, duration]);

  const text = value.replace(NUMBER, (n) => {
    const decimals = n.split(".")[1]?.length ?? 0;
    return (parseFloat(n) * progress).toFixed(decimals);
  });

  return (
    // tabular-nums keeps the width steady while digits change; the label reads the final value.
    <span ref={ref} className="tabular-nums" aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
