"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";

const CYCLE_WORDS = ["design", "build", "create"];
const CYCLE_MS = 2200;

const HEADING = "text-[42px] font-medium leading-[0.95] tracking-[-0.03em] md:text-[48px] lg:text-[64px] xl:text-[72px]";
const LINK = "text-white transition-colors duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-gray-500";

const MENU_LINKS = NAV_LINKS.filter((link) => link.label !== "Contact");
const LEGAL_LINKS = [
  { label: "Terms of service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
];

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CYCLE_WORDS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span layout className="relative inline-flex overflow-visible" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={CYCLE_WORDS[index]}
          initial={{ opacity: 0, y: "60%", filter: "blur(5px)" }}
          animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-60%", filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {CYCLE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

// Scales the name so it spans the full footer width exactly, regardless of font metrics.
function FitName({ text }: { text: string }) {
  const textRef = useRef<SVGTextElement>(null);
  const [box, setBox] = useState("0 0 1000 200");

  useLayoutEffect(() => {
    const fit = () => {
      const el = textRef.current;
      if (!el) return;
      const b = el.getBBox();
      if (b.width > 0) setBox(`${b.x} ${b.y} ${b.width} ${b.height}`);
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [text]);

  return (
    <svg viewBox={box} className="block w-full" aria-hidden>
      <text
        ref={textRef}
        x="0"
        y="0"
        dominantBaseline="text-before-edge"
        className="fill-white"
        style={{ font: '500 200px "Switzer", sans-serif', letterSpacing: "-0.03em" }}
      >
        {text}
      </text>
    </svg>
  );
}

export function Footer() {
  const firstName = SITE.name.split(" ")[0].toUpperCase();

  return (
    <footer id="contact" className="relative z-[41] overflow-hidden bg-black text-white">
      <div className="container-max flex flex-col gap-8 pb-[76px] pt-8 md:gap-6 md:pb-[153px] md:pt-16 lg:pb-[211px]">
        <div className="flex flex-col gap-12 border-b border-gray-500 pb-6 md:gap-16 lg:gap-12">
          <div className={HEADING}>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span>Let&rsquo;s</span>
              <CyclingWord />
            </p>
            <p className="text-gray-500">something great together.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Email</p>
              <a href={`mailto:${SITE.email}`} className={`text-base font-medium tracking-[-0.02em] md:text-lg ${LINK}`}>
                {SITE.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Call Me</p>
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-base font-medium tracking-[-0.02em] md:text-lg ${LINK}`}
              >
                Book Now
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Social</p>
              <SocialLinks tone="light" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-wrap gap-6 md:col-span-2">
            <div className="flex flex-1 flex-col gap-[18px]">
              <p className="text-xs font-semibold tracking-[-0.02em] text-gray-500">Menu</p>
              <ul className="grid w-max grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-semibold tracking-[-0.02em]">
                {MENU_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-[18px]">
              <p className="text-xs font-semibold tracking-[-0.02em] text-gray-500">Legal</p>
              <ul className="flex flex-col gap-2.5 text-xs font-semibold tracking-[-0.02em]">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="self-end text-xs font-semibold text-gray-400 md:justify-self-end">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[98%] w-full max-w-[var(--container-max)] -translate-x-1/2 -translate-y-1/2 select-none px-[44px] md:top-[94%] lg:top-[92%]">
        <FitName text={firstName} />
      </div>
    </footer>
  );
}
