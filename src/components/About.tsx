"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT, SITE, WORK_HISTORY } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const visibleHistory = showAllHistory ? WORK_HISTORY : WORK_HISTORY.slice(0, 1);

  return (
    <section className="container-max py-20 md:py-28">
      <Reveal>
        <Eyebrow>Designing experiences</Eyebrow>
        <SectionHeading className="mt-4 max-w-2xl">
          Designing experiences that solve real problems.
        </SectionHeading>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[24px]">
              <Image src="/avatar.png" alt={SITE.name} fill className="object-cover" />
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {SITE.social.slice(0, 3).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-[10px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    {s.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-4 font-semibold">{SITE.name}</p>
            <p className="text-sm text-gray-500">{SITE.role}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-medium text-gray-500">My work history</p>
            <div className="relative">
              <motion.div layout className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {visibleHistory.map((job, i) => (
                    <motion.div
                      key={job.company}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={
                        !showAllHistory && i === 0
                          ? undefined
                          : { transform: `scale(${1 - i * 0.04})` }
                      }
                      className="flex items-center justify-between rounded-[16px] border border-gray-200 bg-white p-5 shadow-card"
                    >
                      <div>
                        <p className="font-semibold">{job.company}</p>
                        <p className="text-sm text-gray-600">{job.role}</p>
                      </div>
                      <p className="font-mono text-xs text-gray-400">{job.period}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {!showAllHistory && WORK_HISTORY.length > 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-2 -z-10 h-full rounded-[16px] border border-gray-200 bg-gray-50"
                />
              )}
            </div>

            {WORK_HISTORY.length > 1 && (
              <button
                onClick={() => setShowAllHistory((v) => !v)}
                className="mt-3 inline-flex items-center gap-2 rounded-[24px] border border-gray-150 bg-white px-4 py-2 text-xs font-medium shadow-card transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {showAllHistory ? "Show less" : "Show all"}
                <span
                  className={`transition-transform duration-300 ${showAllHistory ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </button>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex flex-col gap-4 text-gray-600">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={p.slice(0, 24)}>
              {i === 0 && (
                <span className="mr-1.5 font-mono text-xs font-semibold text-black">
                  {ABOUT.stat} {ABOUT.statLabel} —
                </span>
              )}
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
