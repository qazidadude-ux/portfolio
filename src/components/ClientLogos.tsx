import { LogoTicker } from "@/components/LogoTicker";

export function ClientLogos() {
  return (
    <section aria-label="Clients">
      <div className="container-max flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 text-lg font-medium tracking-[-0.03em] text-gray-600 md:text-[22px]">
          Trusted by <strong className="font-semibold text-black">many</strong>
        </p>
        <LogoTicker />
      </div>
    </section>
  );
}
