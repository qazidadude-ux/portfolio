// Vertical guide lines on the container edges. Used page-wide in the layout and again inside
// the footer, which sits above the page-wide set.
export function GridLines({ className = "z-40", lineClassName = "bg-gray-150" }: { className?: string; lineClassName?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="container-max relative h-full">
        <div className={`absolute inset-y-0 left-0 w-px ${lineClassName}`} />
        <div className={`absolute inset-y-0 right-0 w-px ${lineClassName}`} />
      </div>
    </div>
  );
}
