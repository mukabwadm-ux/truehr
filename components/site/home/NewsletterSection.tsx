import Link from "next/link";
import { Mail } from "lucide-react";

import { TriangleMark } from "@/components/brand/TriangleMark";
import { Button } from "@/components/ui/button";

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

        <div
          aria-describedby="newsletter-status"
          aria-labelledby="newsletter-title"
          className="rounded-card bg-white p-5 text-ink shadow-soft sm:p-7"
          role="group"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-border sm:p-1">
            <input
              autoComplete="email"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-border px-5 text-body text-ink placeholder:text-muted focus-visible:outline-gold sm:border-0"
              disabled
              id="newsletter-email"
              placeholder="Your work email"
              type="email"
            />
            <Button className="shrink-0" disabled variant="gold">
              Subscribe
            </Button>
          </div>
          <label className="mt-5 flex items-start gap-3 text-sm text-muted">
            <input
              className="mt-1 h-4 w-4 accent-navy"
              disabled
              type="checkbox"
            />
            <span>
              Send me the monthly employer update. I can unsubscribe at any
              time.
            </span>
          </label>
          <p
            className="mt-3 text-sm text-muted"
            id="newsletter-status"
            role="status"
          >
            Newsletter sign-up will be enabled when secure submissions are
            connected.
          </p>
          <p className="mt-3 text-sm text-muted">
            Read our{" "}
            <Link className="font-semibold text-navy underline" href="/privacy">
              privacy notice
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
