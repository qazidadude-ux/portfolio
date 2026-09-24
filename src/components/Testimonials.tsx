"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { HappyClients, InitialsAvatar } from "@/components/HappyClients";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

function QuoteText({ quote, highlight }: { quote: string; highlight?: string }) {
  const at = highlight ? quote.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, at)}
      <strong className="font-semibold">{highlight}</strong>
      {quote.slice(at + highlight.length)}
    </>
  );
}

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-max flex flex-col gap-12 md:gap-16">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-6">
          <SectionHeading className="md:flex-1">
            <span className="text-gray-500">Hear from what my </span>
            clients have to say.
          </SectionHeading>
          <HappyClients />
        </Reveal>

        <RevealGroup className="no-scrollbar -mx-[44px] flex snap-x snap-mandatory scroll-px-[44px] gap-3 overflow-x-auto px-[44px] pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={revealItem}
              className={`flex h-[280px] w-[85%] max-w-[315px] shrink-0 snap-start flex-col justify-between rounded-[16px] border border-gray-200 bg-white p-6 md:w-auto md:max-w-none ${CARD_SHADOW}`}
            >
              <div className="flex flex-col gap-1">
                <Quote className="h-6 w-6 fill-black text-black" strokeWidth={0} aria-hidden />
                <blockquote className="text-sm font-medium leading-[1.6] tracking-[-0.01em]">
                  <QuoteText quote={t.quote} highlight={t.highlight} />
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-2.5">
                <InitialsAvatar name={t.name} index={i} className="h-[38px] w-[38px] text-xs" />
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold tracking-[-0.02em]">{t.name}</p>
                  <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
