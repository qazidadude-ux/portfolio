import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { House } from "lucide-react";
import type { Project } from "@/data/projects";
import { PROJECTS } from "@/data/projects";
import type { CaseBlock, CaseImage, CaseSection, CaseStudy as CaseStudyData } from "@/data/case-studies";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectThumb } from "@/components/ProjectThumb";
import { ProjectCardText } from "@/components/ProjectCardText";
import { Typewriter } from "@/components/motion/Typewriter";
import { CountUp } from "@/components/motion/CountUp";
import { RiseIn } from "@/components/motion/RiseIn";
import { BODY_TEXT } from "@/components/ui/text";

// Case study page body. Every part is its own <section> straight inside <main>, laid out like the
// homepage (container-max: 48px sides; py-24: 96px top and bottom) so it picks up the same
// horizontal dividers between sections and the page-wide vertical guide lines.

// Eyebrow labels are in the secondary (lime) brand color, like every eyebrow on the site.
const EYEBROW = "text-sm font-medium uppercase tracking-[0.05em] text-secondary";
// Section titles are gray; the project name (h1) stays in the main text color.
const H2 = "text-[32px] font-normal leading-[1.1] tracking-[-0.02em] text-gray-500 md:text-[40px]";
// Cards: white at 4% (a fixed color, not the theme token, so it reads as a light tint on dark).
const CARD_BG = "bg-[rgba(255,255,255,0.04)]";
const CARD = `rounded-[12px] ${CARD_BG} p-6`;
// Sticky-note tints for the empathy map: the light-mode note colours as a faint fill and border.
const EMPATHY_TONES = {
  green: "border-[rgba(199,255,132,0.3)] bg-[rgba(199,255,132,0.08)]",
  yellow: "border-[rgba(253,230,138,0.3)] bg-[rgba(253,230,138,0.08)]",
  blue: "border-[rgba(147,212,252,0.3)] bg-[rgba(147,212,252,0.08)]",
  purple: "border-[rgba(196,181,253,0.3)] bg-[rgba(196,181,253,0.08)]",
} as const;
// Sub-headings inside a section (24px, regular, gray).
const H3 = "text-2xl font-normal tracking-[-0.02em] text-black";
// Smaller copy under sub-headings (screen descriptions, captions).
const SUB_TEXT = "text-lg font-light leading-[1.6] text-gray-600";

// Text-like blocks sit beside the title; visual blocks span the full width below it.
const SIDE_BLOCKS = new Set<CaseBlock["type"]>(["text", "list", "quote"]);

// Images sit straight on the page (no frame), with 8px corners; transparent illustrations get
// no rounding.
function CaseImg({ image, sizes, plain = false }: { image: CaseImage; sizes: string; plain?: boolean }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      quality={92}
      className={`h-auto w-full ${plain ? "" : "rounded-[8px]"}`}
    />
  );
}

// Numbered point cards. `twoUp` lays them two per row (for full-width lists).
function NumberedList({ items, twoUp = false }: { items: readonly string[]; twoUp?: boolean }) {
  return (
    <ol className={twoUp ? "grid gap-3 md:grid-cols-2" : "flex flex-col gap-3"}>
      {items.map((item, i) => (
        <RiseIn as="li" key={item} delay={i * 0.08} className={`flex items-center gap-4 ${CARD}`}>
          <span className="font-mono text-sm text-gray-400">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-lg leading-[1.5] text-black">{item}</span>
        </RiseIn>
      ))}
    </ol>
  );
}

function BulletList({ items, className = "text-lg text-black" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 leading-[1.5] ${className}`}>
          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Picks a fixed column class (static strings, so Tailwind can see them) for a grid of n cards.
const gridCols = (n: number) =>
  n % 4 === 0 ? "sm:grid-cols-2 lg:grid-cols-4" : n === 2 ? "sm:grid-cols-2" : n % 2 === 0 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

function SideBlock({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "text":
      return <Typewriter paragraphs={[block.text]} paragraphClassName={BODY_TEXT} />;
    case "list":
      return <NumberedList items={block.items} />;
    case "quote":
      // Same body style and typing animation as the other paragraphs, wrapped in quote marks.
      return <Typewriter paragraphs={[`“${block.text}”`]} paragraphClassName={BODY_TEXT} />;
    default:
      return null;
  }
}

function WideBlock({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "image":
      return (
        <div className={block.narrow ? "mx-auto w-full max-w-[720px]" : "mx-auto"} style={block.scale ? { width: `${block.scale * 100}%` } : undefined}>
          <CaseImg image={block.image} sizes={block.narrow ? "(min-width: 768px) 720px, 100vw" : "(min-width: 1200px) 1104px, 100vw"} />
        </div>
      );
    case "listWithImage":
      return (
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-7">
            {/* Same size and weight as section titles (40px, 400). */}
            {block.title && <h3 className="text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-gray-500">{block.title}</h3>}
            <NumberedList items={block.items} />
          </div>
          <div className="mx-auto w-full max-w-[360px] md:col-span-5">
            <CaseImg image={block.image} sizes="360px" plain />
          </div>
        </div>
      );
    case "cards":
      return (
        <ul className={`grid gap-4 sm:grid-cols-2 ${block.items.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
          {block.items.map((card, i) => (
            <RiseIn as="li" key={card.title} delay={(i % 3) * 0.08} className={`flex flex-col gap-3 ${CARD}`}>
              <span className="font-mono text-sm text-gray-400">{String(i + 1).padStart(2, "0")}</span>
              {/* Title and body grouped tightly (4px) under the number. */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{card.title}</h3>
                <p className="text-lg font-light leading-[1.6] text-gray-600">{card.text}</p>
              </div>
            </RiseIn>
          ))}
        </ul>
      );
    case "gallery":
      return (
        <div className="flex flex-col gap-2">
          {/* Subtitle: 24px, regular weight, normal case (matches the "User Interviews Outcomes" subtitle). */}
          <h3 className={H3}>{block.label}</h3>
          {/* One image per row, full content width (or capped for very tall images). */}
          <div className={`flex flex-col gap-6 ${block.narrow ? "mx-auto w-full max-w-[720px]" : ""}`}>
            {block.images.map((image) => (
              <CaseImg
                key={image.src}
                image={image}
                sizes={block.narrow ? "(min-width: 768px) 720px, 100vw" : "(min-width: 1200px) 1104px, 100vw"}
              />
            ))}
          </div>
        </div>
      );
    case "metrics":
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {block.items.map((m, i) => (
            <RiseIn as="li" key={m.label} delay={i * 0.08} className={`flex flex-col justify-between gap-8 ${CARD}`}>
              <p className="text-base font-medium leading-[1.4] tracking-[-0.01em]">{m.label}</p>
              {/* Two rows: the labels share one line and the values share a baseline. Before and After
                  each fill half the card (two equal columns). */}
              <div className="grid grid-cols-2 items-baseline gap-x-4 gap-y-1">
                <p className="text-xs font-medium uppercase tracking-[0.05em] text-gray-500">Before</p>
                <p className="text-xs font-medium uppercase tracking-[0.05em] text-gray-500">After</p>
                <p className="whitespace-nowrap text-[32px] font-normal leading-none tracking-[-0.03em] text-gray-500">
                  <CountUp value={m.before} />
                </p>
                <p className="whitespace-nowrap text-[32px] font-normal leading-none tracking-[-0.03em] text-black">
                  <CountUp value={m.after} />
                </p>
              </div>
            </RiseIn>
          ))}
        </ul>
      );
    case "stats":
      return (
        <ul className={`grid gap-4 ${gridCols(block.items.length)}`}>
          {block.items.map((stat, i) => (
            <RiseIn as="li" key={stat.label} delay={(i % 4) * 0.08} className={`flex flex-col gap-4 ${CARD}`}>
              <p className="text-[48px] font-normal leading-none tracking-[-0.03em] text-black">
                <CountUp value={stat.value} />
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-lg leading-[1.4] text-black">{stat.label}</p>
                {stat.text && <p className="text-base font-light leading-[1.6] text-gray-600">{stat.text}</p>}
              </div>
            </RiseIn>
          ))}
        </ul>
      );
    case "table":
      return (
        // Same dark card as the comparison table; scrolls sideways on narrow screens.
        <div className={`overflow-x-auto rounded-[12px] ${CARD_BG}`}>
          {/* table-fixed: equal column widths, whatever the column count. */}
          <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.04)]">
                {block.columns.map((name) => (
                  <th key={name} scope="col" className="px-6 py-4 text-base font-medium text-gray-500">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([head, ...cells]) => (
                <tr key={head} className="border-t border-gray-150 align-top">
                  <th scope="row" className="px-6 py-6 text-lg font-medium leading-[1.4] text-black">
                    {head}
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className="px-6 py-6 text-base font-light leading-[1.5] text-black">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "comparison":
      return (
        // Scrolls sideways on narrow screens rather than squeezing five columns.
        <div className={`overflow-x-auto rounded-[12px] ${CARD_BG}`}>
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.04)]">
                <th scope="col" className="px-6 py-4 text-base font-medium text-black">
                  Features
                </th>
                {block.columns.map((name, i) => (
                  <th
                    key={name}
                    scope="col"
                    className={`px-6 py-4 text-base font-medium ${i === block.highlight ? "text-secondary" : "text-black"}`}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.feature} className="border-t border-gray-150 align-top">
                  <th scope="row" className="w-[18%] px-6 py-6 text-lg font-medium leading-[1.4] text-black">
                    {row.feature}
                  </th>
                  {row.cells.map((cell, i) =>
                    i === block.highlight ? (
                      // The highlighted (own) column: strength and weakness in tinted boxes.
                      <td key={i} className="px-4 py-6">
                        <div className="flex flex-col gap-3">
                          <div className="rounded-[8px] border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.08)] p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.05em] text-[#4ade80]">Strength</p>
                            <p className="mt-1 text-base font-light leading-[1.5] text-black">{cell.strength}</p>
                          </div>
                          <div className="rounded-[8px] border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.08)] p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.05em] text-[#f87171]">Weakness</p>
                            <p className="mt-1 text-base font-light leading-[1.5] text-black">{cell.weakness}</p>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <td key={i} className="px-6 py-6">
                        <div className="flex flex-col gap-5">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-[0.05em] text-gray-500">Strength</p>
                            <p className="mt-1 text-base font-light leading-[1.5] text-black">{cell.strength}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-[0.05em] text-gray-500">Weakness</p>
                            <p className="mt-1 text-base font-light leading-[1.5] text-black">{cell.weakness}</p>
                          </div>
                        </div>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "persona":
      return (
        // Minimal: outline only, no card fill.
        <div className="flex flex-col gap-3">
          {block.title && <h3 className={H3}>{block.title}</h3>}
          {/* One row: photo and name, then each fact (label over value); wraps on small screens. */}
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-[12px] border border-[rgba(255,255,255,0.08)] p-6 md:px-8">
            <div className="flex items-center gap-4">
              <Image src={block.photo.src} alt={block.photo.alt} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
              <p className="text-2xl font-normal tracking-[-0.02em] text-black">{block.name}</p>
            </div>
            <dl className="contents">
              {block.fields.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-[0.05em] text-gray-500">{f.label}</dt>
                  <dd className="text-lg font-light text-black">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );
    case "empathy":
      return (
        <div className="flex flex-col gap-4">
          {block.rows.map((row) => (
            <div key={row.title} className={`flex flex-col gap-6 ${CARD} md:p-8`}>
              <h3 className={H3}>{row.title}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {row.items.map((item, i) => (
                  <RiseIn
                    as="li"
                    key={item}
                    delay={i * 0.08}
                    className={`rounded-[8px] border p-5 text-lg font-light leading-[1.5] text-black ${EMPATHY_TONES[row.tone]}`}
                  >
                    {item}
                  </RiseIn>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "groups":
      return (
        <ul className={`grid gap-4 ${block.items.length % 3 === 0 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {block.items.map((group, i) => (
            <RiseIn as="li" key={group.title} delay={(i % 3) * 0.08} className={`flex flex-col gap-4 ${CARD}`}>
              <h3 className="text-xl font-medium tracking-[-0.02em]">{group.title}</h3>
              <BulletList items={group.items} className="text-base font-light text-gray-600" />
            </RiseIn>
          ))}
        </ul>
      );
    case "sub": {
      const words = (
        <>
          {block.text?.map((p) => (
            <p key={p} className={SUB_TEXT}>
              {p}
            </p>
          ))}
          {block.quotes?.map((q) => (
            <p key={q} className="text-[22px] font-light leading-[1.5] tracking-[-0.02em] text-black">
              “{q}”
            </p>
          ))}
        </>
      );
      const hasWords = Boolean(block.text?.length || block.quotes?.length);
      const cards = block.items && <NumberedList items={block.items} twoUp={!block.phone} />;
      // Phone screenshots: the description runs full width, then the phones share one full-width
      // row below (each up to a third of the width, so a single screen isn't blown up to page size).
      if (block.phone && block.images) {
        return (
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              {block.title && <h3 className={H3}>{block.title}</h3>}
              {words}
              {cards}
            </div>
            <div className="mt-6 flex justify-center gap-6 md:mt-[var(--sub-img-gap,48px)]">
              {block.images.map((image) => (
                <div key={image.src} className="min-w-0 max-w-[368px] flex-1">
                  <CaseImg image={image} sizes="(min-width: 768px) 368px, 50vw" />
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col">
          {/* Title, words and list sit close together (12px); the images keep 48px (24px on mobile), or
              the study's subImageGap. */}
          <div className="flex flex-col gap-3">
            {block.title && <h3 className={H3}>{block.title}</h3>}
            {hasWords && <div className="flex max-w-[880px] flex-col gap-4">{words}</div>}
          </div>
          {/* Numbered cards: 12px under the words by default, or the study's subCardsGap (half on mobile). */}
          {cards && (
            <div className={block.title || hasWords ? "mt-[var(--sub-cards-gap-m,12px)] md:mt-[var(--sub-cards-gap,12px)]" : ""}>
              {cards}
            </div>
          )}
          {block.images && (
            <div className={`mt-6 flex flex-col gap-6 md:mt-[var(--sub-img-gap,48px)] ${block.narrow ? "mx-auto w-full max-w-[720px]" : ""}`}>
              {block.images.map((image) => (
                <CaseImg
                  key={image.src}
                  image={image}
                  sizes={block.narrow ? "(min-width: 768px) 720px, 100vw" : "(min-width: 1200px) 1104px, 100vw"}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

// Card groups animate card by card (RiseIn), so they skip the whole-block reveal.
const CARD_BLOCKS = new Set<CaseBlock["type"]>(["cards", "metrics", "stats", "groups", "empathy"]);

function Section({ section, gaps }: { section: CaseSection; gaps: Pick<CaseStudyData, "subImageGap" | "subCardsGap"> }) {
  const { subImageGap, subCardsGap } = gaps;
  const vars: Record<string, string> = {};
  if (subImageGap !== undefined) vars["--sub-img-gap"] = `${subImageGap}px`;
  if (subCardsGap !== undefined) {
    vars["--sub-cards-gap"] = `${subCardsGap}px`;
    vars["--sub-cards-gap-m"] = `${subCardsGap / 2}px`;
  }
  const side = section.blocks.filter((b) => SIDE_BLOCKS.has(b.type));
  const wide = section.blocks.filter((b) => !SIDE_BLOCKS.has(b.type));
  const hasSide = side.length > 0;

  return (
    <section
      id={section.id}
      className="container-max py-16 md:py-24"
      style={vars as CSSProperties}
    >
      <div className={`grid gap-6 md:gap-8 ${hasSide ? "md:grid-cols-12 md:gap-12" : ""}`}>
        <Reveal className={`flex flex-col gap-3 ${hasSide ? "md:col-span-4" : ""}`}>
          {section.eyebrow && <p className={EYEBROW}>{section.eyebrow}</p>}
          <h2 className={`whitespace-pre-line ${H2}`}>{section.title}</h2>
        </Reveal>
        {hasSide && (
          <Reveal delay={0.1} className="flex flex-col gap-6 md:col-span-8 md:gap-8">
            {side.map((block, i) => (
              <SideBlock key={i} block={block} />
            ))}
          </Reveal>
        )}
      </div>

      {wide.length > 0 && (
        <div className="mt-6 flex flex-col gap-6 md:mt-12 md:gap-12">
          {wide.map((block, i) => {
            // `tight` pulls a sub-part up to 12px under the block before it (the card gap) instead of 24/48px.
            const tight = block.type === "sub" && block.tight ? "-mt-3 md:-mt-9" : "";
            return CARD_BLOCKS.has(block.type) ? (
              <div key={i} className={tight}>
                <WideBlock block={block} />
              </div>
            ) : (
              <Reveal key={i} className={tight}>
                <WideBlock block={block} />
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}

function OtherProjects({ current }: { current: Project }) {
  const others = PROJECTS.filter((p) => p.slug !== current.slug);
  return (
    <section className="container-max py-16 md:py-24">
      <Reveal>
        <SectionHeading className="text-gray-500">Some of my other stuff</SectionHeading>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
        {others.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <Link
              href={`/projects/${project.slug}`}
              className={`group block overflow-hidden rounded-[8px] ${CARD_BG} transition-shadow hover:shadow-xl`}
            >
              <div
                className="relative flex aspect-[4/3] items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundColor: project.color }}
              >
                <ProjectThumb project={project} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <ProjectCardText project={project} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CaseStudy({ project, study }: { project: Project; study: CaseStudyData }) {
  return (
    <>
      <section className="container-max py-16 md:py-24">
        <Reveal>
          {/* Visitors arrive from the homepage, so the way back is Home. */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-black">
            <House className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Home
          </Link>
          <p className={`mt-10 ${EYEBROW}`}>{project.category}</p>
          <SectionHeading as="h1" className="mt-2">
            {project.name}
          </SectionHeading>
          <p className="mt-3 text-xl font-light tracking-[-0.01em] text-black md:text-2xl">{study.impact}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-6 md:mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {study.meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className={`${EYEBROW} !text-gray-500`}>{item.label}</dt>
                <dd className="text-lg text-black">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 md:mt-12">
          <CaseImg image={study.cover} sizes="(min-width: 1200px) 1104px, 100vw" />
        </Reveal>
      </section>

      {study.sections.map((section) => (
        <Section key={section.id} section={section} gaps={study} />
      ))}

      <OtherProjects current={project} />
    </>
  );
}
