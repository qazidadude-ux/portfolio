import {
  Smartphone,
  BarChart3,
  Sparkles,
  GitFork,
  ClipboardCheck,
  Users,
  Component,
  Monitor,
  Layers,
  FileCode2,
  Palette,
  BookOpen,
  Image,
  Presentation,
  FileText,
  Flag,
  CreditCard,
  Package,
  PieChart,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { siClaude, siFigma, siFramer, siGithub, siVercel, type SimpleIcon } from "simple-icons";
import { SERVICES, TECH_STACK } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Tool = (typeof TECH_STACK)[number];
type UiuxService = (typeof SERVICES.uiux)[number];
type GraphicService = (typeof SERVICES.graphic)[number];

type ToolMark = { brand: SimpleIcon } | { monogram: string } | { icon: LucideIcon };

const TOOL_MARKS: Record<Tool, ToolMark> = {
  Figma: { brand: siFigma },
  Framer: { brand: siFramer },
  Claude: { brand: siClaude },
  "Adobe Photoshop": { monogram: "Ps" },
  "Adobe Illustrator": { monogram: "Ai" },
  "Adobe After Effects": { monogram: "Ae" },
  Vercel: { brand: siVercel },
  GitHub: { brand: siGithub },
};

const TILE_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const UIUX_ICONS: Record<UiuxService, LucideIcon> = {
  "App Design": Smartphone,
  "Dashboard & Data Viz": BarChart3,
  "AI Quick Wireframes": Sparkles,
  "User Flows & IA": GitFork,
  "UX Audit & Heuristics": ClipboardCheck,
  "Usability Testing": Users,
  "Design Systems": Component,
  "Responsive Web Design": Monitor,
  "SaaS Product Design": Layers,
  "Dev Handoff & Docs": FileCode2,
};

const GRAPHIC_ICONS: Record<GraphicService, LucideIcon> = {
  "Brand Identity & Logo": Palette,
  "Brand Guidelines": BookOpen,
  "Social Media Graphics": Image,
  "Pitch Deck Design": Presentation,
  "Brochure & Flyer Design": FileText,
  "Poster & Banner Design": Flag,
  "Business Card Design": CreditCard,
  "Packaging Design": Package,
  "Infographic Design": PieChart,
  "Print Collateral": Printer,
};

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

function ServiceCard({ name, icon: Icon }: { name: string; icon: LucideIcon }) {
  return (
    <li className={`flex flex-col items-center gap-4 rounded-[12px] border border-gray-200 bg-white px-4 py-6 text-center ${TILE_SHADOW}`}>
      <Icon className="h-6 w-6 text-black" strokeWidth={1.5} />
      <span className="text-sm font-medium leading-snug tracking-[-0.01em] text-black/70">
        {name}
      </span>
    </li>
  );
}

function ServiceList({ title, items, icons }: { title: string; items: readonly string[]; icons: Record<string, LucideIcon> }) {
  return (
    <Reveal className="flex flex-col gap-6">
      <p className="text-lg font-medium tracking-[-0.03em] text-foreground">{title}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {items.map((service) => (
          <ServiceCard key={service} name={service} icon={icons[service]} />
        ))}
      </ul>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services">
      <div className="container-max flex flex-col gap-6 py-16 md:gap-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <Reveal>
            <SectionHeading>
              <span className="block text-gray-500">Services that</span>
              <span className="block">supercharge your</span>
              <span className="block">business.</span>
            </SectionHeading>
          </Reveal>

          <Reveal className="w-full shrink-0 md:w-auto">
            <ul aria-label="My tech stack" className="grid w-full grid-cols-[repeat(4,auto)] justify-between gap-y-3 md:w-max md:grid-cols-4 md:gap-3">
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

        <div className="flex flex-col gap-12">
          <ServiceList title="UI/UX Services" items={SERVICES.uiux} icons={UIUX_ICONS} />
          <ServiceList title="Graphic Design" items={SERVICES.graphic} icons={GRAPHIC_ICONS} />
        </div>
      </div>
    </section>
  );
}
