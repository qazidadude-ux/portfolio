"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle, useThemeSync } from "@/components/ThemeToggle";
import { button } from "@/components/ui/pill";
import { Logo } from "@/components/ui/Logo";

const NAV_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  useThemeSync();

  useEffect(() => {
    let lastY = window.scrollY;
    let anchorY = window.scrollY;
    let ticking = false;
    const DEAD_ZONE = 10;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= 40) {
        setExpanded(true);
        anchorY = y;
      } else if (delta < 0 && anchorY - y > DEAD_ZONE) {
        setExpanded(true);
        anchorY = y;
      } else if (delta > 0 && y - anchorY > DEAD_ZONE) {
        setExpanded(false);
        anchorY = y;
      }

      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contactLink = NAV_LINKS.find((link) => link.label === "Contact");
  const primaryLinks = NAV_LINKS.filter((link) => link.label !== "Contact");

  return (
    <header className="sticky top-4 z-50">
      <div className="container-max flex justify-center">
        {/* The bar's width change is a scale-based layout animation. Every direct child also
            gets `layout` so Framer counter-scales it; otherwise the name text gets stretched. */}
        <motion.div
          layout
          transition={NAV_TRANSITION}
          style={{ borderRadius: 32, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
          className={`relative isolate flex h-14 w-full shrink-0 items-center justify-between gap-4 overflow-hidden border border-[var(--nav-glass-border)] px-2 md:px-2.5 transition-[background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded
              ? "lg:w-[85%] xl:w-[70%] bg-white/50 backdrop-blur-[5px]"
              : "lg:w-fit bg-white/70 backdrop-blur-[14px]"
          }`}
        >
          <motion.div layout aria-hidden transition={NAV_TRANSITION} style={{ borderRadius: 32 }} className="nav-glass">
            <div className="nav-glass-box">
              <div className="nav-glass-ring" />
            </div>
          </motion.div>

          <motion.div layout transition={NAV_TRANSITION} className="shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <span className="flex h-8 w-8 items-center justify-center text-black">
                <Logo className="h-6 w-6" />
              </span>
              <span className="whitespace-nowrap text-base font-semibold">{SITE.name.split(" ")[0]}</span>
            </Link>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.15, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
                transition={NAV_TRANSITION}
                className="hidden md:flex flex-1 items-center gap-4"
              >
                <nav className="flex flex-1 items-center justify-center gap-6 lg:gap-8">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="whitespace-nowrap text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {contactLink && (
                  <Link
                    href={contactLink.href}
                    className={button("lime", "sm")}
                  >
                    {contactLink.label}
                  </Link>
                )}
              </motion.div>
            ) : (
              // Bar gap (16px) + ml-8 (32px) = 48px from the name.
              <motion.div
                key="collapsed"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.2, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
                transition={NAV_TRANSITION}
                className="ml-8 hidden shrink-0 md:block"
              >
                <ThemeToggle />
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
        </motion.div>
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
              <Button href={SITE.bookingUrl} external size="sm" className="mt-2 w-full">
                Book a call
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
