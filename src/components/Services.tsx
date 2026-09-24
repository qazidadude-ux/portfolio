"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Laptop,
  LayoutDashboard,
  PaintBucket,
  PanelsTopLeft,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import {
  siBlender,
  siClaude,
  siFigma,
  siFramer,
  siRive,
  siTrello,
  siWebflow,
  type SimpleIcon,
} from "simple-icons";
import { SERVICES, TECH_STACK } from "@/data/site";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Tool = (typeof TECH_STACK)[number];
type Service = (typeof SERVICES)[number];

// simple-icons has no OpenAI/ChatGPT mark, so ChatGPT falls back to a generic icon.
const TOOL_ICONS: Partial<Record<Tool, SimpleIcon>> = {
  Figma: siFigma,
  Framer: siFramer,
  Webflow: siWebflow,
  Rive: siRive,
  Blender: siBlender,
  Trello: siTrello,
  Claude: siClaude,
};

const SERVICE_ICONS: Record<Service, LucideIcon> = {
  "Framer Development": Code2,
  "Brand Design": PaintBucket,
  "Web Apps": Laptop,
  "Landing Pages": PanelsTopLeft,
  "Motion Graphics": WandSparkles,
  "3D Design": Globe,
  "UX / UI Consultation": LayoutDashboard,
};

const TILE_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const BADGE_SHADOW =
  "shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0.74px_0.74px_-0.75px_rgba(0,0,0,0.33),0_2px_2px_-1.5px_rgba(0,0,0,0.32),0_4.4px_4.4px_-2.25px_rgba(0,0,0,0.3),0_9.8px_9.8px_-3px_rgba(0,0,0,0.25),0_25px_25px_-3.75px_rgba(0,0,0,0.11),0_0_0_1px_#828282]";

function ToolIcon({ tool }: { tool: Tool }) {
  const icon = TOOL_ICONS[tool];
  if (!icon) return <Sparkles className="h-6 w-6" strokeWidth={1.75} />;
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-black" aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services">
      <div className="container-max grid grid-cols-1 items-center gap-12 py-24 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading>
              <span className="text-gray-500">Services that </span>
              supercharge your business.
            </SectionHeading>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal>
              <p className="text-lg font-medium tracking-[-0.02em]">My tech stack</p>
            </Reveal>
            <RevealGroup className="flex flex-wrap items-center gap-2" stagger={0.1}>
              {TECH_STACK.map((tool) => (
                <motion.div key={tool} variants={revealItem} className="group relative">
                  <div
                    className={`flex items-center justify-center rounded-[12px] border border-[#dedede] bg-white p-4 ${TILE_SHADOW}`}
                  >
                    <ToolIcon tool={tool} />
                  </div>
                  <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-black px-2 py-1 text-xs font-semibold tracking-[-0.02em] text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {tool}
                  </span>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>

        <RevealGroup className="flex flex-col gap-12 md:pr-5">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service];
            return (
              <motion.div key={service} variants={revealItem} className="flex items-center gap-3">
                <span
                  className={`flex shrink-0 items-center justify-center rounded-[24px] border border-black bg-black p-2 ${BADGE_SHADOW}`}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </span>
                <span className="text-lg font-medium leading-[1.4] tracking-[-0.03em] md:text-[22px]">
                  {service}
                </span>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
