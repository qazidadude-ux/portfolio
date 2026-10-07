"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, X } from "lucide-react";

// A small bar on phones, floating above the bottom of the screen on project pages: the case studies
// are laid out for wide screens, so it says they look best on desktop. It doesn't block anything;
// the × hides it. Decided after mount (the server can't know the screen width), so nothing renders
// on the server and hydration stays clean.
export function DesktopNotice() {
  // null until it has been shown (nothing renders, so hydration matches); false once dismissed,
  // which lets the exit animation play.
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (!matchMedia("(max-width: 767px)").matches) return;
    // Deferred a frame so the state change isn't a synchronous setState inside the effect.
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (open === null) return null;

  // Portalled to <body>: inside the smooth-scroll content (which is transformed) a fixed element
  // would pin to the page instead of the screen.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.25 } }}
          // 48px up, clear of the 32px bottom blur; 32px sides like the page content.
          className="fixed inset-x-8 bottom-12 z-[60] flex items-center gap-3 rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-gray-100 py-3 pl-4 pr-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          <Monitor className="size-5 shrink-0 text-secondary" strokeWidth={1.75} aria-hidden />
          <p className="flex-1 text-sm leading-[1.4] text-black">Looks best on desktop</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className="flex size-9 shrink-0 items-center justify-center rounded-[8px] text-gray-500 transition-colors hover:text-black"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
