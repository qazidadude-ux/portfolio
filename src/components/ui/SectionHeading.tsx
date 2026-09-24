import { clsx } from "clsx";
import type { ReactNode } from "react";

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
  return (
    <Tag
      className={clsx(
        "text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] text-balance",
        className
      )}
    >
      {children}
    </Tag>
  );
}
