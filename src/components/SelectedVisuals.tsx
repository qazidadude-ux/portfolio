"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type TransitionEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VISUALS } from "@/data/visuals";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SLIDE_W = "min(600px, 78vw)";
const SLIDE_RATIO = 3000 / 2063;
const GAP = 10;
const AUTOPLAY_MS = 3500;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = "0.8s";
// Slides further than this from the center are hidden; they'd only be faint slivers anyway.
const VISIBLE_RANGE = 3;
// Side slides fade from the center slide's edges to nothing at the container's guide lines.
const EDGE_FADE = `linear-gradient(to right, transparent, #000 calc(50% - ${SLIDE_W} / 2), #000 calc(50% + ${SLIDE_W} / 2), transparent)`;

const COUNT = VISUALS.length;
// Three copies so there is always a slide on both sides; after moving into the first or last
// copy, the index silently jumps back to the matching slide in the middle copy.
const SLIDES = [...VISUALS, ...VISUALS, ...VISUALS];
const toMiddleCopy = (i: number) => (((i - COUNT) % COUNT) + COUNT) % COUNT + COUNT;

// Cover-flow carousel: the centered slide sits flat; neighbours fold back 40° and fade.
export function SelectedVisuals() {
  const [index, setIndex] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; step: number; moved: boolean } | null>(null);
  const paused = useRef(false);
  const inView = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number | ((i: number) => number)) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => (inView.current = entry.isIntersecting));
    observer.observe(el);
    const id = setInterval(() => {
      if (inView.current && !paused.current && !drag.current) go((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => {
      observer.disconnect();
      clearInterval(id);
    };
  }, [go]);

  // Re-enable transitions one frame after an instant jump back to the middle copy.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const onTrackTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (index < COUNT || index >= COUNT * 2) {
      setAnimate(false);
      setIndex(toMiddleCopy(index));
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const slide = viewportRef.current?.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;
    drag.current = { startX: e.clientX, step: slide.offsetWidth + GAP, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) setDragX(dx);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved) {
      const dx = e.clientX - d.startX;
      let steps = Math.round(-dx / d.step);
      if (steps === 0 && Math.abs(dx) > 40) steps = dx < 0 ? 1 : -1;
      setDragging(false);
      setDragX(0);
      if (steps) go((i) => i + steps);
      return;
    }
    // A tap on a side slide brings it to the center. Side slides are tilted behind the track's
    // plane, so hit-test their projected boxes rather than trusting elementFromPoint.
    const slides = viewportRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? [];
    for (const slide of slides) {
      if (slide.style.visibility === "hidden") continue;
      const r = slide.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        go(Number(slide.dataset.slide));
        break;
      }
    }
  };

  const trackTransition = animate && !dragging ? `transform ${DURATION} ${EASE}` : "none";
  const slideTransition = animate ? `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}` : "none";

  return (
    <section id="visuals" className="py-24" aria-roledescription="carousel" aria-label="Selected visuals">
      <div className="container-max">
        <Reveal>
          <SectionHeading>
            <span className="block text-gray-500">Selected Visuals</span>
            <span className="block">from Projects.</span>
          </SectionHeading>
        </Reveal>
      </div>

      <div
        ref={viewportRef}
        className="relative mx-auto mt-12 max-w-[var(--container-max)] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        style={{
          height: `calc(${SLIDE_W} / ${SLIDE_RATIO})`,
          perspective: "1800px",
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
      >
        <div
          className="absolute left-1/2 top-0 flex h-full"
          style={{
            gap: GAP,
            transformStyle: "preserve-3d",
            transform: `translate3d(calc(${-index} * (${SLIDE_W} + ${GAP}px) - ${SLIDE_W} / 2 + ${dragX}px), 0, 0)`,
            transition: trackTransition,
          }}
          onTransitionEnd={onTrackTransitionEnd}
        >
          {SLIDES.map((visual, i) => {
            const offset = i - index;
            return (
              <div
                key={i}
                data-slide={i}
                aria-hidden={offset !== 0}
                className="relative flex h-full shrink-0 items-center justify-center overflow-hidden rounded-[20px]"
                style={{
                  width: SLIDE_W,
                  backgroundColor: visual.color,
                  opacity: offset === 0 ? 1 : 0.2,
                  visibility: Math.abs(offset) > VISIBLE_RANGE ? "hidden" : "visible",
                  transformOrigin: offset < 0 ? "100% 50%" : "0% 50%",
                  transform: offset < 0 ? "rotateY(-40deg)" : offset > 0 ? "rotateY(40deg)" : "none",
                  transition: slideTransition,
                }}
              >
                {visual.image ? (
                  <Image src={visual.image} alt={visual.title} fill sizes="600px" draggable={false} className="object-cover" />
                ) : (
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">{visual.title}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-max mt-8 flex justify-center gap-3">
        {[
          { label: "Previous visual", step: -1, Icon: ChevronLeft },
          { label: "Next visual", step: 1, Icon: ChevronRight },
        ].map(({ label, step, Icon }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => go((i) => i + step)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-black transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gray-150 active:scale-[0.94]"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </button>
        ))}
      </div>
    </section>
  );
}
