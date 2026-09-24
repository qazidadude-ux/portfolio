export function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40">
      <div className="container-max relative h-full">
        <div className="absolute inset-y-0 left-0 w-px bg-gray-150" />
        <div className="absolute inset-y-0 right-0 w-px bg-gray-150" />
      </div>
    </div>
  );
}
