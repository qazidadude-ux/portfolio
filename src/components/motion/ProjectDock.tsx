"use client";

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from "react";

type ProjectDockContextValue = {
  docked: boolean;
  gridRef: RefObject<HTMLDivElement | null>;
};

const ProjectDockContext = createContext<ProjectDockContextValue | null>(null);

export function ProjectDockProvider({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <ProjectDockContext.Provider value={{ docked, gridRef }}>{children}</ProjectDockContext.Provider>;
}

export function useProjectDock() {
  const ctx = useContext(ProjectDockContext);
  if (!ctx) throw new Error("useProjectDock must be used within ProjectDockProvider");
  return ctx;
}
