import { TESTIMONIALS } from "@/data/testimonials";
import { SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { DragCarousel } from "@/components/DragCarousel";

export function TestimonialsCarousel() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-max">
        <Reveal>
          <Eyebrow>Trusted by many</Eyebrow>
          <SectionHeading className="mt-4">
            Hear from what my clients have to say.
          </SectionHeading>
          <p className="mt-2 text-sm text-gray-500">{SITE.happyClients} Happy clients</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <DragCarousel className="container-max">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="w-[85vw] max-w-sm shrink-0 snap-start rounded-[24px] border border-gray-150 bg-gray-50 p-7"
            >
              <p className="text-base leading-relaxed text-balance">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-gray-500"> — {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </DragCarousel>
      </Reveal>
    </section>
  );
}
