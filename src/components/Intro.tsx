import Image from "next/image";
import { INTRO } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { WorkHistory } from "@/components/WorkHistory";
import { BODY_TEXT } from "@/components/ui/text";
// Photo fades over its bottom 30%. The fade sits on a wrapper that extends 64px past the photo on
// the top and sides (room for the blurred glow), so in that box the photo (468 × 488.8px) fades from
// (64 + 0.7 × 488.8) / (64 + 488.8) = 73.5% to 100%.
const PHOTO_FADE = "linear-gradient(to bottom, #000 73.5%, transparent 100%)";

// Short first-person intro, a portrait, and the work history deck; the intro types itself out on
// scroll-in. The portrait is absolutely positioned on the section's bottom edge, centered in the
// space between the text (max 434px) and the work history (320px), behind both (they're z-10)
// where it overlaps their edges. It is black and white until the section is hovered, when it eases
// into color and a soft lime glow appears behind the body. Desktop only (no room on tablets);
// fades out over its bottom 30%.
export function Intro() {
  return (
    // Text pinned to the left padding, work history to the right, free space between. 48px side
    // padding at every size (phones would otherwise get the site's 24px); inline so it overrides
    // .container-max, which isn't in a Tailwind layer.
    <section
      id="about"
      className="group container-max relative flex flex-col items-start gap-6 py-16 md:flex-row md:justify-between md:gap-16 md:py-24 lg:gap-8"
      style={{ paddingInline: 48 }}
    >
      <Typewriter
        paragraphs={INTRO}
        className="relative z-10 flex flex-col gap-6 md:max-w-[434px]"
        paragraphClassName={BODY_TEXT}
      />

      {/* Gap center: (48 + 434 + (100% - 48 - 320)) / 2 = 50% + 57px. */}
      <div className="pointer-events-none absolute bottom-0 left-[calc(50%+57px)] hidden w-[468px] -translate-x-1/2 lg:block">
        <Reveal delay={0.05}>
          {/* The fade is on this wrapper so the glow fades out with the photo: otherwise it would show
              through the photo's transparent bottom 30% and look like it sits in front of the body. */}
          <div className="relative -mx-16 -mt-16 px-16 pt-16" style={{ maskImage: PHOTO_FADE, WebkitMaskImage: PHOTO_FADE }}>
            {/* 230px lime glow behind the body, below the shoulders, blurred soft, that fades and swells in
                on hover. Sits before the photo, so the figure covers its middle. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[calc(64px+0.8*(100%-64px))] size-[230px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-secondary opacity-0 blur-2xl transition-[opacity,scale] duration-700 ease-out group-hover:scale-100 group-hover:opacity-80"
            />
            {/* Black and white until the section is hovered, then it eases into color. Fades out
                over its bottom 30%. */}
            <Image
              src="/intro-portrait-color.webp"
              alt="Shakeel Ur Rehman"
              width={900}
              height={940}
              sizes="468px"
              className="relative h-auto w-full grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative z-10 w-full md:w-[400px] md:shrink-0 lg:w-[320px]">
        <WorkHistory />
      </Reveal>
    </section>
  );
}
