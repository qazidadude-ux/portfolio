import type { CSSProperties, ReactNode } from "react";

// Deterministic PRNG so server and client render identical stars (no hydration mismatch).
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(245);
const between = (min: number, max: number) => Math.floor(rand() * (max - min + 1) + min);

const makeStar = () =>
  ({
    "--duration": between(6, 20),
    "--delay": between(1, 10),
    "--alpha": between(40, 90) / 100,
    "--size": between(2, 6),
    "--distance": between(40, 200),
  }) as CSSProperties;

const STATIC_STARS = Array.from({ length: 4 }, makeStar);
const RING_STARS = Array.from({ length: 20 }, makeStar);

type GalaxyButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

// Dark pill with an orbiting spark border; on hover it glows and a starfield swirls inside.
// Styles live in globals.css under the gx- prefix.
export function GalaxyButton({ href, children, external, className = "" }: GalaxyButtonProps) {
  return (
    <a
      href={href}
      className={`gx-button ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span aria-hidden className="gx-spark" />
      <span aria-hidden className="gx-backdrop" />
      <span aria-hidden className="gx-starfield">
        {STATIC_STARS.map((style, i) => (
          <span key={i} className="gx-star gx-star--static" style={style} />
        ))}
      </span>
      <span aria-hidden className="gx-galaxy">
        <span className="gx-ring">
          {RING_STARS.map((style, i) => (
            <span key={i} className="gx-star" style={style} />
          ))}
        </span>
      </span>
      <span className="gx-content">{children}</span>
    </a>
  );
}
