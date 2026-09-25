import { INTRO } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedQuote() {
  return (
    <section className="container-max py-24">
      <Reveal>
        <div className="mx-auto flex max-w-[780px] flex-col gap-6 text-center">
          {INTRO.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[22px] font-medium leading-[1.4] tracking-[-0.03em] text-black text-balance md:text-[28px] md:leading-[39px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
