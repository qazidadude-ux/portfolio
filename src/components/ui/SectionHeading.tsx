import type { ReactNode } from "react";
import { Parallax } from "@/components/motion/Parallax";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gray-600">
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h1";
}) {
  // Titles float up slightly faster than the page. `className` is for layout, so it goes on the
  // parallax wrapper (the element the parent actually lays out).
  return (
    <Parallax distance={24} className={className}>
      <Tag className="text-[40px] font-medium leading-[1.05] text-balance md:text-[52px] lg:text-[64px]">
        {children}
      </Tag>
    </Parallax>
  );
}
