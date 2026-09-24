"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);

  const contactLink = NAV_LINKS.find((link) => link.label === "Contact");
  const primaryLinks = NAV_LINKS.filter((link) => link.label !== "Contact");

  return (
    <header className="sticky top-4 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between gap-4 rounded-full border border-gray-150 bg-white/90 backdrop-blur-md shadow-sm px-3 py-2 md:px-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              {SITE.name.charAt(0)}
            </span>
            <span className="text-sm font-semibold tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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

          <div className="hidden md:flex items-center">
            {contactLink && (
              <Link
                href={contactLink.href}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {contactLink.label}
              </Link>
            )}
          </div>

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
