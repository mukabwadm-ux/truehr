import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

const employeeBands = ["1-10", "11-50", "51-150", "150+"];
const supportNeeds = [
  { value: "payroll", label: "Payroll" },
  { value: "hr_consulting", label: "HR consulting" },
  { value: "both", label: "Both" },
  { value: "not_sure", label: "Not sure yet" },
];

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

            <form className="mt-6">
              <fieldset className="grid gap-5 sm:grid-cols-2" disabled>
                <legend className="sr-only">
                  Health check request details
                </legend>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="full_name"
                  >
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="name"
                    className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
                    id="full_name"
                    name="full_name"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="company"
                  >
                    Company <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="organization"
                    className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
                    id="company"
                    name="company"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="email"
                  >
                    Work email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="email"
                    className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
                    id="email"
                    name="email"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="phone"
                  >
                    Phone <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="tel"
                    className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="employee_band"
                  >
                    Number of employees <span aria-hidden="true">*</span>
                  </label>
                  <select
                    className="min-h-12 w-full rounded-inner border border-border bg-white px-4 text-body text-ink"
                    defaultValue=""
                    id="employee_band"
                    name="employee_band"
                    required
                  >
                    <option disabled value="">
                      Select a range
                    </option>
                    {employeeBands.map((band) => (
                      <option key={band} value={band}>
                        {band}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="need"
                  >
                    I need help with <span aria-hidden="true">*</span>
                  </label>
                  <select
                    className="min-h-12 w-full rounded-inner border border-border bg-white px-4 text-body text-ink"
                    defaultValue=""
                    id="need"
                    name="need"
                    required
                  >
                    <option disabled value="">
                      Select an option
                    </option>
                    {supportNeeds.map((need) => (
                      <option key={need.value} value={need.value}>
                        {need.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="message"
                  >
                    Message{" "}
                    <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    className="min-h-28 w-full rounded-inner border border-border p-4 text-body text-ink"
                    id="message"
                    name="message"
                    rows={4}
                  />
                </div>
                <label className="flex items-start gap-3 text-sm text-ink sm:col-span-2">
                  <input
                    className="mt-1 h-4 w-4 accent-navy"
                    name="consent_contact"
                    required
                    type="checkbox"
                  />
                  <span>
                    I agree to TruewardHR contacting me about this request.
                    <span aria-hidden="true"> *</span>
                  </span>
                </label>
              </fieldset>
              <Button className="mt-6" disabled type="submit" variant="gold">
                Send request
              </Button>
              <p className="mt-4 text-sm text-muted" role="status">
                Secure form submissions are being connected. Please call or
                email us using the contact details provided above in the
                meantime.
              </p>
              <p className="mt-3 text-sm text-muted">
                See our{" "}
                <Link
                  className="font-semibold text-navy underline"
                  href="/privacy"
                >
                  privacy notice
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
