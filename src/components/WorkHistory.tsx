"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircleChevronDown } from "lucide-react";
import { WORK_HISTORY } from "@/data/site";

const CARD_SHADOW =
  "shadow-[0_0.6px_0.6px_-0.94px_rgba(0,0,0,0.07),0_1.8px_1.8px_-1.88px_rgba(0,0,0,0.07),0_4.8px_4.8px_-2.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)]";

const PILL_SHADOW =
  "shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0_10px_10px_-3.75px_rgba(0,0,0,0.06)]";

const EASE = [0.16, 1, 0.3, 1] as const;

// Jobs shown as a stacked deck that fans out into a list on "Show all".
export function WorkHistory() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium tracking-[-0.02em]">My work history</p>
      <div className="flex flex-col items-center gap-8">
        <div className={`relative flex w-full flex-col ${open ? "gap-3" : ""}`}>
          {WORK_HISTORY.map((job, i) => (
            <motion.div
              key={job.company}
              layout
              initial={false}
              animate={{ scale: open ? 1 : 1 - i * 0.05 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ zIndex: WORK_HISTORY.length - i, top: open ? undefined : i * 8 }}
              className={`w-full rounded-[16px] border border-gray-200 bg-white p-[18px] ${CARD_SHADOW} ${
                !open && i > 0 ? "absolute inset-x-0" : "relative"
              }`}
            >
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-medium tracking-[-0.02em]">{job.company}</p>
                  <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">{job.role}</p>
                </div>
                <p className="text-xs font-semibold tracking-[-0.02em] text-gray-600">{job.period}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`flex h-[30px] items-center gap-1 rounded-[24px] border border-gray-150 bg-white py-3 pl-4 pr-3 text-xs font-semibold tracking-[-0.02em] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${PILL_SHADOW}`}
        >
          {open ? "Hide" : "Show all"}
          <CircleChevronDown
            className={`h-3 w-3 fill-black text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
