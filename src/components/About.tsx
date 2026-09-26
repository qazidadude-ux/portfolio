import Image from "next/image";
import { ABOUT, SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";

export function About() {
  return (
    <section className="container-max flex flex-col gap-16 py-24">
      <Reveal>
        <SectionHeading>
          <span className="block text-gray-500">Designing experiences</span>
          <span className="block">that solve real problems.</span>
        </SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
        <Reveal className="flex flex-col gap-4 md:flex-1">
          <div className="relative aspect-[19/21] w-full overflow-hidden rounded-[16px] bg-gray-100">
            <Image src="/avatar.png" alt={SITE.name} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
            <div className="absolute bottom-3 right-3">
              <SocialLinks tone="dark" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-medium tracking-[-0.03em] md:text-[22px]">{SITE.name}</p>
            <p className="text-sm font-semibold tracking-[-0.02em] text-gray-600">{SITE.role}</p>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="order-first flex flex-col gap-8 md:order-none md:flex-[1.5]"
        >
          {ABOUT.paragraphs.map((p) => (
            <p key={p.lead} className="text-lg font-medium leading-[1.4] tracking-[-0.03em] lg:text-[22px]">
              <strong className="font-semibold text-black">{p.lead}</strong>{" "}
              <span className="text-gray-600">{p.rest}</span>
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
