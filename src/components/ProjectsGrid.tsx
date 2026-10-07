"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
import { ProjectCardText } from "@/components/ProjectCardText";
import { Reveal } from "@/components/motion/Reveal";
import { useProjectDock } from "@/components/motion/ProjectDock";
import { ViewProjectButton } from "@/components/ViewProjectButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Mouse devices (any width): hovering one project card raises it (a sticker peeks out from behind its top-right
// corner) and blurs the others. Each project is drawn twice (the grid card and, on desktop, its
// image in the ProjectDock overlay), both marked data-project-card, so every copy gets .is-raised or
// .is-dimmed (globals.css).
function focusProject(slug: string | null) {
  if (!matchMedia("(hover: hover)").matches) return;
  for (const el of document.querySelectorAll<HTMLElement>("[data-project-card]")) {
    const self = el.dataset.projectCard === slug;
    el.classList.toggle("is-raised", self);
    el.classList.toggle("is-dimmed", slug !== null && !self);
  }
}

export function ProjectsGrid() {
  const { gridSlots } = useProjectDock();

  return (
    <section id="work" className="container-max py-16 md:py-24">
      <Reveal>
        <SectionHeading>Latest Projects</SectionHeading>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12">
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            data-project-card={project.slug}
            onMouseEnter={() => focusProject(project.slug)}
            onMouseLeave={() => focusProject(null)}
            className="group/card relative z-0 transition-[filter,opacity] duration-300"
          >
            {/* The card is a wall and the mascot peeks over it on hover: it sits behind the card and
                slides up at a steady (linear) pace until its head and waving hand show above the top
                edge; whatever is below the edge stays hidden behind the card. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
            <img
              src="/peek-mascot.svg"
              alt=""
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute right-6 top-0 -z-10 w-[96px] opacity-0 transition-[translate,opacity] duration-300 ease-linear group-hover/card:-translate-y-[97%] group-hover/card:opacity-100"
            />
            {/* On desktop the frame appears once its hero card is halfway in (data-docked) and the
                text once it has landed (data-landed); on smaller screens both are always shown. */}
            <Link
              href={`/projects/${project.slug}`}
              data-dock-card
              className="group block overflow-hidden rounded-[12px] border border-gray-150 bg-gray-50 transition-[box-shadow,background-color,border-color] duration-500 hover:shadow-xl lg:pointer-events-none lg:border-transparent lg:bg-transparent lg:data-[docked=true]:pointer-events-auto lg:data-[docked=true]:border-gray-150 lg:data-[docked=true]:bg-gray-50"
            >
              <div
                ref={(el) => {
                  gridSlots.current[i] = el;
                }}
                className="aspect-[4/3] bg-gray-100 lg:bg-transparent"
              >
                <div
                  className="relative flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] lg:invisible"
                  style={{ backgroundColor: project.color }}
                >
                  <ProjectThumb project={project} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-end md:justify-between transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-y-full lg:opacity-0 lg:group-data-[landed=true]:translate-y-0 lg:group-data-[landed=true]:opacity-100">
                  <ProjectCardText project={project} />
                  <ViewProjectButton />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
