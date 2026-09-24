import { SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section id="contact" className="container-max py-24">
      <Reveal className="rounded-[24px] bg-black px-8 py-16 text-center text-white md:px-16 md:py-24">
        <p className="text-sm text-gray-400">Speak to me</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-[40px] font-semibold leading-[1.05] md:text-[52px] lg:text-[64px]">
          Got a project in mind? Let&rsquo;s make it real.
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={`mailto:${SITE.email}`} variant="secondary" className="bg-white text-black border-white hover:bg-gray-150">
            {SITE.email}
          </Button>
          <Button href={SITE.bookingUrl} external>
            Book Now
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
