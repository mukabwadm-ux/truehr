import { Mail, MapPin, Phone } from "lucide-react";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { HealthCheckForm } from "@/components/forms/HealthCheckForm";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        description="Tell us what your business needs. We'll discuss the right next step."
        eyebrow="Contact TruewardHR"
        title="Book a free HR health check"
      />

      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-section font-extrabold text-navy">
              Get in touch
            </h2>
            <p className="mt-4 text-body text-muted">
              Reach our team by phone or email, or use the booking form to tell
              us about your HR and payroll needs.
            </p>
            <ul className="mt-8 space-y-5">
              <li>
                <a
                  className="inline-flex min-h-12 items-center gap-3 font-heading font-semibold text-navy hover:text-gold-text"
                  href="tel:+254797500747"
                >
                  <Phone aria-hidden="true" className="text-gold-text" />
                  +254 797 500747
                </a>
              </li>
              <li>
                <a
                  className="inline-flex min-h-12 items-center gap-3 font-heading font-semibold text-navy hover:text-gold-text"
                  href="mailto:john@truewardhr.com"
                >
                  <Mail aria-hidden="true" className="text-gold-text" />
                  john@truewardhr.com
                </a>
              </li>
              <li className="flex items-start gap-3 font-heading font-semibold text-navy">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-gold-text"
                />
                <span>[OFFICE ADDRESS], Nairobi</span>
              </li>
            </ul>

            <div
              aria-label="Office map location placeholder"
              className="mt-8 flex min-h-52 items-center justify-center rounded-card border border-dashed border-border bg-mist p-6 text-center text-sm text-muted"
              role="img"
            >
              <span>
                <MapPin
                  aria-hidden="true"
                  className="mx-auto mb-2 text-gold-text"
                />
                [MAP LOCATION - approved office location required]
              </span>
            </div>
          </div>

          <div
            className="scroll-mt-24 rounded-card border border-line bg-white p-5 shadow-soft sm:p-8"
            id="book"
          >
            <h2 className="font-heading text-card font-bold text-navy">
              Request a health check
            </h2>
            <p className="mt-2 text-body text-muted">
              Share a few details and we&apos;ll follow up about your request.
            </p>

            <HealthCheckForm />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
