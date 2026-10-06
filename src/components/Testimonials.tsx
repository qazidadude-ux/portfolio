"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { HappyClients } from "@/components/HappyClients";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

function QuoteText({ quote, highlight }: { quote: string; highlight?: string }) {
  const at = highlight ? quote.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, at)}
      <strong className="font-normal text-black">{highlight}</strong>
      {quote.slice(at + highlight.length)}
    </>
  );
}

// One row of testimonials that scrolls sideways: three cards in view on desktop, two on tablets,
// one (with a peek of the next) on phones. The chevrons step one card at a time and fade out at
// either end; swiping and trackpad scrolling work too.
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("figure");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-max flex flex-col gap-6 md:gap-16">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-6">
          <SectionHeading className="md:flex-1">
            <span className="text-gray-500">Hear from what my </span>
            clients have to say.
          </SectionHeading>
          <HappyClients />
        </Reveal>

        <div className="flex flex-col gap-6 md:gap-8">
          <RevealGroup>
            <div
              ref={trackRef}
              className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:scroll-px-0 md:gap-4 md:px-0"
            >
              {TESTIMONIALS.map((t) => (
                <motion.figure
                  key={t.name}
                  variants={revealItem}
                  className={`flex min-h-[320px] w-[85%] shrink-0 snap-start flex-col justify-between gap-8 rounded-[12px] border border-gray-200 bg-white p-6 md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)] ${CARD_SHADOW}`}
                >
                  <div className="flex flex-col gap-3">
                    <Quote className="h-6 w-6 fill-secondary text-secondary" strokeWidth={0} aria-hidden />
                    <blockquote className="text-xl font-normal leading-[1.5] tracking-[-0.01em]">
                      <QuoteText quote={t.quote} highlight={t.highlight} />
                    </blockquote>
                  </div>
                  <figcaption className="flex flex-col gap-1.5">
                    <p className="text-sm font-normal tracking-[-0.02em]">{t.name}</p>
                    <p className="text-xs font-normal tracking-[-0.02em] text-gray-600">{t.role}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </RevealGroup>

          {/* Same chevron buttons as the Selected Visuals carousel (shadcn outline icon buttons). */}
          <div className="flex justify-center gap-3">
            {(
              [
                { label: "Previous testimonials", dir: -1, Icon: ChevronLeft, disabled: atStart },
                { label: "Next testimonials", dir: 1, Icon: ChevronRight, disabled: atEnd },
              ] as const
            ).map(({ label, dir, Icon, disabled }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                disabled={disabled}
                onClick={() => step(dir)}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
