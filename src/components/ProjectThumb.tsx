"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { useThumbnails } from "@/components/ThumbnailsProvider";

// Fills a positioned container with the project's thumbnail image, or, if it has none yet, its
// category label over the container's fallback color. The image is an explicit `thumbnail` on the
// project, or else a file named after its slug in public/projects/ (e.g. public/projects/kora.jpg).
export function ProjectThumb({ project, sizes, label = true }: { project: Project; sizes: string; label?: boolean }) {
  const found = useThumbnails();
  const src = project.thumbnail ?? found[project.slug];

  if (src) {
    return <Image src={src} alt={`${project.name}: ${project.category}`} fill sizes={sizes} className="object-cover" />;
  }
  if (!label) return null;
  return <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">{project.category}</span>;
}
