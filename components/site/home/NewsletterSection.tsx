import { Mail } from "lucide-react";

import { TriangleMark } from "@/components/brand/TriangleMark";
import { NewsletterSubscribeForm } from "@/components/forms/NewsletterSubscribeForm";

export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative isolate overflow-hidden bg-navy py-section-mobile text-white lg:py-section"
      id="newsletter"
    >
      <TriangleMark className="absolute -right-10 top-0 -z-10 h-64 w-64 text-white/5" />
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-gold">
            <Mail aria-hidden="true" size={26} />
          </span>
          <h2
            className="mt-5 max-w-xl text-section font-extrabold text-white"
            id="newsletter-title"
          >
            Get the monthly employer update
          </h2>
          <p className="mt-4 max-w-xl text-lead text-on-navy">
            Statutory changes, payroll reminders and practical HR tips, once a
            month. Unsubscribe any time.
          </p>
        </div>

        <div className="rounded-card bg-white p-5 text-ink shadow-soft sm:p-7">
          <NewsletterSubscribeForm />
        </div>
      </div>
    </section>
  );
}
