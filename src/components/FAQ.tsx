"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS, SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50">
      <div className="container-max py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <Eyebrow>FAQs</Eyebrow>
              <SectionHeading className="mt-4">Your questions answered.</SectionHeading>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 hidden rounded-[16px] bg-white p-6 md:block">
              <p className="font-semibold">Still not sure?</p>
              <p className="mt-1 text-sm text-gray-500">
                Book a free discovery call. Learn more about how I work and how I can help you
                take the next step.
              </p>
              <Button href={SITE.bookingUrl} external variant="secondary" className="mt-5">
                Schedule Now
              </Button>
            </Reveal>
          </div>

          <div className="flex flex-col divide-y divide-gray-200 rounded-[16px] border border-gray-200 bg-white">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex gap-4">
                      <span className="font-mono text-xs text-gray-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium">{faq.question}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-xl text-gray-400"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pl-16 text-sm text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
