import { FEATURED_TESTIMONIAL } from "@/data/testimonials";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedQuote() {
  return (
    <section className="container-max py-16 md:py-20">
      <Reveal>
        <blockquote className="rounded-[24px] bg-gray-50 p-8 md:p-14">
          <p className="max-w-3xl text-[clamp(1.25rem,3vw,2rem)] font-medium leading-snug text-balance">
            &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
          </p>
          <footer className="mt-6 text-sm text-gray-500">
            <span className="font-medium text-black">{FEATURED_TESTIMONIAL.name}</span>
            {" — "}
            {FEATURED_TESTIMONIAL.role}
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
