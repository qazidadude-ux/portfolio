// Faded-white shooting stars streaking from the left, down to the right, across the hero background. Pure CSS (see
// .shooting-star in globals.css); fixed starting points, lengths and timings so server and client
// render the same markup. Full screen width, behind the hero content, never in the way of clicks.
// Nine stars (was six: 50% more often), starting on the left and streaking down to the right.
const STARS = [
  { top: "4%", left: "2%", length: 140, duration: 7, delay: 0 },
  { top: "20%", left: "-4%", length: 110, duration: 9, delay: 2.4 },
  { top: "2%", left: "28%", length: 160, duration: 8, delay: 4.8 },
  { top: "34%", left: "6%", length: 100, duration: 10, delay: 6.5 },
  { top: "10%", left: "44%", length: 120, duration: 11, delay: 3.6 },
  { top: "44%", left: "16%", length: 90, duration: 9.5, delay: 8.2 },
  { top: "14%", left: "12%", length: 130, duration: 8.5, delay: 1.2 },
  { top: "26%", left: "36%", length: 105, duration: 10.5, delay: 5.6 },
  { top: "0%", left: "58%", length: 125, duration: 9, delay: 7.4 },
] as const;

export function ShootingStars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.length,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
