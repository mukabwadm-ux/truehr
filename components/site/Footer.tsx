import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

const serviceLinks = [
  { href: "/services/payroll", label: "Payroll services" },
  { href: "/services/hr-consulting", label: "HR consulting" },
  { href: "/services/compliance-audits", label: "Compliance audits" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/briefings", label: "Briefings" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-on-navy">
      <div className="container flex flex-col justify-between gap-6 py-10 sm:flex-row sm:items-center sm:py-12">
        <h2 className="max-w-md text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
          Let&apos;s get your HR in order.
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm" variant="gold">
            <Link href="/contact#book">Book a compliance health check</Link>
          </Button>
          <a
            className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 font-heading text-xs font-bold text-white transition-colors hover:border-gold hover:text-gold"
            href="tel:+254797500747"
          >
            Call +254 797 500747
          </a>
        </div>
      </div>

      <div className="container border-t border-white/10 py-7">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-base" />
            <p className="mt-2 text-xs text-on-navy">
              HR consulting and payroll, Nairobi.
            </p>
          </div>

          <section aria-labelledby="footer-contact-title">
            <h3
              className="font-heading text-xs font-bold text-white"
              id="footer-contact-title"
            >
              Contact
            </h3>
            <a
              className="mt-2 block text-xs hover:text-white"
              href="tel:+254797500747"
            >
              +254 797 500747
            </a>
            <a
              className="mt-2 block text-xs hover:text-white"
              href="mailto:john@truewardhr.com"
            >
              john@truewardhr.com
            </a>
            <p className="mt-2 text-xs">[OFFICE ADDRESS], Nairobi</p>
          </section>

          <nav aria-labelledby="footer-services-title">
            <h3
              className="font-heading text-xs font-bold text-white"
              id="footer-services-title"
            >
              Services
            </h3>
            <ul className="mt-2 space-y-1">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-xs hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-title">
            <h3
              className="font-heading text-xs font-bold text-white"
              id="footer-company-title"
            >
              Company
            </h3>
            <ul className="mt-2 space-y-1">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-xs hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-xs hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 text-[10px]">
          © {new Date().getFullYear()} TruewardHR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
