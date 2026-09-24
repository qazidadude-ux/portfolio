// Fixed, transparent strip along the bottom of the viewport that blurs whatever scrolls
// beneath it. Stacked layers with offset gradient masks make the blur ramp up toward the edge.
const LAYERS = [
  { blur: 0.5, from: 0, to: 37.5 },
  { blur: 1, from: 12.5, to: 50 },
  { blur: 2, from: 25, to: 62.5 },
  { blur: 4, from: 37.5, to: 75 },
  { blur: 8, from: 50, to: 100 },
];

export function ProgressiveBlur() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] h-20">
      {LAYERS.map(({ blur, from, to }) => {
        const mask = `linear-gradient(to bottom, transparent ${from}%, black ${(from + to) / 2}%, black ${to}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
