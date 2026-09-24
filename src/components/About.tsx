"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleChevronDown } from "lucide-react";
import { ABOUT, SITE, WORK_HISTORY } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const PILL_SHADOW =
  "shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0_10px_10px_-3.75px_rgba(0,0,0,0.06)]";

const EASE = [0.16, 1, 0.3, 1] as const;

function WorkHistory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium tracking-[-0.02em]">My work history</p>
      <div className="flex flex-col items-center gap-8">
        <div className={`relative flex w-full flex-col ${open ? "gap-3" : ""}`}>
          {WORK_HISTORY.map((job, i) => (
            <motion.div
              key={job.company}
              layout
              initial={false}
              animate={{ scale: open ? 1 : 1 - i * 0.05 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ zIndex: WORK_HISTORY.length - i, top: open ? undefined : i * 8 }}
              className={`w-full rounded-[16px] border border-gray-200 bg-white p-[18px] ${CARD_SHADOW} ${
                !open && i > 0 ? "absolute inset-x-0" : "relative"
              }`}
            >
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-medium tracking-[-0.02em]">{job.company}</p>
                  <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">{job.role}</p>
                </div>
                <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">{job.period}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`flex h-[30px] items-center gap-1 rounded-[24px] border border-gray-150 bg-white py-3 pl-4 pr-3 text-xs font-semibold tracking-[-0.02em] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${PILL_SHADOW}`}
        >
          {open ? "Hide" : "Show all"}
          <CircleChevronDown
            className={`h-3 w-3 fill-black text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

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
        <div className="flex flex-col gap-16 md:flex-1">
          <Reveal className="flex flex-col gap-4">
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

          <Reveal delay={0.1}>
            <WorkHistory />
          </Reveal>
        </div>

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
