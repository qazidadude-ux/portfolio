import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
import { ProjectCardText } from "@/components/ProjectCardText";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <main className="container-max w-full py-16 md:py-24">
        <Reveal>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold">All projects</h1>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-[12px] border border-gray-150 bg-gray-50 transition-shadow hover:shadow-xl"
              >
                <div
                  className="relative flex aspect-[4/3] items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundColor: project.color }}
                >
                  <ProjectThumb project={project} sizes="(min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-end md:justify-between">
                  <ProjectCardText project={project} />
                  <span className="shrink-0 text-sm font-medium underline-offset-4 group-hover:underline">
                    View Project
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
