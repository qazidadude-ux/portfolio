"use client";

import { PRICING, SITE } from "@/data/site";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50">
      <div className="container-max py-24">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <SectionHeading className="mt-4">Simple pricing. Standout designs.</SectionHeading>
          <p className="mt-4 max-w-md text-gray-600">
            Clear costs, no hidden fees. Select from monthly subscriptions or individual project
            rates.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-[24px] bg-white p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                {PRICING.intro.slotsAvailable}
              </span>
              <h3 className="max-w-md text-2xl font-semibold leading-snug">
                {PRICING.intro.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-gray-500">{PRICING.intro.subtext}</p>
            </div>
            <Button href={SITE.bookingUrl} external className="shrink-0">
              {PRICING.intro.ctaLabel}
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PRICING.steps.map((step, i) => (
              <div key={step.title} className="rounded-[16px] border border-gray-150 p-5">
                <span className="font-mono text-xs text-gray-400">0{i + 1}</span>
                <p className="mt-2 font-semibold">{step.title}</p>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRICING.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={revealItem}
              className={clsx(
                "flex flex-col rounded-[24px] p-8",
                plan.highlighted ? "bg-black text-white" : "bg-white border border-gray-200"
              )}
            >
              <p className="font-semibold">{plan.name}</p>
              <p
                className={clsx(
                  "mt-2 text-sm",
                  plan.highlighted ? "text-gray-300" : "text-gray-500"
                )}
              >
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className={clsx("text-sm", plan.highlighted ? "text-gray-300" : "text-gray-500")}>
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "h-1 w-1 rounded-full",
                        plan.highlighted ? "bg-white" : "bg-black"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={SITE.bookingUrl}
                external
                variant={plan.highlighted ? "secondary" : "primary"}
                className={clsx(
                  "mt-8 w-full",
                  plan.highlighted && "bg-white text-black border-white hover:bg-gray-150"
                )}
              >
                {plan.ctaLabel}
              </Button>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
