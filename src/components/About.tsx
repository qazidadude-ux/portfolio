import Image from "next/image";
import { ABOUT, SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { BODY_TEXT } from "@/components/ui/text";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";

export function About() {
  return (
    <section className="container-max flex flex-col gap-6 py-16 md:gap-16 md:py-24">
      <Reveal>
        <SectionHeading>
          <span className="block text-gray-500">Designing experiences</span>
          <span className="block">that solve real problems.</span>
        </SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
        <Reveal className="md:flex-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-gray-100">
            <Image src="/about.png" alt={SITE.name} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
            <div className="absolute bottom-3 right-3">
              <SocialLinks tone="dark" labels={SITE.aboutSocial} />
            </div>
          </div>
        </Reveal>

        {/* Types itself out as the section scrolls in: each black lead, then its gray rest. */}
        <Typewriter
          paragraphs={ABOUT.paragraphs.map((p) => [
            { text: `${p.lead} `, className: "text-black" },
            { text: p.rest, className: "text-gray-600" },
          ])}
          className="order-first flex flex-col gap-8 md:order-none md:flex-[1.5]"
          paragraphClassName={BODY_TEXT}
        />
      </div>
    </section>
  );
}
