import { ArrowRight } from "lucide-react";

// "View Project" on the project cards. The whole card is the link, so this is a span styled as an
// outline button that reacts to the card's hover (the card carries `group`): white outline at rest,
// lime fill on hover, and the arrow swings from → to ↗. Literal colours, since the theme's
// "white"/"black" tokens are swapped in dark mode. Full width on phones, sized to its label from md.
export function ViewProjectButton() {
  return (
    <span className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-[8px] border border-[#fff] px-4 text-sm font-medium text-[#fff] transition-colors duration-300 md:w-auto group-hover:border-secondary group-hover:bg-secondary group-hover:text-[#0a0a0a]">
      View Project
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45"
        strokeWidth={1.75}
      />
    </span>
  );
}
