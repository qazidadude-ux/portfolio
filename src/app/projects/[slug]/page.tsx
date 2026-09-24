import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS, getProject } from "@/data/projects";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <>
      <Nav />
      <main>
        <div className="container-max py-12 md:py-16">
          <Reveal>
            <Link href="/projects" className="text-sm text-gray-500 hover:text-black">
              &larr; All projects
            </Link>
            <h1 className="mt-4 text-[clamp(2rem,6vw,3.5rem)] font-semibold">{project.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-gray-600">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-6 rounded-[16px] border border-gray-150 p-6 sm:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Client</p>
              <p className="mt-1 font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Role</p>
              <p className="mt-1 font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Year</p>
              <p className="mt-1 font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Tools</p>
              <p className="mt-1 font-medium">{project.tools.join(", ")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="container-max aspect-[16/9] rounded-[24px]"
            style={{ backgroundColor: project.color }}
          />
        </Reveal>

        <div className="container-max py-16">
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">{project.overview}</p>
          </Reveal>
        </div>

        <div className="border-t border-gray-150">
          <div className="container-max flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-gray-500">Next project</p>
              <p className="mt-1 text-2xl font-semibold">{next.name}</p>
            </div>
            <div className="flex gap-3">
              <Button href={`/projects/${next.slug}`} variant="secondary">
                View {next.name}
              </Button>
              <Button href={SITE.bookingUrl} external>
                Book a call
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
