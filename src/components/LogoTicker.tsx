import { Circle, Infinity as InfinityIcon, Triangle, Waves, type LucideIcon } from "lucide-react";
import { CLIENTS } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";

// Wordmark stand-ins; swap for real logo files when you have them.
const CLIENT_MARKS: Record<(typeof CLIENTS)[number], LucideIcon> = {
  Kora: Circle,
  KYMA: Waves,
  Mugen: InfinityIcon,
  Axiom: Triangle,
};

// Repeat the list inside each copy so a copy is always wider than the visible strip.
const HALF = [...CLIENTS, ...CLIENTS];

// Infinitely scrolling client strip, faded at both edges.
export function LogoTicker() {
  return (
    <Marquee
      className="flex-1 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
      rowClassName="gap-16 pr-16"
    >
      {HALF.map((name, i) => {
        const Mark = CLIENT_MARKS[name];
        return (
          <li key={`${name}-${i}`} className="flex shrink-0 items-center gap-2 text-black">
            <Mark className="h-6 w-6" strokeWidth={2.25} />
            <span className="text-2xl font-semibold tracking-[-0.04em]">{name}</span>
          </li>
        );
      })}
    </Marquee>
  );
}
