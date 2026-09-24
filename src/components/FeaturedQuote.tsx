import { FEATURED_TESTIMONIAL } from "@/data/testimonials";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedQuote() {
  return (
    <section className="container-max py-24">
      <Reveal>
        <blockquote className="mx-auto flex max-w-[780px] flex-col items-center text-center">
          <p className="text-[22px] font-medium leading-[1.4] tracking-[-0.03em] text-black text-balance md:text-[28px] md:leading-[39px]">
            &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
          </p>
          <footer className="mt-8 text-sm text-gray-500">
            <span className="font-medium text-black">{FEATURED_TESTIMONIAL.name}</span>
            {" — "}
            {FEATURED_TESTIMONIAL.role}
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
