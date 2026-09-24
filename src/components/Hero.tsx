"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO, SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { FAN, FAN_RADIUS, FAN_SHADOW, useProjectDock } from "@/components/motion/ProjectDock";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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

      <h1 className="max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02]">
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
        className="mt-8 flex items-center gap-4"
      >
        <a
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center rounded-[24px] bg-black py-1.5 pl-1.5 pr-5 text-sm font-medium text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.97]"
        >
          <Image
            src="/avatar.png"
            alt={SITE.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="ml-3">{HERO.ctaLabel}</span>
        </a>
        <span className="text-sm text-gray-500">{SITE.happyClients} Happy clients</span>
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
          </div>
        ))}
      </div>
    </section>
  );
}
