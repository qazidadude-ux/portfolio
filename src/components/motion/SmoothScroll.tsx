"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Seconds for the page to catch up with the scroll position; higher is floatier.
const SMOOTH = 1.2;

// GSAP ScrollSmoother: the page keeps its native scroll position (so window.scrollY, anchors and
// scroll listeners still work) while the visible content eases toward it. Anything that must stay
// pinned to the viewport (nav, bottom blur) has to live outside this wrapper, because the content
// element is transformed and would carry fixed/sticky children along with it.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth: SMOOTH,
      // Native scrolling on touch screens; smoothing there fights the finger.
      smoothTouch: false,
      effects: false,
    });

    // In-page links (#work, #services…): left to the browser, it scrolls the fixed wrapper instead
    // of the page and the two fall out of sync, so route them through the smoother.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.hash.length < 2) return;
      const target = document.querySelector(link.hash);
      if (!target) return;
      e.preventDefault();
      smoother.scrollTo(target, true, "top top");
      history.pushState(null, "", link.hash);
    };
    document.addEventListener("click", onClick);

    // Arriving with a hash in the URL: jump there once the smoother is in control.
    const initial = location.hash.length > 1 ? document.querySelector(location.hash) : null;
    if (initial) smoother.scrollTo(initial, false, "top top");

    return () => {
      document.removeEventListener("click", onClick);
      smoother.kill();
    };
  });

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content" className="relative">
        {children}
      </div>
    </div>
  );
}
