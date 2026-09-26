// Standard button sizing for every text button: 16px × 6px padding, 14px text and a
// 1px border (transparent where a button has none), so every text button is the same height.
export const BUTTON_SIZE = "border px-4 py-1.5 text-sm font-medium";

const PILL_BASE = `shrink-0 whitespace-nowrap rounded-[24px] ${BUTTON_SIZE} shadow-[0_0.6px_0.6px_rgba(0,0,0,0.07),0_1.8px_1.8px_rgba(0,0,0,0.07),0_4.8px_4.8px_rgba(0,0,0,0.06),0_15px_15px_-3.75px_rgba(0,0,0,0.03)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.97]`;

// Soft gray pill for secondary actions (work history Show all).
export const PILL_BUTTON = `${PILL_BASE} border-gray-200 bg-gray-50`;

// Lime brand pill (nav Contact). Text and border are fixed dark so they stay readable on lime in
// both themes.
export const PILL_BUTTON_SECONDARY = `${PILL_BASE} border-[rgba(0,0,0,0.1)] bg-secondary text-[#000]`;
