import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[1000px] px-6 py-3 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-800 hover:-translate-y-0.5 shadow-card",
  secondary: "bg-white text-black border border-gray-200 hover:border-black hover:-translate-y-0.5",
  ghost: "bg-gray-100 text-black hover:bg-gray-150",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = clsx(base, variants[variant], className);

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
