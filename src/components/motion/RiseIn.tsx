"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Card entrance: rises in from slightly below and fades up as it scrolls into view, once.
// Pass `delay` (e.g. index * 0.08) to stagger cards in a row. `as` picks the element.
export function RiseIn({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
