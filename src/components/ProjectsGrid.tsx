"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { useProjectDock } from "@/components/motion/ProjectDock";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ProjectsGrid() {
  const { docked, gridRef } = useProjectDock();

  return (
    <section id="work" className="container-max py-20 md:py-28">
      <Reveal>
        <Eyebrow>Latest</Eyebrow>
        <SectionHeading className="mt-4">Projects</SectionHeading>
      </Reveal>

      <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-[24px] border border-gray-150 bg-gray-50 transition-shadow hover:shadow-xl"
            >
              {docked ? (
                <motion.div
                  layoutId={`project-thumb-${project.slug}`}
                  layout
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex aspect-[4/3] items-center justify-center text-sm text-gray-500 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
                    {project.category}
                  </span>
                </motion.div>
              ) : (
                <div className="aspect-[4/3]" style={{ backgroundColor: project.color }} />
              )}
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
          </Reveal>
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
