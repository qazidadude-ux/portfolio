import { Circle, Infinity as InfinityIcon, Triangle, Waves, type LucideIcon } from "lucide-react";
import { CLIENTS } from "@/data/site";

// Wordmark stand-ins; swap for real logo files when you have them.
const CLIENT_MARKS: Record<(typeof CLIENTS)[number], LucideIcon> = {
  Kora: Circle,
  KYMA: Waves,
  Mugen: InfinityIcon,
  Axiom: Triangle,
};

// Repeat the list inside each half so a half is always wider than the visible strip.
const HALF = [...CLIENTS, ...CLIENTS];

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-16 pr-16">
      {HALF.map((name, i) => {
        const Mark = CLIENT_MARKS[name];
        return (
          <li key={`${name}-${i}`} className="flex shrink-0 items-center gap-2 text-black">
            <Mark className="h-6 w-6" strokeWidth={2.25} />
            <span className="text-2xl font-semibold tracking-[-0.04em]">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section aria-label="Clients">
      <div className="container-max flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 text-lg font-medium tracking-[-0.03em] text-gray-600 md:text-[22px]">
          Trusted by <strong className="font-semibold text-black">many</strong>
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden opacity-70 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex w-max animate-marquee">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
