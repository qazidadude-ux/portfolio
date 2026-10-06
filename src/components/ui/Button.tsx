import Link from "next/link";
import type { ReactNode } from "react";

// Buttons styled after shadcn/ui's Button: 8px corners, fixed heights, 14px medium text, a soft
// shadow, a gentle hover tint and a 3px focus ring. Colors use the site's brand tokens
// (primary blue, secondary lime) and the theme grays.
const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-medium transition-[color,background-color,box-shadow,opacity] outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const VARIANTS = {
  default: "bg-primary text-[#ffffff] shadow-xs hover:bg-primary/90",
  secondary: "bg-secondary text-[#000000] shadow-xs hover:bg-secondary/80",
  // Outline in the same gray as the page guide lines (gray-150), white icon/text, faint tint on hover.
  outline: "border border-gray-150 bg-transparent text-[#ffffff] shadow-xs hover:bg-[rgba(255,255,255,0.1)]",
  ghost: "text-black hover:bg-gray-150",
} as const;

const SIZES = {
  sm: "h-8 gap-1.5 px-3",
  default: "h-9 px-4 py-2",
  lg: "h-10 px-6",
  icon: "size-9",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

/** Class string for a shadcn-style button, for elements that aren't <Button> (e.g. icon buttons). */
export const buttonVariants = ({ variant = "default", size = "default" }: { variant?: ButtonVariant; size?: ButtonSize } = {}) =>
  `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`;

type Common = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Classes for layout (margins, width, shrink). */
  className?: string;
};

type LinkProps = Common & { href: string; external?: boolean };
type ActionProps = Common & { onClick: () => void; "aria-expanded"?: boolean };

export function Button(props: LinkProps | ActionProps) {
  const { children, variant, size, className = "" } = props;
  const classes = `${buttonVariants({ variant, size })} ${className}`;

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
