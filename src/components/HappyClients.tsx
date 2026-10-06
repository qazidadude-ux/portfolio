import { Star } from "lucide-react";
import { SITE } from "@/data/site";

export function HappyClients() {
  return (
    <div className="flex flex-col gap-1.5 pr-3" aria-label={`${SITE.happyClients} happy clients`}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          // Fixed gold (not a theme token) so the stars stay gold in dark mode too.
          <Star key={i} className="h-3 w-3 fill-[#F5B301] text-[#F5B301]" />
        ))}
      </div>
      <p className="whitespace-nowrap text-sm font-semibold tracking-[-0.02em] text-gray-600">
        {SITE.happyClients} Happy clients
      </p>
    </div>
  );
}
