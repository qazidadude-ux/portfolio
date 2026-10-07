"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";
import { GridLines } from "@/components/GridLines";

const CYCLE_WORDS = ["design", "build", "create"];
const CYCLE_MS = 2200;
const ROLL_TRANSITION = { duration: 0.7, ease: [0.65, 0, 0.35, 1] } as const;

const HEADING = "text-[42px] font-medium leading-[0.95] tracking-[-0.03em] md:text-[48px] lg:text-[64px] xl:text-[72px]";
const LINK = "text-white transition-colors duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-gray-500";

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CYCLE_WORDS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  // Slot-style roll: the current word slides up and out while the next slides up from below.
  // The slot clips vertically only (so a longer outgoing word isn't cut off sideways); the
  // words' vertical padding keeps descenders inside the clip, and the slot's negative margin
  // cancels it so the line height is unchanged.
  return (
    <span className="relative -my-[0.12em] inline-flex" style={{ overflowX: "visible", overflowY: "clip" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={CYCLE_WORDS[index]}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={ROLL_TRANSITION}
          className="inline-block whitespace-nowrap py-[0.12em] text-secondary"
        >
          {CYCLE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: SITE.timeZone,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

// Re-render once a second. The server snapshot is empty because its clock (and time zone) would
// differ from the visitor's; the time fills in on the client right after hydration.
const subscribeToSeconds = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};

// Live local time where Shakeel is based, e.g. "11:59:22 PM".
function LocalTime() {
  const time = useSyncExternalStore(subscribeToSeconds, () => TIME_FORMAT.format(new Date()), () => "");
  return (
    <p className="min-h-5 text-sm font-semibold tracking-[-0.02em] text-gray-500 tabular-nums" aria-label={`Local time in ${SITE.basedIn}`}>
      {time}
    </p>
  );
}

const NAME_FONT = '500 200px "Switzer", sans-serif';
// Share of the letters' height left visible (at every size); the rest runs off the bottom of the footer.
const NAME_VISIBLE = 0.8;

// Scales the name so it spans the full footer width exactly. The viewBox hugs the letters'
// ink (not the font's line box), so spacing above the name is exactly what the layout sets.
function FitName({ text }: { text: string }) {
  const textRef = useRef<SVGTextElement>(null);
  const [box, setBox] = useState("0 -140 1000 105");

  useLayoutEffect(() => {
    const fit = () => {
      const el = textRef.current;
      const ctx = document.createElement("canvas").getContext("2d");
      if (!el || !ctx) return;
      const b = el.getBBox();
      ctx.font = NAME_FONT;
      const ascent = ctx.measureText(text).actualBoundingBoxAscent;
      if (b.width > 0 && ascent > 0) setBox(`${b.x} ${-ascent} ${b.width} ${ascent * NAME_VISIBLE}`);
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [text]);

  return (
    <svg viewBox={box} className="block w-full" aria-hidden>
      <text ref={textRef} x="0" y="0" className="fill-white" style={{ font: NAME_FONT, letterSpacing: "-0.03em" }}>
        {text}
      </text>
    </svg>
  );
}

export function Footer() {
  const firstName = SITE.name.split(" ")[0].toUpperCase();

  return (
    <footer id="contact" className="theme-light relative z-[41] overflow-hidden border-t border-[var(--footer-line)] bg-black text-white">
      <GridLines className="" lineClassName="bg-[var(--footer-line)]" />
      <div className="container-max pt-16 md:pt-24">
        <div className="flex flex-col gap-12 pb-16 md:pb-24 md:gap-16 lg:gap-12">
          <div className={HEADING}>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span>Let&rsquo;s</span>
              <CyclingWord />
            </p>
            <p className="text-gray-500">something great together.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Email</p>
              <a href={`mailto:${SITE.email}`} className={`text-base font-medium tracking-[-0.02em] md:text-lg ${LINK}`}>
                {SITE.email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Call Me</p>
              <a href={SITE.phoneHref} className={`text-base font-medium tracking-[-0.02em] md:text-lg ${LINK}`}>
                {SITE.phone}
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold tracking-[-0.02em] text-gray-500">Social</p>
              <SocialLinks tone="light" labels={SITE.footerSocial} />
            </div>
            <div className="flex flex-col gap-2">
              <LocalTime />
              <p className="text-base font-medium tracking-[-0.02em] md:text-lg">Remote from {SITE.basedIn}</p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none select-none">
          <FitName text={firstName} />
        </div>
      </div>
    </footer>
  );
}
