"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 40) {
        setExpanded(true);
      } else if (y < lastY) {
        setExpanded(true);
      } else if (y > lastY) {
        setExpanded(false);
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contactLink = NAV_LINKS.find((link) => link.label === "Contact");
  const primaryLinks = NAV_LINKS.filter((link) => link.label !== "Contact");

  return (
    <header className="sticky top-4 z-50">
      <div className="container-max">
        <div
          className={`flex items-center justify-between gap-4 rounded-[32px] border border-[#d9d9d9] px-3 py-2 md:px-4 transition-[background-color,backdrop-filter] duration-300 ${
            expanded ? "bg-white/50 backdrop-blur-[5px]" : "bg-white/70 backdrop-blur-[14px]"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              {SITE.name.charAt(0)}
            </span>
            <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
          </Link>

          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex items-center gap-8"
              >
                <nav className="flex items-center gap-8">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {contactLink && (
                  <Link
                    href={contactLink.href}
                    className="rounded-[24px] border border-[#dedede] bg-gray-50 px-5 py-2.5 text-sm font-medium shadow-[0_0.6px_0.6px_rgba(0,0,0,0.07),0_1.8px_1.8px_rgba(0,0,0,0.07),0_4.8px_4.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    {contactLink.label}
                  </Link>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex h-6 w-6 items-center justify-center gap-1"
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-black transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-black transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-gray-150"
          >
            <nav className="container-max flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={SITE.bookingUrl} external className="mt-2 w-full">
                Book a call
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
