"use client";

import { useEffect, useRef } from "react";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** A run of text with its own styling, e.g. a bold lead-in followed by gray body copy. */
export type TypewriterSegment = { text: string; className?: string };
/** A plain string, or styled segments that are typed one after another. */
export type TypewriterParagraph = string | readonly TypewriterSegment[];

const segmentsOf = (p: TypewriterParagraph): readonly TypewriterSegment[] => (typeof p === "string" ? [{ text: p }] : p);
const plainText = (p: TypewriterParagraph) => segmentsOf(p).map((s) => s.text).join("");

// Types paragraphs out letter by letter, driven by scroll: typing starts when the text's top
// enters the viewport and finishes when the whole section is in view (or, for a section taller
// than the viewport, when the text itself is), and runs backwards on the way up. Progress eases
// after the scroll position, and letters fade in over a soft edge `softness` letters wide, so it
// reads as smooth writing rather than letters popping on. Every letter is laid out from the start
// (only its opacity changes), so the text never reflows; a blinking caret (.type-caret in
// globals.css) rides the writing edge.
export function Typewriter({
  paragraphs,
  className,
  paragraphClassName,
  softness = 10,
}: {
  paragraphs: readonly TypewriterParagraph[];
  className?: string;
  paragraphClassName?: string;
  softness?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const section = root.closest("section") ?? root;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const total = letters.length;

    let current = -1;
    let rendered = -1;
    let lastTop = Infinity;
    let caretAt = -1;
    let frame = 0;
    let last = 0;

    const progress = () => {
      const vh = window.innerHeight;
      const text = root.getBoundingClientRect();
      const sec = section.getBoundingClientRect();
      const end = sec.height <= vh ? sec.bottom : text.bottom;
      const target = clamp01((vh - text.top) / Math.max(end - text.top, 1));
      // Only un-type when the text actually moves down the screen (scrolling up). If the section
      // just grew (e.g. the work history opening beside the intro), keep what's already typed.
      const scrolledUp = text.top > lastTop + 0.5;
      lastTop = text.top;
      return current >= 0 && target < current && !scrolledUp ? current : target;
    };

    const render = () => {
      // The writing edge runs `softness` letters past the end so the last letter lands fully opaque.
      const edge = current * (total + softness);
      letters.forEach((el, i) => {
        el.style.opacity = String(clamp01((edge - i) / softness));
      });
      const nextCaret = current > 0 && current < 1 ? Math.min(total - 1, Math.floor(edge - softness / 2)) : -1;
      if (nextCaret !== caretAt) {
        letters[caretAt]?.classList.remove("type-caret");
        if (nextCaret >= 0) letters[nextCaret].classList.add("type-caret");
        caretAt = nextCaret;
      }
      rendered = current;
    };

    // Measured every frame rather than on scroll events: the page's smooth scroller keeps easing
    // the content toward the scroll position after the last scroll event has fired.
    const tick = (now: number) => {
      const target = progress();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      current = current < 0 ? target : current + (target - current) * (1 - Math.exp(-dt / 0.15));
      if (Math.abs(target - current) < 0.0005) current = target;
      if (Math.abs(current - rendered) > 0.0001) render();
      frame = requestAnimationFrame(tick);
    };

    // Only run the loop while the section is on (or near) the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [paragraphs, softness]);

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((paragraph, p) => (
        <p key={p} className={paragraphClassName}>
          {/* Screen readers get the whole sentence rather than one letter per span. */}
          <span className="sr-only">{plainText(paragraph)}</span>
          <span aria-hidden>
            {segmentsOf(paragraph).map((segment, s) => (
              <span key={s} className={segment.className}>
                {Array.from(segment.text, (letter, i) => (
                  <span key={i} data-letter="" style={{ opacity: 0 }}>
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </p>
      ))}
    </div>
  );
}
