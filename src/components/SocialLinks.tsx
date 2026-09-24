import { siDribbble, siInstagram, siX, type SimpleIcon } from "simple-icons";
import { SITE } from "@/data/site";

// Neither icon set ships a LinkedIn mark, so it falls back to a text badge.
const SOCIAL_ICONS: Record<string, SimpleIcon> = {
  "X / Twitter": siX,
  Instagram: siInstagram,
  Dribbble: siDribbble,
};

const TONES = {
  dark: "bg-black/50 text-white backdrop-blur-[10px] hover:bg-black/70",
  light: "bg-white text-black hover:bg-gray-200",
};

export function SocialLinks({ tone }: { tone: keyof typeof TONES }) {
  return (
    <div className="flex gap-1.5">
      {SITE.social.map((s) => {
        const icon = SOCIAL_ICONS[s.label];
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`flex h-[30px] min-w-[30px] items-center justify-center rounded-[24px] p-2 transition-colors ${TONES[tone]}`}
          >
            {icon ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d={icon.path} />
              </svg>
            ) : (
              <span className="text-[11px] font-bold leading-none">in</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
