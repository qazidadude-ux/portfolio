"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { useProjectDock } from "@/components/motion/ProjectDock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

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
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-[24px] border border-gray-150 bg-gray-50 transition-shadow hover:shadow-xl"
            >
              <div
                ref={(el) => {
                  gridSlots.current[i] = el;
                }}
                className="aspect-[4/3] bg-gray-100"
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
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
                <span className="text-sm font-medium text-black underline-offset-4 group-hover:underline">
                  View Project
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <Button href="/projects" variant="secondary">
          View all my projects
        </Button>
      </Reveal>
    </section>
  );
}
