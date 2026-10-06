"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Shown when a project page opens on a phone: the case studies are laid out for wide screens, so
// suggest a desktop, with a way to carry on regardless. Decided after mount (the server can't know
// the screen width), so nothing renders on the server and hydration stays clean.
export function DesktopNotice() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!matchMedia("(max-width: 767px)").matches) return;
    // Deferred a frame so the state change isn't a synchronous setState inside the effect.
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Hold the page still behind the dialog: lock both <html> (the real scroller, since it has
    // overflow-x: clip) and <body>, and swallow wheel/touch scrolling outright (iOS Safari ignores
    // overflow: hidden). Escape dismisses it.
    const html = document.documentElement;
    const prev = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const block = (e: Event) => e.preventDefault();
    addEventListener("wheel", block, { passive: false });
    addEventListener("touchmove", block, { passive: false });
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key) && e.target === document.body) e.preventDefault();
    };
    addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
      removeEventListener("wheel", block);
      removeEventListener("touchmove", block);
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  // Portalled to <body>: inside the smooth-scroll content (which is transformed) a fixed element
  // would pin to the page instead of the screen and could sit off-centre.
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-8 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="desktop-notice-title"
        className="flex w-full max-w-sm flex-col items-center gap-4 rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-gray-100 p-6 text-center"
      >
        <Monitor className="size-8 text-secondary" strokeWidth={1.5} aria-hidden />
        <p id="desktop-notice-title" className="text-xl font-medium leading-[1.4] tracking-[-0.02em] text-black">
          This case study learned to shine on desktop.
        </p>
        <p className="text-base font-light leading-[1.5] text-gray-600">
          Please switch to a desktop device for a better experience.
        </p>
        <span ref={(el) => void (buttonRef.current = el?.querySelector("button") ?? null)} className="mt-2 w-full">
          <Button onClick={() => setOpen(false)} variant="secondary" className="w-full">
            Continue anyway
          </Button>
        </span>
      </div>
    </div>,
    document.body,
  );
}
