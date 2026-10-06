"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WORK_HISTORY } from "@/data/site";
import { buttonVariants } from "@/components/ui/Button";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const EASE = [0.16, 1, 0.3, 1] as const;

const CARD = `w-full rounded-[12px] border border-gray-200 bg-white p-[18px] ${CARD_SHADOW}`;

function JobDetails({ job }: { job: (typeof WORK_HISTORY)[number] }) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-medium tracking-[-0.02em]">{job.company}</p>
        <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">
          {job.role}
        </p>
      </div>
      <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">
        {job.period}
      </p>
    </div>
  );
}

// Jobs shown as a stacked deck that fans out into a list when the chevron button is pressed.
export function WorkHistory() {
  const [open, setOpen] = useState(false);
  // Height of the live deck, animated so the block grows and shrinks smoothly (on phones, where
  // there's no reserved space, this is what moves the content below).
  const deckRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // Heading and cards share one block, so the heading lines up with the cards. Its width is set
    // by the Intro section (which pins it to the right edge).
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium tracking-[-0.02em]">My work history</p>
      {/* Desktop: the block always takes its fully-open height, so opening the deck never pushes the
          page (an invisible copy of the open list reserves the space; the live deck sits on top).
          Phones: no reserved space, the height animates with the deck instead. */}
      <div className="grid">
        <div
          aria-hidden
          className="invisible col-start-1 row-start-1 hidden flex-col items-center gap-8 lg:flex"
        >
          <div className="flex w-full flex-col gap-3">
            {WORK_HISTORY.map((job) => (
              <div key={job.company} className={CARD}>
                <JobDetails job={job} />
              </div>
            ))}
          </div>
          <span
            className={buttonVariants({ variant: "outline", size: "icon" })}
          />
        </div>
        <motion.div
          initial={false}
          animate={{ height }}
          transition={{ duration: 0.5, ease: EASE }}
          className="col-start-1 row-start-1 self-start"
        >
          <div ref={deckRef} className="flex flex-col items-center gap-8">
            <div
              className={`relative flex w-full flex-col ${open ? "gap-3" : ""}`}
            >
              {WORK_HISTORY.map((job, i) => (
                <motion.div
                  key={job.company}
                  layout
                  initial={false}
                  animate={{ scale: open ? 1 : 1 - i * 0.05 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    zIndex: WORK_HISTORY.length - i,
                    top: open ? undefined : i * 8,
                  }}
                  className={`${CARD} ${!open && i > 0 ? "absolute inset-x-0" : "relative"}`}
                >
                  <JobDetails job={job} />
                </motion.div>
              ))}
            </div>

            {/* Icon-only toggle (white outline, like the carousel chevrons); the chevron flips when open. */}
            <motion.button
              layout="position"
              transition={{ duration: 0.5, ease: EASE }}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Hide work history" : "Show all work history"}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                strokeWidth={1.75}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
