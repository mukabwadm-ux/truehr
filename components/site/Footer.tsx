import Link from "next/link";

import { Logo } from "@/components/brand/Logo";

const usefulLinks = [
  { href: "/about", label: "About us" },
  { href: "/services/hr-consulting", label: "HR consulting" },
  { href: "/services/payroll", label: "Payroll services" },
  { href: "/services/compliance-audits", label: "Compliance audits" },
  { href: "/briefings", label: "Briefings" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-on-navy">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] lg:py-20">
        <section aria-labelledby="footer-contact">
          <h2
            className="font-heading text-sm font-bold text-white"
            id="footer-contact"
          >
            Contact us
          </h2>
          <a
            className="mt-4 inline-block font-heading text-2xl font-bold text-gold hover:text-white"
            href="tel:+254797500747"
          >
            +254 797 500747
          </a>
          <address className="mt-3 not-italic leading-relaxed">
            [OFFICE ADDRESS], Nairobi, Kenya
          </address>
          <a
            className="mt-2 inline-flex min-h-11 items-center hover:text-white"
            href="mailto:john@truewardhr.com"
          >
            john@truewardhr.com
          </a>
        </section>

        <nav aria-labelledby="footer-links">
          <h2
            className="font-heading text-sm font-bold text-white"
            id="footer-links"
          >
            Useful links
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="inline-flex min-h-11 items-center hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-work">
          <h2
            className="font-heading text-sm font-bold text-white"
            id="footer-work"
          >
            From our work
          </h2>
          <div aria-hidden="true" className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                className="flex aspect-square items-center justify-center rounded-inner bg-navy-soft p-2 text-center text-xs"
                key={index}
              >
                Photo pending
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-on-navy">
            Project photography to be supplied
          </p>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-sm">
            © {new Date().getFullYear()} TruewardHR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
