import Link from "next/link";
import type { ReactNode } from "react";
import { BUTTON_SIZES, type ButtonSize } from "@/components/ui/pill";

type Common = {
  children: ReactNode;
  size?: ButtonSize;
  /** Fill: primary blue (default) or secondary lime. */
  tone?: "primary" | "secondary";
  /** Classes for layout (margins, width, shrink). */
  className?: string;
};

type LinkProps = Common & { href: string; external?: boolean };
type ActionProps = Common & { onClick: () => void; "aria-expanded"?: boolean };

// Solid pill used for every button on the site, with the wiggly hover: a springy grow and a
// gooey blob that follows the pointer (see .goo-button in globals.css and GooFilter).
export function Button(props: LinkProps | ActionProps) {
  const { children, size = "md", tone = "primary", className = "" } = props;
  const classes = `goo-button goo-button--${tone} gap-1.5 ${BUTTON_SIZES[size]} ${className}`;

  if ("href" in props) {
    if (props.external || /^(https?:|mailto:)/.test(props.href)) {
      return (
        <a href={props.href} className={classes} {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} aria-expanded={props["aria-expanded"]} className={classes}>
      {children}
    </button>
  );
}
