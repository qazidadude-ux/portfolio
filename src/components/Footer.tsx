import Link from "next/link";
import { NAV_LINKS, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-gray-150">
      <div className="container-max flex flex-col gap-10 py-12 md:flex-row md:justify-between">
        <div>
          <p className="text-sm font-semibold">{SITE.name}</p>
          <p className="mt-1 text-sm text-gray-500">{SITE.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
              Menu
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-black">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
              Legal
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              <li>
                <Link href="/legal/terms" className="hover:text-black">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
              Social
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-max flex flex-col gap-2 border-t border-gray-150 py-6 text-xs text-gray-400 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Built with Next.js, deployed on Vercel.</span>
      </div>
    </footer>
  );
}
