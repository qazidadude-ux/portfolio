"use client";

import { motion } from "framer-motion";
import { HERO, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="container-max pt-14 pb-20 md:pt-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
        {SITE.availability}
      </motion.div>

      <h1 className="max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02]">
        {HERO.headline.map((word, i) => (
          <motion.span
            key={word + i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            className="inline-block mr-4"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-6 max-w-lg text-lg text-gray-600"
      >
        {HERO.subhead}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button href={SITE.bookingUrl} external>
          {HERO.ctaLabel}
        </Button>
        <span className="text-sm text-gray-500">{SITE.happyClients} Happy clients</span>
      </motion.div>
    </section>
  );
}
