import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="container-max w-full py-24">
        <Reveal>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold">All projects</h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-[24px] border border-gray-150 bg-gray-50 transition-shadow hover:shadow-xl"
              >
                <div
                  className="flex aspect-[4/3] items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                  <span className="text-sm font-medium underline-offset-4 group-hover:underline">
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
