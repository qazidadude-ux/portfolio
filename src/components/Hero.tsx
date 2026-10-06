"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { HERO } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
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
    // Stack: title, then the three facts, then the project card fan. Left-aligned on phones, centered
    // from tablet up. Top padding puts "HELLO" 144px below the fixed nav (nav ends 72px down; the
    // page already reserves 56px for it, so 56 + 160 = 72 + 144).
    <section className="container-max flex flex-col items-start py-24 text-left md:items-center md:pb-64 md:pt-[160px] md:text-center">
      <div>
      <motion.p
        initial={{ opacity: 0, y: HERO_ENTRANCE.rise }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HERO_ENTRANCE.duration, ease: HERO_ENTRANCE.ease }}
        className="mb-1 flex items-center justify-start gap-2 text-lg font-medium uppercase tracking-[0.05em] text-secondary md:justify-center"
      >
        {HERO.eyebrow}
        {/* Waves (pivoting at the wrist) a few times, rests, then waves again. */}
        <motion.span
          aria-hidden
          className="inline-block origin-[70%_70%]"
          animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
          transition={{ duration: 2.5, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1], repeat: Infinity, delay: 0.6 }}
        >
          👋
        </motion.span>
      </motion.p>

      {/* 64px title on desktop (48px on tablets, where 64px would wrap "Product & UX Designer"), one
          headline entry per line with the first in gray; words rise in one after another. */}
      <h1 className="text-[36px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[48px] lg:text-[64px]">
        {HERO.headline.map((line, lineIndex) => {
          const before = HERO.headline.slice(0, lineIndex).join(" ").split(" ").filter(Boolean).length;
          return (
            <span key={line} className={`block ${lineIndex === 0 ? "text-gray-500" : "text-black"}`}>
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

      {/* Currently / Specialized at / Working globally, side by side (wraps on narrow screens). */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 flex flex-wrap justify-start gap-x-16 gap-y-8 md:justify-center"
      >
        {HERO.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-[15px] text-gray-500">{fact.label}</dt>
            <dd className="flex items-center justify-start gap-2 text-base text-black md:justify-center">
              {"live" in fact && fact.live && (
                // Availability dot: lime, gently "breathing" between 100% and 125% size.
                <motion.span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                />
              )}
              {fact.value}
            </dd>
          </div>
        ))}
      </motion.dl>
      </div>

      <div className="relative mt-16 hidden aspect-[554/320] w-[336px] shrink-0 lg:block xl:w-[443px]">
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
