import Link from "next/link";
import type { ReactNode } from "react";
import type { ButtonSize } from "@/components/ui/pill";

type Common = {
  children: ReactNode;
  size?: ButtonSize;
  /** Classes for the button itself (layout: margins, width). */
  className?: string;
};

type LinkProps = Common & { href: string; external?: boolean };
type ActionProps = Common & { onClick: () => void };

// Dark button with a lime block holding a chevron. On hover/focus the block stretches across the
// whole button, trailing chevrons fade in and a shine flies through them faster. Styles: .arrow-btn
// in globals.css.
export function ArrowButton(props: LinkProps | ActionProps) {
  const { children, size = "md", className = "" } = props;
  const classes = `arrow-btn arrow-btn--${size} ${className}`;
  const inner = (
    <>
      <span aria-hidden className="arrow-btn__fill">
        <span className="arrow-btn__track">
          <span className="arrow-btn__chevron" />
          <span className="arrow-btn__trail" />
        </span>
      </span>
      <span className="arrow-btn__label">{children}</span>
    </>
  );

  if ("href" in props) {
    if (props.external || /^(https?:|mailto:)/.test(props.href)) {
      return (
        <a href={props.href} className={classes} {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {inner}
    </button>
  );
}
