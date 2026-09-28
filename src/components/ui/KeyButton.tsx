import Link from "next/link";
import type { ReactNode } from "react";

// A 3D keyboard-key button: a lit keycap face sits on a darker base and presses down into it on
// click, taking the label with it. Styles: .key-btn in globals.css.
export function KeyButton({ href, children, external, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  const inner = (
    <span className="key-btn__cap">
      <span className="key-btn__label">{children}</span>
    </span>
  );

  if (external || /^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={`key-btn ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`key-btn ${className}`}>
      {inner}
    </Link>
  );
}
