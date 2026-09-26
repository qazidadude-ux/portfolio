import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { button, type ButtonSize, type ButtonTone } from "@/components/ui/pill";

type Variant = "primary" | "secondary" | "ghost";

// Every variant is a gooey button; the variant only picks its fill.
const TONES: Record<Variant, ButtonTone> = {
  primary: "ink",
  secondary: "gray",
  ghost: "gray",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
}) {
  const classes = clsx("gap-2", button(TONES[variant], size), className);

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
