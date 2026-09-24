import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SITE } from "@/data/site";

// Fixed pastel tones (not theme tokens) so the initials stay readable in dark mode too.
const AVATAR_TONES = ["bg-[#dedede]", "bg-[#f0f0f0]", "bg-[#e6e1d9]", "bg-[#dde6df]", "bg-[#e2dff0]", "bg-[#f0e3dc]"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

// Stand-in for a client photo until real headshots are added.
export function InitialsAvatar({ name, index, className }: { name: string; index: number; className: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-[#545454] ${AVATAR_TONES[index % AVATAR_TONES.length]} ${className}`}
    >
      {initials(name)}
    </span>
  );
}

export function HappyClients() {
  return (
    <div className="flex items-center gap-3 pr-3" aria-label={`${SITE.happyClients} happy clients`}>
      <div className="flex -space-x-2.5 px-4">
        {TESTIMONIALS.slice(0, 5).map((t, i) => (
          <InitialsAvatar key={t.name} name={t.name} index={i} className="h-8 w-8 text-[10px] ring-2 ring-gray-50" />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="h-3 w-3 fill-black text-black" />
          ))}
        </div>
        <p className="whitespace-nowrap text-sm font-semibold tracking-[-0.02em] text-gray-600">
          {SITE.happyClients} Happy clients
        </p>
      </div>
    </div>
  );
}
