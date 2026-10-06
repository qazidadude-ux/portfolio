"use client";

// Not currently on any page (kept for later). To bring it back, render <Spotlight /> right above
// <Hero /> inside <ProjectDockProvider> in src/app/page.tsx.

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SPOTLIGHT } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { ProjectThumb } from "@/components/ProjectThumb";
import { KeyButton } from "@/components/ui/KeyButton";
import { GridLines } from "@/components/GridLines";

// Geometry of the 3D wall at full size (a 1200px-wide panel); everything scales with --s below that.
const CARD_W = 640;
const CARD_H = 580;
const GAP = 16;
const PERSPECTIVE = 650;
const DEPTH = -470; // pushes the cylinder's center back from the screen plane
// Cards repeat the projects in order, as close to 14 slots as keeps the sequence seamless.
const SLOTS = Math.max(1, Math.round(14 / PROJECTS.length)) * PROJECTS.length;
const STEP = 360 / SLOTS;
// Cylinder radius at which neighbouring cards sit GAP apart.
const RADIUS = (CARD_W + GAP) / (2 * Math.sin(Math.PI / SLOTS));

// Positive turns the wall so the cards travel right to left (negative reverses it).
const AUTO_SPEED = 6; // deg/s
const DRAG_SPEED = 0.12; // deg per px dragged, at full size
const MIN_SCALE = 0.5;
const FULL_WIDTH = 1200;

const px = (n: number) => `calc(${n}px * var(--s))`;

// Inside a slowly turning cylinder of project cards; drag sideways to spin it, and it eases back
// to its idle speed after letting go.
function Wall() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const scale = useRef(1);
  const motionState = useRef({ angle: 0, velocity: 0, dragging: false, lastX: 0, lastT: 0 });

  // Size the wall to the viewport before first paint so it never flashes at full size.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const apply = () => {
      scale.current = Math.min(1, Math.max(MIN_SCALE, viewport.clientWidth / FULL_WIDTH));
      viewport.style.setProperty("--s", String(scale.current));
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;
    const state = motionState.current;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(viewport);

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!state.dragging) {
        state.velocity += (AUTO_SPEED - state.velocity) * (1 - Math.exp(-dt * 1.5));
        state.angle += state.velocity * dt;
      }
      if (visible) {
        stage.style.transform = `translateZ(${DEPTH * scale.current}px) rotateY(${state.angle}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const state = motionState.current;
    state.dragging = true;
    state.lastX = e.clientX;
    state.lastT = e.timeStamp;
    state.velocity = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const state = motionState.current;
    if (!state.dragging) return;
    // The wall follows the pointer: dragging right moves the cards right.
    const delta = (-(e.clientX - state.lastX) * DRAG_SPEED) / scale.current;
    const dt = Math.max((e.timeStamp - state.lastT) / 1000, 1 / 240);
    state.angle += delta;
    // Smoothed so the release speed reflects the last few moves, not one jittery event.
    state.velocity = state.velocity * 0.6 + (delta / dt) * 0.4;
    state.lastX = e.clientX;
    state.lastT = e.timeStamp;
  };
  const onPointerUp = () => {
    motionState.current.dragging = false;
  };

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      className="absolute inset-0 flex cursor-grab touch-pan-y [--s:1] select-none items-center justify-center active:cursor-grabbing"
      style={{ perspective: px(PERSPECTIVE), transformStyle: "preserve-3d" }}
    >
      <div
        ref={stageRef}
        className="relative will-change-transform"
        style={{ width: px(CARD_W), height: px(CARD_H), transformStyle: "preserve-3d", transform: `translateZ(${DEPTH}px)` }}
      >
        {Array.from({ length: SLOTS }, (_, i) => {
          const project = PROJECTS[i % PROJECTS.length];
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[12px]"
              style={{
                backgroundColor: project.color,
                backfaceVisibility: "hidden",
                transform: `rotateY(${i * STEP}deg) translateZ(calc(${-RADIUS}px * var(--s)))`,
              }}
            >
              <ProjectThumb project={project} sizes="640px" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Full-height intro above the hero. The #12110D background runs full width and up behind the nav (which
// switches to its dark look over it, via data-nav-theme); everything else stays between the guide
// lines, with the wall fading out at the panel's sides and bottom. Like the footer, it sits above
// the page-wide guides and draws its own darker pair.
export function Spotlight() {
  return (
    <section data-nav-theme="dark" className="theme-light relative z-[41] -mt-14 bg-[#12110D] pt-14">
      <GridLines className="z-10" lineClassName="bg-[var(--footer-line)]" />
      <div className="relative mx-auto h-[calc(100svh-3.5rem)] max-h-[900px] min-h-[600px] max-w-[var(--container-max)] overflow-hidden bg-[#12110D] text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-x-0 top-0 h-[75%]">
          <Wall />
        </motion.div>

        {/* Edge fades: sides and top blend the wall into the panel; the taller bottom one keeps the text readable. */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#12110D] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#12110D] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#12110D] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#12110D] via-[#12110D]/80 to-transparent" />

        {/* Head-and-shoulders portrait in the wall's box, on top of the cards: resting on the box's
            bottom from md up so the face sits on the wall, centered on phones. The mask fades the
            shoulders out toward the bottom; the text below is raised to overlap them. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[75%] items-center justify-center md:items-end">
          <motion.div
            {...rise(0.3)}
            className="w-[300px] md:w-[420px] lg:w-[500px]"
            style={{
              maskImage: "linear-gradient(to bottom, #000 55%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 95%)",
            }}
          >
            <Image src="/portrait.png" alt="" width={1200} height={1254} priority sizes="500px" className="h-auto w-full" />
          </motion.div>
        </div>

        {/* Raised off the bottom so it overlaps (and sits on top of) the lower part of the portrait.
            Side padding is 80% more than the page's usual 24px / 44px. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[12%] flex flex-col gap-8 px-[43px] md:bottom-[16%] md:flex-row md:items-end md:justify-between md:px-[79px]">
          <div>
            <motion.p {...rise(0.5)} className="text-lg text-gray-500 md:text-xl">
              {SPOTLIGHT.greeting}
            </motion.p>
            <motion.h2 {...rise(0.6)} className="mt-2 text-[48px] font-medium leading-[1] tracking-[-0.03em] text-white md:text-[56px] lg:text-[72px]">
              {SPOTLIGHT.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div {...rise(0.75)} className="flex max-w-[300px] flex-col items-start gap-5 md:items-end md:text-right">
            <KeyButton href={SPOTLIGHT.ctaHref} className="pointer-events-auto">
              {SPOTLIGHT.ctaLabel}
            </KeyButton>
            <p className="text-[15px] leading-[1.5] text-gray-500">
              {SPOTLIGHT.quote.before}
              <span className="text-white">{SPOTLIGHT.quote.highlight}</span>
              {SPOTLIGHT.quote.after}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
