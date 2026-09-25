import {
  Code2,
  Globe,
  Laptop,
  LayoutDashboard,
  PaintBucket,
  PanelsTopLeft,
  PencilRuler,
  Layers,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { siClaude, siFigma, siFramer, type SimpleIcon } from "simple-icons";
import { SERVICES, TECH_STACK } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Tool = (typeof TECH_STACK)[number];
type Service = (typeof SERVICES)[number];

type ToolMark = { brand: SimpleIcon } | { monogram: string } | { icon: LucideIcon };

// simple-icons dropped Adobe's marks at Adobe's request and has none for Zeplin or Balsamiq,
// so Adobe apps use their familiar two-letter abbreviations and the rest get line icons.
const TOOL_MARKS: Record<Tool, ToolMark> = {
  Figma: { brand: siFigma },
  Framer: { brand: siFramer },
  Claude: { brand: siClaude },
  "Adobe Photoshop": { monogram: "Ps" },
  "Adobe Illustrator": { monogram: "Ai" },
  "Adobe After Effects": { monogram: "Ae" },
  Zeplin: { icon: Layers },
  Balsamiq: { icon: PencilRuler },
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
  const mark = TOOL_MARKS[tool];
  if ("monogram" in mark) {
    return (
      <span aria-hidden className="flex h-6 w-6 items-center justify-center text-[17px] font-semibold leading-none tracking-[-0.04em] text-black">
        {mark.monogram}
      </span>
    );
  }
  if ("icon" in mark) {
    const Icon = mark.icon;
    return <Icon className="h-6 w-6 text-black" strokeWidth={1.75} aria-hidden />;
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-black" aria-hidden>
      <path d={mark.brand.path} />
    </svg>
  );
}

const STRIP_LABEL = "text-lg font-medium tracking-[-0.02em]";
const EDGE_FADE = "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";

export function Services() {
  return (
    <section id="services">
      <div className="container-max flex flex-col gap-16 py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <Reveal>
            <SectionHeading>
              <span className="block text-gray-500">Services that</span>
              <span className="block">supercharge your</span>
              <span className="block">business.</span>
            </SectionHeading>
          </Reveal>

          <Reveal className="shrink-0">
            <ul aria-label="My tech stack" className="grid w-max grid-cols-4 gap-3">
              {TECH_STACK.map((tool) => (
                <li key={tool} className="group relative">
                  <div
                    className={`flex items-center justify-center rounded-[12px] border border-gray-200 bg-white p-4 ${TILE_SHADOW}`}
                  >
                    <ToolIcon tool={tool} />
                  </div>
                  <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-black px-2 py-1 text-xs font-semibold tracking-[-0.02em] text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-4">
          <p className={STRIP_LABEL}>My services</p>
          <Marquee seconds={70} reverse className={`-my-8 py-8 ${EDGE_FADE}`} rowClassName="gap-12 pr-12">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service];
              return (
                <li key={service} className="flex shrink-0 items-center gap-3">
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-[24px] border border-black bg-black p-2 ${BADGE_SHADOW}`}
                  >
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </span>
                  <span className="whitespace-nowrap text-lg font-medium leading-[1.4] tracking-[-0.03em] md:text-[22px]">
                    {service}
                  </span>
                </li>
              );
            })}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
