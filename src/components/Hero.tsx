"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { HERO, SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
import { KeyButton } from "@/components/ui/KeyButton";
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

      {/* Each headline line stays on one row from lg up (sized to fit beside the card fan);
          smaller screens wrap freely. Words rise in one after another across all lines. */}
      <h1 className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[34px] lg:text-[27px] xl:text-[30px]">
        {HERO.headline.map((line, lineIndex) => {
          const before = HERO.headline.slice(0, lineIndex).join(" ").split(" ").filter(Boolean).length;
          return (
            <span key={line} className={`lg:block lg:whitespace-nowrap ${lineIndex === 0 ? "text-gray-500" : "text-black"}`}>
              {/* Real spaces between words (not just margins) so the heading reads and copies correctly. */}
              {line.split(" ").map((word, i) => (
                <Fragment key={word + i}>
                  <motion.span custom={before + i} initial="hidden" animate="visible" variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
            </span>
          );
        })}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <KeyButton href="/projects">
          {HERO.ctaLabel}
        </KeyButton>
      </motion.div>
      </div>

      <div className="relative hidden aspect-[554/320] w-[336px] shrink-0 lg:block xl:w-[443px]">
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
                className="relative flex h-full w-full items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: project.color,
                  borderRadius: FAN_RADIUS,
                  boxShadow: FAN_SHADOW,
                  transform: `rotate(${FAN[i].rotate}deg)`,
                }}
              >
                <ProjectThumb project={project} sizes="280px" />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
