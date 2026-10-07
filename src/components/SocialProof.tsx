import { HappyClients } from "@/components/HappyClients";
import { LogoTicker } from "@/components/LogoTicker";

// Bar directly under the hero: happy-clients badge beside the scrolling client strip.
export function SocialProof() {
  return (
    <section aria-label="Happy clients">
      {/* Phones: 24px top and bottom; a 32px bar from md. */}
      <div className="container-max flex flex-col gap-6 py-6 md:flex-row md:items-center md:gap-8 md:py-8">
        <HappyClients />
        <LogoTicker />
      </div>
    </section>
  );
}
