import { ABOUT, SITE, WORK_HISTORY } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { DragCarousel } from "@/components/DragCarousel";

export function About() {
  return (
    <section className="container-max py-20 md:py-28">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Eyebrow>Designing experiences</Eyebrow>
            <SectionHeading className="mt-4">
              Designing experiences that solve real problems.
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold">{ABOUT.stat}</span>
            <span className="text-sm text-gray-500">{ABOUT.statLabel}</span>
          </Reveal>

          <Reveal delay={0.15} className="mt-6 flex flex-col gap-4 text-gray-600">
            {ABOUT.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <p className="font-semibold">{SITE.name}</p>
            <p className="text-sm text-gray-500">{SITE.role}</p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="mb-4 text-sm font-medium text-gray-500">My work history</p>
          </Reveal>
          <DragCarousel>
            {WORK_HISTORY.map((job) => (
              <div
                key={job.company}
                className="w-56 shrink-0 snap-start rounded-[16px] border border-gray-200 bg-gray-50 p-5"
              >
                <p className="font-semibold">{job.company}</p>
                <p className="mt-1 text-sm text-gray-600">{job.role}</p>
                <p className="mt-4 font-mono text-xs text-gray-400">{job.period}</p>
              </div>
            ))}
          </DragCarousel>
        </div>
      </div>
    </section>
  );
}
