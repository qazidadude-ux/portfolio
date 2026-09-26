"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { useProjectDock } from "@/components/motion/ProjectDock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PILL_BUTTON_SECONDARY } from "@/components/ui/pill";

export function ProjectsGrid() {
  const { gridSlots } = useProjectDock();

  return (
    <section id="work" className="container-max py-24">
      <Reveal>
        <SectionHeading>Latest Projects</SectionHeading>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <div key={project.slug}>
            {/* On desktop the frame appears once its hero card is halfway in (data-docked) and the
                text once it has landed (data-landed); on smaller screens both are always shown. */}
            <Link
              href={`/projects/${project.slug}`}
              data-dock-card
              className="group block overflow-hidden rounded-[24px] border border-gray-150 bg-gray-50 transition-[box-shadow,background-color,border-color] duration-500 hover:shadow-xl lg:pointer-events-none lg:border-transparent lg:bg-transparent lg:data-[docked=true]:pointer-events-auto lg:data-[docked=true]:border-gray-150 lg:data-[docked=true]:bg-gray-50"
            >
              <div
                ref={(el) => {
                  gridSlots.current[i] = el;
                }}
                className="aspect-[4/3] bg-gray-100 lg:bg-transparent"
              >
                <div
                  className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] lg:invisible"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center justify-between p-6 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-y-full lg:opacity-0 lg:group-data-[landed=true]:translate-y-0 lg:group-data-[landed=true]:opacity-100">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                  <span className="text-sm font-medium text-black underline-offset-4 group-hover:underline">
                    View Project
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <Link href="/projects" className={PILL_BUTTON_SECONDARY}>
          View all my projects
        </Link>
      </Reveal>
    </section>
  );
}
