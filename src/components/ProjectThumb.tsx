import Image from "next/image";
import type { Project } from "@/data/projects";

// Fills a positioned container with the project's thumbnail image, or, if it has none yet, its
// category label over the container's fallback color.
export function ProjectThumb({ project, sizes, label = true }: { project: Project; sizes: string; label?: boolean }) {
  if (project.thumbnail) {
    return <Image src={project.thumbnail} alt={`${project.name}: ${project.category}`} fill sizes={sizes} className="object-cover" />;
  }
  if (!label) return null;
  return <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">{project.category}</span>;
}
