"use client";

import { motion } from "framer-motion";
import { HERO, SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { GooeyButton } from "@/components/ui/GooeyButton";
import { BUTTON_SIZE } from "@/components/ui/pill";
import { FAN, FAN_RADIUS, FAN_SHADOW, HERO_ENTRANCE, useProjectDock } from "@/components/motion/ProjectDock";

const riseVariants = (delay: (i: number) => number) => ({
  hidden: { opacity: 0, y: HERO_ENTRANCE.rise },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: HERO_ENTRANCE.duration, delay: delay(i), ease: HERO_ENTRANCE.ease },
  }),
});

const wordVariants = riseVariants(HERO_ENTRANCE.wordDelay);
// Only seen before the dock overlay takes over; the overlay cards play the same entrance.
const cardVariants = riseVariants(HERO_ENTRANCE.cardDelay);

export function Hero() {
  const { heroSlots, ready } = useProjectDock();

  return (
    <section className="container-max py-24 lg:flex lg:items-center lg:justify-between lg:gap-12">
      <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-[24px] border border-gray-150 bg-white px-3 py-2 text-xs text-gray-600 shadow-card"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-accent"
            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {SITE.availability}
      </motion.div>

      <h1 className="max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02]">
        <span className="block whitespace-nowrap">
          {HERO.headline.slice(0, 2).map((word, i) => (
            <motion.span
              key={word + i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block mr-4 text-gray-500"
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block whitespace-nowrap">
          {HERO.headline.slice(2).map((word, i) => (
            <motion.span
              key={word + i}
              custom={i + 2}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block mr-4 text-black"
            >
              {word}
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-6 max-w-lg text-lg text-gray-600"
      >
        <strong className="font-semibold text-black">{HERO.subhead.split(". ")[0]}.</strong>{" "}
        {HERO.subhead.split(". ").slice(1).join(". ")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <GooeyButton href={SITE.bookingUrl} external className={`border-transparent ${BUTTON_SIZE}`}>
          {HERO.ctaLabel}
        </GooeyButton>
        <GooeyButton href="/projects" variant="secondary" className={`border-transparent ${BUTTON_SIZE}`}>
          {HERO.secondaryCtaLabel}
        </GooeyButton>
      </motion.div>
      </div>

      <div className="relative hidden aspect-[554/320] w-[420px] shrink-0 lg:block xl:w-[554px]">
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              heroSlots.current[i] = el;
            }}
            className={`absolute aspect-[4/3] w-[48%] ${ready ? "invisible" : ""}`}
            style={{ top: FAN[i].top, left: FAN[i].left, zIndex: i }}
          >
            <motion.div custom={i} initial="hidden" animate="visible" variants={cardVariants} className="h-full w-full">
              <div
                className="flex h-full w-full items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: project.color,
                  borderRadius: FAN_RADIUS,
                  boxShadow: FAN_SHADOW,
                  transform: `rotate(${FAN[i].rotate}deg)`,
                }}
              >
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
                  {project.category}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
