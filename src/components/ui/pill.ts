// Button sizes used across the site. Both have 14px text and a 1px border (transparent where a
// button has none) so buttons of the same size always match in height.
//   sm: 8px × 14px padding (38px tall), for the nav and compact controls
//   md: 12px × 20px padding (46px tall), for every other button
export const BUTTON_SIZES = {
  sm: "border px-3.5 py-2 text-sm font-medium",
  md: "border px-5 py-3 text-sm font-medium",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;

const PILL_BASE =
  "shrink-0 whitespace-nowrap rounded-[24px] shadow-[0_0.6px_0.6px_rgba(0,0,0,0.07),0_1.8px_1.8px_rgba(0,0,0,0.07),0_4.8px_4.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.97]";

const PILL_TONES = {
  // Soft gray pill for secondary actions.
  gray: "border-gray-200 bg-gray-50",
  // Lime brand pill. Text and border are fixed dark so they stay readable on lime in both themes.
  lime: "border-[rgba(0,0,0,0.1)] bg-secondary text-[#000]",
} as const;

export const pill = (tone: keyof typeof PILL_TONES, size: ButtonSize) =>
  `${PILL_BASE} ${BUTTON_SIZES[size]} ${PILL_TONES[tone]}`;
