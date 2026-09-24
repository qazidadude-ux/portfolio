"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SITE } from "@/data/site";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const AVATAR_TONES = ["bg-gray-200", "bg-gray-150", "bg-[#e6e1d9]", "bg-[#dde6df]", "bg-[#e2dff0]", "bg-[#f0e3dc]"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

function Avatar({ name, index, className }: { name: string; index: number; className: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-gray-600 ${AVATAR_TONES[index % AVATAR_TONES.length]} ${className}`}
    >
      {initials(name)}
    </span>
  );
}

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

function HappyClients() {
  return (
    <div className="flex items-center gap-3 pr-3" aria-label={`${SITE.happyClients} happy clients`}>
      <div className="flex -space-x-2.5 px-4">
        {TESTIMONIALS.slice(0, 5).map((t, i) => (
          <Avatar key={t.name} name={t.name} index={i} className="h-8 w-8 text-[10px] ring-2 ring-gray-50" />
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
              className={`flex h-[280px] w-[85%] max-w-[315px] shrink-0 snap-start flex-col justify-between rounded-[16px] border border-[#dedede] bg-white p-6 md:w-auto md:max-w-none ${CARD_SHADOW}`}
            >
              <div className="flex flex-col gap-1">
                <Quote className="h-6 w-6 fill-black text-black" strokeWidth={0} aria-hidden />
                <blockquote className="text-sm font-medium leading-[1.6] tracking-[-0.01em]">
                  <QuoteText quote={t.quote} highlight={t.highlight} />
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-2.5">
                <Avatar name={t.name} index={i} className="h-[38px] w-[38px] text-xs" />
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
