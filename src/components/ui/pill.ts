// Button sizes used across the site (applied to the glass button's label). Both have 14px text and
// a 1px transparent border so buttons of the same size always match in height.
//   sm: 8px × 14px padding (38px tall), for the nav and compact controls
//   md: 12px × 20px padding (46px tall), for every other button
export const BUTTON_SIZES = {
  sm: "border border-transparent px-3.5 py-2 text-sm font-medium",
  md: "border border-transparent px-5 py-3 text-sm font-medium",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
