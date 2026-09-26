import { INTRO } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { WorkHistory } from "@/components/WorkHistory";

// Short first-person intro beside the work history deck. The two columns drift at different
// speeds for a little depth.
export function Intro() {
  return (
    <section className="container-max grid grid-cols-1 items-start gap-12 py-24 md:grid-cols-2 md:gap-16">
      <Parallax distance={20}>
        <Reveal className="flex flex-col gap-6">
          {INTRO.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[22px] font-medium leading-[1.4] tracking-[-0.03em] text-black text-balance md:text-[28px] md:leading-[39px]"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Parallax>

      <Parallax distance={50}>
        <Reveal delay={0.1}>
          <WorkHistory />
        </Reveal>
      </Parallax>
    </section>
  );
}
