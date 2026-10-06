"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type TransitionEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VISUALS } from "@/data/visuals";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";

// The center slide takes 80% of the carousel's width (cqw: the wrapper below is a size
// container). Rounded to an even number of px so the slide, and half of it (used to center the
// track), always land on whole pixels; a slide on a half pixel is resampled and looks blurry.
// Slide width, from --slide-w on the viewport: the full content width on phones (one slide, no
// neighbours), 80% of the container from md (the side slides peek in).
const SLIDE_W = "var(--slide-w)";
const SLIDE_RATIO = 3000 / 2063;
const GAP = 10;
// How long each slide holds at the center once it has landed, before the next one comes in.
const HOLD_MS = 2000;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION_MS = 800;
const DURATION = `${DURATION_MS}ms`;
// Slides further than this from the center are hidden; they'd only be faint slivers anyway.
const VISIBLE_RANGE = 3;
// Side slides fade from the center slide's edges to nothing at the container's guide lines.
const EDGE_FADE = `linear-gradient(to right, transparent, #000 calc(50% - ${SLIDE_W} / 2), #000 calc(50% + ${SLIDE_W} / 2), transparent)`;

const COUNT = VISUALS.length;
// Three copies so there is always a slide on both sides; after moving into the first or last
// copy, the index silently jumps back to the matching slide in the middle copy.
const SLIDES = [...VISUALS, ...VISUALS, ...VISUALS];
const toMiddleCopy = (i: number) =>
  ((((i - COUNT) % COUNT) + COUNT) % COUNT) + COUNT;

// Flat carousel: the centered slide at full size; neighbours slightly smaller and faded. It is
// deliberately 2D and pixel-snapped (no perspective or 3D tilt), which keeps the images crisp.
export function SelectedVisuals() {
  const [index, setIndex] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; step: number; moved: boolean } | null>(
    null,
  );
  const paused = useRef(false);
  const inView = useRef(false);
  // Set when the index jumps back to the middle copy: that happens as a slide lands, so there is
  // no slide-in left to wait for.
  const jumped = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number | ((i: number) => number)) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => (inView.current = entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay: each slide slides in, holds at the center for HOLD_MS, then the next one comes in.
  // The timer restarts on every index change, so chevrons, drags and taps get the same hold. While
  // hovered, dragged or off screen it waits, checking again shortly.
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const advance = () => {
      if (inView.current && !paused.current && !drag.current) go((i) => i + 1);
      else id = setTimeout(advance, 300);
    };
    id = setTimeout(advance, (jumped.current ? 0 : DURATION_MS) + HOLD_MS);
    jumped.current = false;
    return () => clearTimeout(id);
  }, [index, go]);

  // Re-enable transitions one frame after an instant jump back to the middle copy.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const onTrackTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (index < COUNT || index >= COUNT * 2) {
      jumped.current = true;
      setAnimate(false);
      setIndex(toMiddleCopy(index));
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const slide =
      viewportRef.current?.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;
    drag.current = {
      startX: e.clientX,
      step: slide.offsetWidth + GAP,
      moved: false,
    };
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
    // A tap on a side slide brings it to the center (hit-tested against each slide's box, since
    // the pointer is captured by the viewport).
    const slides =
      viewportRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? [];
    for (const slide of slides) {
      if (slide.style.visibility === "hidden") continue;
      const r = slide.getBoundingClientRect();
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        go(Number(slide.dataset.slide));
        break;
      }
    }
  };

  const trackTransition =
    animate && !dragging ? `transform ${DURATION} ${EASE}` : "none";
  const slideTransition = animate
    ? `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`
    : "none";

  return (
    <section
      id="visuals"
      className="py-16 md:py-24"
      aria-roledescription="carousel"
      aria-label="Selected visuals"
    >
      <div className="container-max">
        <Reveal>
          <SectionHeading>
            <span className="block text-gray-500">Selected Visuals</span>
            <span className="block">from Projects.</span>
          </SectionHeading>
        </Reveal>
      </div>

      {/* Size container for the slide width (cqw); the viewport inside can't measure itself. Phones pad
          it like container-max, so the one visible slide lines up with the content. */}
      <div className="mx-auto mt-6 max-w-[var(--container-max)] px-8 @container md:mt-12 md:px-0">
        <div
          ref={viewportRef}
          className="relative cursor-grab touch-pan-y select-none overflow-hidden [--slide-w:round(down,100cqw,2px)] active:cursor-grabbing md:[--slide-w:round(down,80cqw,2px)]"
          style={{
            height: `round(calc(${SLIDE_W} / ${SLIDE_RATIO}), 1px)`,
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
            className="absolute top-0 flex h-full"
            style={{
              // Snapped to whole pixels (an odd-width viewport would otherwise center on a half pixel).
              left: "round(down, 50%, 1px)",
              gap: GAP,
              transform: `translateX(round(calc(${-index} * (${SLIDE_W} + ${GAP}px) - ${SLIDE_W} / 2 + ${dragX}px), 1px))`,
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
                  className="relative flex h-full shrink-0 items-center justify-center overflow-hidden rounded-[12px]"
                  style={{
                    width: SLIDE_W,
                    backgroundColor: visual.color,
                    opacity: offset === 0 ? 1 : 0.3,
                    visibility:
                      Math.abs(offset) > VISIBLE_RANGE ? "hidden" : "visible",
                    // Side slides shrink toward the center slide; the center one is untransformed.
                    transformOrigin: offset < 0 ? "100% 50%" : "0% 50%",
                    transform: offset === 0 ? "none" : "scale(0.9)",
                    transition: slideTransition,
                  }}
                >
                  {visual.image ? (
                    // Quality 100 (allowed in next.config.ts): resized to the slide, not recompressed.
                    <Image
                      src={visual.image}
                      alt={visual.title}
                      fill
                      sizes="(min-width: 1200px) 960px, (min-width: 768px) 80vw, 100vw"
                      quality={100}
                      draggable={false}
                      className="object-cover"
                    />
                  ) : (
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black">
                      {visual.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
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
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </button>
        ))}
      </div>
    </section>
  );
}
