"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { PROJECTS } from "@/data/projects";

type SlotRefs = RefObject<(HTMLDivElement | null)[]>;

type ProjectDockContextValue = {
  heroSlots: SlotRefs;
  gridSlots: SlotRefs;
  ready: boolean;
};

const ProjectDockContext = createContext<ProjectDockContextValue | null>(null);

// Positions are percentages of the fan container so the whole fan scales across breakpoints.
export const FAN = [
  { top: "26%", left: "0%", rotate: -9 },
  { top: "9%", left: "17%", rotate: -3 },
  { top: "35%", left: "34%", rotate: 4 },
  { top: "13%", left: "52%", rotate: 10 },
];

export const FAN_RADIUS = 20;
export const FAN_SHADOW = "0 24px 48px -16px rgba(0,0,0,0.28)";

const GRID_RADIUS = 24;
const STAGGER = 0.1;
// Seconds for the cards to close ~63% of the gap to the scroll position; higher is softer.
const SMOOTHING_SECONDS = 0.45;
// Cards finish landing when the grid's top edge reaches this fraction of the viewport height.
const LAND_AT_VIEWPORT = 0.15;
// Fraction of a card's own flight after which its grid frame and text are revealed.
const REVEAL_AT = 0.5;

type Box = { x: number; y: number; w: number; h: number };

// Uses offset* rather than getBoundingClientRect so in-flight reveal transforms don't skew positions.
function boxWithin(el: HTMLElement, ancestor: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function ProjectDockProvider({ children }: { children: ReactNode }) {
  const heroSlots = useRef<(HTMLDivElement | null)[]>([]);
  const gridSlots = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const main = overlay?.parentElement;
    if (!overlay || !main) return;

    let starts: Box[] = [];
    let ends: Box[] = [];
    let endScroll = 1;
    let current = 0;
    let target = 0;
    let raf = 0;
    let lastFrame = 0;
    let active = false;
    const dockedState: boolean[] = [];

    // Toggles the grid card's data-docked attribute; CSS reveals its frame and text from it.
    const setDocked = (i: number, docked: boolean) => {
      if (dockedState[i] === docked) return;
      const card = gridSlots.current[i]?.closest<HTMLElement>("[data-dock-card]");
      if (!card) return;
      dockedState[i] = docked;
      card.dataset.docked = String(docked);
    };

    const render = () => {
      cards.current.forEach((el, i) => {
        const s = starts[i];
        const e = ends[i];
        if (!el || !s || !e) return;
        const local = clamp01((current - i * STAGGER) / (1 - STAGGER * (PROJECTS.length - 1)));
        setDocked(i, local >= REVEAL_AT);
        const t = easeInOut(local);
        const top = lerp(FAN_RADIUS, GRID_RADIUS, t);
        const bottom = lerp(FAN_RADIUS, 0, t);
        el.style.width = `${lerp(s.w, e.w, t)}px`;
        el.style.height = `${lerp(s.h, e.h, t)}px`;
        el.style.transform = `translate3d(${lerp(s.x, e.x, t)}px, ${lerp(s.y, e.y, t)}px, 0) rotate(${lerp(FAN[i].rotate, 0, t)}deg)`;
        el.style.borderRadius = `${top}px ${top}px ${bottom}px ${bottom}px`;
        el.style.boxShadow = `0 24px 48px -16px rgba(0,0,0,${0.28 * (1 - t)})`;
      });
    };

    const tick = (now: number) => {
      // Cap dt so a backgrounded tab doesn't snap the cards on return.
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
      lastFrame = now;
      const diff = target - current;
      const step = 1 - Math.exp(-dt / SMOOTHING_SECONDS);
      current = Math.abs(diff) < 0.0005 ? target : current + diff * step;
      render();
      if (current === target) {
        raf = 0;
        lastFrame = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const measure = () => {
      const heroEls = heroSlots.current;
      const gridEls = gridSlots.current;
      active =
        getComputedStyle(overlay).display !== "none" &&
        heroEls.length === PROJECTS.length &&
        gridEls.length === PROJECTS.length &&
        heroEls.every((el) => el && el.offsetWidth > 0) &&
        gridEls.every((el) => el && el.offsetWidth > 0);

      if (!active) {
        gridSlots.current.forEach((_, i) => setDocked(i, true));
        setReady(false);
        return;
      }

      starts = heroEls.map((el) => boxWithin(el!, main));
      ends = gridEls.map((el) => boxWithin(el!, main));
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const gridTop = mainTop + Math.min(...ends.map((b) => b.y));
      endScroll = Math.max(1, gridTop - window.innerHeight * LAND_AT_VIEWPORT);
      target = clamp01(window.scrollY / endScroll);
      current = target;
      render();
      setReady(true);
    };

    const onScroll = () => {
      if (!active) return;
      target = clamp01(window.scrollY / endScroll);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    document.fonts?.ready.then(measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(main);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ProjectDockContext.Provider value={{ heroSlots, gridSlots, ready }}>
      <div
        ref={overlayRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-30 hidden lg:block ${ready ? "" : "invisible"}`}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="absolute left-0 top-0 flex items-center justify-center overflow-hidden will-change-transform"
            style={{ backgroundColor: project.color }}
          >
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
              {project.category}
            </span>
          </div>
        ))}
      </div>
      {children}
    </ProjectDockContext.Provider>
  );
}

export function useProjectDock() {
  const ctx = useContext(ProjectDockContext);
  if (!ctx) throw new Error("useProjectDock must be used within ProjectDockProvider");
  return ctx;
}
