// Slides for the "Selected Visuals" carousel. Placeholders until real shots are added:
// drop an image in public/visuals/ (3:2-ish, ~2400px wide) and set `image`, e.g.
// { title: "Kora — Homepage", color: "#efe9e1", image: "/visuals/kora-home.jpg" }.
export type Visual = {
  title: string;
  /** Fallback background while there is no image. */
  color: string;
  image?: string;
};

export const VISUALS: Visual[] = [
  { title: "Kora — Homepage", color: "#efe9e1" },
  { title: "KYMA — Brand system", color: "#101010" },
  { title: "Mugen — Case study", color: "#e4dff5" },
  { title: "Axiom — Product page", color: "#dfeee3" },
  { title: "Kora — Mobile", color: "#e6dfd3" },
  { title: "KYMA — Dashboard", color: "#1d1d1d" },
  { title: "Mugen — Motion frames", color: "#d9d2f0" },
  { title: "Axiom — Checkout", color: "#d3e7d8" },
];
