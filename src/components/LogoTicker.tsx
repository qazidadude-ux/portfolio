import { CLIENTS } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";

// Repeat the list inside each copy so a copy is always wider than the visible strip.
const HALF = [...CLIENTS, ...CLIENTS];

// Infinitely scrolling client strip, faded at both edges. The logos come in mixed colours, so
// they're flattened to white to sit evenly on the dark background.
export function LogoTicker() {
  return (
    // 50s per copy (~90px/s): slowed down on request.
    <Marquee
      seconds={50}
      className="flex-1 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
      rowClassName="gap-16 pr-16"
    >
      {HALF.map((client, i) => (
        <li key={`${client.file}-${i}`} className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVGs, no optimisation needed */}
          <img
            src={`/clients/${client.file}`}
            alt={i < CLIENTS.length ? client.name : ""}
            className="h-7 w-auto max-w-[140px] object-contain brightness-0 invert"
            loading="lazy"
            draggable={false}
          />
        </li>
      ))}
    </Marquee>
  );
}
