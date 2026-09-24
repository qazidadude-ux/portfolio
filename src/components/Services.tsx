"use client";

import { SERVICES, TECH_STACK } from "@/data/site";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section id="services" className="bg-gray-50">
      <div className="container-max py-24">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <SectionHeading className="mt-4">
            Services that supercharge your business.
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-gray-500">My tech stack</p>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col divide-y divide-gray-200 rounded-[16px] border border-gray-200 bg-white">
            {SERVICES.map((service) => (
              <motion.div
                key={service}
                variants={revealItem}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-base">{service}</span>
                <span className="text-gray-400">&rarr;</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
