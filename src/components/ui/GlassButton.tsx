import Link from "next/link";
import type { ReactNode } from "react";
import { BUTTON_SIZES, type ButtonSize } from "@/components/ui/pill";

type Common = {
  children: ReactNode;
  size?: ButtonSize;
  /** Classes for the outer wrapper (layout: margins, width, shrink). */
  className?: string;
};

type LinkProps = Common & { href: string; external?: boolean };
type ActionProps = Common & { onClick: () => void; "aria-expanded"?: boolean };

// Frosted "glass" pill used for every button on the site: translucent fill with inner highlights,
// a conic outline that rotates on hover, a sweeping sheen, and a soft offset shadow. Pressing tilts
// the whole button back. Styles: .glass-* in globals.css.
export function GlassButton(props: LinkProps | ActionProps) {
  const { children, size = "md", className = "" } = props;
  const label = <span className={`glass-label ${BUTTON_SIZES[size]}`}>{children}</span>;

  let control: ReactNode;
  if ("href" in props) {
    const external = props.external || /^(https?:|mailto:)/.test(props.href);
    control = external ? (
      <a href={props.href} className="glass-button" {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {label}
      </a>
    ) : (
      <Link href={props.href} className="glass-button">
        {label}
      </Link>
    );
  } else {
    control = (
      <button type="button" onClick={props.onClick} aria-expanded={props["aria-expanded"]} className="glass-button">
        {label}
      </button>
    );
  }

  return (
    <span className={`glass-wrap ${className}`}>
      {control}
      <span aria-hidden className="glass-shadow" />
    </span>
  );
}
