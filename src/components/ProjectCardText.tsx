import type { Project } from "@/data/projects";

// Text block on a project card: project type, then name, then the one-line impact. A project
// without an impact yet keeps the line's space so cards in a row stay the same height.
export function ProjectCardText({ project }: { project: Project }) {
  return (
    <div className="min-w-0">
      {/* Eyebrow, styled like the hero's "HELLO". */}
      <p className="text-sm font-medium uppercase tracking-[0.05em] text-secondary">{project.category}</p>
      <h3 className="mt-2 text-[28px] font-normal leading-[1.2]">{project.name}</h3>
      <p aria-hidden={!project.impact} className={`mt-1 truncate text-base font-medium text-black ${project.impact ? "" : "invisible"}`}>
        {project.impact ?? "–"}
      </p>
    </div>
  );
}
