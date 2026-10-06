// Vertical guide lines on the container edges. Used page-wide in the layout and again inside
// the footer, which sits above the page-wide set.
export function GridLines({ className = "z-40", lineClassName = "bg-gray-150" }: { className?: string; lineClassName?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="container-max relative h-full">
        {/* 16px in from the screen edge on phones (so they don't vanish into it), box edge from md. */}
        <div className={`absolute inset-y-0 left-4 w-px md:left-0 ${lineClassName}`} />
        <div className={`absolute inset-y-0 right-4 w-px md:right-0 ${lineClassName}`} />
      </div>
    </div>
  );
}
