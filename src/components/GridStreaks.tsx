// Small glowing streaks that travel down the two vertical guide lines (see GridLines). A fixed,
// viewport-sized layer, so it lives outside the smooth-scroll wrapper in the layout; the tracks
// use the same container-max box as the guide lines, so the streaks sit exactly on them.
// Each streak has its own speed and a negative delay (it starts mid-flight), so they never move
// in step. Styles: .grid-streak-y in globals.css; the horizontal ones ride the section dividers.
const STREAKS = [
  { side: "left", duration: 7, delay: -1 },
  { side: "left", duration: 12, delay: -6.5 },
  { side: "right", duration: 9, delay: -3 },
  { side: "right", duration: 14, delay: -10 },
] as const;

export function GridStreaks() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div className="container-max relative h-full">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            className={`grid-streak-y ${s.side === "left" ? "left-2 md:left-0" : "right-2 md:right-0"}`}
            style={{ animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}
